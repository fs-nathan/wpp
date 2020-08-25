import { GROUP_SCHEDULE_ADD_WORKING_DAY, GROUP_SCHEDULE_ADD_WORKING_DAY_FAIL, GROUP_SCHEDULE_ADD_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const projectScheduleAddWorkingDay = ({ scheduleGroupID, dateStart, dateEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_DAY,
  quite,
  options: {
    scheduleGroupID, dateStart, dateEnd
  }
});

export const projectScheduleAddWorkingDaySuccess = ({ workDays }, options) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_DAY_SUCCESS,
  options,
  data: {
    workDays
  }
});

export const projectScheduleAddWorkingDayFail = (error, options) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_DAY_FAIL,
  options,
  error,
});