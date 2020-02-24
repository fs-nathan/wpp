import React from 'react';
import { connect } from 'react-redux';
import { searchUser, searchUserReset } from '../../../../actions/groupUser/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/groupUser/inviteUserJoinGroup';
import { resendInvitationUserJoinGroup } from '../../../../actions/groupUser/resendInvitationUserJoinGroup';
import { getRequirementJoinGroup } from '../../../../actions/groupUser/getRequirementJoinGroup';
import { acceptRequirementJoinGroup } from '../../../../actions/groupUser/acceptRequirementJoinGroup';
import { rejectRequirementJoinGroup } from '../../../../actions/groupUser/rejectRequirementJoinGroup';
import { 
  CustomEventListener, CustomEventDispose, 
  INVITE_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP,
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
  doSearchUser, doSearchUserReset,
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  handleSubSlide,
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

  return (
    <AddUserPresenter 
      bgColor={bgColor}
      desireUser={desireUser} desireLoading={desireLoading}
      requireUsers={requireUsers} requireLoading={requireLoading}
      handleSearchUser={doSearchUser} handleSearchUserReset={doSearchUserReset}
      handleInviteUserJoinGroup={doInviteUserJoinGroup} handleResendInvitationUserJoinGroup={doResendInvitationUserJoinGroup}
      handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup} handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
      handleSubSlide={handleSubSlide}
      searchPatern={searchPatern} handleSearchPatern={evt => setSearchPatern(evt.target.value)}
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
