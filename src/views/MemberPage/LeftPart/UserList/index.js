import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { sortUser } from 'actions/user/sortUser';
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
