import TwoColumnsLayout from "components/TwoColumnsLayout";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMapPropsFromAttrs, get } from "views/JobPage/utils/index.js";
import { groupPermissionAttr } from "./contants.js";
import Left from "./Left";
import { settingGroupPermission } from "./redux/index.js";
import ColumnLeft from "./Right/columnLeft.js";
import ColumnRight from "./Right/columnRight.js";
export const GroupPermissionSettingsContext = React.createContext({});

const Container = ({ className = '', ...rest }) => <div className={`comp_GroupPermission___container ${className}`} {...rest} />;

const GroupPermissionSettings = () => {
  const [{ select, isDefault }, setSelect] = useState({
    select: undefined,
    isDefault: true,
  });
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  const selectDetailGroupPermission = useMemo(() => {
    if (isDefault)
      return (state) =>
        select
          ? settingGroupPermission.selectors.detailGroupPermissionDefaultSelector(
            state,
            select.id
          )
          : get(
            settingGroupPermission.selectors.groupPermissionDefaultListSelector(
              state
            ),
            "0"
          );
    return (state) =>
      select
        ? settingGroupPermission.selectors.detailGroupPermissionSelector(
          state,
          select.id
        )
        : get(
          settingGroupPermission.selectors.groupPermissionListSelector(state),
          "0"
        );
  }, [select, isDefault]);

  const detail = useSelector(selectDetailGroupPermission);
  const permissionModules = useSelector(
    settingGroupPermission.selectors.groupModulesListSelector
  );
  const groupPermissionList = useSelector(
    settingGroupPermission.selectors.groupPermissionListSelector
  );
  const groupPermissionDefaultList = useSelector(
    settingGroupPermission.selectors.groupPermissionDefaultListSelector
  );
  useEffect(() => {
    dispatch(settingGroupPermission.actions.loadGroupPermissionDefaultList());
    dispatch(settingGroupPermission.actions.loadGroupModules());
    dispatch(settingGroupPermission.actions.loadGroupPermissionList());
  }, [dispatch]);
  useEffect(() => {
    let id;
    id = get(select, groupPermissionAttr.id);
    if (select) {
      if (id) {
        dispatch(
          settingGroupPermission.actions.loadDetailGroupPermission({
            group_permission_id: id,
          })
        );
      }
    }
    if (isDefault) {
      if (id) {
        dispatch(
          settingGroupPermission.actions.loadDetailGroupPermissionDefault({
            group_permission_id: id,
          })
        );
      }
    }
  }, [dispatch, isDefault, select]);
  useEffect(() => {
    if (!select) {
      if (isDefault) {
        setSelect({
          select: get(groupPermissionDefaultList, "0"),
          isDefault: true,
        });
      } else {
        setSelect({ select: get(groupPermissionList, "0"), isDefault: false });
      }
    }
  }, [groupPermissionDefaultList, groupPermissionList, isDefault, select]);
  const [
    id,
    name,
    permissions,
    module,
    total_of_member_assigned,
    members_assigned,
    can_modify = true,
  ] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
    groupPermissionAttr.module,
    groupPermissionAttr.total_of_member_assigned,
    groupPermissionAttr.members_assigned,
    groupPermissionAttr.can_modify,
  ])(detail);
  const permissionsNumber = get(permissions, "length", 0);
  const handleSelect = (select, isDefault) => {
    setSelect({ select, isDefault });
  };
  return (
    <GroupPermissionSettingsContext.Provider
      value={{
        select,
        setSelect: handleSelect,
        modal,
        setModal,
        permissionModules,
        groupPermissionList,
        groupPermissionDefaultList,
        detail,
        id,
        name,
        permissions,
        module,
        total_of_member_assigned,
        permissionsNumber,
        can_modify,
        members_assigned,
      }}
    >
      <>
      <Container>
        <TwoColumnsLayout
          leftRenders={[() => <Left />]}
          rightRender={() =>
            <TwoColumnsLayout
            
              leftRenders={[() => <ColumnLeft />]}
              rightRender={() => <ColumnRight />}
            
            />}
        />
        {modal}
        </Container>
      </>
    </GroupPermissionSettingsContext.Provider>
  );
};

export default GroupPermissionSettings;
