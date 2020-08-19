import { CREATE_PERSONAL_CATEGORY_REMIND, CREATE_PERSONAL_CATEGORY_REMIND_FAIL, CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const createPersonalRemindCategory = ({ name, color }, quite = false) => ({
  type: CREATE_PERSONAL_CATEGORY_REMIND,
  quite,
  options: {
    name, color
  }
});

export const createPersonalRemindCategorySuccess = ({ category }, options) => ({
  type: CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS,
  options,
  data: {
    category
  }
});

export const createPersonalRemindCategoryFail = (error, options) => ({
  type: CREATE_PERSONAL_CATEGORY_REMIND_FAIL,
  options,
  error,
});