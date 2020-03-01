import { createSelector } from 'reselect';
import { find } from 'lodash';

const colors = state => state.setting.colors;
const searchUser = state => state.groupUser.searchUser;
const inviteUserJoinGroup = state => state.groupUser.inviteUserJoinGroup;
const resendInvitationUserJoinGroup = state => state.groupUser.resendInvitationUserJoinGroup;
const acceptRequirementJoinGroup = state => state.groupUser.acceptRequirementJoinGroup;
const rejectRequirementJoinGroup = state => state.groupUser.rejectRequirementJoinGroup;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const getListInvitationSent = state => state.groupUser.getListInvitationSent;

export const bgColorSelector = createSelector(
  [colors],
  (colors) => find(colors, { 'selected': true })
);

export const desireUserSelector = createSelector(
  [searchUser],
  (searchUser) => {
    const { data: { member }, loading, error } = searchUser;
    return ({
      user: member,
      loading,
      error,
    });
  }
);

export const requireUsersSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements }, loading, error } = getRequirementJoinGroup;
    return ({
      users: requirements,
      loading,
      error,
    });
  }
);

export const invitationSentsSelector = createSelector(
  [getListInvitationSent],
  (getListInvitationSent) => {
    const { data: { invitations }, loading, error } = getListInvitationSent;
    return ({
      invitations,
      loading,
      error,
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