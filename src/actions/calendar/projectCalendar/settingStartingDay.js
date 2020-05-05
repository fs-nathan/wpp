import { SETTING_START_DAY_WEEK, SETTING_START_DAY_WEEK_FAIL, SETTING_START_DAY_WEEK_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const settingStartingDay = ({ day, scheduleGroupID }, quite = false) => ({
  type: SETTING_START_DAY_WEEK,
  quite,
  options: {
    day, scheduleGroupID
  },
});

export const settingStartingDaySuccess = ({ state }, options) => ({
  type: SETTING_START_DAY_WEEK_SUCCESS,
  options,
  data: {
    state
  }
});

export const settingStartingDayFail = (error, options) => ({
  type: SETTING_START_DAY_WEEK_FAIL,
  options,
  error,
});