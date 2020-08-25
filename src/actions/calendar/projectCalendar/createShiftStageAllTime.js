import { GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_FAIL, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const createShiftStageAllTime = ({ scheduleGroupID, name, timeStart, timeEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME,
  quite,
  options: {
    scheduleGroupID, name, timeStart, timeEnd
  }
});

export const createShiftStageAllTimeSuccess = ({ shifts }, options) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_SUCCESS,
  options,
  data: {
    shifts
  }
});

export const createShiftStageAllTimeFail = (error, options) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_FAIL,
  options,
  error,
});