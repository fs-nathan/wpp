import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { isNil } from "lodash";
import { useLocalStorage } from "../../hooks";

function WorkplacePage() {
  const defaultAccessItem = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );

  const [isHideStartButton, setValue] = useLocalStorage(
    "WPS_HIDE_WORKING_START_BUTTON",
    false
  );
  const personal = "/personal-board";

  return (
    <Redirect
      to={`${Routes.PROJECTS}${
        defaultAccessItem === "null" ||
        defaultAccessItem === "undefined" ||
        isNil(defaultAccessItem)
          ? isHideStartButton
            ? personal
            : ""
          : defaultAccessItem
      }`}
    />
  );
}

export default WorkplacePage;
