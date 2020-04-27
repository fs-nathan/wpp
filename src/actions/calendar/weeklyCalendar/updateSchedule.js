import { UPDATE_SCHEDULE, UPDATE_SCHEDULE_FAIL, UPDATE_SCHEDULE_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const updateSchedule = ({ schedule }, quite = false) => ({
  type: UPDATE_SCHEDULE,
  quite,
  options: {
    schedule
  },
});

export const updateScheduleSuccess = ({ schedule }, options) => ({
  type: UPDATE_SCHEDULE_SUCCESS,
  options,
  data: {
    schedule
  }
});

export const updateScheduleFail = (error, options) => ({
  type: UPDATE_SCHEDULE_FAIL,
  options,
  error,
});