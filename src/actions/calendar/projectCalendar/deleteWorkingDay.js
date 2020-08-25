import { GROUP_SCHEDULE_DELETE_WORKING_DAY, GROUP_SCHEDULE_DELETE_WORKING_DAY_FAIL, GROUP_SCHEDULE_DELETE_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const projectScheduleDeleteWorkingDay = ({ scheduleGroupID, dayID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY,
  quite,
  options: {
    scheduleGroupID, dayID
  }
});

export const projectScheduleDeleteWorkingDaySuccess = ({ workDays }, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY_SUCCESS,
  options,
  data: {
    workDays
  }
});

export const projectScheduleDeleteWorkingDayFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_DAY_FAIL,
  options,
  error,
});