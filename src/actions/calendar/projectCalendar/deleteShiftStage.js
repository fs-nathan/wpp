import { GROUP_SCHEDULE_DELETE_SHIFT_STAGE, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_FAIL, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const deleteShiftStage = ({ scheduleGroupID, stageID, shiftID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE,
  quite,
  options: {
    scheduleGroupID, stageID, shiftID
  }
});

export const deleteShiftStageSuccess = ({ shifts, stage_id }, options) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE_SUCCESS,
  options,
  data: {
    shifts, stage_id
  }
});

export const deleteShiftStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_SHIFT_STAGE_FAIL,
  options,
  error,
});