import { GROUP_SCHEDULE_DELETE_WORKING_STAGE, GROUP_SCHEDULE_DELETE_WORKING_STAGE_FAIL, GROUP_SCHEDULE_DELETE_WORKING_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const deleteWorkingStage = ({ scheduleGroupID, stageID }, quite = false) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_STAGE,
  quite,
  options: {
    scheduleGroupID, stageID
  }
});

export const deleteWorkingStageSuccess = ({ stage }, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_STAGE_SUCCESS,
  options,
  data: {
    stage
  }
});

export const deleteWorkingStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_DELETE_WORKING_STAGE_FAIL,
  options,
  error,
});