import { GROUP_SCHEDULE_CREATE_SHIFT_STAGE, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_FAIL, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const createShiftStage = ({ scheduleGroupID, stageID, name, timeStart, timeEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE,
  quite,
  options: {
    scheduleGroupID, name, stageID, timeStart, timeEnd
  }
});

export const createShiftStageSuccess = ({ shifts }, options) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE_SUCCESS,
  options,
  data: {
    shifts
  }
});

export const createShiftStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_CREATE_SHIFT_STAGE_FAIL,
  options,
  error,
});