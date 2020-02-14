import React from 'react';
import { createPosition } from '../../../../../actions/position/createPosition';
import { updatePosition } from '../../../../../actions/position/updatePosition';
import { connect } from 'react-redux';
import { get } from 'lodash';
import TitleCreateAndUpdatePresenter from './presenters';

function TitleManager({ 
  open, setOpen, 
  updatedPosition = null, 
  doCreatePosition, doUpdatePosition 
}) {

  return (
    <TitleCreateAndUpdatePresenter 
      open={open} setOpen={setOpen} 
      updatedPosition={updatedPosition} 
      handleCreateOrUpdatePosition={(name, description) => 
        updatedPosition
          ? doUpdatePosition({
              positionId: get(updatedPosition, 'id'),
              name,
              description,
            })
          : doCreatePosition({
              name,
              description,
            })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreatePosition: ({ name, description }) => dispatch(createPosition({ name, description })),
    doUpdatePosition: ({ positionId, name, description }) => dispatch(updatePosition({ positionId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(TitleManager);
