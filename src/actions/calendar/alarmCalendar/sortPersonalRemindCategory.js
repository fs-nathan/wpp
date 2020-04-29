import { SORT_PERSONAL_REMIND_CATEGORY, SORT_PERSONAL_REMIND_CATEGORY_FAIL, SORT_PERSONAL_REMIND_CATEGORY_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const sortPersonalRemindCategory = ({ category_id, sort_index }, quite = false) => ({
  type: SORT_PERSONAL_REMIND_CATEGORY,
  quite,
  options: {
    category_id, sort_index
  }
});

export const sortPersonalRemindCategorySuccess = ({ categories }, options) => ({
  type: SORT_PERSONAL_REMIND_CATEGORY_SUCCESS,
  options,
  data: {
    categories
  }
});

export const sortPersonalRemindCategoryFail = (error, options) => ({
  type: SORT_PERSONAL_REMIND_CATEGORY_FAIL,
  options,
  error,
});