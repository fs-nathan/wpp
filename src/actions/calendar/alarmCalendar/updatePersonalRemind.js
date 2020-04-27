import { UPDATE_PERSONAL_REMIND, UPDATE_PERSONAL_REMIND_FAIL, UPDATE_PERSONAL_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const updatePersonalRemind = ({ model }, quite = false) => ({
  type: UPDATE_PERSONAL_REMIND,
  quite,
  options: {
    model
  }
});

export const updatePersonalRemindSuccess = ({ remind }, options) => ({
  type: UPDATE_PERSONAL_REMIND_SUCCESS,
  options,
  data: {
    remind
  }
});

export const updatePersonalRemindFail = (error, options) => ({
  type: UPDATE_PERSONAL_REMIND_FAIL,
  options,
  error,
});