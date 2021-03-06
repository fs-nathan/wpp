import { LIST_PERSONAL_REMIND_CATEGORY, LIST_PERSONAL_REMIND_CATEGORY_FAIL, LIST_PERSONAL_REMIND_CATEGORY_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';
import { apiService } from '../../../constants/axiosInstance';

export const listPersonalRemindCategory = ({ fromTime, toTime }, quite = false) => ({
  type: LIST_PERSONAL_REMIND_CATEGORY,
  quite,
  options: {
    fromTime, toTime
  }
});

export const listPersonalRemindCategorySuccess = ({ categories }, options) => ({
  type: LIST_PERSONAL_REMIND_CATEGORY_SUCCESS,
  options,
  data: {
    categories
  }
});

export const listPersonalRemindCategoryFail = (error, options) => ({
  type: LIST_PERSONAL_REMIND_CATEGORY_FAIL,
  options,
  error,
});

export const fetchListCategory = params => {
  const config = {
    url: '/personal-remind-category/list',
    method: 'get',
    params
  };
  return apiService(config);
};