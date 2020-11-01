import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const kanbanListTask = state => state.kanban.listTask;
const listGroupTask = state => state.groupTask.listGroupTask;

export const tasksSelector = createSelector(
  [kanbanListTask, listGroupTask],
  (kanbanListTask, listGroupTask) => {
    const { data: { tasks }, loading: listLoading, error: listError } = kanbanListTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const newTasks = groupTasks.map(groupTask => {
      let statistics = new Array(6).fill(0);
      get(find(tasks, { id: get(groupTask, 'id') }), 'tasks', []).forEach(task => {
        statistics[get(task, 'status_code', 5)] += 1;
      });
      return ({
        ...groupTask,
        ...find(tasks, { id: get(groupTask, 'id') }),
        task_waiting: statistics[0],
        task_doing: statistics[1],
        task_complete: statistics[2],
        task_expired: statistics[3],
        task_stopped: statistics[4],
      })
    });
    return {
      tasks: newTasks,
      loading: listLoading || listGroupTaskLoading,
      error: listError || listGroupTaskError,
    }
  }
)