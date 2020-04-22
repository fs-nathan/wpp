import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { acceptRequirementJoinGroup } from '../../../../actions/groupUser/acceptRequirementJoinGroup';
import { cancleInvitationJoinGroup } from '../../../../actions/groupUser/cancleInvitationJoinGroup';
import { getListGroup, getListGroupReset } from '../../../../actions/groupUser/getListGroup';
import { getListInvitationSent, getListInvitationSentReset } from '../../../../actions/groupUser/getListInvitationSent';
import { getRequirementJoinGroup, getRequirementJoinGroupReset } from '../../../../actions/groupUser/getRequirementJoinGroup';
import { inviteUserJoinGroup } from '../../../../actions/groupUser/inviteUserJoinGroup';
import { rejectRequirementJoinGroup } from '../../../../actions/groupUser/rejectRequirementJoinGroup';
import { resendInvitationUserJoinGroup } from '../../../../actions/groupUser/resendInvitationUserJoinGroup';
import { searchUser, searchUserReset } from '../../../../actions/groupUser/searchUser';
import { actionVisibleDrawerMessage } from '../../../../actions/system/system';
import { getPermissionViewUser } from '../../../../actions/viewPermissions';
import { ACCEPT_REQUIREMENT_USER_JOIN_GROUP, CANCLE_INVITATION_JOIN_GROUP, CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP } from '../../../../constants/events';
import AddUserPresenter from './presenters';
import { bgColorSelector, desireLoadingSelector, desireUserSelector, invitationSentsSelector, requireLoadingSelector, requireUsersSelector, viewPermissionsSelector } from './selectors';

function AddUser({
  bgColor, viewPermissions,
  desireUser, desireLoading,
  requireUsers, requireLoading,
  invitations,
  anchorDrawer,
  doSearchUser, doSearchUserReset,
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  doGetRequirementJoinGroup, doGetRequirementJoinGroupReset,
  doGetListGroup, doGetListGroupReset,
  doGetListInvitationSent, doGetListInvitationSentReset,
  doCancleInvitationJoinGroup,
  doActionVisibleDrawerMessage,
  doGetPermissionViewUser,
}) {

  React.useEffect(() => {
    if (viewPermissions.permissions === null) doGetPermissionViewUser(true);
    //eslint-disable-next-line
  }, [doGetPermissionViewUser]);

  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      doSearchUserReset();
    }
  }, [doSearchUserReset, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      if (searchPatern !== '') {
        const doSearchUserHandler = () => {
          doSearchUser({ info: searchPatern });
        };

        CustomEventListener(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
        CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
        CustomEventListener(CANCLE_INVITATION_JOIN_GROUP, doSearchUserHandler);

        return () => {
          CustomEventDispose(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
          CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
          CustomEventDispose(CANCLE_INVITATION_JOIN_GROUP, doSearchUserHandler);
        }
      }
    }
  }, [doSearchUser, searchPatern, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      doGetRequirementJoinGroupReset();
      doGetRequirementJoinGroup();

      const doGetRequirementJoinGroupHandler = () => {
        doGetRequirementJoinGroup(true);
      };

      CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      CustomEventListener(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);

      return () => {
        CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
        CustomEventDispose(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      }
    }
  }, [doGetRequirementJoinGroup, doGetRequirementJoinGroupReset, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      doGetListGroupReset();
      doGetListGroup();

      const reloadGetListGroup = () => {
        doGetListGroup(true);
      };

      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetListGroup);
      CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, reloadGetListGroup);
      CustomEventListener(CANCLE_INVITATION_JOIN_GROUP, reloadGetListGroup);

      return () => {
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetListGroup);
        CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, reloadGetListGroup);
        CustomEventDispose(CANCLE_INVITATION_JOIN_GROUP, reloadGetListGroup);
      }
    }
  }, [doGetListGroup, doGetListGroupReset, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      doGetListInvitationSentReset();
      doGetListInvitationSent();

      const reloadGetListInvitationSent = () => {
        doGetListInvitationSent(true);
      };

      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetListInvitationSent);
      CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, reloadGetListInvitationSent);
      CustomEventListener(CANCLE_INVITATION_JOIN_GROUP, reloadGetListInvitationSent);

      return () => {
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetListInvitationSent);
        CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, reloadGetListInvitationSent);
        CustomEventDispose(CANCLE_INVITATION_JOIN_GROUP, reloadGetListInvitationSent);
      }
    }
  }, [doGetListInvitationSent, doGetListInvitationSentReset, viewPermissions]);

  return (
    <AddUserPresenter
      viewPermissions={viewPermissions}
      bgColor={bgColor}
      desireUser={desireUser} desireLoading={desireLoading}
      requireUsers={requireUsers} requireLoading={requireLoading}
      invitations={invitations}
      handleSearchUser={doSearchUser} handleSearchUserReset={doSearchUserReset}
      handleInviteUserJoinGroup={doInviteUserJoinGroup} handleResendInvitationUserJoinGroup={doResendInvitationUserJoinGroup}
      handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup} handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
      handleCancleInvitationJoinGroup={doCancleInvitationJoinGroup}
      searchPatern={searchPatern}
      handleSearchPatern={evt => setSearchPatern(evt.target.value)}
      anchorDrawer={anchorDrawer}
      handleVisibleDrawerMessage={doActionVisibleDrawerMessage}
    />
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    desireUser: desireUserSelector(state),
    desireLoading: desireLoadingSelector(state),
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state),
    invitations: invitationSentsSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    anchorDrawer: state.system.anchorDrawer,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
    doSearchUserReset: () => dispatch(searchUserReset()),
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
    doResendInvitationUserJoinGroup: ({ userId }) => dispatch(resendInvitationUserJoinGroup({ userId })),
    doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
    doGetRequirementJoinGroupReset: () => dispatch(getRequirementJoinGroupReset()),
    doGetListInvitationSent: (quite) => dispatch(getListInvitationSent(quite)),
    doGetListInvitationSentReset: () => dispatch(getListInvitationSentReset()),
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    doGetListGroup: (quite) => dispatch(getListGroup(quite)),
    doGetListGroupReset: () => dispatch(getListGroupReset()),
    doCancleInvitationJoinGroup: ({ invitationId }) => dispatch(cancleInvitationJoinGroup({ invitationId })),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
