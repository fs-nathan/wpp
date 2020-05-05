import { CREATE_SCHEDULE, CREATE_SCHEDULE_FAIL, CREATE_SCHEDULE_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const createSchedule = ({ schedule }, quite = false) => ({
  type: CREATE_SCHEDULE,
  quite,
  options: {
    schedule
  },
});

export const createScheduleSuccess = ({ schedule }, options) => ({
  type: CREATE_SCHEDULE_SUCCESS,
  options,
  data: {
    schedule
  }
});

export const createScheduleFail = (error, options) => ({
  type: CREATE_SCHEDULE_FAIL,
  options,
  error,
});