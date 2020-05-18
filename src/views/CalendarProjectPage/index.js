import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import { listProjectSchedule } from "actions/calendar/projectCalendar/listSchedule";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { CREATE_PROJECT_GROUP_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP_SCHEDULE, UPDATE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import React from 'react';
import { connect } from 'react-redux';
import { useMountedState } from "react-use";
import CalendarProjectLeftPart from "./LeftPart";
import CalendarProjectRightPart from "./RightPart";
import { projectGroupScheduleSelector } from "./selectors";

function CalendarProjectPage({
  doListProjectSchedule, groupSchedules,
  doListPermission, permissions
}) {
  React.useEffect(() => {
    doListProjectSchedule(false);
    const reloadListProjectSchedule = () => {
      doListProjectSchedule(false);
    }
    CustomEventListener(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    CustomEventListener(CREATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    CustomEventListener(UPDATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
      CustomEventDispose(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
      CustomEventDispose(UPDATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    }
  }, [doListProjectSchedule, useMountedState()]);

  React.useEffect(() => {
    if (permissions.length === 0) {
      doListPermission(false);
    }
  }, [doListPermission]);

  return (
    <TwoColumnsLayout
      leftRenders={[() => <CalendarProjectLeftPart groupSchedules={groupSchedules} permissions={permissions} />]}
      rightRender={
        () => <CalendarProjectRightPart groupSchedules={groupSchedules} permissions={permissions} />
      }
    />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListProjectSchedule: (quite) => dispatch(listProjectSchedule(quite)),
    doListPermission: (quite) => dispatch(listCalendarPermission(quite)),
  };
};

const mapStateToProps = state => {
  return {
    groupSchedules: projectGroupScheduleSelector(state),
    permissions: state.calendar.listCalendarPermission.data.permissions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarProjectPage);