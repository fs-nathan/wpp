import { ScrollAxis } from "./interfaces";
import { getScrollingAxis, hasClass, getVisibleRect } from "./utils";
import { preventAutoScrollClass } from "./constants";
var maxSpeed = 1500; // px/s
function getScrollParams(position, axis, rect) {
    var left = rect.left, right = rect.right, top = rect.top, bottom = rect.bottom;
    var x = position.x, y = position.y;
    if (x < left || x > right || y < top || y > bottom) {
        return null;
    }
    var begin;
    var end;
    var pos;
    if (axis === 'x') {
        begin = left;
        end = right;
        pos = x;
    }
    else {
        begin = top;
        end = bottom;
        pos = y;
    }
    var scrollerSize = end - begin;
    var moveDistance = scrollerSize > 400 ? 100 : scrollerSize / 4;
    if (end - pos < moveDistance) {
        return {
            direction: 'end',
            speedFactor: (moveDistance - (end - pos)) / moveDistance
        };
    }
    else if (pos - begin < moveDistance) {
        return {
            direction: 'begin',
            speedFactor: (moveDistance - (pos - begin)) / moveDistance
        };
    }
    return null;
}
function addScrollValue(element, axis, value) {
    if (element) {
        if (element !== window) {
            if (axis === 'x') {
                element.scrollLeft += value;
            }
            else {
                element.scrollTop += value;
            }
        }
        else {
            if (axis === 'x') {
                element.scrollBy(value, 0);
            }
            else {
                element.scrollBy(0, value);
            }
        }
    }
}
var createAnimator = function (element, axis) {
    if (axis === void 0) { axis = 'y'; }
    var request = null;
    var startTime = null;
    var direction = null;
    var speed = null;
    function animate(_direction, _speed) {
        direction = _direction;
        speed = _speed;
        start();
    }
    function start() {
        if (request === null) {
            request = requestAnimationFrame(function (timestamp) {
                if (startTime === null) {
                    startTime = timestamp;
                }
                var timeDiff = timestamp - startTime;
                startTime = timestamp;
                var distanceDiff = (timeDiff / 1000) * speed;
                distanceDiff = direction === 'begin' ? (0 - distanceDiff) : distanceDiff;
                addScrollValue(element, axis, distanceDiff);
                request = null;
                start();
            });
        }
    }
    function stop() {
        if (request !== null) {
            cancelAnimationFrame(request);
            request = null;
        }
        startTime = null;
    }
    return {
        animate: animate,
        stop: stop
    };
};
function rectangleGetter(element) {
    return function () {
        return getVisibleRect(element, element.getBoundingClientRect());
    };
}
function getScrollerAnimator(container) {
    var scrollerAnimators = [];
    var current = container.element;
    while (current) {
        var scrollingAxis = getScrollingAxis(current);
        if (scrollingAxis && !hasClass(current, preventAutoScrollClass)) {
            var axisAnimations = {};
            switch (scrollingAxis) {
                case ScrollAxis.xy:
                    {
                        axisAnimations.x = {
                            animator: createAnimator(current, 'x'),
                        };
                        axisAnimations.y = {
                            animator: createAnimator(current, 'y'),
                        };
                    }
                    break;
                case ScrollAxis.x:
                    {
                        axisAnimations.x = {
                            animator: createAnimator(current, 'x'),
                        };
                    }
                    break;
                case ScrollAxis.y:
                    {
                        axisAnimations.y = {
                            animator: createAnimator(current, 'y'),
                        };
                    }
                    break;
                default:
            }
            scrollerAnimators.push({
                axisAnimations: axisAnimations,
                getRect: rectangleGetter(current),
                scrollerElement: current,
            });
        }
        current = current.parentElement;
    }
    return scrollerAnimators;
}
function setScrollParams(animatorInfos, position) {
    animatorInfos.forEach(function (animator) {
        var axisAnimations = animator.axisAnimations, getRect = animator.getRect;
        var rect = getRect();
        if (axisAnimations.x) {
            axisAnimations.x.scrollParams = getScrollParams(position, 'x', rect);
            animator.cachedRect = rect;
        }
        if (axisAnimations.y) {
            axisAnimations.y.scrollParams = getScrollParams(position, 'y', rect);
            animator.cachedRect = rect;
        }
    });
}
function getTopmostScrollAnimator(animatorInfos, position) {
    var current = document.elementFromPoint(position.x, position.y);
    while (current) {
        var scrollAnimator = animatorInfos.find(function (p) { return p.scrollerElement === current; });
        if (scrollAnimator) {
            return scrollAnimator;
        }
        current = current.parentElement;
    }
    return null;
}
export default (function (containers, maxScrollSpeed, stopOverlappingAnimator) {
    if (maxScrollSpeed === void 0) { maxScrollSpeed = maxSpeed; }
    if (stopOverlappingAnimator === void 0) { stopOverlappingAnimator = true; }
    var animatorInfos = containers.reduce(function (acc, container) {
        var filteredAnimators = getScrollerAnimator(container).filter(function (p) {
            return !acc.find(function (q) { return q.scrollerElement === p.scrollerElement; });
        });
        return acc.concat(filteredAnimators);
    }, []);
    return function (_a) {
        var draggableInfo = _a.draggableInfo, reset = _a.reset;
        if (reset) {
            animatorInfos.forEach(function (p) {
                p.axisAnimations.x && p.axisAnimations.x.animator.stop();
                p.axisAnimations.y && p.axisAnimations.y.animator.stop();
            });
            return;
        }
        if (draggableInfo) {
            setScrollParams(animatorInfos, draggableInfo.mousePosition);
            animatorInfos.forEach(function (animator) {
                var _a = animator.axisAnimations, x = _a.x, y = _a.y;
                if (x) {
                    if (x.scrollParams) {
                        var _b = x.scrollParams, direction = _b.direction, speedFactor = _b.speedFactor;
                        x.animator.animate(direction, speedFactor * maxScrollSpeed);
                    }
                    else {
                        x.animator.stop();
                    }
                }
                if (y) {
                    if (y.scrollParams) {
                        var _c = y.scrollParams, direction = _c.direction, speedFactor = _c.speedFactor;
                        y.animator.animate(direction, speedFactor * maxScrollSpeed);
                    }
                    else {
                        y.animator.stop();
                    }
                }
            });
            if (stopOverlappingAnimator) {
                console.log("stopped");
                var overlappingAnimators = animatorInfos.filter(function (p) { return p.cachedRect; });
                if (overlappingAnimators.length && overlappingAnimators.length > 1) {
                    // stop animations except topmost
                    var topScrollerAnimator_1 = getTopmostScrollAnimator(overlappingAnimators, draggableInfo.mousePosition);
                    if (topScrollerAnimator_1) {
                        overlappingAnimators.forEach(function (p) {
                            if (p !== topScrollerAnimator_1) {
                                p.axisAnimations.x && p.axisAnimations.x.animator.stop();
                                p.axisAnimations.y && p.axisAnimations.y.animator.stop();
                            }
                        });
                    }
                }
            }
            else {
                console.log("passed");
            }
        }
    };
});
//# sourceMappingURL=scroller.js.map