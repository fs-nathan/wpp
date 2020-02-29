import React from 'react';
import { connect } from 'react-redux';
import { searchUser, searchUserReset } from '../../../../actions/groupUser/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/groupUser/inviteUserJoinGroup';
import { resendInvitationUserJoinGroup } from '../../../../actions/groupUser/resendInvitationUserJoinGroup';
import { getRequirementJoinGroup } from '../../../../actions/groupUser/getRequirementJoinGroup';
import { getListInvitationSent } from '../../../../actions/groupUser/getListInvitationSent';
import { acceptRequirementJoinGroup } from '../../../../actions/groupUser/acceptRequirementJoinGroup';
import { rejectRequirementJoinGroup } from '../../../../actions/groupUser/rejectRequirementJoinGroup';
import { cancleInvitationJoinGroup } from '../../../../actions/groupUser/cancleInvitationJoinGroup';
import { getListGroup } from '../../../../actions/groupUser/getListGroup';
import { actionVisibleDrawerMessage } from '../../../../actions/system/system';
import { 
  CustomEventListener, CustomEventDispose, 
  INVITE_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP, CANCLE_INVITATION_JOIN_GROUP,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP,
} from '../../../../constants/events';
import {
  bgColorSelector,
  desireUserSelector, requireUsersSelector,
  desireLoadingSelector, requireLoadingSelector,
  invitationSentsSelector,
} from './selectors';
import AddUserPresenter from './presenters';

function AddUser({
  bgColor, 
  desireUser, desireLoading,
  requireUsers, requireLoading,
  invitations,
  anchorDrawer,
  doSearchUser, doSearchUserReset,
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  doGetRequirementJoinGroup, doGetListGroup, doGetListInvitationSent,
  doCancleInvitationJoinGroup,
  doActionVisibleDrawerMessage, 
}) {

  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
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
  }, [doSearchUser, searchPatern]);



  React.useEffect(() => {
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
  }, [doGetRequirementJoinGroup]);

  React.useEffect(() => {
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
  }, [doGetListGroup]);

  React.useEffect(() => {
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
  }, [doGetListInvitationSent]);

  return (
    <AddUserPresenter 
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
    doGetListInvitationSent: (quite) => dispatch(getListInvitationSent(quite)),
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    doGetListGroup: (quite) => dispatch(getListGroup(quite)),
    doCancleInvitationJoinGroup: ({ invitationId }) => dispatch(cancleInvitationJoinGroup({ invitationId })),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
