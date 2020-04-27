import { GROUP_SCHEDULE_DELETE_WORKING_DAY, GROUP_SCHEDULE_DELETE_WORKING_DAY_FAIL, GROUP_SCHEDULE_DELETE_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const projectScheduleDeleteWorkingDay = ({ scheduleGroupID, dayID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY,
  quite,
  options: {
    scheduleGroupID, dayID
  }
});

export const projectScheduleDeleteWorkingDaySuccess = ({ scheduleGroup }, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY_SUCCESS,
  options,
  data: {
    scheduleGroup
  }
});

export const projectScheduleDeleteWorkingDayFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY_FAIL,
  options,
  error,
});