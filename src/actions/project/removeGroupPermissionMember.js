import { REMOVE_GROUP_PERMISSION_MEMBER, REMOVE_GROUP_PERMISSION_MEMBER_FAIL, REMOVE_GROUP_PERMISSION_MEMBER_SUCCESS } from '../../constants/actions/project/removeGroupPermissionMember';

export const removeGroupPermissionMember = ({ projectId, memberId }) => ({
  type: REMOVE_GROUP_PERMISSION_MEMBER,
  options: {
    projectId,
    memberId,
  },
});

export const removeGroupPermissionMemberSuccess = (options) => ({
  type: REMOVE_GROUP_PERMISSION_MEMBER_SUCCESS,
  options,
});

export const removeGroupPermissionMemberFail = (error, options) => ({
  type: REMOVE_GROUP_PERMISSION_MEMBER_FAIL,
  options,
  error,
});