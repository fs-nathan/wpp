import { animationClass, containerClass, containerInstance, dropPlaceholderFlexContainerClass, dropPlaceholderInnerClass, dropPlaceholderWrapperClass, stretcherElementClass, stretcherElementInstance, translationValue, wrapperClass, dropPlaceholderDefaultClass } from './constants';
import { defaultOptions } from './defaults';
import { domDropHandler } from './dropHandlers';
import layoutManager from './layoutManager';
import Mediator from './mediator';
import { addClass, getParent, getParentRelevantContainerElement, hasClass, listenScrollParent, removeClass } from './utils';
function setAnimation(element, add, animationDuration) {
    if (animationDuration === void 0) { animationDuration = defaultOptions.animationDuration; }
    if (add) {
        addClass(element, animationClass);
        element.style.transitionDuration = animationDuration + 'ms';
    }
    else {
        removeClass(element, animationClass);
        element.style.removeProperty('transition-duration');
    }
}
function isDragRelevant(_a) {
    var element = _a.element, getOptions = _a.getOptions;
    return function (sourceContainer, payload) {
        var options = getOptions();
        if (options.shouldAcceptDrop) {
            return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
        }
        var sourceOptions = sourceContainer.getOptions();
        if (options.behaviour === 'copy')
            return false;
        var parentWrapper = getParent(element, '.' + wrapperClass);
        if (parentWrapper === sourceContainer.element) {
            return false;
        }
        if (sourceContainer.element === element)
            return true;
        if (sourceOptions.groupName && sourceOptions.groupName === options.groupName)
            return true;
        return false;
    };
}
function wrapChild(child) {
    if (smoothDnD.wrapChild) {
        var div = window.document.createElement('div');
        div.className = "" + wrapperClass;
        child.parentElement.insertBefore(div, child);
        div.appendChild(child);
        return div;
    }
    return child;
}
function wrapChildren(element) {
    var draggables = [];
    Array.prototype.forEach.call(element.children, function (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            var wrapper = child;
            if (!hasClass(child, wrapperClass)) {
                wrapper = wrapChild(child);
            }
            wrapper[translationValue] = 0;
            draggables.push(wrapper);
        }
        else {
            element.removeChild(child);
        }
    });
    return draggables;
}
function unwrapChildren(element) {
    if (smoothDnD.wrapChild) {
        Array.prototype.forEach.call(element.children, function (child) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (hasClass(child, wrapperClass)) {
                    element.insertBefore(child.firstElementChild, child);
                    element.removeChild(child);
                }
            }
        });
    }
}
function findDraggebleAtPos(_a) {
    var layout = _a.layout;
    var find = function (draggables, pos, startIndex, endIndex, withRespectToMiddlePoints) {
        if (withRespectToMiddlePoints === void 0) { withRespectToMiddlePoints = false; }
        if (endIndex < startIndex) {
            return startIndex;
        }
        // binary serach draggable
        if (startIndex === endIndex) {
            var _a = layout.getBeginEnd(draggables[startIndex]), begin = _a.begin, end = _a.end;
            // mouse pos is inside draggable
            // now decide which index to return
            // if (pos > begin && pos <= end) {
            if (withRespectToMiddlePoints) {
                return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
            }
            else {
                return startIndex;
            }
            // } else {
            //   return null;
            // }
        }
        else {
            var middleIndex = Math.floor((endIndex + startIndex) / 2);
            var _b = layout.getBeginEnd(draggables[middleIndex]), begin = _b.begin, end = _b.end;
            if (pos < begin) {
                return find(draggables, pos, startIndex, middleIndex - 1, withRespectToMiddlePoints);
            }
            else if (pos > end) {
                return find(draggables, pos, middleIndex + 1, endIndex, withRespectToMiddlePoints);
            }
            else {
                if (withRespectToMiddlePoints) {
                    return pos < (end + begin) / 2 ? middleIndex : middleIndex + 1;
                }
                else {
                    return middleIndex;
                }
            }
        }
    };
    return function (draggables, pos, withRespectToMiddlePoints) {
        if (withRespectToMiddlePoints === void 0) { withRespectToMiddlePoints = false; }
        return find(draggables, pos, 0, draggables.length - 1, withRespectToMiddlePoints);
    };
}
function resetDraggables(_a) {
    var element = _a.element, draggables = _a.draggables, layout = _a.layout;
    return function () {
        draggables.forEach(function (p) {
            setAnimation(p, false);
            layout.setTranslation(p, 0);
            layout.setVisibility(p, true);
        });
        if (element[stretcherElementInstance]) {
            element[stretcherElementInstance].parentNode.removeChild(element[stretcherElementInstance]);
            element[stretcherElementInstance] = null;
        }
    };
}
function setTargetContainer(draggableInfo, element, set) {
    if (set === void 0) { set = true; }
    if (element && set) {
        draggableInfo.targetElement = element;
    }
    else {
        if (draggableInfo.targetElement === element) {
            draggableInfo.targetElement = null;
        }
    }
}
function handleDrop(_a) {
    var element = _a.element, draggables = _a.draggables, layout = _a.layout, getOptions = _a.getOptions;
    var draggablesReset = resetDraggables({ element: element, draggables: draggables, layout: layout, getOptions: getOptions });
    var dropHandler = (smoothDnD.dropHandler || domDropHandler)({ element: element, draggables: draggables, layout: layout, getOptions: getOptions });
    return function (draggableInfo, _a, forDispose) {
        var addedIndex = _a.addedIndex, removedIndex = _a.removedIndex;
        if (forDispose === void 0) { forDispose = false; }
        draggablesReset();
        // if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()
        if (!draggableInfo.cancelDrop) {
            if (draggableInfo.targetElement || getOptions().removeOnDropOut || forDispose) {
                var actualAddIndex = addedIndex !== null ? (removedIndex !== null && removedIndex < addedIndex ? addedIndex - 1 : addedIndex) : null;
                var dropHandlerParams = {
                    removedIndex: removedIndex,
                    addedIndex: actualAddIndex,
                    payload: draggableInfo.payload,
                };
                dropHandler(dropHandlerParams, getOptions().onDrop);
            }
        }
    };
}
function getContainerProps(element, getOptions) {
    var draggables = wrapChildren(element);
    var options = getOptions();
    // set flex classes before layout is inited for scroll listener
    addClass(element, containerClass + " " + options.orientation);
    var layout = layoutManager(element, options.orientation, options.animationDuration);
    return {
        element: element,
        draggables: draggables,
        getOptions: getOptions,
        layout: layout,
    };
}
function getRemovedItem(_a) {
    var element = _a.element, getOptions = _a.getOptions;
    var prevRemovedIndex = null;
    return function (_a) {
        var draggableInfo = _a.draggableInfo;
        var removedIndex = prevRemovedIndex;
        if (prevRemovedIndex == null && draggableInfo.container.element === element && getOptions().behaviour !== 'copy') {
            removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
        }
        return { removedIndex: removedIndex };
    };
}
function setRemovedItemVisibilty(_a) {
    var draggables = _a.draggables, layout = _a.layout;
    return function (_a) {
        var dragResult = _a.dragResult;
        if (dragResult.removedIndex !== null) {
            layout.setVisibility(draggables[dragResult.removedIndex], false);
        }
    };
}
function getPosition(_a) {
    var element = _a.element, layout = _a.layout;
    return function (_a) {
        var draggableInfo = _a.draggableInfo;
        var hitElement = document.elementFromPoint(draggableInfo.position.x, draggableInfo.position.y);
        // TODO: if center is out of bounds use mouse position for hittest
        // if (!hitElement) {
        //   hitElement = document.elementFromPoint(draggableInfo.mousePosition.x, draggableInfo.mousePosition.y);
        // }
        if (hitElement) {
            var container = getParentRelevantContainerElement(hitElement, draggableInfo.relevantContainers);
            if (container && container.element === element) {
                return {
                    pos: layout.getPosition(draggableInfo.position),
                };
            }
        }
        return {
            pos: null,
        };
    };
}
function getElementSize(_a) {
    var layout = _a.layout;
    var elementSize = null;
    return function (_a) {
        var draggableInfo = _a.draggableInfo, dragResult = _a.dragResult;
        if (dragResult.pos === null) {
            return (elementSize = null);
        }
        else {
            elementSize = elementSize || layout.getSize(draggableInfo.size);
        }
        return { elementSize: elementSize };
    };
}
function handleTargetContainer(_a) {
    var element = _a.element;
    return function (_a) {
        var draggableInfo = _a.draggableInfo, dragResult = _a.dragResult;
        setTargetContainer(draggableInfo, element, !!dragResult.pos);
    };
}
function getDragInsertionIndex(_a) {
    var draggables = _a.draggables, layout = _a.layout;
    var findDraggable = findDraggebleAtPos({ layout: layout });
    return function (_a) {
        var _b = _a.dragResult, shadowBeginEnd = _b.shadowBeginEnd, pos = _b.pos;
        if (!shadowBeginEnd) {
            var index = findDraggable(draggables, pos, true);
            return index !== null ? index : draggables.length;
        }
        else {
            if (shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos && shadowBeginEnd.end >= pos) {
                // position inside ghost
                return null;
            }
        }
        if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
            return findDraggable(draggables, pos);
        }
        else if (pos > shadowBeginEnd.end) {
            return findDraggable(draggables, pos) + 1;
        }
        else {
            return draggables.length;
        }
    };
}
function getDragInsertionIndexForDropZone() {
    return function (_a) {
        var pos = _a.dragResult.pos;
        return pos !== null ? { addedIndex: 0 } : { addedIndex: null };
    };
}
function getShadowBeginEndForDropZone(_a) {
    var layout = _a.layout;
    var prevAddedIndex = null;
    return function (_a) {
        var addedIndex = _a.dragResult.addedIndex;
        if (addedIndex !== prevAddedIndex) {
            prevAddedIndex = addedIndex;
            var _b = layout.getBeginEndOfContainer(), begin = _b.begin, end = _b.end;
            return {
                shadowBeginEnd: {
                    rect: layout.getTopLeftOfElementBegin(begin),
                },
            };
        }
        return null;
    };
}
function drawDropPlaceholder(_a) {
    var layout = _a.layout, element = _a.element, getOptions = _a.getOptions;
    var prevAddedIndex = null;
    return function (_a) {
        var _b = _a.dragResult, elementSize = _b.elementSize, shadowBeginEnd = _b.shadowBeginEnd, addedIndex = _b.addedIndex, dropPlaceholderContainer = _b.dropPlaceholderContainer;
        var options = getOptions();
        if (options.dropPlaceholder) {
            var _c = typeof options.dropPlaceholder === 'boolean' ? {} : options.dropPlaceholder, animationDuration = _c.animationDuration, className = _c.className, showOnTop = _c.showOnTop;
            if (addedIndex !== null) {
                if (!dropPlaceholderContainer) {
                    var innerElement = document.createElement('div');
                    var flex = document.createElement('div');
                    flex.className = dropPlaceholderFlexContainerClass;
                    innerElement.className = dropPlaceholderInnerClass + " " + (className || dropPlaceholderDefaultClass);
                    dropPlaceholderContainer = document.createElement('div');
                    dropPlaceholderContainer.className = "" + dropPlaceholderWrapperClass;
                    dropPlaceholderContainer.style.position = 'absolute';
                    if (animationDuration !== undefined) {
                        dropPlaceholderContainer.style.transition = "all " + animationDuration + "ms ease";
                    }
                    dropPlaceholderContainer.appendChild(flex);
                    flex.appendChild(innerElement);
                    layout.setSize(dropPlaceholderContainer.style, elementSize + 'px');
                    dropPlaceholderContainer.style.pointerEvents = 'none';
                    if (showOnTop) {
                        element.appendChild(dropPlaceholderContainer);
                    }
                    else {
                        element.insertBefore(dropPlaceholderContainer, element.firstElementChild);
                    }
                }
                if (prevAddedIndex !== addedIndex && shadowBeginEnd.dropArea) {
                    layout.setBegin(dropPlaceholderContainer.style, (shadowBeginEnd.dropArea.begin) - layout.getBeginEndOfContainer().begin + 'px');
                }
                prevAddedIndex = addedIndex;
                return {
                    dropPlaceholderContainer: dropPlaceholderContainer
                };
            }
            else {
                if (dropPlaceholderContainer && prevAddedIndex !== null) {
                    element.removeChild(dropPlaceholderContainer);
                }
                prevAddedIndex = null;
                return {
                    dropPlaceholderContainer: undefined
                };
            }
        }
        return null;
    };
}
function invalidateShadowBeginEndIfNeeded(params) {
    var shadowBoundsGetter = getShadowBeginEnd(params);
    return function (_a) {
        var draggableInfo = _a.draggableInfo, dragResult = _a.dragResult;
        if (draggableInfo.invalidateShadow) {
            return shadowBoundsGetter({ draggableInfo: draggableInfo, dragResult: dragResult });
        }
        return null;
    };
}
function getNextAddedIndex(params) {
    var getIndexForPos = getDragInsertionIndex(params);
    return function (_a) {
        var dragResult = _a.dragResult;
        var index = null;
        if (dragResult.pos !== null) {
            index = getIndexForPos({ dragResult: dragResult });
            if (index === null) {
                index = dragResult.addedIndex;
            }
        }
        return {
            addedIndex: index,
        };
    };
}
function resetShadowAdjustment() {
    var lastAddedIndex = null;
    return function (_a) {
        var _b = _a.dragResult, addedIndex = _b.addedIndex, shadowBeginEnd = _b.shadowBeginEnd;
        if (addedIndex !== lastAddedIndex && lastAddedIndex !== null && shadowBeginEnd) {
            shadowBeginEnd.beginAdjustment = 0;
        }
        lastAddedIndex = addedIndex;
    };
}
function handleInsertionSizeChange(_a) {
    var element = _a.element, draggables = _a.draggables, layout = _a.layout, getOptions = _a.getOptions;
    var strectherElement = null;
    return function (_a) {
        var _b = _a.dragResult, addedIndex = _b.addedIndex, removedIndex = _b.removedIndex, elementSize = _b.elementSize;
        if (removedIndex === null) {
            if (addedIndex !== null) {
                if (!strectherElement) {
                    var containerBeginEnd = layout.getBeginEndOfContainer();
                    containerBeginEnd.end = containerBeginEnd.begin + layout.getSize(element);
                    var hasScrollBar = layout.getScrollSize(element) > layout.getSize(element);
                    var containerEnd = hasScrollBar
                        ? containerBeginEnd.begin + layout.getScrollSize(element) - layout.getScrollValue(element)
                        : containerBeginEnd.end;
                    var lastDraggableEnd = draggables.length > 0
                        ? layout.getBeginEnd(draggables[draggables.length - 1]).end - draggables[draggables.length - 1][translationValue]
                        : containerBeginEnd.begin;
                    if (lastDraggableEnd + elementSize > containerEnd) {
                        strectherElement = window.document.createElement('div');
                        strectherElement.className = stretcherElementClass + ' ' + getOptions().orientation;
                        var stretcherSize = draggables.length > 0 ? elementSize + lastDraggableEnd - containerEnd : elementSize;
                        layout.setSize(strectherElement.style, stretcherSize + "px");
                        element.appendChild(strectherElement);
                        element[stretcherElementInstance] = strectherElement;
                        return {
                            containerBoxChanged: true,
                        };
                    }
                }
            }
            else {
                if (strectherElement) {
                    layout.setTranslation(strectherElement, 0);
                    var toRemove = strectherElement;
                    strectherElement = null;
                    element.removeChild(toRemove);
                    element[stretcherElementInstance] = null;
                    return {
                        containerBoxChanged: true,
                    };
                }
            }
        }
        return undefined;
    };
}
function calculateTranslations(_a) {
    var draggables = _a.draggables, layout = _a.layout;
    var prevAddedIndex = null;
    var prevRemovedIndex = null;
    return function (_a) {
        var _b = _a.dragResult, addedIndex = _b.addedIndex, removedIndex = _b.removedIndex, elementSize = _b.elementSize;
        if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
            for (var index = 0; index < draggables.length; index++) {
                if (index !== removedIndex) {
                    var draggable = draggables[index];
                    var translate = 0;
                    if (removedIndex !== null && removedIndex < index) {
                        translate -= elementSize;
                    }
                    if (addedIndex !== null && addedIndex <= index) {
                        translate += elementSize;
                    }
                    layout.setTranslation(draggable, translate);
                }
            }
            prevAddedIndex = addedIndex;
            prevRemovedIndex = removedIndex;
            return { addedIndex: addedIndex, removedIndex: removedIndex };
        }
        return undefined;
    };
}
function getShadowBeginEnd(_a) {
    var draggables = _a.draggables, layout = _a.layout;
    var prevAddedIndex = null;
    return function (_a) {
        var draggableInfo = _a.draggableInfo, dragResult = _a.dragResult;
        var addedIndex = dragResult.addedIndex, removedIndex = dragResult.removedIndex, elementSize = dragResult.elementSize, pos = dragResult.pos, shadowBeginEnd = dragResult.shadowBeginEnd;
        if (pos !== null) {
            if (addedIndex !== null && (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)) {
                // if (prevAddedIndex) prevAddedIndex = addedIndex;
                var beforeIndex = addedIndex - 1;
                var begin = Number.MIN_SAFE_INTEGER;
                var dropAreaBegin = 0;
                var dropAreaEnd = 0;
                var afterBounds = null;
                var beforeBounds = null;
                if (beforeIndex === removedIndex) {
                    beforeIndex--;
                }
                if (beforeIndex > -1) {
                    var beforeSize = layout.getSize(draggables[beforeIndex]);
                    beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
                    if (elementSize < beforeSize) {
                        var threshold = (beforeSize - elementSize) / 2;
                        begin = beforeBounds.end - threshold;
                    }
                    else {
                        begin = beforeBounds.end;
                    }
                    dropAreaBegin = beforeBounds.end;
                }
                else {
                    beforeBounds = { end: layout.getBeginEndOfContainer().begin };
                    dropAreaBegin = layout.getBeginEndOfContainer().begin;
                }
                var end = Number.MAX_SAFE_INTEGER;
                var afterIndex = addedIndex;
                if (afterIndex === removedIndex) {
                    afterIndex++;
                }
                if (afterIndex < draggables.length) {
                    var afterSize = layout.getSize(draggables[afterIndex]);
                    afterBounds = layout.getBeginEnd(draggables[afterIndex]);
                    if (elementSize < afterSize) {
                        var threshold = (afterSize - elementSize) / 2;
                        end = afterBounds.begin + threshold;
                    }
                    else {
                        end = afterBounds.begin;
                    }
                    dropAreaEnd = afterBounds.begin;
                }
                else {
                    afterBounds = { begin: layout.getContainerRectangles().rect.end };
                    dropAreaEnd = layout.getContainerRectangles().rect.end - layout.getContainerRectangles().rect.begin;
                }
                var shadowRectTopLeft = beforeBounds && afterBounds ? layout.getTopLeftOfElementBegin(beforeBounds.end) : null;
                prevAddedIndex = addedIndex;
                return {
                    shadowBeginEnd: {
                        dropArea: {
                            begin: dropAreaBegin,
                            end: dropAreaEnd,
                        },
                        begin: begin,
                        end: end,
                        rect: shadowRectTopLeft,
                        beginAdjustment: shadowBeginEnd ? shadowBeginEnd.beginAdjustment : 0,
                    },
                };
            }
            else {
                return null;
            }
        }
        else {
            prevAddedIndex = null;
            return {
                shadowBeginEnd: null,
            };
        }
    };
}
function handleFirstInsertShadowAdjustment() {
    var lastAddedIndex = null;
    return function (_a) {
        var _b = _a.dragResult, pos = _b.pos, addedIndex = _b.addedIndex, shadowBeginEnd = _b.shadowBeginEnd;
        if (pos !== null) {
            if (addedIndex != null && lastAddedIndex === null) {
                if (pos < shadowBeginEnd.begin) {
                    var beginAdjustment = pos - shadowBeginEnd.begin - 5;
                    shadowBeginEnd.beginAdjustment = beginAdjustment;
                }
                lastAddedIndex = addedIndex;
            }
        }
        else {
            lastAddedIndex = null;
        }
    };
}
function fireDragEnterLeaveEvents(_a) {
    var getOptions = _a.getOptions;
    var wasDragIn = false;
    var options = getOptions();
    return function (_a) {
        var pos = _a.dragResult.pos;
        var isDragIn = !!pos;
        if (isDragIn !== wasDragIn) {
            wasDragIn = isDragIn;
            if (isDragIn) {
                options.onDragEnter && options.onDragEnter();
            }
            else {
                options.onDragLeave && options.onDragLeave();
            }
        }
        return undefined;
    };
}
function fireOnDropReady(_a) {
    var getOptions = _a.getOptions;
    var lastAddedIndex = null;
    var options = getOptions();
    return function (_a) {
        var _b = _a.dragResult, addedIndex = _b.addedIndex, removedIndex = _b.removedIndex, _c = _a.draggableInfo, payload = _c.payload, element = _c.element;
        if (options.onDropReady && addedIndex !== null && lastAddedIndex !== addedIndex) {
            lastAddedIndex = addedIndex;
            var adjustedAddedIndex = addedIndex;
            if (removedIndex !== null && addedIndex > removedIndex) {
                adjustedAddedIndex--;
            }
            options.onDropReady({
                addedIndex: adjustedAddedIndex,
                removedIndex: removedIndex,
                payload: payload,
                element: element ? element.firstElementChild : undefined,
            });
        }
    };
}
function getDragHandler(params) {
    if (params.getOptions().behaviour === 'drop-zone') {
        // sorting is disabled in container, addedIndex will always be 0 if dropped in
        return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, getElementSize, handleTargetContainer, getDragInsertionIndexForDropZone, getShadowBeginEndForDropZone, fireDragEnterLeaveEvents, fireOnDropReady);
    }
    else {
        return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, getElementSize, handleTargetContainer, invalidateShadowBeginEndIfNeeded, getNextAddedIndex, resetShadowAdjustment, handleInsertionSizeChange, calculateTranslations, getShadowBeginEnd, drawDropPlaceholder, handleFirstInsertShadowAdjustment, fireDragEnterLeaveEvents, fireOnDropReady);
    }
}
function getDefaultDragResult() {
    return {
        addedIndex: null,
        removedIndex: null,
        elementSize: null,
        pos: null,
        shadowBeginEnd: null,
    };
}
function compose(params) {
    return function () {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        var hydratedFunctions = functions.map(function (p) { return p(params); });
        var result = null;
        return function (draggableInfo) {
            result = hydratedFunctions.reduce(function (dragResult, fn) {
                return Object.assign(dragResult, fn({ draggableInfo: draggableInfo, dragResult: dragResult }));
            }, result || getDefaultDragResult());
            return result;
        };
    };
}
// Container definition begin
function Container(element) {
    return function (options) {
        var containerOptions = Object.assign({}, defaultOptions, options);
        var dragResult = null;
        var lastDraggableInfo = null;
        var props = getContainerProps(element, getOptions);
        var dragHandler = getDragHandler(props);
        var dropHandler = handleDrop(props);
        var scrollListener = listenScrollParent(element, onScroll);
        function processLastDraggableInfo() {
            if (lastDraggableInfo !== null) {
                lastDraggableInfo.invalidateShadow = true;
                dragResult = dragHandler(lastDraggableInfo);
                lastDraggableInfo.invalidateShadow = false;
            }
        }
        function setDraggables(draggables, element) {
            var newDraggables = wrapChildren(element);
            for (var i = 0; i < newDraggables.length; i++) {
                draggables[i] = newDraggables[i];
            }
            for (var i = 0; i < draggables.length - newDraggables.length; i++) {
                draggables.pop();
            }
        }
        function prepareDrag(container, relevantContainers) {
            var element = container.element;
            var draggables = props.draggables;
            setDraggables(draggables, element);
            container.layout.invalidateRects();
            draggables.forEach(function (p) { return setAnimation(p, true, getOptions().animationDuration); });
            scrollListener.start();
        }
        function onScroll() {
            props.layout.invalidateRects();
            processLastDraggableInfo();
        }
        ;
        function dispose(container) {
            scrollListener.dispose();
            unwrapChildren(container.element);
        }
        function setOptions(options, merge) {
            if (merge === void 0) { merge = true; }
            if (merge === false) {
                containerOptions = Object.assign({}, defaultOptions, options);
            }
            else {
                containerOptions = Object.assign({}, defaultOptions, containerOptions, options);
            }
        }
        function getOptions() {
            return containerOptions;
        }
        var container = {
            element: element,
            draggables: props.draggables,
            isDragRelevant: isDragRelevant(props),
            layout: props.layout,
            dispose: dispose,
            prepareDrag: prepareDrag,
            handleDrag: function (draggableInfo) {
                lastDraggableInfo = draggableInfo;
                dragResult = dragHandler(draggableInfo);
                return dragResult;
            },
            handleDrop: function (draggableInfo) {
                scrollListener.stop();
                if (dragResult && dragResult.dropPlaceholderContainer) {
                    element.removeChild(dragResult.dropPlaceholderContainer);
                }
                lastDraggableInfo = null;
                dragHandler = getDragHandler(props);
                dropHandler(draggableInfo, dragResult);
                dragResult = null;
            },
            fireRemoveElement: function () {
                // will be called when container is disposed while dragging so ignore addedIndex
                dropHandler(lastDraggableInfo, Object.assign({}, dragResult, { addedIndex: null }), true);
                dragResult = null;
            },
            getDragResult: function () {
                return dragResult;
            },
            getTranslateCalculator: function (dragresult) {
                return calculateTranslations(props)(dragresult);
            },
            onTranslated: function () {
                processLastDraggableInfo();
            },
            setDraggables: function () {
                setDraggables(props.draggables, element);
            },
            getScrollMaxSpeed: function () {
                return smoothDnD.maxScrollSpeed;
            },
            shouldUseTransformForGhost: function () {
                return smoothDnD.useTransformForGhost === true;
            },
            getOptions: getOptions,
            setOptions: setOptions,
        };
        return container;
    };
}
// exported part of container
var smoothDnD = function (element, options) {
    var containerIniter = Container(element);
    var container = containerIniter(options);
    element[containerInstance] = container;
    Mediator.register(container);
    return {
        dispose: function () {
            Mediator.unregister(container);
            container.dispose(container);
        },
        setOptions: function (options, merge) {
            container.setOptions(options, merge);
        }
    };
};
// wrap all draggables by default 
// in react,vue,angular this value will be set to false
smoothDnD.wrapChild = true;
smoothDnD.cancelDrag = function () {
    Mediator.cancelDrag();
};
smoothDnD.isDragging = function () {
    return Mediator.isDragging();
};
export default smoothDnD;
//# sourceMappingURL=container.js.map