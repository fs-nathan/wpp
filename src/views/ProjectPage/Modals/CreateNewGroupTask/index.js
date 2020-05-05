import { createGroupTask } from 'actions/groupTask/createGroupTask';
import { updateGroupTask } from 'actions/groupTask/updateGroupTask';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateNewOrUpdateGroupTaskPresenter from './presenters';
import { activeLoadingSelector } from './selectors';

function CreateNewOrUpdateGroupTask({
  open, setOpen,
  curGroupTask = null,
  doUpdateGroupTask, doCreateGroupTask, activeLoading,
}) {

  const { projectId } = useParams();

  return (
    <CreateNewOrUpdateGroupTaskPresenter
      open={open} setOpen={setOpen}
      curGroupTask={curGroupTask}
      activeLoading={activeLoading}
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
  state => ({
    activeLoading: activeLoadingSelector(state),
  }),
  mapDispatchToProps,
)(CreateNewOrUpdateGroupTask);
