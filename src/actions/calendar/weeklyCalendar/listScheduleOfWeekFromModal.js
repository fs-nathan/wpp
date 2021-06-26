import { SCHEDULE_OF_WEEK_LIST_FROM_MODAL, SCHEDULE_OF_WEEK_LIST_FROM_MODAL_FAIL, SCHEDULE_OF_WEEK_LIST_FROM_MODAL_SUCCESS } from '../../../constants/actions/calendar/weeklyCalendar';

export const listScheduleOfWeek = ({ schedule_id }, quite = false) => ({
  type: SCHEDULE_OF_WEEK_LIST_FROM_MODAL,
  quite,
  options: {
    schedule_id
  },
});

export const listScheduleOfWeekSuccess = ({ schedules }, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_FROM_MODAL_SUCCESS,
  options,
  data: {
    schedules
  }
});

export const listScheduleOfWeekFail = (error, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_FROM_MODAL_FAIL,
  options,
  error,
});