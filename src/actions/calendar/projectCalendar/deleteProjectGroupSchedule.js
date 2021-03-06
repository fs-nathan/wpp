import { GROUP_SCHEDULE_DELETE, GROUP_SCHEDULE_DELETE_FAIL, GROUP_SCHEDULE_DELETE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const deleteProjectSchedule = ({ schedule_group_id }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE,
  quite,
  options: {
    schedule_group_id
  }
});

export const deleteProjectScheduleSuccess = ({ schedule_id }, options) => ({
  type: GROUP_SCHEDULE_DELETE_SUCCESS,
  options,
  data: {
    schedule_id
  }
});

export const deleteProjectScheduleFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_FAIL,
  options,
  error,
});