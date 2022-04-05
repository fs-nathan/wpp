import { projectScheduleAddDayOff } from "actions/calendar/projectCalendar/addDayOff";
import { projectScheduleAddWorkingDay } from "actions/calendar/projectCalendar/addWorkingDay";
import { createShiftStage } from "actions/calendar/projectCalendar/createShiftStage";
import { createShiftStageAllTime } from "actions/calendar/projectCalendar/createShiftStageAllTime";
import { addWorkingStage } from "actions/calendar/projectCalendar/createWorkingStage";
import { projectScheduleDeleteDayOff } from "actions/calendar/projectCalendar/deleteDayOff";
import { deleteProjectSchedule } from "actions/calendar/projectCalendar/deleteProjectGroupSchedule";
import { deleteShiftStage } from "actions/calendar/projectCalendar/deleteShiftStage";
import { deleteShiftStageAllTime } from "actions/calendar/projectCalendar/deleteShiftStageAllTime";
import { projectScheduleDeleteWorkingDay } from "actions/calendar/projectCalendar/deleteWorkingDay";
import { deleteWorkingStage } from "actions/calendar/projectCalendar/deleteWorkingStage";
import { getGroupScheduleDetail } from "actions/calendar/projectCalendar/getGroupScheduleDetail";
import { settingStartingDay } from "actions/calendar/projectCalendar/settingStartingDay";
import { setWorkingDays } from "actions/calendar/projectCalendar/setWorkingDay";
import { updateProjectSchedule } from "actions/calendar/projectCalendar/updateProjectGroupSchedule";
import { updateShiftStage } from "actions/calendar/projectCalendar/updateShiftStage";
import { updateShiftStageAllTime } from "actions/calendar/projectCalendar/updateShiftStageAllTime";
import { updateWorkingStage } from "actions/calendar/projectCalendar/updateWorkingStage";
import AlertModal from "components/AlertModal";
import { Routes } from "constants/routes";
import { get, isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { projectGroupScheduleDetailSelector } from "../selectors";
import CalendarProjectRightPartPresenter from "./presenter";

function CalendarProjectRightPart({
  scheduleDetail,
  doGetScheduleDetail,
  groupSchedules,
  doSettingStartDayOfWeek,
  doAddWorkingDay,
  doDeleteDayOff,
  doDeleteWorkingDay,
  doAddDayOff,
  doSetWorkingDayInWeek,
  doAddWorkingStage,
  doDeleteWorkingStage,
  doUpdateWorkingStage,
  doCreateShiftStage,
  doUpdateShiftStage,
  doDeleteShiftStage,
  doCreateShiftStageAllTime,
  doUpdateShiftStageAllTime,
  doDeleteShiftStageAllTime,
  doDeleteGroupSchedule,
  doUpdateGroupSchedule,
  permissions,
}) {
  const params = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const [defaultGroup, setDefaultGroup] = React.useState();
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [actionDeleteType, setActionDeleteType] = React.useState({
    type: null,
  });
  const [shiftID, setShiftID] = React.useState();
  const [stageID, setStageID] = React.useState();
  const [day, setDay] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let scheduleID = params?.scheduleID;
    if (scheduleID) {
      console.log('params')
      doGetScheduleDetail({ scheduleID }, false);
    } else {
      if (defaultGroup) {
        doGetScheduleDetail({ scheduleID: defaultGroup?.id }, false);
        history.push(
          Routes.CALENDAR_PROJECT.replace(
            ":scheduleID",
            get(defaultGroup, "id")
          )
        );
      } 
    }
  }, [doGetScheduleDetail, params.scheduleID, defaultGroup]);

  React.useEffect(() => {
    if (
      Array.isArray(groupSchedules.data) &&
      groupSchedules.data.length !== 0
    ) {
      setDefaultGroup(get(groupSchedules, "data[0]"));
    }
  }, [groupSchedules]);

  function handleSettingStartingDayOfWeek(day) {
    doSettingStartDayOfWeek({ day, scheduleGroupID: params.scheduleID }, false);
  }

  function handleAddWorkingDay(dateStart, dateEnd) {
    doAddWorkingDay(
      { scheduleGroupID: params.scheduleID, dateStart, dateEnd },
      false
    );
  }

  function handleDeleteWorkingDays(day) {
    doDeleteWorkingDay(
      { scheduleGroupID: params.scheduleID, dayID: day.id },
      false
    );
  }

  function handleAddDayOff(dateStart, dateEnd) {
    doAddDayOff(
      { scheduleGroupID: params.scheduleID, dateStart, dateEnd },
      false
    );
  }

  function handleDeleteDayOff(day) {
    doDeleteDayOff(
      { scheduleGroupID: params.scheduleID, dayID: day.id },
      false
    );
  }

  function handleAddWorkingDayInWeek(workingDays) {
    doSetWorkingDayInWeek(
      { scheduleGroupID: params.scheduleID, workingDays },
      false
    );
  }

  function handleAddWorkingStage(dateStart, dateEnd) {
    doAddWorkingStage(
      { scheduleGroupID: params.scheduleID, dateStart, dateEnd },
      false
    );
  }

  function handleDeleteWorkingStage(stageID) {
    doDeleteWorkingStage(
      { scheduleGroupID: params.scheduleID, stageID },
      false
    );
  }

  function handleUpdateWorkingStage(stageID, dateStart, dateEnd) {
    doUpdateWorkingStage(
      { scheduleGroupID: params.scheduleID, stageID, dateStart, dateEnd },
      false
    );
  }

  function handleCreateShiftStage(stageID, name, timeStart, timeEnd) {
    if (isNil(stageID)) {
      doCreateShiftStageAllTime(
        { scheduleGroupID: params.scheduleID, name, timeStart, timeEnd },
        false
      );
    } else {
      doCreateShiftStage(
        {
          scheduleGroupID: params.scheduleID,
          stageID,
          name,
          timeStart,
          timeEnd,
        },
        false
      );
    }
  }

  function hanleDeleteShiftStage(stageID, shiftID) {
    doDeleteShiftStage(
      { scheduleGroupID: params.scheduleID, stageID, shiftID },
      false
    );
  }

  function handleUpdateShiftStage(stageID, shiftID, name, timeStart, timeEnd) {
    if (isNil(stageID)) {
      doUpdateShiftStageAllTime(
        {
          scheduleGroupID: params.scheduleID,
          shiftID,
          name,
          timeStart,
          timeEnd,
        },
        false
      );
    } else {
      doUpdateShiftStage(
        {
          scheduleGroupID: params.scheduleID,
          stageID,
          shiftID,
          name,
          timeStart,
          timeEnd,
        },
        false
      );
    }
  }

  function handleDeleteShiftStageAllTime(shiftID) {
    doDeleteShiftStageAllTime(
      { scheduleGroupID: params.scheduleID, shiftID },
      false
    );
  }

  function handleDeleteGroup() {
    let scheduleID = params.scheduleID;
    if (!isNil(scheduleID)) {
      doDeleteGroupSchedule({ schedule_group_id: scheduleID }, false);
      history.push(
        Routes.CALENDAR_PROJECT.replace(":scheduleID", get(defaultGroup, "id"))
      );
    }
  }

  function handleUpdateGroupSchedule(name, description) {
    doUpdateGroupSchedule(
      { schedule_group_id: params.scheduleID, name, description },
      false
    );
  }

  return (
    <>
      {params?.scheduleID ? (
        <CalendarProjectRightPartPresenter
          havePermission={scheduleDetail.data && scheduleDetail.data.can_modify}
          scheduleDetail={scheduleDetail}
          groupSchedules={groupSchedules}
          setIsLoadingOuter={setIsLoading}
          handleSettingStartingDayOfWeek={(day) =>
            handleSettingStartingDayOfWeek(day)
          }
          handleAddWorkingDay={(dateStart, dateEnd) =>
            handleAddWorkingDay(dateStart, dateEnd)
          }
          handleDeleteWorkingDays={(day) => {
            setDay(day);
            setActionDeleteType({ type: "DELETE_WORKING_DAY" });
            setAlertConfirm(true);
          }}
          handleAddDayOff={(dateStart, dateEnd) =>
            handleAddDayOff(dateStart, dateEnd)
          }
          handleDeleteDayOff={(day) => {
            setDay(day);
            setActionDeleteType({ type: "DELETE_DAY_OFF" });
            setAlertConfirm(true);
          }}
          handleAddWorkingDayInWeek={handleAddWorkingDayInWeek}
          handleAddWorkingStage={(dateStart, dateEnd) =>
            handleAddWorkingStage(dateStart, dateEnd)
          }
          handleDeleteWorkingStage={(stageID) => {
            setStageID(stageID);
            setActionDeleteType({ type: "DELETE_WORKING_STAGE" });
            setAlertConfirm(true);
          }}
          handleUpdateWorkingStage={handleUpdateWorkingStage}
          handleCreateShiftStage={handleCreateShiftStage}
          hanleDeleteShiftStage={(stageID, shiftID) => {
            setShiftID(shiftID);
            setStageID(stageID);
            setActionDeleteType({ type: "DELETE_SHIFT_STAGE" });
            setAlertConfirm(true);
          }}
          handleUpdateShiftStage={handleUpdateShiftStage}
          handleDeleteShiftStageAllTime={(shiftID) => {
            setShiftID(shiftID);
            setActionDeleteType({ type: "DELETE_SHIFT_STAGE_ALLTIME" });
            setAlertConfirm(true);
          }}
          handleDeleteGroup={() => {
            setActionDeleteType({ type: "DELETE_GROUP_SCHEDULE" });
            setAlertConfirm(true);
          }}
          handleUpdateGroupSchedule={(name, description) =>
            handleUpdateGroupSchedule(name, description)
          }
        />
      ) : null}

      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t("IDS_WP_ALERT_CONTENT")}
        actionLoading={isLoading}
        onConfirm={() => {
          setIsLoading(true);
          switch (actionDeleteType.type) {
            case "DELETE_GROUP_SCHEDULE":
              handleDeleteGroup();
              return;
            case "DELETE_SHIFT_STAGE_ALLTIME":
              handleDeleteShiftStageAllTime(shiftID);
              return;
            case "DELETE_SHIFT_STAGE":
              hanleDeleteShiftStage(stageID, shiftID);
              return;
            case "DELETE_WORKING_DAY":
              handleDeleteWorkingDays(day);
              return;
            case "DELETE_DAY_OFF":
              handleDeleteDayOff(day);
              return;
            case "DELETE_WORKING_STAGE":
              handleDeleteWorkingStage(stageID);
              return;
            default:
              return;
          }
        }}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doGetScheduleDetail: ({ scheduleID }, quite) =>
      dispatch(getGroupScheduleDetail({ scheduleID }, quite)),
    doSettingStartDayOfWeek: ({ day, scheduleGroupID }, quite) =>
      dispatch(settingStartingDay({ day, scheduleGroupID }, quite)),
    doAddWorkingDay: ({ scheduleGroupID, dateStart, dateEnd }, quite) =>
      dispatch(
        projectScheduleAddWorkingDay(
          { scheduleGroupID, dateStart, dateEnd },
          quite
        )
      ),
    doDeleteWorkingDay: ({ scheduleGroupID, dayID }, quite) =>
      dispatch(
        projectScheduleDeleteWorkingDay({ scheduleGroupID, dayID }, quite)
      ),
    doDeleteDayOff: ({ scheduleGroupID, dayID }, quite) =>
      dispatch(projectScheduleDeleteDayOff({ scheduleGroupID, dayID }, quite)),
    doAddDayOff: ({ scheduleGroupID, dateStart, dateEnd }, quite) =>
      dispatch(
        projectScheduleAddDayOff({ scheduleGroupID, dateStart, dateEnd }, quite)
      ),
    doSetWorkingDayInWeek: ({ scheduleGroupID, workingDays }, quite) =>
      dispatch(setWorkingDays({ scheduleGroupID, workingDays }, quite)),
    doAddWorkingStage: ({ scheduleGroupID, dateStart, dateEnd }, quite) =>
      dispatch(addWorkingStage({ scheduleGroupID, dateStart, dateEnd }, quite)),
    doUpdateWorkingStage: (
      { scheduleGroupID, stageID, dateStart, dateEnd },
      quite
    ) =>
      dispatch(
        updateWorkingStage(
          { scheduleGroupID, stageID, dateStart, dateEnd },
          quite
        )
      ),
    doDeleteWorkingStage: ({ scheduleGroupID, stageID }, quite) =>
      dispatch(deleteWorkingStage({ scheduleGroupID, stageID }, quite)),
    doCreateShiftStage: (
      { scheduleGroupID, stageID, name, timeStart, timeEnd },
      quite
    ) =>
      dispatch(
        createShiftStage(
          { scheduleGroupID, stageID, name, timeStart, timeEnd },
          quite
        )
      ),
    doUpdateShiftStage: (
      { scheduleGroupID, stageID, shiftID, name, timeStart, timeEnd },
      quite
    ) =>
      dispatch(
        updateShiftStage(
          { scheduleGroupID, stageID, shiftID, name, timeStart, timeEnd },
          quite
        )
      ),
    doDeleteShiftStage: ({ scheduleGroupID, stageID, shiftID }, quite) =>
      dispatch(deleteShiftStage({ scheduleGroupID, stageID, shiftID }, quite)),
    doCreateShiftStageAllTime: (
      { scheduleGroupID, name, timeStart, timeEnd },
      quite
    ) =>
      dispatch(
        createShiftStageAllTime(
          { scheduleGroupID, name, timeStart, timeEnd },
          quite
        )
      ),
    doUpdateShiftStageAllTime: (
      { scheduleGroupID, shiftID, name, timeStart, timeEnd },
      quite
    ) =>
      dispatch(
        updateShiftStageAllTime(
          { scheduleGroupID, shiftID, name, timeStart, timeEnd },
          quite
        )
      ),
    doDeleteShiftStageAllTime: ({ scheduleGroupID, shiftID }, quite) =>
      dispatch(deleteShiftStageAllTime({ scheduleGroupID, shiftID }, quite)),
    doDeleteGroupSchedule: ({ schedule_group_id }, quite) =>
      dispatch(deleteProjectSchedule({ schedule_group_id }, quite)),
    doUpdateGroupSchedule: ({ schedule_group_id, name, description }, quite) =>
      dispatch(
        updateProjectSchedule({ schedule_group_id, name, description }, quite)
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    scheduleDetail: projectGroupScheduleDetailSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarProjectRightPart);
