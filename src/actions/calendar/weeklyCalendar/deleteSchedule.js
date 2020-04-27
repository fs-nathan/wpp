import { DELETE_SCHEDULE, DELETE_SCHEDULE_FAIL, DELETE_SCHEDULE_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const deleteSchedule = ({ scheduleID }, quite = false) => ({
  type: DELETE_SCHEDULE,
  quite,
  options: {
    scheduleID
  },
});

export const deleteScheduleSuccess = ({ id }, options) => ({
  type: DELETE_SCHEDULE_SUCCESS,
  options,
  data: {
    id
  }
});

export const deleteScheduleFail = (error, options) => ({
  type: DELETE_SCHEDULE_FAIL,
  options,
  error,
});