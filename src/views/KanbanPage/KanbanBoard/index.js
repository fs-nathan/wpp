import React from "react";
import { listTask } from 'actions/kanban/listTask';
import { sortTask } from 'actions/kanban/sortTask';
import { sortGroupTask } from 'actions/kanban/sortGroupTask';
import { tasksSelector, workTypeSelector } from './selectors';
import { connect } from 'react-redux';
import KanbanBoardPresenter from './presenters';
import { get } from 'lodash';
import { CustomEventDispose, CustomEventListener, CREATE_TASK, DELETE_TASK, KANBAN, CREATE_GROUP_TASK, COPY_GROUP_TASK, UPDATE_GROUP_TASK } from 'constants/events';
import { listGroupTask } from 'actions/groupTask/listGroupTask';

function KanbanBoard({
  projectId,
  tasks, doKanbanListTask,
  doKanbanSortGroupTask,
  doKanbanSortTask,
  doListGroupTask,
  handleOpenModal,
  workType,
}) {

  const [tasksArr, setTasksArr] = React.useState([]);

  React.useEffect(() => {
    setTasksArr(tasks.tasks);
  }, [tasks.tasks]);

  React.useEffect(() => {
    doKanbanListTask({ projectId });
    const doKanbanListTaskHandler = () => {
      doKanbanListTask({ projectId });
    };
    CustomEventListener(CREATE_TASK, doKanbanListTaskHandler);
    CustomEventListener(DELETE_TASK, doKanbanListTaskHandler);
    CustomEventListener(CREATE_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(UPDATE_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(COPY_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.SORT_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.SORT_GROUP_TASK.FAIL, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.SORT_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.SORT_TASK.FAIL, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.UPDATE_MANAGERS.SUCCESS, doKanbanListTaskHandler);
    return () => {
      CustomEventDispose(CREATE_TASK, doKanbanListTaskHandler);
      CustomEventDispose(DELETE_TASK, doKanbanListTaskHandler);
      CustomEventDispose(CREATE_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(UPDATE_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(COPY_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.SORT_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.SORT_GROUP_TASK.FAIL, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.SORT_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.SORT_TASK.FAIL, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.UPDATE_MANAGERS.SUCCESS, doKanbanListTaskHandler);
    }
  }, [projectId]);

  React.useEffect(() => {
    doListGroupTask({ projectId });
  }, [projectId]);

  function handleColumnDrop(fromIdx, toIdx, column) {
    if (fromIdx === toIdx) return;
    let newTasksArr = Array.from(tasksArr);
    newTasksArr.splice(fromIdx, 1);
    newTasksArr.splice(toIdx, 0, column);
    setTasksArr(newTasksArr);
    doKanbanSortGroupTask({
      groupTaskId: get(column, 'id'),
      sortIndex: toIdx,
    });
  }

  function handleItemDrop(columnId, fromIdx, toIdx, item) {
    if (fromIdx === toIdx) return;
    let newTasksArr = Array.from(tasksArr);
    for (let i = 0; i < newTasksArr.length; i++) {
      if (get(newTasksArr[i], 'id') === columnId) {
        const newTasks = get(newTasksArr[i], 'tasks', []);
        if (fromIdx != null) {
          newTasks.splice(fromIdx, 1);
        }
        if (toIdx != null) {
          newTasks.splice(toIdx, 0, item);
        }
        newTasksArr[i].tasks = newTasks;
      }
    }
    setTasksArr(newTasksArr);
    if (toIdx != null) {
      doKanbanSortTask({
        taskId: get(item, 'id'),
        groupTask: columnId,
        projectId,
        sortIndex: toIdx,
      });
    }
  }

  return (
    <KanbanBoardPresenter 
      tasks={tasksArr}
      loading={tasks.loading}
      handleOpenModal={handleOpenModal}
      projectId={projectId}
      handleColumnDrop={handleColumnDrop}
      handleItemDrop={handleItemDrop}
      workType={workType}
    />
  );
}

const mapStateToProps = state => {
  return {
    tasks: tasksSelector(state),
    workType: workTypeSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doKanbanListTask: (option, quite = false) => dispatch(listTask(option, quite)),
    doKanbanSortTask: (option, quite = false) => dispatch(sortTask(option, quite)),
    doKanbanSortGroupTask: (option, quite = false) => dispatch(sortGroupTask(option, quite)),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanBoard);
