import { DELETE_PERSONAL_REMIND, DELETE_PERSONAL_REMIND_FAIL, DELETE_PERSONAL_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const deletePersonalRemind = ({ remindID }, quite = false) => ({
  type: DELETE_PERSONAL_REMIND,
  quite,
  options: {
    remindID
  }
});

export const deletePersonalRemindSuccess = ({ state }, options) => ({
  type: DELETE_PERSONAL_REMIND_SUCCESS,
  options,
  data: {
    state
  }
});

export const deletePersonalRemindFail = (error, options) => ({
  type: DELETE_PERSONAL_REMIND_FAIL,
  options,
  error,
});