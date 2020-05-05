import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { sortUser } from 'actions/user/sortUser';
import { ACCEPT_REQUIREMENT_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, CREATE_ROOM, CustomEventDispose, CustomEventListener, DELETE_ROOM, INVITE_USER_JOIN_GROUP, SORT_ROOM, SORT_USER, UPDATE_ROOM } from 'constants/events';
import React from 'react';
import { connect } from 'react-redux';
import { routeSelector as DrouteSelector } from '../../../DepartmentPage/selectors';
import { routeSelector as MrouteSelector } from '../../selectors';
import UserListPresenter from './presenters';
import { roomsSelector } from './selectors';

function UserList({
  rooms, memberRoute, departmentRoute,
  doSortUser,
  doListUserOfGroup,
}) {

  React.useEffect(() => {
    doListUserOfGroup();
    const reloadListUserOfGroup = () => {
      doListUserOfGroup();
    }
    CustomEventListener(CREATE_ROOM, reloadListUserOfGroup);
    CustomEventListener(UPDATE_ROOM, reloadListUserOfGroup);
    CustomEventListener(DELETE_ROOM, reloadListUserOfGroup);
    CustomEventListener(SORT_ROOM, reloadListUserOfGroup);
    CustomEventListener(SORT_USER, reloadListUserOfGroup);
    CustomEventListener(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
    CustomEventListener(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
    CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);
    return () => {
      CustomEventDispose(CREATE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(UPDATE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(DELETE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(SORT_ROOM, reloadListUserOfGroup);
      CustomEventDispose(SORT_USER, reloadListUserOfGroup);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
      CustomEventDispose(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
      CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <UserListPresenter
      rooms={rooms} memberRoute={memberRoute} departmentRoute={departmentRoute}
      handleSortUser={(userId, roomId, sortIndex) => doSortUser({ userId, roomId, sortIndex })}
    />
  )
}

const mapStateToProps = state => {
  return {
    rooms: roomsSelector(state),
    memberRoute: MrouteSelector(state),
    departmentRoute: DrouteSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSortUser: ({ userId, roomId, sortIndex }) => dispatch(sortUser({ userId, roomId, sortIndex })),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
