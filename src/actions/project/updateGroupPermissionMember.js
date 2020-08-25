import {
  UPDATE_GROUP_PERMISSION_MEMBER,
  UPDATE_GROUP_PERMISSION_MEMBER_FAIL,
  UPDATE_GROUP_PERMISSION_MEMBER_SUCCESS,
} from '../../constants/actions/project/updateGroupPermissionMember';

export const updateGroupPermissionMember = ({ projectId, memberId, groupPermission }) => ({
  type: UPDATE_GROUP_PERMISSION_MEMBER,
  options: {
    projectId,
    memberId,
    groupPermission,
  },
});

export const updateGroupPermissionMemberSuccess = (options) => ({
  type: UPDATE_GROUP_PERMISSION_MEMBER_SUCCESS,
  options,
});

export const updateGroupPermissionMemberFail = (error, options) => ({
  type: UPDATE_GROUP_PERMISSION_MEMBER_FAIL,
  options,
  error,
});