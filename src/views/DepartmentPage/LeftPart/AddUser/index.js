import { acceptRequirementJoinGroup } from 'actions/groupUser/acceptRequirementJoinGroup';
import { cancleInvitationJoinGroup } from 'actions/groupUser/cancleInvitationJoinGroup';
import { getListGroup } from 'actions/groupUser/getListGroup';
import { getListInvitationSent } from 'actions/groupUser/getListInvitationSent';
import { getRequirementJoinGroup } from 'actions/groupUser/getRequirementJoinGroup';
import { inviteUserJoinGroup } from 'actions/groupUser/inviteUserJoinGroup';
import { rejectRequirementJoinGroup } from 'actions/groupUser/rejectRequirementJoinGroup';
import { resendInvitationUserJoinGroup } from 'actions/groupUser/resendInvitationUserJoinGroup';
import {searchUser, searchUserReset} from 'actions/groupUser/searchUser';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { getPermissionViewUser } from 'actions/viewPermissions';
import { ACCEPT_REQUIREMENT_USER_JOIN_GROUP, CANCLE_INVITATION_JOIN_GROUP, CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP } from 'constants/events';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import AddUserPresenter from './presenters';
import { bgColorSelector, desireLoadingSelector, desireUserSelector, invitationSentsSelector, requireLoadingSelector, requireUsersSelector, viewPermissionsSelector } from './selectors';

function AddUser({
  bgColor, viewPermissions,
  desireUser, desireLoading,
  requireUsers, requireLoading,
  invitations,
  anchorDrawer,
  doSearchUser,
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  doGetRequirementJoinGroup,
  doGetListGroup, doSearchUserReset,
  doGetListInvitationSent,
  doCancleInvitationJoinGroup,
  doActionVisibleDrawerMessage,
  doGetPermissionViewUser,
}) {

  React.useEffect(() => {
    if (viewPermissions.permissions === null) doGetPermissionViewUser(true);
  }, [doGetPermissionViewUser]);

  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
      if (searchPatern !== '') {
        const doSearchUserHandler = () => {
          doSearchUser({ info: searchPatern });
        };
        CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
        CustomEventListener(CANCLE_INVITATION_JOIN_GROUP, doSearchUserHandler);
        return () => {
          CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
          CustomEventDispose(CANCLE_INVITATION_JOIN_GROUP, doSearchUserHandler);
        }
      }
    }
  }, [searchPatern, viewPermissions]);

  const resetDesireUser = () => {
    doSearchUserReset();
    setSearchPatern('');
  }

  React.useEffect(() => {
    CustomEventListener(INVITE_USER_JOIN_GROUP, resetDesireUser);
    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, resetDesireUser);
    }
  }, []);


  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
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
    // eslint-disable-next-line
  }, [viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
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
    // eslint-disable-next-line
  }, [viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'can_modify', false)) {
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
    // eslint-disable-next-line
  }, [viewPermissions]);

  return (
    <AddUserPresenter
      viewPermissions={viewPermissions}
      bgColor={bgColor}
      desireUser={desireUser} desireLoading={desireLoading}
      requireUsers={requireUsers} requireLoading={requireLoading}
      invitations={invitations}
      handleSearchUser={doSearchUser}
      handleInviteUserJoinGroup={doInviteUserJoinGroup} handleResendInvitationUserJoinGroup={doResendInvitationUserJoinGroup}
      handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup} handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
      handleCancleInvitationJoinGroup={doCancleInvitationJoinGroup}
      searchPatern={searchPatern}
      handleSearchPatern={value => setSearchPatern(value)}
      anchorDrawer={anchorDrawer}
      handleVisibleDrawerMessage={doActionVisibleDrawerMessage}
      handleClearDesireUsers={() => resetDesireUser()}
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
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
    doResendInvitationUserJoinGroup: ({ userId }) => dispatch(resendInvitationUserJoinGroup({ userId })),
    doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
    doGetListInvitationSent: (quite) => dispatch(getListInvitationSent(quite)),
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    doGetListGroup: (quite) => dispatch(getListGroup(quite)),
    doCancleInvitationJoinGroup: ({ invitationId }) => dispatch(cancleInvitationJoinGroup({ invitationId })),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
    doSearchUserReset: () => dispatch(searchUserReset())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
