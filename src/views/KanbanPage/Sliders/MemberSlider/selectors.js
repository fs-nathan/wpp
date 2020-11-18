import { createSelector } from 'reselect';

const kanbanSetting = state => state.kanban.setting;
const memberProject = state => state.project.memberProject;

export const memberFilterSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { memberFilter } } = kanbanSetting;
    return memberFilter;
  }
);

export const memberSearchStrSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { memberSearchStr } } = kanbanSetting;
    return memberSearchStr;
  }
);

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded } } = memberProject;
    return membersAdded;
  }
);