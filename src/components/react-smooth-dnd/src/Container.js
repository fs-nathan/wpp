import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { smoothDnD as container } from './smooth-dnd';
import { dropHandlers } from './smooth-dnd';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = false;
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.container = null;
        _this.containerRef = React.createRef();
        _this.getContainerOptions = _this.getContainerOptions.bind(_this);
        _this.getContainer = _this.getContainer.bind(_this);
        _this.isObjectTypePropsChanged = _this.isObjectTypePropsChanged.bind(_this);
        _this.prevContainer = null;
        return _this;
    }
    Container.prototype.componentDidMount = function () {
        this.prevContainer = this.getContainer();
        this.container = container(this.getContainer(), this.getContainerOptions());
    };
    Container.prototype.componentWillUnmount = function () {
        this.container.dispose();
        this.container = null;
    };
    Container.prototype.componentDidUpdate = function (prevProps) {
        if (this.getContainer()) {
            if (this.prevContainer && this.prevContainer !== this.getContainer()) {
                this.container.dispose();
                this.container = container(this.getContainer(), this.getContainerOptions());
                this.prevContainer = this.getContainer();
                return;
            }
            if (this.isObjectTypePropsChanged(prevProps)) {
                this.container.setOptions(this.getContainerOptions());
            }
        }
    };
    Container.prototype.isObjectTypePropsChanged = function (prevProps) {
        var _a = this.props, render = _a.render, children = _a.children, style = _a.style, containerOptions = __rest(_a, ["render", "children", "style"]);
        for (var _key in containerOptions) {
            var key = _key;
            if (containerOptions.hasOwnProperty(key)) {
                var prop = containerOptions[key];
                if (typeof prop !== 'function' && prop !== prevProps[key]) {
                    return true;
                }
            }
        }
        return false;
    };
    Container.prototype.render = function () {
        if (this.props.render) {
            return this.props.render(this.containerRef);
        }
        else {
            return (React.createElement("div", { style: this.props.style, ref: this.containerRef }, this.props.children));
        }
    };
    Container.prototype.getContainer = function () {
        return this.containerRef.current;
    };
    Container.prototype.getContainerOptions = function () {
        var _this = this;
        var obj = Object.keys(this.props).reduce(function (result, key) {
            var optionName = key;
            var prop = _this.props[optionName];
            if (typeof prop === 'function') {
                result[optionName] = function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    var _a;
                    return (_a = _this.props)[optionName].apply(_a, params);
                };
            }
            else {
                result[optionName] = prop;
            }
            return result;
        }, {});
        return obj;
    };
    Container.propTypes = {
        behaviour: PropTypes.oneOf(['move', 'copy', 'drop-zone', 'contain']),
        groupName: PropTypes.string,
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
        style: PropTypes.object,
        dragHandleSelector: PropTypes.string,
        nonDragAreaSelector: PropTypes.string,
        dragBeginDelay: PropTypes.number,
        animationDuration: PropTypes.number,
        autoScrollEnabled: PropTypes.bool,
        lockAxis: PropTypes.string,
        dragClass: PropTypes.string,
        dropClass: PropTypes.string,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        onDrop: PropTypes.func,
        getChildPayload: PropTypes.func,
        shouldAnimateDrop: PropTypes.func,
        shouldAcceptDrop: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragLeave: PropTypes.func,
        render: PropTypes.func,
        getGhostParent: PropTypes.func,
        removeOnDropOut: PropTypes.bool,
        dropPlaceholder: PropTypes.oneOfType([
            PropTypes.shape({
                className: PropTypes.string,
                animationDuration: PropTypes.number,
                showOnTop: PropTypes.bool,
            }),
            PropTypes.bool,
        ]),
        stopOverlappingAnimator: PropTypes.bool
    };
    Container.defaultProps = {
        behaviour: 'move',
        orientation: 'vertical',
        stopOverlappingAnimator: true,
    };
    return Container;
}(Component));
export default Container;
//# sourceMappingURL=Container.js.map