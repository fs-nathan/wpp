import React from 'react';
import { connect } from 'react-redux';
import { sortUser } from '../../../../actions/user/sortUser';
import { roomsSelector } from './selectors';
import UserListPresenter from './presenters';

function UserList({ 
  rooms, 
  doSortUser, 
}) {

  return (
    <UserListPresenter 
      rooms={rooms}
      handleSortUser={(userId, roomId, sortIndex) => doSortUser({ userId, roomId, sortIndex })}
    />
  )
}

const mapStateToProps = state => {
  return {
    rooms: roomsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSortUser: ({ userId, roomId, sortIndex }) => dispatch(sortUser({ userId, roomId, sortIndex })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
