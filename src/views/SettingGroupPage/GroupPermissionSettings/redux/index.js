import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { encodeQueryData, get } from "views/JobPage/utils";
import {
  listcreate,
  listremove,
  mapPayloadToState,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/listReducer";
import { createAsyncAction } from "../../TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "/setting-group/group-permission";
export const types = {
  groupPermissionListUpdated: `[${rootPath}]/permissions/list-group-permission`,
  permissionListUpdated: `[${rootPath}]/permissions/list`,
  detailGroupPermissionUpdated: `[${rootPath}]/permissions/detail-group-permission`,
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
const deleteGroupPermissionList = createAction(
  types.groupPermissionListUpdated,
  function prepare(data) {
    return {
      payload: data.id,
      meta: {
        action: listremove(data.id),
      },
    };
  }
);
const addGroupPermissionList = createAction(
  types.groupPermissionListUpdated,
  function prepare(data) {
    return {
      payload: data.data,
      meta: {
        action: listcreate(data.data),
      },
    };
  }
);

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
const updatePermissionList = createAction(
  types.permissionListUpdated,
  function prepare(data) {
    return {
      payload: data.group_permissions,
    };
  }
);
export const loadPermissionList = ({ type } = {}) => {
  return createAsyncAction({
    config: {
      url: "/permissions/list",
    },
    success: updatePermissionList,
  });
};
export const loadDetailGroupPermission = ({ group_permission_id } = {}) => {
  return createAsyncAction({
    config: {
      url: `/permissions/detail-group-permission?${encodeQueryData({
        group_permission_id,
      })}`,
    },
  });
};
export const groupPermissionListSelector = (state) =>
  get(
    state,
    [settingGroupPermission.key, types.groupPermissionListUpdated],
    emptyArray
  );

export const settingGroupPermission = {
  selectors: {
    groupPermissionListSelector,
  },
  actions: {
    loadDetailGroupPermission,
    loadGroupPermissionList,
    loadPermissionList,
    updateGroupPermissionList,
    updatePermissionList,
    deleteGroupPermissionList,
    addGroupPermissionList,
  },
  key: "settingGroupPermission",
  reducer: createReducer(
    {
      [updateGroupPermissionList]: [],
    },
    {
      [updateGroupPermissionList]: mapPayloadToState,
      [updatePermissionList]: mapPayloadToState,
    }
  ),
};
