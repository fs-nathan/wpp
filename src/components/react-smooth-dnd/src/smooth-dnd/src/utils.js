import { ScrollAxis } from './interfaces';
import { containerInstance } from './constants';
export var getIntersection = function (rect1, rect2) {
    return {
        left: Math.max(rect1.left, rect2.left),
        top: Math.max(rect1.top, rect2.top),
        right: Math.min(rect1.right, rect2.right),
        bottom: Math.min(rect1.bottom, rect2.bottom),
    };
};
export var getIntersectionOnAxis = function (rect1, rect2, axis) {
    if (axis === 'x') {
        return {
            left: Math.max(rect1.left, rect2.left),
            top: rect1.top,
            right: Math.min(rect1.right, rect2.right),
            bottom: rect1.bottom,
        };
    }
    else {
        return {
            left: rect1.left,
            top: Math.max(rect1.top, rect2.top),
            right: rect1.right,
            bottom: Math.min(rect1.bottom, rect2.bottom),
        };
    }
};
export var getContainerRect = function (element) {
    var _rect = element.getBoundingClientRect();
    var rect = {
        left: _rect.left,
        right: _rect.right,
        top: _rect.top,
        bottom: _rect.bottom,
    };
    if (hasBiggerChild(element, 'x') && !isScrollingOrHidden(element, 'x')) {
        var width = rect.right - rect.left;
        rect.right = rect.right + element.scrollWidth - width;
    }
    if (hasBiggerChild(element, 'y') && !isScrollingOrHidden(element, 'y')) {
        var height = rect.bottom - rect.top;
        rect.bottom = rect.bottom + element.scrollHeight - height;
    }
    return rect;
};
export var getScrollingAxis = function (element) {
    var style = window.getComputedStyle(element);
    var overflow = style['overflow'];
    var general = overflow === 'auto' || overflow === 'scroll';
    if (general)
        return ScrollAxis.xy;
    var overFlowX = style["overflow-x"];
    var xScroll = overFlowX === 'auto' || overFlowX === 'scroll';
    var overFlowY = style["overflow-y"];
    var yScroll = overFlowY === 'auto' || overFlowY === 'scroll';
    if (xScroll && yScroll)
        return ScrollAxis.xy;
    if (xScroll)
        return ScrollAxis.x;
    if (yScroll)
        return ScrollAxis.y;
    return null;
};
export var isScrolling = function (element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style['overflow'];
    var overFlowAxis = style["overflow-" + axis];
    var general = overflow === 'auto' || overflow === 'scroll';
    var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
    return general || dimensionScroll;
};
export var isScrollingOrHidden = function (element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style['overflow'];
    var overFlowAxis = style["overflow-" + axis];
    var general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
    var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
    return general || dimensionScroll;
};
export var hasBiggerChild = function (element, axis) {
    if (axis === 'x') {
        return element.scrollWidth > element.clientWidth;
    }
    else {
        return element.scrollHeight > element.clientHeight;
    }
};
export var hasScrollBar = function (element, axis) {
    return hasBiggerChild(element, axis) && isScrolling(element, axis);
};
export var getVisibleRect = function (element, elementRect) {
    var currentElement = element;
    var rect = elementRect || getContainerRect(element);
    currentElement = element.parentElement;
    while (currentElement) {
        if (hasBiggerChild(currentElement, 'x') && isScrollingOrHidden(currentElement, 'x')) {
            rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'x');
        }
        if (hasBiggerChild(currentElement, 'y') && isScrollingOrHidden(currentElement, 'y')) {
            rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'y');
        }
        currentElement = currentElement.parentElement;
    }
    return rect;
};
export var getParentRelevantContainerElement = function (element, relevantContainers) {
    var current = element;
    var _loop_1 = function () {
        if (current[containerInstance]) {
            var container_1 = current[containerInstance];
            if (relevantContainers.some(function (p) { return p === container_1; })) {
                return { value: container_1 };
            }
        }
        current = current.parentElement;
    };
    while (current) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return null;
};
export var listenScrollParent = function (element, clb) {
    var scrollers = [];
    setScrollers();
    function setScrollers() {
        var currentElement = element;
        while (currentElement) {
            if (isScrolling(currentElement, 'x') || isScrolling(currentElement, 'y')) {
                scrollers.push(currentElement);
            }
            currentElement = currentElement.parentElement;
        }
    }
    function dispose() {
        stop();
        scrollers = null;
    }
    ;
    function start() {
        if (scrollers) {
            scrollers.forEach(function (p) { return p.addEventListener('scroll', clb); });
            window.addEventListener('scroll', clb);
        }
    }
    function stop() {
        if (scrollers) {
            scrollers.forEach(function (p) { return p.removeEventListener('scroll', clb); });
            window.removeEventListener('scroll', clb);
        }
    }
    return {
        dispose: dispose,
        start: start,
        stop: stop
    };
};
export var hasParent = function (element, parent) {
    var current = element;
    while (current) {
        if (current === parent) {
            return true;
        }
        current = current.parentElement;
    }
    return false;
};
export var getParent = function (element, selector) {
    var current = element;
    while (current) {
        if (current.matches(selector)) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
};
export var hasClass = function (element, cls) {
    return (element.className
        .split(' ')
        .map(function (p) { return p; })
        .indexOf(cls) > -1);
};
export var addClass = function (element, cls) {
    if (element) {
        var classes = element.className.split(' ').filter(function (p) { return p; });
        if (classes.indexOf(cls) === -1) {
            classes.unshift(cls);
            element.className = classes.join(' ');
        }
    }
};
export var removeClass = function (element, cls) {
    if (element) {
        var classes = element.className.split(' ').filter(function (p) { return p && p !== cls; });
        element.className = classes.join(' ');
    }
};
export var debounce = function (fn, delay, immediate) {
    var timer = null;
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate && !timer) {
            fn.call.apply(fn, [null].concat(params));
        }
        else {
            timer = setTimeout(function () {
                timer = null;
                fn.call.apply(fn, [null].concat(params));
            }, delay);
        }
    };
};
export var removeChildAt = function (parent, index) {
    return parent.removeChild(parent.children[index]);
};
export var addChildAt = function (parent, child, index) {
    if (index >= parent.children.length) {
        parent.appendChild(child);
    }
    else {
        parent.insertBefore(child, parent.children[index]);
    }
};
export var isMobile = function () {
    if (typeof window !== 'undefined') {
        if (window.navigator.userAgent.match(/Android/i) ||
            window.navigator.userAgent.match(/webOS/i) ||
            window.navigator.userAgent.match(/iPhone/i) ||
            window.navigator.userAgent.match(/iPad/i) ||
            window.navigator.userAgent.match(/iPod/i) ||
            window.navigator.userAgent.match(/BlackBerry/i) ||
            window.navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
};
export var clearSelection = function () {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            // Chrome
            window.getSelection().empty();
        }
        else if (window.getSelection().removeAllRanges) {
            // Firefox
            window.getSelection().removeAllRanges();
        }
    }
    else if (window.document.selection) {
        // IE?
        window.document.selection.empty();
    }
};
export var getElementCursor = function (element) {
    if (element) {
        var style = window.getComputedStyle(element);
        if (style) {
            return style.cursor;
        }
    }
    return null;
};
export var getDistanceToParent = function (parent, child) {
    var current = child;
    var dist = 0;
    while (current) {
        if (current === parent) {
            return dist;
        }
        dist++;
        current = current.parentElement;
    }
    return null;
};
export function isVisible(rect) {
    return !(rect.bottom <= rect.top || rect.right <= rect.left);
}
//# sourceMappingURL=utils.js.map