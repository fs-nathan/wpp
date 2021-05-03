import { createSelector } from 'reselect';

const kanbanGetManager = state => state.kanban.getManager;
const memberProject = state => state.project.memberProject;

export const managersSelector = createSelector(
  [kanbanGetManager],
  (kanbanGetManager) => {
    const { data: { managers }, loading, error } = kanbanGetManager;
    return {
      managers,
      loading,
      error,
    }
  }
)

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded }, loading, error } = memberProject;
    return {
      members: membersAdded.map((member, index) => ({ ...member, index })),
      loading,
      error,
    }
  }
)

const colors = state => state.setting.colors;
export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);