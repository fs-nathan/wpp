import get from "lodash/get";
import React from "react";
import { useSelector } from "react-redux";
import { emptyObject } from "views/JobPage/contants/defaultValue";
const AsyncTracker = ({ asyncId, children }) => {
  const asyncSelector = React.useCallback(
    (state) => {
      return get(state, ["apiCall", asyncId], emptyObject);
    },
    [asyncId]
  );
  const { status, data } = useSelector(asyncSelector);
  return children({ status, data });
};
export default AsyncTracker;
