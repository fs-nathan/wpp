import { deletePosition } from 'actions/position/deletePosition';
import { listPosition } from 'actions/position/listPosition';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PositionDeletePresenter from './presenters';

function PositionCreateAndUpdate({
  selectedPosition = null,
  open, setOpen,
  doDeletePosition,
  doReloadPosition,
}) {

  return (
    <PositionDeletePresenter
      doReloadPosition={doReloadPosition}
      open={open} setOpen={setOpen}
      handleDeletePosition={() =>
        doDeletePosition({
          positionId: get(selectedPosition, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadPosition: () => dispatch(listPosition(true)),
    doDeletePosition: ({ positionId }) => dispatch(deletePosition({ positionId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(PositionCreateAndUpdate);
