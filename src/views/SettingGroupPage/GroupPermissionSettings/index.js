import TwoColumnsLayout from "components/TwoColumnsLayout";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyObject } from "views/JobPage/contants/defaultValue.js";
import { createMapPropsFromAttrs, get } from "views/JobPage/utils/index.js";
import { groupPermissionAttr } from "./contants.js";
import Left from "./Left.js";
import { settingGroupPermission } from "./redux/index.js";
import Right from "./Right/index.js";
export const GroupPermissionSettingsCotnext = React.createContext({});
const GroupPermissionSettings = () => {
  const [select, setSelect] = useState();
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  const selectDetailGroupPermission = useMemo(() => {
    return (state) =>
      select
        ? settingGroupPermission.selectors.detailGroupPermissionSelector(
            state,
            select.id
          )
        : emptyObject;
  }, [select]);
  const detail = useSelector(selectDetailGroupPermission);
  const permissionModules = useSelector(
    settingGroupPermission.selectors.groupModulesListSelector
  );
  const groupPermissionList = useSelector(
    settingGroupPermission.selectors.groupPermissionListSelector
  );
  useEffect(() => {
    dispatch(settingGroupPermission.actions.loadGroupModules());
    dispatch(settingGroupPermission.actions.loadGroupPermissionList());
  }, [dispatch]);
  useEffect(() => {
    const [id] = createMapPropsFromAttrs([groupPermissionAttr.id])(select);
    if (id) {
      dispatch(
        settingGroupPermission.actions.loadDetailGroupPermission({
          group_permission_id: id,
        })
      );
    }
  }, [dispatch, select]);
  useEffect(() => {
    if (!select && groupPermissionList[0]) {
      setSelect(groupPermissionList[0]);
    }
  }, [groupPermissionList, select]);

  const [
    id,
    name,
    permissions,
    module,
    total_of_member_assigned,
    members_assigned,
  ] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
    groupPermissionAttr.module,
    groupPermissionAttr.total_of_member_assigned,
    groupPermissionAttr.members_assigned,
  ])(detail);
  const permissionsNumber = get(permissions, "length", 0);
  return (
    <GroupPermissionSettingsCotnext.Provider
      value={{
        setSelect,
        modal,
        setModal,
        permissionModules,
        groupPermissionList,
        detail,
        id,
        name,
        permissions,
        module,
        total_of_member_assigned,
        permissionsNumber,
        members_assigned,
      }}
    >
      <>
        <TwoColumnsLayout
          leftRenders={[() => <Left />]}
          rightRender={() => <Right />}
        ></TwoColumnsLayout>
        {modal}
      </>
    </GroupPermissionSettingsCotnext.Provider>
  );
};

export default GroupPermissionSettings;
