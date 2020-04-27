import { LIST_REMIND_RECENTLY, LIST_REMIND_RECENTLY_FAIL, LIST_REMIND_RECENTLY_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const listRemindRecently = (quite = false) => ({
  type: LIST_REMIND_RECENTLY,
  quite
});

export const listRemindRecentlySuccess = ({ reminds }, options) => ({
  type: LIST_REMIND_RECENTLY_SUCCESS,
  options,
  data: {
    reminds
  }
});

export const listRemindRecentlyFail = (error, options) => ({
  type: LIST_REMIND_RECENTLY_FAIL,
  options,
  error,
});