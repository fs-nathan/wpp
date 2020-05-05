import { SCHEDULE_LIST, SCHEDULE_LIST_FAIL, SCHEDULE_LIST_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const listSchedule = ({ year }, quite = false) => ({
  type: SCHEDULE_LIST,
  quite,
  options: {
    year
  },
});

export const listScheduleSuccess = ({ calendars }, options) => ({
  type: SCHEDULE_LIST_SUCCESS,
  options,
  data: {
    calendars
  }
});

export const listProjectFail = (error, options) => ({
  type: SCHEDULE_LIST_FAIL,
  options,
  error,
});