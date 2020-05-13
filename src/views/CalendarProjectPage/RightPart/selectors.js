import { get } from "lodash";
import { createSelector } from 'reselect';

const calendarState = state => state.calendar;
export const calendarStateSelector = createSelector(
  [calendarState],
  (calendarState) => {
    let afterSettingStartDayOfWeek = get(calendarState.projectGroupSettingStartingDay, "data.scheduleGroup");
    let afterSettingWorkingDayInWeek = get(calendarState.projectGroupSetWorkingDay, "data.scheduleGroup", null);
    let afterAddWorkingDay = get(calendarState.projectGroupAddWorkingDays, "data.workDays", null);
    let afterDeleteWorkingDay = get(calendarState.projectGroupDeleteWorkingDays, "data.workDays", null);
    let afterAddDayOff = get(calendarState.projectGroupAddDayOff, "data.workDays", null);
    let afterDeleteDayOff = get(calendarState.projectGroupDeleteDayOff, "data.workDays", null);
    let afterAddWorkingStage = get(calendarState.projectCalendarAddWorkingStage, "data.stage", null);
    let afterDeleteWorkingStage = get(calendarState.projectCalendarDeleteWorkingStage, "data.stage", null);
    let afterUpdateWorkingStage = get(calendarState.projectCalendarUpdateWorkingStage, "data.stage", null);
    let afterOperateShiftStage = {
      'shifts': get(calendarState.projectCalendarCreateShiftStage, "data.shifts", null)
        ?? get(calendarState.projectCalendarUpdateShiftStage, "data.shifts", null)
        ?? get(calendarState.projectCalendarDeleteShiftStage, "data.shifts", null)
        ?? get(calendarState.projectCalendarCreateShiftStageAllTime, "data.shifts", null)
        ?? get(calendarState.projectCalendarUpdateShiftStageAllTime, "data.shifts", null)
        ?? get(calendarState.projectCalendarDeleteShiftStageAllTime, "data.shifts", null),
      'stageID': get(calendarState.projectCalendarCreateShiftStage, "data.stage_id", null)
        ?? get(calendarState.projectCalendarUpdateShiftStage, "data.stage_id", null)
        ?? get(calendarState.projectCalendarDeleteShiftStage, "data.stage_id", null)
    }

    return ({
      afterSettingStartDayOfWeek,
      afterSettingWorkingDayInWeek,
      afterAddWorkingDay,
      afterDeleteWorkingDay,
      afterAddDayOff,
      afterDeleteDayOff,
      afterAddWorkingStage,
      afterUpdateWorkingStage,
      afterDeleteWorkingStage,
      afterOperateShiftStage
    });
  }
);