import * as constants from './src/constants';
import container from './src/container';
import * as dropHandlers from './src/dropHandlers';
export { container as smoothDnD, constants, dropHandlers, };
function delegateProperty(from, to, propName) {
    Object.defineProperty(from, propName, {
        set: function (val) {
            to[propName] = val;
        },
        get: function () { return to[propName]; }
    });
}
var deprecetedDefaultExport = function (element, options) {
    console.warn('default export is deprecated. please use named export "smoothDnD"');
    return container(element, options);
};
deprecetedDefaultExport.cancelDrag = function () {
    container.cancelDrag();
};
deprecetedDefaultExport.isDragging = function () {
    return container.isDragging();
};
delegateProperty(deprecetedDefaultExport, container, 'useTransformForGhost');
delegateProperty(deprecetedDefaultExport, container, 'maxScrollSpeed');
delegateProperty(deprecetedDefaultExport, container, 'wrapChild');
delegateProperty(deprecetedDefaultExport, container, 'dropHandler');
export default deprecetedDefaultExport;
//# sourceMappingURL=index.js.map