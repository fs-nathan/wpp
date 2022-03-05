import React from "react";
import {Redirect} from "react-router-dom";
import {Routes} from "../../constants/routes";
import {isNil} from "lodash";
import {useLocalStorage} from "../../hooks";

function WorkplacePage() {
  const [defaultAccessItem] = useLocalStorage("WPS_WORKING_SPACE_DEFAULT_ACCESS", null);
  const [isHideStartButton, setValue] = useLocalStorage("WPS_HIDE_WORKING_START_BUTTON", false);
  const personal = "/personal-board";
  const start = "/start";

  return <Redirect to={`${Routes.PROJECTS}${(defaultAccessItem === "null" || defaultAccessItem === "undefined" || isNil(defaultAccessItem)) ?
    isHideStartButton ? personal : start : defaultAccessItem}`}/>;
}

export default WorkplacePage;