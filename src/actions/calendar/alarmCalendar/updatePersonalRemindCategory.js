import { UPDATE_PERSONAL_CATEGORY_REMIND, UPDATE_PERSONAL_CATEGORY_REMIND_FAIL, UPDATE_PERSONAL_CATEGORY_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const updatePersonalRemindCategory = ({ categoryID, name, color }, quite = false) => ({
  type: UPDATE_PERSONAL_CATEGORY_REMIND,
  quite,
  options: {
    name, color, categoryID
  }
});

export const updatePersonalRemindCategorySuccess = ({ category }, options) => ({
  type: UPDATE_PERSONAL_CATEGORY_REMIND_SUCCESS,
  options,
  data: {
    category
  }
});

export const updatePersonalRemindCategoryFail = (error, options) => ({
  type: UPDATE_PERSONAL_CATEGORY_REMIND_FAIL,
  options,
  error,
});