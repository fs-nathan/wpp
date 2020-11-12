import * as constants from './constants';
import { defaultOptions } from './defaults';
import dragScroller from './scroller';
import './polyfills';
import { addCursorStyleToBody, addStyleToHead, removeStyle } from './styles';
import * as Utils from './utils';
var grabEvents = ['mousedown', 'touchstart'];
var moveEvents = ['mousemove', 'touchmove'];
var releaseEvents = ['mouseup', 'touchend'];
var dragListeningContainers = null;
var grabbedElement = null;
var ghostInfo = null;
var draggableInfo = null;
var containers = [];
var isDragging = false;
var isCanceling = false;
var dropAnimationStarted = false;
var missedDrag = false;
var handleDrag = null;
var handleScroll = null;
var sourceContainerLockAxis = null;
var cursorStyleElement = null;
var containerRectableWatcher = watchRectangles();
var isMobile = Utils.isMobile();
function listenEvents() {
    if (typeof window !== 'undefined') {
        addGrabListeners();
    }
}
function addGrabListeners() {
    grabEvents.forEach(function (e) {
        window.document.addEventListener(e, onMouseDown, { passive: false });
    });
}
function addMoveListeners() {
    moveEvents.forEach(function (e) {
        window.document.addEventListener(e, onMouseMove, { passive: false });
    });
}
function removeMoveListeners() {
    moveEvents.forEach(function (e) {
        window.document.removeEventListener(e, onMouseMove, { passive: false });
    });
}
function addReleaseListeners() {
    releaseEvents.forEach(function (e) {
        window.document.addEventListener(e, onMouseUp, { passive: false });
    });
}
function removeReleaseListeners() {
    releaseEvents.forEach(function (e) {
        window.document.removeEventListener(e, onMouseUp, { passive: false });
    });
}
function getGhostParent() {
    if (draggableInfo && draggableInfo.ghostParent) {
        return draggableInfo.ghostParent;
    }
    if (grabbedElement) {
        return grabbedElement.parentElement || window.document.body;
    }
    else {
        return window.document.body;
    }
}
function getGhostElement(wrapperElement, _a, container, cursor) {
    var x = _a.x, y = _a.y;
    var wrapperRect = wrapperElement.getBoundingClientRect();
    var left = wrapperRect.left, top = wrapperRect.top, right = wrapperRect.right, bottom = wrapperRect.bottom;
    var wrapperVisibleRect = Utils.getIntersection(container.layout.getContainerRectangles().visibleRect, wrapperRect);
    var midX = wrapperVisibleRect.left + (wrapperVisibleRect.right - wrapperVisibleRect.left) / 2;
    var midY = wrapperVisibleRect.top + (wrapperVisibleRect.bottom - wrapperVisibleRect.top) / 2;
    var ghost = wrapperElement.cloneNode(true);
    ghost.style.zIndex = '1000';
    ghost.style.boxSizing = 'border-box';
    ghost.style.position = 'fixed';
    ghost.style.top = '0px';
    ghost.style.left = '0px';
    ghost.style.transform = null;
    ghost.style.removeProperty('transform');
    if (container.shouldUseTransformForGhost()) {
        ghost.style.transform = "translate3d(" + left + "px, " + top + "px, 0)";
    }
    else {
        ghost.style.top = top + "px";
        ghost.style.left = left + "px";
    }
    ghost.style.width = (right - left) + 'px';
    ghost.style.height = (bottom - top) + 'px';
    ghost.style.overflow = 'visible';
    ghost.style.transition = null;
    ghost.style.removeProperty('transition');
    ghost.style.pointerEvents = 'none';
    ghost.style.userSelect = 'none';
    if (container.getOptions().dragClass) {
        setTimeout(function () {
            Utils.addClass(ghost.firstElementChild, container.getOptions().dragClass);
            var dragCursor = window.getComputedStyle(ghost.firstElementChild).cursor;
            cursorStyleElement = addCursorStyleToBody(dragCursor);
        });
    }
    else {
        cursorStyleElement = addCursorStyleToBody(cursor);
    }
    Utils.addClass(ghost, container.getOptions().orientation || 'vertical');
    Utils.addClass(ghost, constants.ghostClass);
    return {
        ghost: ghost,
        centerDelta: { x: midX - x, y: midY - y },
        positionDelta: { left: left - x, top: top - y },
        topLeft: {
            x: left,
            y: top
        }
    };
}
function getDraggableInfo(draggableElement) {
    var container = containers.filter(function (p) { return draggableElement.parentElement === p.element; })[0];
    var draggableIndex = container.draggables.indexOf(draggableElement);
    var getGhostParent = container.getOptions().getGhostParent;
    var draggableRect = draggableElement.getBoundingClientRect();
    return {
        container: container,
        element: draggableElement,
        size: {
            offsetHeight: draggableRect.bottom - draggableRect.top,
            offsetWidth: draggableRect.right - draggableRect.left,
        },
        elementIndex: draggableIndex,
        payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload(draggableIndex) : undefined,
        targetElement: null,
        position: { x: 0, y: 0 },
        groupName: container.getOptions().groupName,
        ghostParent: getGhostParent ? getGhostParent() : null,
        invalidateShadow: null,
        mousePosition: null,
        relevantContainers: null
    };
}
function handleDropAnimation(callback) {
    function endDrop() {
        Utils.removeClass(ghostInfo.ghost, 'animated');
        ghostInfo.ghost.style.transitionDuration = null;
        getGhostParent().removeChild(ghostInfo.ghost);
        callback();
    }
    function animateGhostToPosition(_a, duration, dropClass) {
        var top = _a.top, left = _a.left;
        Utils.addClass(ghostInfo.ghost, 'animated');
        if (dropClass) {
            Utils.addClass(ghostInfo.ghost.firstElementChild, dropClass);
        }
        ghostInfo.topLeft.x = left;
        ghostInfo.topLeft.y = top;
        translateGhost(duration);
        setTimeout(function () {
            endDrop();
        }, duration + 20);
    }
    function shouldAnimateDrop(options) {
        return options.shouldAnimateDrop
            ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload)
            : true;
    }
    function disappearAnimation(duration, clb) {
        Utils.addClass(ghostInfo.ghost, 'animated');
        translateGhost(duration, 0.9, true);
        // ghostInfo.ghost.style.transitionDuration = duration + 'ms';
        // ghostInfo.ghost.style.opacity = '0';
        // ghostInfo.ghost.style.transform = 'scale(0.90)';
        setTimeout(function () {
            clb();
        }, duration + 20);
    }
    if (draggableInfo.targetElement) {
        var container = containers.filter(function (p) { return p.element === draggableInfo.targetElement; })[0];
        if (shouldAnimateDrop(container.getOptions())) {
            var dragResult = container.getDragResult();
            animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2), container.getOptions().dropClass);
        }
        else {
            endDrop();
        }
    }
    else {
        var container = containers.filter(function (p) { return p === draggableInfo.container; })[0];
        if (container) {
            var _a = container.getOptions(), behaviour = _a.behaviour, removeOnDropOut = _a.removeOnDropOut;
            if ((behaviour === 'move' || behaviour === 'contain') && (isCanceling || !removeOnDropOut) && container.getDragResult()) {
                var rectangles = container.layout.getContainerRectangles();
                // container is hidden somehow
                // move ghost back to last seen position
                if (!Utils.isVisible(rectangles.visibleRect) && Utils.isVisible(rectangles.lastVisibleRect)) {
                    animateGhostToPosition({
                        top: rectangles.lastVisibleRect.top,
                        left: rectangles.lastVisibleRect.left
                    }, container.getOptions().animationDuration, container.getOptions().dropClass);
                }
                else {
                    var _b = container.getDragResult(), removedIndex = _b.removedIndex, elementSize = _b.elementSize;
                    var layout = container.layout;
                    // drag ghost to back
                    container.getTranslateCalculator({
                        dragResult: {
                            removedIndex: removedIndex,
                            addedIndex: removedIndex,
                            elementSize: elementSize,
                            pos: undefined,
                            shadowBeginEnd: undefined,
                        },
                    });
                    var prevDraggableEnd = removedIndex > 0
                        ? layout.getBeginEnd(container.draggables[removedIndex - 1]).end
                        : layout.getBeginEndOfContainer().begin;
                    animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), container.getOptions().animationDuration, container.getOptions().dropClass);
                }
            }
            else {
                disappearAnimation(container.getOptions().animationDuration, endDrop);
            }
        }
        else {
            // container is disposed due to removal
            disappearAnimation(defaultOptions.animationDuration, endDrop);
        }
    }
}
var handleDragStartConditions = (function handleDragStartConditions() {
    var startEvent;
    var delay;
    var clb;
    var timer = null;
    var moveThreshold = 1;
    var maxMoveInDelay = 5;
    function onMove(event) {
        var _a = getPointerEvent(event), currentX = _a.clientX, currentY = _a.clientY;
        if (!delay) {
            if (Math.abs(startEvent.clientX - currentX) > moveThreshold || Math.abs(startEvent.clientY - currentY) > moveThreshold) {
                return callCallback();
            }
        }
        else {
            if (Math.abs(startEvent.clientX - currentX) > maxMoveInDelay || Math.abs(startEvent.clientY - currentY) > maxMoveInDelay) {
                deregisterEvent();
            }
        }
    }
    function onUp() {
        deregisterEvent();
    }
    function onHTMLDrag() {
        deregisterEvent();
    }
    function registerEvents() {
        if (delay) {
            timer = setTimeout(callCallback, delay);
        }
        moveEvents.forEach(function (e) { return window.document.addEventListener(e, onMove); }, {
            passive: false,
        });
        releaseEvents.forEach(function (e) { return window.document.addEventListener(e, onUp); }, {
            passive: false,
        });
        window.document.addEventListener('drag', onHTMLDrag, {
            passive: false,
        });
    }
    function deregisterEvent() {
        clearTimeout(timer);
        moveEvents.forEach(function (e) { return window.document.removeEventListener(e, onMove); }, {
            passive: false,
        });
        releaseEvents.forEach(function (e) { return window.document.removeEventListener(e, onUp); }, {
            passive: false,
        });
        window.document.removeEventListener('drag', onHTMLDrag, {
            passive: false,
        });
    }
    function callCallback() {
        clearTimeout(timer);
        deregisterEvent();
        clb();
    }
    return function (_startEvent, _delay, _clb) {
        startEvent = getPointerEvent(_startEvent);
        delay = typeof _delay === 'number' ? _delay : isMobile ? 200 : 0;
        clb = _clb;
        registerEvents();
    };
})();
function onMouseDown(event) {
    var e = getPointerEvent(event);
    if (!isDragging && (e.button === undefined || e.button === 0)) {
        grabbedElement = Utils.getParent(e.target, '.' + constants.wrapperClass);
        if (grabbedElement) {
            var containerElement_1 = Utils.getParent(grabbedElement, '.' + constants.containerClass);
            var container = containers.filter(function (p) { return p.element === containerElement_1; })[0];
            var dragHandleSelector = container.getOptions().dragHandleSelector;
            var nonDragAreaSelector = container.getOptions().nonDragAreaSelector;
            var startDrag = true;
            if (dragHandleSelector && !Utils.getParent(e.target, dragHandleSelector)) {
                startDrag = false;
            }
            if (nonDragAreaSelector && Utils.getParent(e.target, nonDragAreaSelector)) {
                startDrag = false;
            }
            if (startDrag) {
                container.layout.invalidate();
                Utils.addClass(window.document.body, constants.disbaleTouchActions);
                Utils.addClass(window.document.body, constants.noUserSelectClass);
                var onMouseUp_1 = function () {
                    Utils.removeClass(window.document.body, constants.disbaleTouchActions);
                    Utils.removeClass(window.document.body, constants.noUserSelectClass);
                    window.document.removeEventListener('mouseup', onMouseUp_1);
                };
                window.document.addEventListener('mouseup', onMouseUp_1);
            }
            if (startDrag) {
                handleDragStartConditions(e, container.getOptions().dragBeginDelay, function () {
                    Utils.clearSelection();
                    initiateDrag(e, Utils.getElementCursor(event.target));
                    addMoveListeners();
                    addReleaseListeners();
                });
            }
        }
    }
}
function handleMouseMoveForContainer(_a, orientation) {
    var clientX = _a.clientX, clientY = _a.clientY;
    if (orientation === void 0) { orientation = 'vertical'; }
    var beginEnd = draggableInfo.container.layout.getBeginEndOfContainerVisibleRect();
    var mousePos;
    var axis;
    var leftTop;
    var size;
    if (orientation === 'vertical') {
        mousePos = clientY;
        axis = 'y';
        leftTop = 'top';
        size = draggableInfo.size.offsetHeight;
    }
    else {
        mousePos = clientX;
        axis = 'x';
        leftTop = 'left';
        size = draggableInfo.size.offsetWidth;
    }
    var beginBoundary = beginEnd.begin;
    var endBoundary = beginEnd.end - size;
    var positionInBoundary = Math.max(beginBoundary, Math.min(endBoundary, (mousePos + ghostInfo.positionDelta[leftTop])));
    ghostInfo.topLeft[axis] = positionInBoundary;
    draggableInfo.position[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, (mousePos + ghostInfo.centerDelta[axis])));
    draggableInfo.mousePosition[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, mousePos));
    if (draggableInfo.position[axis] < (beginEnd.begin + (size / 2))) {
        draggableInfo.position[axis] = beginEnd.begin + 2;
    }
    if (draggableInfo.position[axis] > (beginEnd.end - (size / 2))) {
        draggableInfo.position[axis] = beginEnd.end - 2;
    }
}
function onMouseMove(event) {
    event.preventDefault();
    var e = getPointerEvent(event);
    if (!draggableInfo) {
        initiateDrag(e, Utils.getElementCursor(event.target));
    }
    else {
        var containerOptions = draggableInfo.container.getOptions();
        var isContainDrag = containerOptions.behaviour === 'contain';
        if (isContainDrag) {
            handleMouseMoveForContainer(e, containerOptions.orientation);
        }
        else if (sourceContainerLockAxis) {
            if (sourceContainerLockAxis === 'y') {
                ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
                draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
                draggableInfo.mousePosition.y = e.clientY;
            }
            else if (sourceContainerLockAxis === 'x') {
                ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
                draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
                draggableInfo.mousePosition.x = e.clientX;
            }
        }
        else {
            ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
            ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
            draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
            draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
            draggableInfo.mousePosition.x = e.clientX;
            draggableInfo.mousePosition.y = e.clientY;
        }
        translateGhost();
        if (!handleDrag(draggableInfo)) {
            missedDrag = true;
        }
        else {
            missedDrag = false;
        }
        if (missedDrag) {
            debouncedHandleMissedDragFrame();
        }
    }
}
var debouncedHandleMissedDragFrame = Utils.debounce(handleMissedDragFrame, 20, false);
function handleMissedDragFrame() {
    if (missedDrag) {
        missedDrag = false;
        handleDragImmediate(draggableInfo, dragListeningContainers);
    }
}
function onMouseUp() {
    removeMoveListeners();
    removeReleaseListeners();
    handleScroll({ reset: true });
    if (cursorStyleElement) {
        removeStyle(cursorStyleElement);
        cursorStyleElement = null;
    }
    if (draggableInfo) {
        containerRectableWatcher.stop();
        handleMissedDragFrame();
        dropAnimationStarted = true;
        handleDropAnimation(function () {
            isDragging = false; // 
            fireOnDragStartEnd(false);
            var containers = dragListeningContainers || [];
            var containerToCallDrop = containers.shift();
            while (containerToCallDrop !== undefined) {
                containerToCallDrop.handleDrop(draggableInfo);
                containerToCallDrop = containers.shift();
            }
            dragListeningContainers = null;
            grabbedElement = null;
            ghostInfo = null;
            draggableInfo = null;
            sourceContainerLockAxis = null;
            handleDrag = null;
            dropAnimationStarted = false;
        });
    }
}
function getPointerEvent(e) {
    return e.touches ? e.touches[0] : e;
}
function handleDragImmediate(draggableInfo, dragListeningContainers) {
    var containerBoxChanged = false;
    dragListeningContainers.forEach(function (p) {
        var dragResult = p.handleDrag(draggableInfo);
        containerBoxChanged = !!dragResult.containerBoxChanged || false;
        dragResult.containerBoxChanged = false;
    });
    if (containerBoxChanged) {
        containerBoxChanged = false;
        requestAnimationFrame(function () {
            containers.forEach(function (p) {
                p.layout.invalidateRects();
                p.onTranslated();
            });
        });
    }
}
function dragHandler(dragListeningContainers) {
    var targetContainers = dragListeningContainers;
    var animationFrame = null;
    return function (draggableInfo) {
        if (animationFrame === null && isDragging && !dropAnimationStarted) {
            animationFrame = requestAnimationFrame(function () {
                if (isDragging && !dropAnimationStarted) {
                    handleDragImmediate(draggableInfo, targetContainers);
                    handleScroll({ draggableInfo: draggableInfo });
                }
                animationFrame = null;
            });
            return true;
        }
        return false;
    };
}
function getScrollHandler(container, dragListeningContainers) {
    if (container.getOptions().autoScrollEnabled) {
        return dragScroller(dragListeningContainers, container.getScrollMaxSpeed(), container.getOptions().stopOverlappingAnimator);
    }
    else {
        return function (props) { return null; };
    }
}
function fireOnDragStartEnd(isStart) {
    containers.forEach(function (p) {
        var fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;
        if (fn) {
            var options = {
                isSource: p === draggableInfo.container,
                payload: draggableInfo.payload,
            };
            if (p.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
                options.willAcceptDrop = true;
            }
            else {
                options.willAcceptDrop = false;
            }
            fn(options);
        }
    });
}
function initiateDrag(position, cursor) {
    if (grabbedElement !== null) {
        isDragging = true;
        var container_1 = (containers.filter(function (p) { return grabbedElement.parentElement === p.element; })[0]);
        container_1.setDraggables();
        sourceContainerLockAxis = container_1.getOptions().lockAxis ? container_1.getOptions().lockAxis.toLowerCase() : null;
        draggableInfo = getDraggableInfo(grabbedElement);
        ghostInfo = getGhostElement(grabbedElement, { x: position.clientX, y: position.clientY }, draggableInfo.container, cursor);
        draggableInfo.position = {
            x: position.clientX + ghostInfo.centerDelta.x,
            y: position.clientY + ghostInfo.centerDelta.y,
        };
        draggableInfo.mousePosition = {
            x: position.clientX,
            y: position.clientY,
        };
        dragListeningContainers = containers.filter(function (p) { return p.isDragRelevant(container_1, draggableInfo.payload); });
        draggableInfo.relevantContainers = dragListeningContainers;
        handleDrag = dragHandler(dragListeningContainers);
        if (handleScroll) {
            handleScroll({ reset: true, draggableInfo: undefined });
        }
        handleScroll = getScrollHandler(container_1, dragListeningContainers);
        dragListeningContainers.forEach(function (p) { return p.prepareDrag(p, dragListeningContainers); });
        fireOnDragStartEnd(true);
        handleDrag(draggableInfo);
        getGhostParent().appendChild(ghostInfo.ghost);
        containerRectableWatcher.start();
    }
}
var ghostAnimationFrame = null;
function translateGhost(translateDuration, scale, fadeOut) {
    if (translateDuration === void 0) { translateDuration = 0; }
    if (scale === void 0) { scale = 1; }
    if (fadeOut === void 0) { fadeOut = false; }
    var ghost = ghostInfo.ghost, _a = ghostInfo.topLeft, x = _a.x, y = _a.y;
    var useTransform = draggableInfo.container ? draggableInfo.container.shouldUseTransformForGhost() : true;
    var transformString = useTransform ? "translate3d(" + x + "px," + y + "px, 0)" : null;
    if (scale !== 1) {
        transformString = transformString ? transformString + " scale(" + scale + ")" : "scale(" + scale + ")";
    }
    if (translateDuration > 0) {
        ghostInfo.ghost.style.transitionDuration = translateDuration + 'ms';
        requestAnimationFrame(function () {
            transformString && (ghost.style.transform = transformString);
            if (!useTransform) {
                ghost.style.left = x + 'px';
                ghost.style.top = y + 'px';
            }
            ghostAnimationFrame = null;
            if (fadeOut) {
                ghost.style.opacity = '0';
            }
        });
        return;
    }
    if (ghostAnimationFrame === null) {
        ghostAnimationFrame = requestAnimationFrame(function () {
            transformString && (ghost.style.transform = transformString);
            if (!useTransform) {
                ghost.style.left = x + 'px';
                ghost.style.top = y + 'px';
            }
            ghostAnimationFrame = null;
            if (fadeOut) {
                ghost.style.opacity = '0';
            }
        });
    }
}
function registerContainer(container) {
    containers.push(container);
    if (isDragging && draggableInfo) {
        if (container.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
            dragListeningContainers.push(container);
            container.prepareDrag(container, dragListeningContainers);
            if (handleScroll) {
                handleScroll({ reset: true, draggableInfo: undefined });
            }
            handleScroll = getScrollHandler(container, dragListeningContainers);
            handleDrag = dragHandler(dragListeningContainers);
            container.handleDrag(draggableInfo);
        }
    }
}
function unregisterContainer(container) {
    containers.splice(containers.indexOf(container), 1);
    if (isDragging && draggableInfo) {
        if (draggableInfo.container === container) {
            container.fireRemoveElement();
        }
        if (draggableInfo.targetElement === container.element) {
            draggableInfo.targetElement = null;
        }
        var indexInDragListeners = dragListeningContainers.indexOf(container);
        if (indexInDragListeners > -1) {
            dragListeningContainers.splice(indexInDragListeners, 1);
            if (handleScroll) {
                handleScroll({ reset: true, draggableInfo: undefined });
            }
            handleScroll = getScrollHandler(container, dragListeningContainers);
            handleDrag = dragHandler(dragListeningContainers);
        }
    }
}
function watchRectangles() {
    var animationHandle = null;
    var isStarted = false;
    function _start() {
        animationHandle = requestAnimationFrame(function () {
            dragListeningContainers.forEach(function (p) { return p.layout.invalidateRects(); });
            setTimeout(function () {
                if (animationHandle !== null)
                    _start();
            }, 50);
        });
    }
    function stop() {
        if (animationHandle !== null) {
            cancelAnimationFrame(animationHandle);
            animationHandle = null;
        }
        isStarted = false;
    }
    return {
        start: function () {
            if (!isStarted) {
                isStarted = true;
                _start();
            }
        },
        stop: stop
    };
}
function cancelDrag() {
    if (isDragging && !isCanceling && !dropAnimationStarted) {
        isCanceling = true;
        missedDrag = false;
        var outOfBoundsDraggableInfo_1 = Object.assign({}, draggableInfo, {
            targetElement: null,
            position: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
            mousePosition: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
        });
        dragListeningContainers.forEach(function (container) {
            container.handleDrag(outOfBoundsDraggableInfo_1);
        });
        draggableInfo.targetElement = null;
        draggableInfo.cancelDrop = true;
        onMouseUp();
        isCanceling = false;
    }
}
function Mediator() {
    listenEvents();
    return {
        register: function (container) {
            registerContainer(container);
        },
        unregister: function (container) {
            unregisterContainer(container);
        },
        isDragging: function () {
            return isDragging;
        },
        cancelDrag: cancelDrag,
    };
}
if (typeof window !== 'undefined') {
    addStyleToHead();
}
export default Mediator();
//# sourceMappingURL=mediator.js.map