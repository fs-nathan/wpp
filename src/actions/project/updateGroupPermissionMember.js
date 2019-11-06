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

export const updateGroupPermissionMemberSuccess = () => ({
  type: UPDATE_GROUP_PERMISSION_MEMBER_SUCCESS,
});

export const updateGroupPermissionMemberFail = (error) => ({
  type: UPDATE_GROUP_PERMISSION_MEMBER_FAIL,
  error: error,
});