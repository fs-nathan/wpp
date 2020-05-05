import { LIST_PERSONAL_REMIND, LIST_PERSONAL_REMIND_FAIL, LIST_PERSONAL_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const listPersonalRemind = ({ fromTime, toTime }, quite = false) => ({
  type: LIST_PERSONAL_REMIND,
  quite,
  options: {
    fromTime, toTime
  }
});

export const listPersonalRemindSuccess = ({ reminds }, options) => ({
  type: LIST_PERSONAL_REMIND_SUCCESS,
  options,
  data: {
    reminds
  }
});

export const listPersonalRemindFail = (error, options) => ({
  type: LIST_PERSONAL_REMIND_FAIL,
  options,
  error,
});