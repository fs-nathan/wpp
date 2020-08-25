import { LIST_REMIND_PROJECT, LIST_REMIND_PROJECT_FAIL, LIST_REMIND_PROJECT_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const listRemindProject = ({ fromTime, toTime }, quite = false) => ({
  type: LIST_REMIND_PROJECT,
  quite,
  options: {
    fromTime, toTime
  }
});

export const listRemindProjectSuccess = ({ reminds }, options) => ({
  type: LIST_REMIND_PROJECT_SUCCESS,
  options,
  data: {
    reminds
  }
});

export const listRemindProjectFail = (error, options) => ({
  type: LIST_REMIND_PROJECT_FAIL,
  options,
  error,
});