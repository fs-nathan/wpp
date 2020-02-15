import React from 'react';
import { updateUser } from '../../../../actions/user/updateUser';
import { connect } from 'react-redux';
import { optionsSelector } from './selectors';
import UpdateUserPresenter from './presenters';

function UpdateUser({ 
  updatedUser = null, 
  open, setOpen, 
  options, 
  doUpdateUser 
}) {

  return (
    <UpdateUserPresenter 
      open={open} setOpen={setOpen}
      updatedUser={updatedUser}
      options={options}
      handleUpdateUser={(userId, roomId, levelId, majorId, positionId, description) =>
        doUpdateUser({ userId, roomId, levelId, majorId, positionId, description })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    options: optionsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doUpdateUser: ({ userId, roomId, levelId, majorId, positionId, description }) => dispatch(updateUser({ userId, roomId, levelId, majorId, positionId, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
