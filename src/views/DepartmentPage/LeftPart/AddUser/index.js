import React from 'react';
import { connect } from 'react-redux';
import { searchUser, searchUserReset } from '../../../../actions/groupUser/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/groupUser/inviteUserJoinGroup';
import { resendInvitationUserJoinGroup } from '../../../../actions/groupUser/resendInvitationUserJoinGroup';
import { getRequirementJoinGroup } from '../../../../actions/groupUser/getRequirementJoinGroup';
import { acceptRequirementJoinGroup } from '../../../../actions/groupUser/acceptRequirementJoinGroup';
import { rejectRequirementJoinGroup } from '../../../../actions/groupUser/rejectRequirementJoinGroup';
import { getListGroup } from '../../../../actions/groupUser/getListGroup';
import { actionVisibleDrawerMessage } from '../../../../actions/system/system';
import { 
  CustomEventListener, CustomEventDispose, 
  INVITE_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP,
} from '../../../../constants/events';
import {
  bgColorSelector,
  desireUserSelector, requireUsersSelector,
  desireLoadingSelector, requireLoadingSelector,
} from './selectors';
import AddUserPresenter from './presenters';

function AddUser({
  bgColor, 
  desireUser, desireLoading,
  requireUsers, requireLoading,
  anchorDrawer,
  doSearchUser, doSearchUserReset,
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  doGetRequirementJoinGroup, doGetListGroup,
  doActionVisibleDrawerMessage, 
}) {

  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
    const doSearchUserHandler = () => {
      doSearchUser({ info: searchPatern });
    };

    CustomEventListener(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
    CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);

    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
      CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
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

    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetListGroup);
      CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, reloadGetListGroup);
    }
  }, [doGetListGroup]);

  return (
    <AddUserPresenter 
      bgColor={bgColor}
      desireUser={desireUser} desireLoading={desireLoading}
      requireUsers={requireUsers} requireLoading={requireLoading}
      handleSearchUser={doSearchUser} handleSearchUserReset={doSearchUserReset}
      handleInviteUserJoinGroup={doInviteUserJoinGroup} handleResendInvitationUserJoinGroup={doResendInvitationUserJoinGroup}
      handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup} handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
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
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    doGetListGroup: (quite) => dispatch(getListGroup(quite)),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
