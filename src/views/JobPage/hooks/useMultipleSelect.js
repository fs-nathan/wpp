import React from "react";
import { emptyObject } from "../contants/defaultValue";
export const useMultipleSelect = (
  initvalue = {},
  multiple = true,
  reselect = false
) => {
  const [select, setSelect] = React.useState(initvalue);
  const handleMultipleSelect = (string) => {
    if (multiple) {
      setSelect({
        ...select,
        [string]: reselect ? !select[string] : true,
      });
    } else {
      setSelect({
        [string]: reselect ? !select[string] : true,
      });
    }
  };
  const selectAll = (newSelect = emptyObject) =>
    setSelect({ ...select, ...newSelect });
  const handleRemove = (string) => {
    setSelect({
      ...select,
      [string]: false,
    });
  };
  return [select, handleMultipleSelect, handleRemove, selectAll];
};
