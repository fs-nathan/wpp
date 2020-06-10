import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { encodeQueryData, get, loginlineFunc } from "views/JobPage/utils";
import {
  listAddFirst,
  listremove,
  listupdate,
  mapPayloadToState,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/listReducer";
import {
  createAsyncAction,
  createPostAsyncAction,
} from "../../TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "/setting-group/group-permission";
export const types = {
  getModules: `[${rootPath}]/moduleList`,
  permissionViewGroupSetting: `[${rootPath}]/permissions/get-permission-view-setting-group`,
  groupPermissionDefaultList: `[${rootPath}]/list-group-permission-default`,
  groupPermissionListUpdated: `[${rootPath}]/list-group-permission`,
  permissionListUpdated: `[${rootPath}]/permissions/list`,
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

// /permissions/get-permission-view-setting-group
export const loadPermissionViewSettingGroup = () => {
  return createAsyncAction({
    config: {
      url: "/permissions/get-permission-view-setting-group",
    },
    success: createAction(types.permissionViewGroupSetting),
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

const updateGroupPermissionDefaultList = createAction(
  types.groupPermissionDefaultList,
  function prepare(data) {
    return {
      payload: data.group_permissions,
    };
  }
);
export const loadGroupPermissionDefaultList = () => {
  return createAsyncAction({
    config: {
      url: "/permissions/list-group-permission-default",
    },
    success: updateGroupPermissionDefaultList,
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
  return createPostAsyncAction({
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
export const updateGroupPermission = ({ group_permission_id, permissions }) => {
  return createAsyncAction({
    config: {
      url: "/permissions/update-permissions-of-group-permission",
      method: "post",
      data: { group_permission_id, permissions },
    },
    success: function onSuccess(data) {
      return loadDetailGroupPermission({ group_permission_id });
    },
    notifyOnFailure: true,
    notifyOnSuccess: true,
  });
};
export const updateGroupPermissionInfo = ({
  group_permission_id,
  name,
  description,
  module,
}) => {
  return createAsyncAction({
    config: {
      url: "/permissions/update-group-permission",
      method: "post",
      data: { group_permission_id, name, module, description },
    },
    success: function onSuccess(data) {
      return loadDetailGroupPermission({ group_permission_id });
    },
    notifyOnFailure: true,
    notifyOnSuccess: true,
  });
};
export const deleteGroupPermission = ({ group_permission_id }) => {
  return createAsyncAction({
    config: {
      url: "/permissions/delete-group-permission",
      method: "delete",
      data: { group_permission_id },
    },
    success: createAction(updateGroupPermissionList.type, function prepare(
      data
    ) {
      return {
        payload: data.group_permission,
        meta: {
          action: listremove(group_permission_id),
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
export const loadDetailGroupPermissionDefault = ({
  group_permission_id,
} = {}) => {
  return createAsyncAction({
    config: {
      url: `/permissions/detail-group-permission-default?${encodeQueryData({
        group_permission_id,
      })}`,
    },
    success: createAction(
      updateGroupPermissionDefaultList.type,
      function prepare(data) {
        return {
          payload: data.group_detail,
          meta: {
            action: listupdate(data.group_detail),
          },
        };
      }
    ),
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
export const groupPermissionDefaultListSelector = (state) =>
  get(
    state,
    [settingGroupPermission.key, updateGroupPermissionDefaultList.type],
    emptyArray
  );
export const groupModulesListSelector = (state) =>
  get(state, [settingGroupPermission.key, updateGroupModules.type], emptyArray);

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
export const detailGroupPermissionDefaultSelector = (state, id) =>
  get(
    state,
    [settingGroupPermission.key, updateGroupPermissionDefaultList.type],
    emptyArray
  ).find((item) => item.id === id);

export const permissionViewSettingGroupSelector = (state) =>
  get(
    state,
    [
      settingGroupPermission.key,
      types.permissionViewGroupSetting,
      "permissions",
    ],
    emptyObject
  );
export const settingGroupPermission = {
  selectors: {
    permissionListSelector,
    permissionViewSettingGroupSelector,
    groupPermissionListSelector,
    updateGroupPermissionInfo,
    groupModulesListSelector,
    detailGroupPermissionSelector,
    groupPermissionDefaultListSelector,
    detailGroupPermissionDefaultSelector,
  },
  actions: {
    loadPermissionViewSettingGroup,
    loadGroupPermissionDefaultList,
    loadDetailGroupPermission,
    loadDetailGroupPermissionDefault,
    loadPermissionList,
    createGroupPermission,
    loadGroupModules,
    deleteGroupPermission,
    updateGroupPermissionList,
    loadGroupPermissionList,
    updateGroupPermission,
    updateGroupPermissionInfo,
    updatePermissionList,
  },
  key: "settingGroupPermission",
  reducer: createReducer(
    {
      [types.permissionViewGroupSetting]: {},
      [updateGroupPermissionDefaultList]: [],
      [updateGroupPermissionList]: [],
      [updateGroupModules]: [],
      [updatePermissionList]: [],
    },
    {
      [updateGroupPermissionDefaultList]: mapPayloadToState,
      [updateGroupModules]: mapPayloadToState,
      [updateGroupPermissionList]: mapPayloadToState,
      [updatePermissionList]: mapPayloadToState,
      [types.permissionViewGroupSetting]: mapPayloadToState,
    }
  ),
};
