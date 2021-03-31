import React from "react";
import {useLocalStorage} from "react-use";
import {Redirect} from "react-router-dom";
import {Routes} from "../../constants/routes";
function WorkplacePage() {
  const [defaultAccessItem, setDefaultAccessItem] = useLocalStorage(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS", ""
  );
  return <Redirect to={`${Routes.PROJECTS}${defaultAccessItem}`}/>;
}

export default WorkplacePage;