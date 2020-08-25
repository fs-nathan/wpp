import { GROUP_SCHEDULE_SET_WORKING_DAY, GROUP_SCHEDULE_SET_WORKING_DAY_FAIL, GROUP_SCHEDULE_SET_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const setWorkingDays = ({ scheduleGroupID, workingDays }, quite = false) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY,
  quite,
  options: {
    scheduleGroupID, workingDays
  },
});

export const setWorkingDaysSuccess = ({ scheduleGroup }, options) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY_SUCCESS,
  options,
  data: {
    scheduleGroup
  }
});

export const setWorkingDaysFail = (error, options) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY_FAIL,
  options,
  error,
});