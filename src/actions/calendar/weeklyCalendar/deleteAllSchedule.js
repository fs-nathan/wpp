import { DELETE_ALL_SCHEDULE, DELETE_ALL_SCHEDULE_FAIL, DELETE_ALL_SCHEDULE_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const deleteAllSchedule = ({ year, week }, quite = false) => ({
  type: DELETE_ALL_SCHEDULE,
  quite,
  options: {
    year, week
  },
});

export const deleteAllScheduleSuccess = ({ state }, options) => ({
  type: DELETE_ALL_SCHEDULE_SUCCESS,
  options,
  data: {
    state
  }
});

export const deleteAllScheduleFail = (error, options) => ({
  type: DELETE_ALL_SCHEDULE_FAIL,
  options,
  error,
});