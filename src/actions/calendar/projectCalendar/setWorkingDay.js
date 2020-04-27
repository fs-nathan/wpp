import { GROUP_SCHEDULE_SET_WORKING_DAY, GROUP_SCHEDULE_SET_WORKING_DAY_FAIL, GROUP_SCHEDULE_SET_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const setWorkingDays = ({ scheduleGroupID, workingDays }, quite = false) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY,
  quite,
  options: {
    scheduleGroupID, workingDays
  },
});

export const setWorkingDaysSuccess = ({ schedule_group }, options) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY_SUCCESS,
  options,
  data: {
    schedule_group
  }
});

export const setWorkingDaysFail = (error, options) => ({
  type: GROUP_SCHEDULE_SET_WORKING_DAY_FAIL,
  options,
  error,
});