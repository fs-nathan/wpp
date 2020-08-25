import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);

const listSchedule = state => state.calendar.listSchedule;
export const calendarsSelector = createSelector(
  [listSchedule],
  (listSchedule) => {
    return ({
      data: listSchedule.data.calendars,
      error: listSchedule.error,
      loading: listSchedule.loading
    })
  }
);

const listWeeksInYear = state => state.calendar.listWeeksInYear;
export const listWeeksInYearSelector = createSelector(
  [listWeeksInYear],
  (listWeeksInYear) => {
    return ({
      data: listWeeksInYear.data.weeks,
      error: listWeeksInYear.error,
      loading: listWeeksInYear.loading
    })
  }
);


const listScheduleOfWeek = state => state.calendar.listScheduleOfWeek;
export const scheduleOfWeekSelector = createSelector(
  [listScheduleOfWeek],
  (listScheduleOfWeek) => {
    return ({
      data: listScheduleOfWeek.data.schedules,
      error: listScheduleOfWeek.error,
      loading: listScheduleOfWeek.loading
    })
  }
);