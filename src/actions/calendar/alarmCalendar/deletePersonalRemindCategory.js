import { DELETE_PERSONAL_CATEGORY_REMIND, DELETE_PERSONAL_CATEGORY_REMIND_FAIL, DELETE_PERSONAL_CATEGORY_REMIND_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const deletePersonalRemindCategory = ({ categoryID }, quite = false) => ({
  type: DELETE_PERSONAL_CATEGORY_REMIND,
  quite,
  options: {
    categoryID
  }
});

export const deletePersonalRemindCategorySuccess = ({ state }, options) => ({
  type: DELETE_PERSONAL_CATEGORY_REMIND_SUCCESS,
  options,
  data: {
    state
  }
});

export const deletePersonalRemindCategoryFail = (error, options) => ({
  type: DELETE_PERSONAL_CATEGORY_REMIND_FAIL,
  options,
  error,
});