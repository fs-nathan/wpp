import React from "react";
import AddUserModalPresenter from "./presenters";
import {
  desireLoadingSelector,
  desireUserSelector,
  requireLoadingSelector,
  requireUsersSelector
} from "../../LeftPart/AddUser/selectors";
import {searchUser, searchUserReset} from "../../../../actions/groupUser/searchUser";
import {connect} from "react-redux";
import {inviteUserJoinGroup} from "../../../../actions/groupUser/inviteUserJoinGroup";
import {CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP} from "../../../../constants/events";

function AddUserModal({open, setOpen, doSearchUser, desireUser, doSearchUserReset, doInviteUserJoinGroup}) {
  const resetDesireUser = () => {
    doSearchUserReset();
  }
  React.useEffect(() => {
    const inviteUserSuccess = () => {
      setOpen(false);
    };
    CustomEventListener(INVITE_USER_JOIN_GROUP, inviteUserSuccess);
    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, inviteUserSuccess);
    }
  }, [setOpen]);
  return (
    <AddUserModalPresenter
      open={open} setOpen={setOpen}
      handleSearchUser={doSearchUser}
      desireUser={desireUser} handleClearSearch={doSearchUserReset}
      handleClearDesireUsers={() => resetDesireUser()}
      handleInviteUserJoinGroup={doInviteUserJoinGroup}
    />
  );
}
const mapStateToProps = state => {
  return {
    desireUser: desireUserSelector(state),
    desireLoading: desireLoadingSelector(state),
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
    doSearchUserReset: () => dispatch(searchUserReset()),
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUserModal);