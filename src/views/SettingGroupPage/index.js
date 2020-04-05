import { Routes } from "constants/routes";
import React from "react";
import { Route, Switch } from "react-router-dom";
import GroupPermissionSettings from "./GroupPermissionSettings";
import ListPart from "./ListPart";
import TablePart from "./TablePart";
const SettingGroupPage = () => {
  return (
    <div className="page-container">
      <ListPart />
      <TablePart />
    </div>
  );
};

export default () => {
  return (
    <Switch>
      <Route
        path={Routes.SETTING_GROUP_GROUP_PERMISSION}
        component={GroupPermissionSettings}
      />
      <Route path={Routes.SETTING_GROUP} component={SettingGroupPage} />
    </Switch>
  );
};
