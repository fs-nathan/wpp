import { GROUP_SCHEDULE_DETAIL, GROUP_SCHEDULE_DETAIL_FAIL, GROUP_SCHEDULE_DETAIL_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const getGroupScheduleDetail = ({ scheduleID }, quite = false) => ({
  type: GROUP_SCHEDULE_DETAIL,
  quite,
  options: {
    scheduleID
  }
});

export const getGroupScheduleDetailSuccess = ({ schedule,url_view_more }, options) => ({
  type: GROUP_SCHEDULE_DETAIL_SUCCESS,
  options,
  data: {
    schedule,
    url_view_more
  }
});



export const getGroupScheduleDetailFail = (error, options) => ({
  type: GROUP_SCHEDULE_DETAIL_FAIL,
  options,
  error,
});