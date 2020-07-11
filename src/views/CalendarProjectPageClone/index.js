import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import { listProjectSchedule } from "actions/calendar/projectCalendar/listSchedule";
import { changeProjectSchedule } from 'actions/gantt';
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { apiService } from "constants/axiosInstance";
import {
  CREATE_PROJECT_GROUP_SCHEDULE,
  CustomEventDispose,
  CustomEventListener,
  DELETE_PROJECT_GROUP_SCHEDULE
} from "constants/events";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import CalendarProjectLeftPart from "./LeftPart";
import CalendarProjectRightPart from "./RightPart";
import { projectGroupScheduleSelector } from "./selectors";

function CalendarProjectPage({
  doListProjectSchedule,
  groupSchedules,
  setopenModal,
  doListPermission,
  permissions,
  scheduleIdDefault,
}) {
  const params = useParams()
  React.useEffect(() => {
    doListProjectSchedule(false);
    const reloadListProjectSchedule = () => {
      doListProjectSchedule(false);
    };
    CustomEventListener(
      DELETE_PROJECT_GROUP_SCHEDULE,
      reloadListProjectSchedule
    );
    CustomEventListener(
      CREATE_PROJECT_GROUP_SCHEDULE,
      reloadListProjectSchedule
    );
    return () => {
      CustomEventDispose(
        CREATE_PROJECT_GROUP_SCHEDULE,
        reloadListProjectSchedule
      );
      CustomEventDispose(
        DELETE_PROJECT_GROUP_SCHEDULE,
        reloadListProjectSchedule
      );
    };
  }, [doListProjectSchedule, useMountedState()]);

  React.useEffect(() => {
    if (permissions.length === 0) {
      doListPermission(false);
    }
  }, [doListPermission]);
  React.useEffect(() => {
    if (permissions.length === 0) {
      doListPermission(false);
    }
  }, [doListPermission]);
  const fetchProjectSchedules = async () => {
    try {
      const { projectId } = params
      const result = await apiService({
        url: `project/get-schedules?project_id=${projectId}`
      })
      changeProjectSchedule(result.data.schedules)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    fetchProjectSchedules()
  }, [params.projectId])
  return (
    <TwoColumnsLayout
      leftRenders={[
        () => (
          <CalendarProjectLeftPart
            groupSchedules={groupSchedules}
            permissions={permissions}
            scheduleIdDefault={scheduleIdDefault}
            setopenModal={setopenModal}
          />
        ),
      ]}
      rightRender={() => (
        <CalendarProjectRightPart
          scheduleIdDefault={scheduleIdDefault}
          groupSchedules={groupSchedules}
          permissions={permissions}
        />
      )}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doListProjectSchedule: (quite) => dispatch(listProjectSchedule(quite)),
    doListPermission: (quite) => dispatch(listCalendarPermission(quite)),
    changeProjectSchedule: (schedule) => dispatch(changeProjectSchedule(schedule))
  };
};

const mapStateToProps = (state) => {
  return {
    groupSchedules: projectGroupScheduleSelector(state),
    permissions: state.calendar.listCalendarPermission.data.permissions,

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarProjectPage);
