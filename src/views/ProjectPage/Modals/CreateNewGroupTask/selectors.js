import { createSelector } from 'reselect';

const createGroupTask = state => state.groupTask.createGroupTask;
const updateGroupTask = state => state.groupTask.updateGroupTask;

export const activeLoadingSelector = createSelector(
  [createGroupTask, updateGroupTask],
  (createGroupTask, updateGroupTask) => {
    const { loading: createLoading } = createGroupTask;
    const { loading: updateLoading } = updateGroupTask;
    return createLoading || updateLoading;
  }
);