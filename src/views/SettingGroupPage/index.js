import { Routes } from "constants/routes";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import GroupPermissionSettings from "./GroupPermissionSettings";
import { settingGroupPermission } from "./GroupPermissionSettings/redux";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(settingGroupPermission.actions.loadPermissionViewSettingGroup());
  }, [dispatch]);
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
