import { listProjectSchedule } from "actions/calendar/projectCalendar/listSchedule";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import React from 'react';
import { connect } from 'react-redux';
import { useMountedState } from "react-use";
import CalendarProjectLeftPart from "./LeftPart";
import CalendarProjectRightPart from "./RightPart";
import { projectGroupScheduleSelector } from "./selectors";

function CalendarProjectPage({
  doListProjectSchedule, groupSchedules
}) {
  React.useEffect(() => {
    doListProjectSchedule(false);
    const reloadListProjectSchedule = () => {
      doListProjectSchedule(false);
    }
    CustomEventListener(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    }
  }, [doListProjectSchedule, useMountedState()]);

  return (
    <TwoColumnsLayout
      leftRenders={[() => <CalendarProjectLeftPart groupSchedules={groupSchedules} />]}
      rightRender={
        () => <CalendarProjectRightPart groupSchedules={groupSchedules} />
      }
    />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListProjectSchedule: (quite) => dispatch(listProjectSchedule(quite)),
  };
};

const mapStateToProps = state => {
  return {
    groupSchedules: projectGroupScheduleSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarProjectPage);