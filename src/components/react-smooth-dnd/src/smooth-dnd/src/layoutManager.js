import { extraSizeForInsertion, translationValue, visibilityValue } from './constants';
import * as Utils from './utils';
var horizontalMap = {
    size: 'offsetWidth',
    distanceToParent: 'offsetLeft',
    translate: 'transform',
    begin: 'left',
    end: 'right',
    dragPosition: 'x',
    scrollSize: 'scrollWidth',
    offsetSize: 'offsetWidth',
    scrollValue: 'scrollLeft',
    scale: 'scaleX',
    setSize: 'width',
    setters: {
        'translate': function (val) { return "translate3d(" + val + "px, 0, 0)"; }
    }
};
var verticalMap = {
    size: 'offsetHeight',
    distanceToParent: 'offsetTop',
    translate: 'transform',
    begin: 'top',
    end: 'bottom',
    dragPosition: 'y',
    scrollSize: 'scrollHeight',
    offsetSize: 'offsetHeight',
    scrollValue: 'scrollTop',
    scale: 'scaleY',
    setSize: 'height',
    setters: {
        'translate': function (val) { return "translate3d(0," + val + "px, 0)"; }
    }
};
function orientationDependentProps(map) {
    function get(obj, prop) {
        var mappedProp = map[prop];
        return obj[mappedProp || prop];
    }
    function set(obj, prop, value) {
        obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
    }
    return { get: get, set: set };
}
export default function layoutManager(containerElement, orientation, _animationDuration) {
    containerElement[extraSizeForInsertion] = 0;
    var map = orientation === 'horizontal' ? horizontalMap : verticalMap;
    var propMapper = orientationDependentProps(map);
    var values = {
        translation: 0
    };
    window.addEventListener('resize', function () {
        invalidateContainerRectangles(containerElement);
    });
    setTimeout(function () {
        invalidate();
    }, 10);
    function invalidate() {
        invalidateContainerRectangles(containerElement);
        invalidateContainerScale(containerElement);
    }
    function invalidateContainerRectangles(containerElement) {
        values.rect = Utils.getContainerRect(containerElement);
        var visibleRect = Utils.getVisibleRect(containerElement, values.rect);
        if (Utils.isVisible(visibleRect)) {
            values.lastVisibleRect = values.visibleRect;
        }
        values.visibleRect = visibleRect;
    }
    function invalidateContainerScale(containerElement) {
        var rect = containerElement.getBoundingClientRect();
        values.scaleX = containerElement.offsetWidth ? ((rect.right - rect.left) / containerElement.offsetWidth) : 1;
        values.scaleY = containerElement.offsetHeight ? ((rect.bottom - rect.top) / containerElement.offsetHeight) : 1;
    }
    function getContainerRectangles() {
        return {
            rect: values.rect,
            visibleRect: values.visibleRect,
            lastVisibleRect: values.lastVisibleRect
        };
    }
    function getBeginEndOfDOMRect(rect) {
        return {
            begin: propMapper.get(rect, 'begin'),
            end: propMapper.get(rect, 'end')
        };
    }
    function getBeginEndOfContainer() {
        var begin = propMapper.get(values.rect, 'begin') + values.translation;
        var end = propMapper.get(values.rect, 'end') + values.translation;
        return { begin: begin, end: end };
    }
    function getBeginEndOfContainerVisibleRect() {
        var begin = propMapper.get(values.visibleRect, 'begin') + values.translation;
        var end = propMapper.get(values.visibleRect, 'end') + values.translation;
        return { begin: begin, end: end };
    }
    function getSize(element) {
        var htmlElement = element;
        if (htmlElement.tagName) {
            var rect = htmlElement.getBoundingClientRect();
            return orientation === 'vertical' ? rect.bottom - rect.top : rect.right - rect.left;
        }
        return propMapper.get(element, 'size') * propMapper.get(values, 'scale');
    }
    function getDistanceToOffsetParent(element) {
        var distance = propMapper.get(element, 'distanceToParent') + (element[translationValue] || 0);
        return distance * propMapper.get(values, 'scale');
    }
    function getBeginEnd(element) {
        var begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, 'begin') + values.translation) - propMapper.get(containerElement, 'scrollValue');
        return {
            begin: begin,
            end: begin + getSize(element) * propMapper.get(values, 'scale')
        };
    }
    function setSize(element, size) {
        propMapper.set(element, 'setSize', size);
    }
    function getAxisValue(position) {
        return propMapper.get(position, 'dragPosition');
    }
    function setTranslation(element, translation) {
        if (!translation) {
            element.style.removeProperty('transform');
        }
        else {
            propMapper.set(element.style, 'translate', translation);
        }
        element[translationValue] = translation;
    }
    function getTranslation(element) {
        return element[translationValue];
    }
    function setVisibility(element, isVisible) {
        if (element[visibilityValue] === undefined || element[visibilityValue] !== isVisible) {
            if (isVisible) {
                element.style.removeProperty('visibility');
            }
            else {
                element.style.visibility = 'hidden';
            }
            element[visibilityValue] = isVisible;
        }
    }
    function isVisible(element) {
        return element[visibilityValue] === undefined || element[visibilityValue];
    }
    function isInVisibleRect(x, y) {
        var _a = values.visibleRect, left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
        // if there is no wrapper in rect size will be 0 and wont accept any drop
        // so make sure at least there is 30px difference
        if (bottom - top < 2) {
            bottom = top + 30;
        }
        var containerRect = values.rect;
        if (orientation === 'vertical') {
            return x > containerRect.left && x < containerRect.right && y > top && y < bottom;
        }
        else {
            return x > left && x < right && y > containerRect.top && y < containerRect.bottom;
        }
    }
    function getTopLeftOfElementBegin(begin) {
        var top = 0;
        var left = 0;
        if (orientation === 'horizontal') {
            left = begin;
            top = values.rect.top;
        }
        else {
            left = values.rect.left;
            top = begin;
        }
        return {
            top: top, left: left
        };
    }
    function getScrollSize(element) {
        return propMapper.get(element, 'scrollSize');
    }
    function getScrollValue(element) {
        return propMapper.get(element, 'scrollValue');
    }
    function setScrollValue(element, val) {
        return propMapper.set(element, 'scrollValue', val);
    }
    function getPosition(position) {
        return getAxisValue(position);
    }
    function invalidateRects() {
        invalidateContainerRectangles(containerElement);
    }
    function setBegin(style, value) {
        propMapper.set(style, 'begin', value);
    }
    return {
        getSize: getSize,
        getContainerRectangles: getContainerRectangles,
        getBeginEndOfDOMRect: getBeginEndOfDOMRect,
        getBeginEndOfContainer: getBeginEndOfContainer,
        getBeginEndOfContainerVisibleRect: getBeginEndOfContainerVisibleRect,
        getBeginEnd: getBeginEnd,
        getAxisValue: getAxisValue,
        setTranslation: setTranslation,
        getTranslation: getTranslation,
        setVisibility: setVisibility,
        isVisible: isVisible,
        isInVisibleRect: isInVisibleRect,
        setSize: setSize,
        getTopLeftOfElementBegin: getTopLeftOfElementBegin,
        getScrollSize: getScrollSize,
        getScrollValue: getScrollValue,
        setScrollValue: setScrollValue,
        invalidate: invalidate,
        invalidateRects: invalidateRects,
        getPosition: getPosition,
        setBegin: setBegin,
    };
}
//# sourceMappingURL=layoutManager.js.map