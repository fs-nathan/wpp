import { createSelector } from 'reselect';

const listSchedule = state => state.calendar.listSchedule;
export const calendarsSelector = createSelector(
  [listSchedule],
  (listSchedule) => {
    return ({
      data: listSchedule.data.calendars ?? [],
      error: listSchedule.error,
      loading: listSchedule.loading
    })
  }
);