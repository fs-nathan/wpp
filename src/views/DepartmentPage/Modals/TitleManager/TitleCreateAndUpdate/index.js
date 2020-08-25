import { createPosition } from 'actions/position/createPosition';
import { listPosition } from 'actions/position/listPosition';
import { updatePosition } from 'actions/position/updatePosition';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import TitleCreateAndUpdatePresenter from './presenters';

function TitleManager({
  open, setOpen,
  updatedPosition = null,
  doCreatePosition, doUpdatePosition,
  doReloadPosition,
}) {

  return (
    <TitleCreateAndUpdatePresenter
      open={open} setOpen={setOpen}
      doReloadPosition={doReloadPosition}
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
    doReloadPosition: () => dispatch(listPosition(true)),
    doCreatePosition: ({ name, description }) => dispatch(createPosition({ name, description })),
    doUpdatePosition: ({ positionId, name, description }) => dispatch(updatePosition({ positionId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(TitleManager);
