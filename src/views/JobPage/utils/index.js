import { get, isFunction, merge, template } from "lodash";

const loginlineParams = param => {
  console.trace("param", param);
  return param;
};
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

function loginlineFunc(fn, prefix) {
  return (...args) => {
    const argsName = getParamNames(fn);
    const fnName = prefix ? `${prefix}.${fn.name}` : fn.name;
    console.group([fnName]);
    console.log(`argsName`, argsName);
    console.log("args", args);
    const result = fn(...args);
    console.log("result", result);
    console.groupEnd();
    if (!window.testcase) {
      window.testcase = {};
    }
    if (!window.testcase[fnName]) {
      window.testcase[fnName] = [];
    }
    window.testcase[fnName].push({
      fn,
      argsName,
      args,
      result
    });
    return result;
  };
}

const createMapPropsFromAttrs = (strings = []) => (data = {}) => {
  return strings.map(string => get(data, string));
};

export {
  get,
  isFunction,
  merge,
  template,
  loginlineParams,
  loginlineFunc,
  createMapPropsFromAttrs
};
