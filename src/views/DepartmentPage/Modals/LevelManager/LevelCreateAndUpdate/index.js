import { createLevel } from 'actions/level/createLevel';
import { listLevel } from 'actions/level/listLevel';
import { updateLevel } from 'actions/level/updateLevel';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LevelCreateAndUpdatePresenter from './presenters';

function LevelCreateAndUpdate({
  updatedLevel = null,
  open, setOpen,
  doCreateLevel, doUpdateLevel,
  doReloadLevel,
}) {

  return (
    <LevelCreateAndUpdatePresenter
      updatedLevel={updatedLevel}
      doReloadLevel={doReloadLevel}
      open={open} setOpen={setOpen}
      handleCreateOrUpdateLevel={(name, description) =>
        updatedLevel
          ? doUpdateLevel({
            levelId: get(updatedLevel, 'id'),
            name,
            description,
          })
          : doCreateLevel({
            name,
            description,
          })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadLevel: () => dispatch(listLevel(true)),
    doCreateLevel: ({ name, description }) => dispatch(createLevel({ name, description })),
    doUpdateLevel: ({ levelId, name, description }) => dispatch(updateLevel({ levelId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(LevelCreateAndUpdate);
