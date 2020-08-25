import { GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME_FAIL, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const deleteShiftStageAllTime = ({ scheduleGroupID, shiftID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME,
  quite,
  options: {
    scheduleGroupID, shiftID
  }
});

export const deleteShiftStageAllTimeSuccess = ({ shifts }, options) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME_SUCCESS,
  options,
  data: {
    shifts
  }
});

export const deleteShiftStageAllTimeFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME_FAIL,
  options,
  error,
});