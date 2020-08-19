const has = Object.prototype.hasOwnProperty;
export const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (has.call(prop, 'length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0);