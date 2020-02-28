import React from 'react';
import { useParams } from 'react-router-dom';
import { createGroupTask } from '../../../../actions/groupTask/createGroupTask';
import { updateGroupTask } from '../../../../actions/groupTask/updateGroupTask';
import { connect } from 'react-redux';
import { get } from 'lodash';
import CreateNewOrUpdateGroupTaskPresenter from './presenters';

function CreateNewOrUpdateGroupTask({ 
  open, setOpen, 
  curGroupTask = null, 
  doUpdateGroupTask, doCreateGroupTask, 
}) {

  const { projectId } = useParams();

  return (
    <CreateNewOrUpdateGroupTaskPresenter 
      open={open} setOpen={setOpen} 
      curGroupTask={curGroupTask}
      handleCreateOrUpdateGroupTask={(name, description) =>
        curGroupTask
        ? doUpdateGroupTask({
            groupTaskId: get(curGroupTask, 'id'), 
            name, 
            description
          })
        : doCreateGroupTask({
            projectId,
            name,
            description,
          })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateGroupTask: ({ projectId, name, description }) => dispatch(createGroupTask({ projectId, name, description })),
    doUpdateGroupTask: ({ groupTaskId, name, description }) => dispatch(updateGroupTask({ groupTaskId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateNewOrUpdateGroupTask);
