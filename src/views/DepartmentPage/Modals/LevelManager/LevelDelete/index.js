import { deleteLevel } from 'actions/level/deleteLevel';
import { listLevel } from 'actions/level/listLevel';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LevelDeletePresenter from './presenters';

function LevelCreateAndUpdate({
  selectedLevel = null,
  open, setOpen,
  doDeleteLevel,
  doReloadLevel,
}) {

  return (
    <LevelDeletePresenter
      doReloadLevel={doReloadLevel}
      open={open} setOpen={setOpen}
      handleDeleteLevel={() =>
        doDeleteLevel({
          levelId: get(selectedLevel, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadLevel: () => dispatch(listLevel(true)),
    doDeleteLevel: ({ levelId }) => dispatch(deleteLevel({ levelId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(LevelCreateAndUpdate);
