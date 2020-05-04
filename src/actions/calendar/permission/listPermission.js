import { CALENDAR_PAGE_PERMISSION, CALENDAR_PAGE_PERMISSION_FAIL, CALENDAR_PAGE_PERMISSION_SUCCESS } from '../../../constants/actions/calendar/permission';

export const listCalendarPermission = (quite = false) => ({
  type: CALENDAR_PAGE_PERMISSION,
  quite
});

export const listCalendarPermissionSuccess = ({ permissions }, options) => ({
  type: CALENDAR_PAGE_PERMISSION_SUCCESS,
  options,
  data: {
    permissions
  }
});

export const listCalendarPermissionFail = (error, options) => ({
  type: CALENDAR_PAGE_PERMISSION_FAIL,
  options,
  error,
});