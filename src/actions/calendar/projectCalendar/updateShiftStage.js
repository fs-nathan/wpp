import { GROUP_SCHEDULE_UPDATE_SHIFT_STAGE, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_FAIL, GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const updateShiftStage = ({ scheduleGroupID, stageID, shiftID, name, timeStart, timeEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE,
  quite,
  options: {
    scheduleGroupID, name, stageID, timeStart, timeEnd, shiftID
  }
});

export const updateShiftStageSuccess = ({ shifts }, options) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_SUCCESS,
  options,
  data: {
    shifts
  }
});

export const updateShiftStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_UPDATE_SHIFT_STAGE_FAIL,
  options,
  error,
});