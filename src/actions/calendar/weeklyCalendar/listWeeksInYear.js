import { LIST_WEEKS_IN_YEAR, LIST_WEEKS_IN_YEAR_SUCCESS, SCHEDULE_OF_WEEK_LIST_FAIL } from '../../../constants/actions/calendar/weeklyCalendar';
import { apiService } from '../../../constants/axiosInstance';

export const listWeeksInYear = ({ year }, quite = false) => ({
  type: LIST_WEEKS_IN_YEAR,
  quite,
  options: {
    year
  },
});

export const listWeeksInYearSuccess = ({ weeks }, options) => ({
  type: LIST_WEEKS_IN_YEAR_SUCCESS,
  options,
  data: {
    weeks
  }
});

export const listWeeksInYearFail = (error, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_FAIL,
  options,
  error,
});

export const fetchListWeekOfYear = data => {
  return apiService({
    url: '/work-schedule/get-list-week',
    method: 'get',
    params: data
  });
};

export const createWeekSchedule = data => {
  return apiService({
    url: '/work-schedule/create-week-schedule',
    method: 'post',
    data
  });
};

export const updateWeekSchedule = data => {
  return apiService({
    url: '/work-schedule/update-week-schedule',
    method: 'post',
    data
  });
};

export const deleteWeekSchedule = data => {
  return apiService({
    url: '/work-schedule/delete-week-schedule',
    method: 'post',
    data
  });
};