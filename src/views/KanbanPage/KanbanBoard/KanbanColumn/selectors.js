import { createSelector } from 'reselect';

const kanbanSetting = state => state.kanban.setting;

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