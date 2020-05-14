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

const calendarStage = state => state.calendar;
export const newProjectGroupScheduleSelector = createSelector(
  [calendarStage],
  (calendarStage) => {
    let afterCreate = get(calendarStage.createProjectGroupSchedule, "data.scheduleGroup", null);
    let afterUpdate = get(calendarStage.updateProjectGroupSchedule, "data.scheduleGroup", null);
    let afterDelete = get(calendarStage.deleteProjectGroupSchedule, "data.schedule_id", null);
    return ({
      afterCreate, afterUpdate, afterDelete
    })
  }
);