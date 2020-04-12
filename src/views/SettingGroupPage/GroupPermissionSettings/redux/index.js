import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { encodeQueryData, get, loginlineFunc } from "views/JobPage/utils";
import {
  listAddFirst,
  listremove,
  listupdate,
  mapPayloadToState,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/listReducer";
import { createAsyncAction } from "../../TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "/setting-group/group-permission";
export const types = {
  getModules: `[${rootPath}]/permissions/get-modules`,
  permissionViewGroupSetting: `[${rootPath}]/permissions/get-permission-view-setting-group`,
  groupPermissionListUpdated: `[${rootPath}]/permissions/list-group-permission`,
  createGroupPermission: `[${rootPath}]/permissions/create-group-permission`,
  updateGroupPermission: `[${rootPath}]/permissions/update-permissions-of-group-permission`,
  deleteGroupPermission: `[${rootPath}]/permissions/delete-permission-of-group-permission`,
  permissionListUpdated: `[${rootPath}]/permissions/list`,
  permissionViewUserUpdated: `[${rootPath}]/permissions/get-permission-view-user`,
  permissionViewProjectUpdated: `[${rootPath}]/permissions/get-permission-view-project`,
};

const updateGroupPermissionList = createAction(
  types.groupPermissionListUpdated,
  function prepare(data) {
    return {
      payload: data.group_permissions,
    };
  }
);

const updateGroupModules = createAction(types.getModules, function prepare(
  data
) {
  return {
    payload: data.modules,
  };
});

const updatePermissionViewGroupSetting = createAction(
  types.permissionViewGroupSetting,
  function prepare(data) {
    return {
      payload: data.modules,
    };
  }
);
export const loadPermissionViewGroupSetting = () => {
  return createAsyncAction({
    config: {
      url: "/permissions/get-permission-view-setting-group",
    },
    success: updatePermissionViewGroupSetting,
  });
};

// GroupPermission
export const loadGroupModules = () => {
  return createAsyncAction({
    config: {
      url: "/permissions/get-modules",
    },
    success: updateGroupModules,
  });
};

// GroupPermission
export const loadGroupPermissionList = ({ type } = {}) => {
  return createAsyncAction({
    config: {
      url: "/permissions/list-group-permission",
      data: {
        //Int(0,1,2,3,4) optional
        type,
      },
    },
    success: updateGroupPermissionList,
  });
};

// name:string,permissions:array of permission,module: int(0,1,2,3,4)
export const createGroupPermission = ({
  name,
  permissions,
  description,
  module,
}) => {
  return createAsyncAction({
    config: {
      url: "/permissions/create-group-permission",
      method: "post",
      data: { name, permissions, description, module },
    },
    success: createAction(updateGroupPermissionList.type, function prepare(
      data
    ) {
      return {
        payload: data.group_permission,
        meta: {
          action: listAddFirst(data.group_permission),
        },
      };
    }),
  });
};
export const updateGroupPermission = ({
  group_permission_id,
  name,
  description,
  permissions,
  type,
}) => {
  return createAsyncAction({
    config: {
      url: "/permissions/update-permissions-of-group-permission",
      method: "post",
      data: { group_permission_id, name, permissions, type, description },
    },
    success: function onSuccess(data) {
      return loadDetailGroupPermission({ group_permission_id });
    },
    notifyOnFailure: true,
    // notifyOnSuccess: true,
  });
};
export const deleteGroupPermission = ({ group_permission_id }) => {
  return createAsyncAction({
    config: {
      url: "/permissions/delete-permission-of-group-permission",
      method: "post",
      data: { group_permission_id },
    },
    success: createAction(updateGroupPermissionList.type, function prepare(
      data
    ) {
      return {
        payload: data.group_permission,
        meta: {
          action: listremove({ id: group_permission_id }),
        },
      };
    }),
    notifyOnFailure: true,
    notifyOnSuccess: true,
  });
};
const updatePermissionList = createAction(
  types.permissionListUpdated,
  function prepare(data) {
    return {
      payload: data.data_permissions,
    };
  }
);

// module(1,2,3)
export const loadPermissionList = ({ module = 1 } = {}) => {
  return createAsyncAction({
    config: {
      url: `/permissions/list?${encodeQueryData({
        module: "" + module,
      })}`,
    },
    success: loginlineFunc(updatePermissionList),
  });
};

export const loadDetailGroupPermission = ({ group_permission_id } = {}) => {
  return createAsyncAction({
    config: {
      url: `/permissions/detail-group-permission?${encodeQueryData({
        group_permission_id,
      })}`,
    },
    success: createAction(updateGroupPermissionList.type, function prepare(
      data
    ) {
      return {
        payload: data.group_detail,
        meta: {
          action: listupdate(data.group_detail),
        },
      };
    }),
  });
};
export const groupPermissionListSelector = (state) =>
  get(
    state,
    [settingGroupPermission.key, types.groupPermissionListUpdated],
    emptyArray
  );
export const groupModulesListSelector = (state) =>
  get(state, [settingGroupPermission.key, updateGroupModules.type], emptyArray);

export const permissionViewGroupSettingSelector = (state) =>
  get(
    state,
    [settingGroupPermission.key, updatePermissionViewGroupSetting.type],
    emptyArray
  );
export const permissionListSelector = (state) =>
  get(
    state,
    [settingGroupPermission.key, updatePermissionList.type],
    emptyArray
  );
export const detailGroupPermissionSelector = (state, id) =>
  get(
    state,
    [settingGroupPermission.key, types.groupPermissionListUpdated],
    emptyArray
  ).find((item) => item.id === id);
export const settingGroupPermission = {
  selectors: {
    permissionListSelector,
    groupPermissionListSelector,
    groupModulesListSelector,
    permissionViewGroupSettingSelector,
    detailGroupPermissionSelector,
  },
  actions: {
    loadDetailGroupPermission,
    loadGroupPermissionList,
    loadPermissionList,
    createGroupPermission,
    loadGroupModules,
    deleteGroupPermission,
    loadPermissionViewGroupSetting,
    updateGroupPermissionList,
    updateGroupPermission,
    updatePermissionList,
  },
  key: "settingGroupPermission",
  reducer: createReducer(
    {
      [updateGroupPermissionList]: [],
      [updatePermissionViewGroupSetting]: [],
      [updateGroupModules]: [],
      [updatePermissionList]: [],
    },
    {
      [updatePermissionViewGroupSetting]: mapPayloadToState,
      [updateGroupModules]: mapPayloadToState,
      [updateGroupPermissionList]: mapPayloadToState,
      [updatePermissionList]: mapPayloadToState,
    }
  ),
};
