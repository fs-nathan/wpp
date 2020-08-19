import { SETTING_STARTING_DAY, SETTING_STARTING_DAY_FAIL, SETTING_STARTING_DAY_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const settingStartingDay = ({ day }, quite = false) => ({
  type: SETTING_STARTING_DAY,
  quite,
  options: {
    day
  },
});

export const settingStartingDaySuccess = ({ state }, options) => ({
  type: SETTING_STARTING_DAY_SUCCESS,
  options,
  data: {
    state
  }
});

export const settingStartingDayFail = (error, options) => ({
  type: SETTING_STARTING_DAY_FAIL,
  options,
  error,
});