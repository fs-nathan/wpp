import { GROUP_SCHEDULE_DELETE_DAY_OFF, GROUP_SCHEDULE_DELETE_DAY_OFF_FAIL, GROUP_SCHEDULE_DELETE_DAY_OFF_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const projectScheduleDeleteDayOff = ({ scheduleGroupID, dayID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_DAY_OFF,
  quite,
  options: {
    scheduleGroupID, dayID
  }
});

export const projectScheduleDeleteDayOffSuccess = ({ workDays }, options) => ({
  type: GROUP_SCHEDULE_DELETE_DAY_OFF_SUCCESS,
  options,
  data: {
    workDays
  }
});

export const projectScheduleDeleteDayOffFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_DAY_OFF_FAIL,
  options,
  error,
});