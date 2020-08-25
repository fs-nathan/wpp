import { CREATE_PERSONAL_REMIND, CREATE_PERSONAL_REMIND_FAIL, CREATE_PERSONAL_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const createPersonalRemind = ({ model }, quite = false) => ({
  type: CREATE_PERSONAL_REMIND,
  quite,
  options: {
    model
  }
});

export const createPersonalRemindSuccess = ({ remind }, options) => ({
  type: CREATE_PERSONAL_REMIND_SUCCESS,
  options,
  data: {
    remind
  }
});

export const createPersonalRemindFail = (error, options) => ({
  type: CREATE_PERSONAL_REMIND_FAIL,
  options,
  error,
});