import React from "react";
import AddUserModalPresenter from "./presenters";
import {
  desireLoadingSelector,
  desireUserSelector,
  requireLoadingSelector,
  requireUsersSelector
} from "../../LeftPart/AddUser/selectors";
import {searchUser, searchUserReset} from "../../../../actions/groupUser/searchUser";
import {connect, useDispatch} from "react-redux";
import {inviteUserJoinGroup} from "../../../../actions/groupUser/inviteUserJoinGroup";
import {CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP} from "../../../../constants/events";
import {memberProject} from "../../../../actions/project/memberProject";
import {isNil} from "lodash";

function AddUserModal({open, setOpen, doSearchUser, desireUser, doSearchUserReset, doInviteUserJoinGroup,
                        reload = false, projectId = null}) {
  const dispatch = useDispatch();
  const resetDesireUser = () => {
    doSearchUserReset();
  }
  React.useEffect(() => {
    const inviteUserSuccess = () => {
      setOpen(false);
      if(reload && !isNil(projectId)) {
        dispatch(memberProject({projectId}));
      }
    };
    CustomEventListener(INVITE_USER_JOIN_GROUP, inviteUserSuccess);
    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, inviteUserSuccess);
    }
  }, [setOpen, projectId, reload, dispatch]);
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