import React from 'react';
import { createLevel } from '../../../../../actions/level/createLevel';
import { updateLevel } from '../../../../../actions/level/updateLevel';
import { connect } from 'react-redux';
import { get } from 'lodash';
import LevelCreateAndUpdatePresenter from './presenters';

function LevelCreateAndUpdate({ 
  updatedLevel = null,
  open, setOpen,
  doCreateLevel, doUpdateLevel 
}) {

  return (
    <LevelCreateAndUpdatePresenter 
      updatedLevel={updatedLevel} 
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
  null,
  mapDispatchToProps,
)(LevelCreateAndUpdate);
