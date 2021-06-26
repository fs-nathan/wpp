import { SCHEDULE_OF_WEEK_LIST, SCHEDULE_OF_WEEK_LIST_FAIL, SCHEDULE_OF_WEEK_LIST_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const listScheduleOfWeek = ({ schedule_id }, quite = false) => ({
  type: SCHEDULE_OF_WEEK_LIST,
  quite,
  options: {
    schedule_id
  },
});

export const listScheduleOfWeekSuccess = ({ schedules }, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_SUCCESS,
  options,
  data: {
    schedules
  }
});

export const listScheduleOfWeekFail = (error, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_FAIL,
  options,
  error,
});