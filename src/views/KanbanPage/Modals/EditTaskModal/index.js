import React from 'react';
import EditTaskPresenter from './presenters';
import { connect } from 'react-redux';
import { detailTask } from 'actions/kanban/detailTask';
import { updateTask } from 'actions/kanban/updateTask';
import { listTask } from 'actions/kanban/listTask';
import { taskSelector } from './selectors';
import { isNil } from 'lodash';

function EditTask({
  open, setOpen,
  taskId, projectId,
  doDetailTask, task,
  doUpdateTask,
  doListTask,
}) {

  React.useEffect(() => {
    if (!isNil(taskId)) {
      doDetailTask({
        taskId,
      });
    }
    // eslint-disable-next-line
  }, [taskId]);

  return (
    <EditTaskPresenter 
      open={open} setOpen={setOpen}
      task={task.task}
      handleUpdateData={({ name, description }) => doUpdateTask({
        taskId,
        name,
        description,
      })}
      doReload={() => doListTask({ projectId })}
      projectId={projectId}
    />
  );
}

const mapStateToProps = state => ({
  task: taskSelector(state),
});


const mapDispatchToProps = dispatch => ({
  doDetailTask: (option, quite) => dispatch(detailTask(option, quite)),
  doUpdateTask: (option, quite) => dispatch(updateTask(option, quite)),
  doListTask: (option, quite) => dispatch(listTask(option, quite)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);