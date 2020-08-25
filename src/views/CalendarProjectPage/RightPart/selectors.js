import { get } from "lodash";
import { createSelector } from 'reselect';

const calendarState = state => state.calendar;
export const projectGroupNewScheduleDetailSelector = createSelector(
  [calendarState],
  (calendarState) => {
    let afterUpdateGroupSchedule = get(calendarState.updateProjectGroupSchedule, "data.scheduleGroup", null);
    let afterCreateGroupSchedule = get(calendarState.createProjectGroupSchedule, "data.scheduleGroup", null);
    let afterDeleteGroupSchedule = get(calendarState.deleteProjectGroupSchedule, "data.schedule_id", null);
    let afterSettingStartingDayOfWeek = get(calendarState.projectGroupSettingStartingDay, "data.scheduleGroup", null);
    let afterSettingWorkingDayInWeek = get(calendarState.projectGroupSetWorkingDay, "data.scheduleGroup", null);
    let afterAddWorkingDay = get(calendarState.projectGroupAddWorkingDays, "data.workDays", null);
    let afterDeleteWorkingDay = get(calendarState.projectGroupDeleteWorkingDays, "data.workDays", null);
    let afterAddDayOff = get(calendarState.projectGroupAddDayOff, "data.workDays", null);
    let afterDeleteDayOff = get(calendarState.projectGroupDeleteDayOff, "data.workDays", null);
    let afterAddWorkingStage = get(calendarState.projectCalendarAddWorkingStage, "data.stage", null);
    let afterDeleteWorkingStage = get(calendarState.projectCalendarDeleteWorkingStage, "data.stage", null);
    let afterUpdateWorkingStage = get(calendarState.projectCalendarUpdateWorkingStage, "data.stage", null);
    let afterCreateShiftStage = {
      'shifts': get(calendarState.projectCalendarCreateShiftStage, "data.shifts", null),
      'stageID': get(calendarState.projectCalendarCreateShiftStage, "data.stage_id", null)
    }
    let afterUpdateShiftStage = {
      'shifts': get(calendarState.projectCalendarUpdateShiftStage, "data.shifts", null),
      'stageID': get(calendarState.projectCalendarUpdateShiftStage, "data.stage_id", null)
    }
    let afterDeleteShiftStage = {
      'shifts': get(calendarState.projectCalendarDeleteShiftStage, "data.shifts", null),
      'stageID': get(calendarState.projectCalendarDeleteShiftStage, "data.stage_id", null)
    }
    let afterCreateShiftStageAllTime = {
      'shifts': get(calendarState.projectCalendarCreateShiftStageAllTime, "data.shifts", null),
      'stageID': null
    }
    let afterUpdateShiftStageAllTime = {
      'shifts': get(calendarState.projectCalendarUpdateShiftStageAllTime, "data.shifts", null),
      'stageID': null
    }
    let afterDeleteShiftStageAllTime = {
      'shifts': get(calendarState.projectCalendarDeleteShiftStageAllTime, "data.shifts", null),
      'stageID': null
    }

    return ({
      afterCreateGroupSchedule,
      afterUpdateGroupSchedule,
      afterDeleteGroupSchedule,
      afterSettingStartingDayOfWeek,
      afterSettingWorkingDayInWeek,
      afterAddWorkingDay,
      afterDeleteWorkingDay,
      afterAddDayOff,
      afterDeleteDayOff,
      afterAddWorkingStage,
      afterUpdateWorkingStage,
      afterDeleteWorkingStage,
      afterCreateShiftStageAllTime,
      afterUpdateShiftStageAllTime,
      afterDeleteShiftStageAllTime,
      afterCreateShiftStage,
      afterUpdateShiftStage,
      afterDeleteShiftStage
    });
  }
);