import { deleteGroupTask } from 'actions/groupTask/deleteGroupTask';
import { getAllGroupTask } from 'actions/groupTask/getAllGroupTask';
import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { listTask } from 'actions/task/listTask';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context as ProjectContext } from '../../index';
import DeleteGroupTaskPresenter from './presenters';

function GroupTaskDelete({
  selectedGroupTask = null,
  open, setOpen,
  doDeleteGroupTask,
  doReload,
}) {

  const { projectId } = useParams();
  const {
    timeRange,
  } = React.useContext(ProjectContext);

  return (
    <DeleteGroupTaskPresenter
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
      open={open} setOpen={setOpen}
      handleDeleteGroupTask={() =>
        doDeleteGroupTask({
          groupTaskId: get(selectedGroupTask, 'id'),
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
    doDeleteGroupTask: ({ groupTaskId }) => dispatch(deleteGroupTask({ groupTaskId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(GroupTaskDelete);
