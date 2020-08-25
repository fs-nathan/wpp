import { GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME_FAIL, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const updateShiftStageAllTime = ({ scheduleGroupID, shiftID, name, timeStart, timeEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME,
  quite,
  options: {
    scheduleGroupID, shiftID, name, timeStart, timeEnd
  }
});

export const updateShiftStageAllTimeSuccess = ({ shifts }, options) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME_SUCCESS,
  options,
  data: {
    shifts
  }
});

export const updateShiftStageAllTimeFail = (error, options) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME_FAIL,
  options,
  error,
});