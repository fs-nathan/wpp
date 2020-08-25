import { find } from 'lodash';
import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const searchUser = state => state.groupUser.searchUser;
const inviteUserJoinGroup = state => state.groupUser.inviteUserJoinGroup;
const resendInvitationUserJoinGroup = state => state.groupUser.resendInvitationUserJoinGroup;
const acceptRequirementJoinGroup = state => state.groupUser.acceptRequirementJoinGroup;
const rejectRequirementJoinGroup = state => state.groupUser.rejectRequirementJoinGroup;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const getListInvitationSent = state => state.groupUser.getListInvitationSent;
const viewPermissions = state => state.viewPermissions;

export const bgColorSelector = createSelector(
  [colors],
  (colors) => find(colors, { 'selected': true })
);

export const desireUserSelector = createSelector(
  [searchUser],
  (searchUser) => {
    const { data: { member }, loading, error, firstTime } = searchUser;
    return ({
      user: member,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    });
  }
);

export const requireUsersSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements }, loading, error, firstTime } = getRequirementJoinGroup;
    return ({
      users: requirements,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    });
  }
);

export const invitationSentsSelector = createSelector(
  [getListInvitationSent],
  (getListInvitationSent) => {
    const { data: { invitations }, loading, error, firstTime } = getListInvitationSent;
    return ({
      invitations,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    });
  }
);

export const desireLoadingSelector = createSelector(
  [inviteUserJoinGroup, resendInvitationUserJoinGroup],
  (inviteUserJoinGroup, resendInvitationUserJoinGroup) => {
    const { loading: loading1 } = inviteUserJoinGroup;
    const { loading: loading2 } = resendInvitationUserJoinGroup;
    return loading1 || loading2;
  }
);

export const requireLoadingSelector = createSelector(
  [acceptRequirementJoinGroup, rejectRequirementJoinGroup],
  (acceptRequirementJoinGroup, rejectRequirementJoinGroup) => {
    const { loading: loading1 } = acceptRequirementJoinGroup;
    const { loading: loading2 } = rejectRequirementJoinGroup;
    return loading1 || loading2;
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { users }, loading, error, firstTime } = viewPermissions;
    return ({
      permissions: users,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    });
  }
);