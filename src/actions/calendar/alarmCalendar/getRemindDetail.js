import { GET_REMIND_DETAIL_SUCCESS, GET_REMIND_DETAIL_FAIL, GET_REMIND_DETAIL } from '../../../constants/actions/calendar/alarmCalendar';

export const getRemindDetail = ({ remind_id }, quite = false) => ({
  type: GET_REMIND_DETAIL,
  quite,
  options: {
    remind_id
  }
});

export const getRemindDetailSuccess = ({ remind }, options) => ({
  type: GET_REMIND_DETAIL_SUCCESS,
  options,
  data: {
    remind
  }
});

export const getRemindDetailFail = (error, options) => ({
  type: GET_REMIND_DETAIL_FAIL,
  options,
  error,
});