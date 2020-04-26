import {
  chunk,
  get,
  isFunction,
  merge,
  remove,
  template,
  uniqueId,
} from "lodash";
import { taskPriorityMap, taskStatusMap } from "../contants/attrs";
import { emptyObject } from "../contants/defaultValue";
import * as chart from "./chart";
import * as time from "./time";
const toFormData = (data = emptyObject) => {
  let form_data = new FormData();
  for (let key in data) {
    const item = data[key];
    if (Array.isArray(item)) {
      item.forEach((value) => {
        form_data.append(key, value);
      });
    } else {
      if (data[key]) form_data.append(key, data[key]);
    }
  }
  return form_data;
};
function encodeQueryData(data) {
  const ret = [];
  for (let d in data) {
    if (data[d])
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  return ret.join("&");
}
const loginlineParams = (param) => {
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
      result,
    });
    return result;
  };
}
const mapQueryStatusAndPriority = (statusFilter) => {
  const status = ["waiting", "doing", "complete", "expired", "stop"]
    .map((key) => statusFilter[key] && taskStatusMap[key])
    .filter((item) => item)
    .toString();
  const priority = ["priority_hight", "priority_medium", "priority_low"]
    .map((key) => statusFilter[key] && taskPriorityMap[key])
    .filter((item) => item)
    .toString();
  return { status, priority };
};
const createMapPropsFromAttrs = (strings = []) => (data = {}) => {
  return strings.map((string) => get(data, string));
};
const createValidate = (schema) => (values = {}, mapError = {}) => {
  const { error } = schema.validate(values);
  return error
    ? error.details.reduce((result, error) => {
        const keyError = error.context.key + "." + error.type;
        if (!mapError[keyError]) return result;
        result[error.context.key] = mapError[keyError];
        return result;
      }, {})
    : emptyObject;
};
const paging = (data) => {
  const currentPage = get(data, "paging.page");
  const totalPage = get(data, "paging.total_page");
  const hasMore = currentPage && totalPage && currentPage < totalPage;
  return { currentPage, totalPage, hasMore };
};
export {
  paging,
  chart,
  time,
  remove,
  get,
  isFunction,
  merge,
  uniqueId,
  chunk,
  toFormData,
  template,
  createValidate,
  loginlineParams,
  mapQueryStatusAndPriority,
  loginlineFunc,
  createMapPropsFromAttrs,
  encodeQueryData,
};
