import { GROUP_SCHEDULE_UPDATE_WORKING_STAGE, GROUP_SCHEDULE_UPDATE_WORKING_STAGE_FAIL, GROUP_SCHEDULE_UPDATE_WORKING_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const updateWorkingStage = ({ scheduleGroupID, stageID, dateStart, dateEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_UPDATE_WORKING_STAGE,
  quite,
  options: {
    scheduleGroupID, dateStart, dateEnd, stageID
  }
});

export const updateWorkingStageSuccess = ({ stage }, options) => ({
  type: GROUP_SCHEDULE_UPDATE_WORKING_STAGE_SUCCESS,
  options,
  data: {
    stage
  }
});

export const updateWorkingStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_UPDATE_WORKING_STAGE_FAIL,
  options,
  error,
});