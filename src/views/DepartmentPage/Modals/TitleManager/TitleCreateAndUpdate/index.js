import { createPosition } from 'actions/position/createPosition';
import { updatePosition } from 'actions/position/updatePosition';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import TitleCreateAndUpdatePresenter from './presenters';
import { activeLoadingSelector } from './selectors';

function TitleManager({
  open, setOpen,
  updatedPosition = null,
  doCreatePosition, doUpdatePosition,
  activeLoading,
}) {

  return (
    <TitleCreateAndUpdatePresenter
      open={open} setOpen={setOpen}
      activeLoading={activeLoading}
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
  state => ({
    activeLoading: activeLoadingSelector(state),
  }),
  mapDispatchToProps,
)(TitleManager);
