import { GROUP_SCHEDULE_ADD_DAY_OFF, GROUP_SCHEDULE_ADD_DAY_OFF_FAIL, GROUP_SCHEDULE_ADD_DAY_OFF_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const projectScheduleAddDayOff = ({ scheduleGroupID, dateStart, dateEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_ADD_DAY_OFF,
  quite,
  options: {
    scheduleGroupID, dateStart, dateEnd
  }
});

export const projectScheduleAddDayOffSuccess = ({ scheduleGroup }, options) => ({
  type: GROUP_SCHEDULE_ADD_DAY_OFF_SUCCESS,
  options,
  data: {
    scheduleGroup
  }
});

export const projectScheduleAddDayOffFail = (error, options) => ({
  type: GROUP_SCHEDULE_ADD_DAY_OFF_FAIL,
  options,
  error,
});