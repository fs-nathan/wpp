import { createLevel } from 'actions/level/createLevel';
import { updateLevel } from 'actions/level/updateLevel';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LevelCreateAndUpdatePresenter from './presenters';
import { activeLoadingSelector } from './selectors';

function LevelCreateAndUpdate({
  updatedLevel = null,
  open, setOpen,
  doCreateLevel, doUpdateLevel,
  activeLoading,
}) {

  return (
    <LevelCreateAndUpdatePresenter
      updatedLevel={updatedLevel} activeLoading={activeLoading}
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
    doCreateLevel: ({ name, description }) => dispatch(createLevel({ name, description })),
    doUpdateLevel: ({ levelId, name, description }) => dispatch(updateLevel({ levelId, name, description })),
  }
};

export default connect(
  state => ({
    activeLoading: activeLoadingSelector(state),
  }),
  mapDispatchToProps,
)(LevelCreateAndUpdate);
