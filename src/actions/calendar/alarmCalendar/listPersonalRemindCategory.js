import { LIST_PERSONAL_REMIND_CATEGORY, LIST_PERSONAL_REMIND_CATEGORY_FAIL, LIST_PERSONAL_REMIND_CATEGORY_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const listPersonalRemindCategory = (quite = false) => ({
  type: LIST_PERSONAL_REMIND_CATEGORY,
  quite
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