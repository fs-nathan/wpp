import { GROUP_SCHEDULE_UPDATE, GROUP_SCHEDULE_UPDATE_FAIL, GROUP_SCHEDULE_UPDATE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const updateProjectSchedule = ({ schedule_group_id, name, description }, quite = false) => ({
  type: GROUP_SCHEDULE_UPDATE,
  quite,
  options: {
    name, description, schedule_group_id
  }
});

export const updateProjectScheduleSuccess = ({ scheduleGroup }, options) => ({
  type: GROUP_SCHEDULE_UPDATE_SUCCESS,
  options,
  data: {
    scheduleGroup
  }
});

export const updateProjectScheduleFail = (error, options) => ({
  type: GROUP_SCHEDULE_UPDATE_FAIL,
  options,
  error,
});