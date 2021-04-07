import React from "react";
import {Redirect} from "react-router-dom";
import {Routes} from "../../constants/routes";
import {getValueInLocalStorage} from "../OfferPage/utils";

function WorkplacePage() {
  const defaultAccessItem = getValueInLocalStorage("WPS_WORKING_SPACE_DEFAULT_ACCESS");
  return <Redirect to={`${Routes.PROJECTS}${defaultAccessItem}`}/>;
}

export default WorkplacePage;