import { GROUP_SCHEDULE_CREATE, GROUP_SCHEDULE_CREATE_FAIL, GROUP_SCHEDULE_CREATE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const createProjectSchedule = ({ name, description }, quite = false) => ({
  type: GROUP_SCHEDULE_CREATE,
  quite,
  options: {
    name, description
  }
});

export const createProjectScheduleSuccess = ({ scheduleGroup }, options) => ({
  type: GROUP_SCHEDULE_CREATE_SUCCESS,
  options,
  data: {
    scheduleGroup
  }
});

export const createProjectScheduleFail = (error, options) => ({
  type: GROUP_SCHEDULE_CREATE_FAIL,
  options,
  error,
});