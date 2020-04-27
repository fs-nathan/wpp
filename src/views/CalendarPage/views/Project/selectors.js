import { createSelector } from 'reselect';
const projectGroupSchedule = state => state.calendar.listProjectGroupSchedule;
export const projectGroupScheduleSelector = createSelector(
  [projectGroupSchedule],
  (projectGroupSchedule) => {
    return ({
      data: projectGroupSchedule.data.schedules ?? [],
      error: projectGroupSchedule.error,
      loading: projectGroupSchedule.loading
    })
  }
);