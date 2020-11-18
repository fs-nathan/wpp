import { addChildAt, removeChildAt } from './utils';
import { wrapperClass, } from './constants';
export function domDropHandler(_a) {
    var element = _a.element, draggables = _a.draggables;
    return function (dropResult, onDrop) {
        var _a = dropResult, removedIndex = _a.removedIndex, addedIndex = _a.addedIndex, droppedElement = _a.droppedElement;
        var removedWrapper = null;
        if (removedIndex !== null) {
            removedWrapper = removeChildAt(element, removedIndex);
            draggables.splice(removedIndex, 1);
        }
        if (addedIndex !== null) {
            var wrapper = window.document.createElement('div');
            wrapper.className = "" + wrapperClass;
            wrapper.appendChild(removedWrapper && removedWrapper.firstElementChild ? removedWrapper.firstElementChild : droppedElement);
            addChildAt(element, wrapper, addedIndex);
            if (addedIndex >= draggables.length) {
                draggables.push(wrapper);
            }
            else {
                draggables.splice(addedIndex, 0, wrapper);
            }
        }
        if (onDrop) {
            onDrop(dropResult);
        }
    };
}
export function reactDropHandler() {
    var handler = function () {
        return function (dropResult, onDrop) {
            if (onDrop) {
                onDrop(dropResult);
            }
        };
    };
    return {
        handler: handler
    };
}
//# sourceMappingURL=dropHandlers.js.map