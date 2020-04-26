import { createSelector } from 'reselect';

const createProjectGroup = state => state.projectGroup.createProjectGroup;
const editProjectGroup = state => state.projectGroup.editProjectGroup;

export const activeLoadingSelector = createSelector(
  [createProjectGroup, editProjectGroup],
  (createProjectGroup, editProjectGroup) => {
    const { loading: createLoading } = createProjectGroup;
    const { loading: editLoading } = editProjectGroup;
    return createLoading || editLoading;
  }
)