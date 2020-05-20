import get from 'lodash/get';
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

const calendarState = state => state.calendar;
export const newProjectGroupScheduleSelector = createSelector(
  [calendarState],
  (calendarState) => {
    let afterCreate = get(calendarState.createProjectGroupSchedule, "data.scheduleGroup", null);
    let afterUpdate = get(calendarState.updateProjectGroupSchedule, "data.scheduleGroup", null);
    let afterDelete = get(calendarState.deleteProjectGroupSchedule, "data.schedule_id", null);
    return ({
      afterCreate, afterUpdate, afterDelete
    })
  }
);