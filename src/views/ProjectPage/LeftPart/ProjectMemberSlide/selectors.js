import { createSelector } from 'reselect';
import { filter, flatten, get } from 'lodash';

const memberProject = state => state.project.memberProject;
const listTask = state => state.task.listTask;

export const membersSelector = createSelector(
  [memberProject, listTask],
  (memberProject, listTask) => {
    const { data: { membersAdded, }, error: memberProjectError, loading: memberProjectLoading } = memberProject;
    const { data: { tasks } } = listTask;
    const allTasks = flatten(tasks.map(groupTasks => get(groupTasks, 'tasks', [])));
    const newMembers = membersAdded.map(member => ({
      ...member,
      number_task: filter(
        allTasks, 
        task => get(task, 'members', [])
          .map(_member => get(_member, 'id'))
          .includes(get(member, 'id'))
      ).length,
    }))
    return {
      members: newMembers,
      loading: memberProjectLoading,
      error: memberProjectError,
    }
  }
);