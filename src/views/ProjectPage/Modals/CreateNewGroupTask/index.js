import { createGroupTask } from 'actions/groupTask/createGroupTask';
import { getAllGroupTask } from 'actions/groupTask/getAllGroupTask';
import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { updateGroupTask } from 'actions/groupTask/updateGroupTask';
import { listTask } from 'actions/task/listTask';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context as ProjectContext } from '../../index';
import CreateNewOrUpdateGroupTaskPresenter from './presenters';

function CreateNewOrUpdateGroupTask({
  open, setOpen,
  curGroupTask = null,
  doUpdateGroupTask, doCreateGroupTask,
  doReload,
}) {

  const { projectId } = useParams();
  const {
    timeRange,
  } = React.useContext(ProjectContext);

  return (
    <CreateNewOrUpdateGroupTaskPresenter
      open={open} setOpen={setOpen}
      curGroupTask={curGroupTask}
      projectId={projectId}
      doReload={() => doReload({
        projectId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      }, projectId)}
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
    doReload: (options, projectId) => {
      dispatch(listGroupTask({ projectId }, true));
      dispatch(getAllGroupTask(true));
      dispatch(listTask(options, true));
    },
    doCreateGroupTask: ({ projectId, name, description }) => dispatch(createGroupTask({ projectId, name, description })),
    doUpdateGroupTask: ({ groupTaskId, name, description }) => dispatch(updateGroupTask({ groupTaskId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateNewOrUpdateGroupTask);
