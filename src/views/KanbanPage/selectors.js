import { createSelector } from 'reselect';

const kanbanSetting = state => state.kanban.setting;

export const visibleSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { visible } } = kanbanSetting;
    return visible;
  }
);