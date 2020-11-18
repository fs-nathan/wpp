import { containerClass, disbaleTouchActions, dropPlaceholderFlexContainerClass, dropPlaceholderInnerClass, dropPlaceholderWrapperClass, ghostClass, noUserSelectClass, stretcherElementClass, wrapperClass, dropPlaceholderDefaultClass } from './constants';
var _a;
var verticalWrapperClass = {
    'overflow': 'hidden',
    'display': 'block'
};
var horizontalWrapperClass = {
    'height': '100%',
    'display': 'table-cell',
    'vertical-align': 'top',
};
var stretcherElementHorizontalClass = {
    'display': 'inline-block'
};
var css = (_a = {},
    _a["." + containerClass] = {
        'position': 'relative',
        'min-height': '30px',
        'min-width': '30px'
    },
    _a["." + containerClass + ".horizontal"] = {
        'display': 'table',
    },
    _a["." + containerClass + ".horizontal > ." + stretcherElementClass] = stretcherElementHorizontalClass,
    _a["." + containerClass + ".horizontal > ." + wrapperClass] = horizontalWrapperClass,
    _a["." + containerClass + ".vertical > ." + wrapperClass] = verticalWrapperClass,
    _a["." + wrapperClass] = {
        'box-sizing': 'border-box'
    },
    _a["." + wrapperClass + ".horizontal"] = horizontalWrapperClass,
    _a["." + wrapperClass + ".vertical"] = verticalWrapperClass,
    _a["." + wrapperClass + ".animated"] = {
        'transition': 'transform ease',
    },
    _a["." + ghostClass] = {
        'box-sizing': 'border-box',
    },
    _a["." + ghostClass + ".animated"] = {
        'transition': 'all ease-in-out'
    },
    _a["." + ghostClass + " *"] = {
        'pointer-events': 'none'
    },
    _a["." + disbaleTouchActions + " *"] = {
        'touch-action': 'none',
        '-ms-touch-action': 'none'
    },
    _a["." + noUserSelectClass] = {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
    },
    _a["." + dropPlaceholderInnerClass] = {
        'flex': '1'
    },
    _a["." + containerClass + ".horizontal > ." + dropPlaceholderWrapperClass] = {
        'height': '100%',
        'overflow': 'hidden',
        'display': 'table-cell',
        'vertical-align': 'top',
    },
    _a["." + containerClass + ".vertical > ." + dropPlaceholderWrapperClass] = {
        'overflow': 'hidden',
        'display': 'block',
        'width': '100%',
    },
    _a["." + dropPlaceholderFlexContainerClass] = {
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'justify-content': 'stretch',
        'align-items': 'stretch'
    },
    _a["." + dropPlaceholderDefaultClass] = {
        'background-color': 'rgba(150, 150, 150, 0.1)',
        'border': '1px solid #ccc',
    },
    _a);
function convertToCssString(css) {
    return Object.keys(css).reduce(function (styleString, propName) {
        var propValue = css[propName];
        if (typeof (propValue) === 'object') {
            return "" + styleString + propName + "{" + convertToCssString(propValue) + "}";
        }
        return "" + styleString + propName + ":" + propValue + ";";
    }, '');
}
function addStyleToHead() {
    if (typeof (window) !== 'undefined') {
        var head = window.document.head || window.document.getElementsByTagName("head")[0];
        var style = window.document.createElement("style");
        style.id = 'smooth-dnd-style-definitions';
        var cssString = convertToCssString(css);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = cssString;
        }
        else {
            style.appendChild(window.document.createTextNode(cssString));
        }
        head.appendChild(style);
    }
}
function addCursorStyleToBody(cursor) {
    if (cursor && typeof (window) !== 'undefined') {
        var head = window.document.head || window.document.getElementsByTagName("head")[0];
        var style = window.document.createElement("style");
        var cssString = convertToCssString({
            'body *': {
                cursor: cursor + " !important"
            }
        });
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = cssString;
        }
        else {
            style.appendChild(window.document.createTextNode(cssString));
        }
        head.appendChild(style);
        return style;
    }
    return null;
}
function removeStyle(styleElement) {
    if (styleElement && typeof (window) !== 'undefined') {
        var head = window.document.head || window.document.getElementsByTagName("head")[0];
        head.removeChild(styleElement);
    }
}
export { addStyleToHead, addCursorStyleToBody, removeStyle };
//# sourceMappingURL=styles.js.map