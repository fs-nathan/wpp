import { GROUP_SCHEDULE_LIST, GROUP_SCHEDULE_LIST_FAIL, GROUP_SCHEDULE_LIST_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const listProjectSchedule = (quite = false) => ({
  type: GROUP_SCHEDULE_LIST,
  quite
});

export const listProjectScheduleSuccess = ({ schedules }, options) => ({
  type: GROUP_SCHEDULE_LIST_SUCCESS,
  options,
  data: {
    schedules
  }
});

export const listProjectScheduleFail = (error, options) => ({
  type: GROUP_SCHEDULE_LIST_FAIL,
  options,
  error,
});