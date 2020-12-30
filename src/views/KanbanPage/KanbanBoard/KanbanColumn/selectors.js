import { createSelector } from 'reselect';

const kanbanSetting = state => state.kanban.setting;
const viewPermissions = state => state.viewPermissions;

export const statusSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { statusFilter } } = kanbanSetting;
    return statusFilter;
  }
);

export const prioritySelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { priorityFilter } } = kanbanSetting;
    return priorityFilter;
  }
);

export const memberSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { memberFilter } } = kanbanSetting;
    return memberFilter;
  }
);

export const taskSearchSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { taskSearchStr } } = kanbanSetting;
    return taskSearchStr;
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { detailProject }, loading, error } = viewPermissions;
    return ({
      permissions: detailProject,
      loading,
      error,
    });
  }
);