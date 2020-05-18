import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);

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

const scheduleDetail = state => state.calendar.getProjectGroupScheduleDetail;
export const projectGroupScheduleDetailSelector = createSelector(
  [scheduleDetail],
  (scheduleDetail) => {
    return ({
      data: scheduleDetail.data.schedule,
      error: scheduleDetail.error,
      loading: scheduleDetail.loading
    })
  }
);