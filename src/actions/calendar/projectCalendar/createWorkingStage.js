import { GROUP_SCHEDULE_ADD_WORKING_STAGE, GROUP_SCHEDULE_ADD_WORKING_STAGE_FAIL, GROUP_SCHEDULE_ADD_WORKING_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const addWorkingStage = ({ scheduleGroupID, dateStart, dateEnd }, quite = false) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_STAGE,
  quite,
  options: {
    scheduleGroupID, dateStart, dateEnd
  }
});

export const addWorkingStageSuccess = ({ stage }, options) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_STAGE_SUCCESS,
  options,
  data: {
    stage
  }
});

export const addWorkingStageFail = (error, options) => ({
  type: GROUP_SCHEDULE_ADD_WORKING_STAGE_FAIL,
  options,
  error,
});