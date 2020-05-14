import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import { deleteAllSchedule } from "actions/calendar/weeklyCalendar/deleteAllSchedule";
import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeek";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { CREATE_WEEKLY_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_ALL_WEEKLY_SCHEDULE, DELETE_WEEKLY_SCHEDULE, UPDATE_WEEKLY_SCHEDULE } from "constants/events";
import { Routes } from "constants/routes";
import { filter } from "lodash";
import get from "lodash/get";
import moment from "moment";
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CreateWeeklyCalendar from '../CalendarPage/views/Modals/CreateWeeklyCalendar';
import CalendarWeeklyLeftPart from "./LeftPart";
import CalendarWeeklyRightPart from "./RightPart";
import { bgColorSelector, calendarsSelector, listWeeksInYearSelector, scheduleOfWeekSelector } from "./selectors";

function CalendarWeeklyPage({
  doListSchedule, calendars, doDeleteAllSchedule,
  CWPDoListScheduleOfWeek, scheduleOfWeek, bgColor,
  doListPermission, permissions
}) {

  const params = useParams();
  const history = useHistory();
  const [year, setYear] = React.useState(params.year ?? new Date().getFullYear());
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = React.useState("CREATE");
  const [selectedYearAndWeekAtModal, setSelectedYearAndWeekAtModal] = React.useState({
    year: parseInt(params.year, 10),
    week: parseInt(params.week, 10)
  });

  React.useEffect(() => {
    doListSchedule({ year }, false);
    const reloadListSchedule = () => {
      doListSchedule({ year }, false);
    }
    CustomEventListener(CREATE_WEEKLY_SCHEDULE, reloadListSchedule);
    CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListSchedule);
    CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListSchedule);
    CustomEventListener(DELETE_ALL_WEEKLY_SCHEDULE, reloadListSchedule);
    return () => {
      CustomEventDispose(CREATE_WEEKLY_SCHEDULE, reloadListSchedule);
      CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListSchedule);
      CustomEventDispose(DELETE_ALL_WEEKLY_SCHEDULE, reloadListSchedule);
      CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListSchedule);
    }
  }, [doListSchedule, year]);

  React.useEffect(() => {
    CWPDoListScheduleOfWeek({ year, week: params.week }, false);
  }, [CWPDoListScheduleOfWeek, year, params.week]);

  React.useEffect(() => {
    const reloadListScheduleOfWeek = () => {
      if (selectedYearAndWeekAtModal.year === parseInt(year, 10) && selectedYearAndWeekAtModal.week === parseInt(params.week, 10)) {
        CWPDoListScheduleOfWeek({ year, week: params.week }, false);
      }
    }
    CustomEventListener(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    return () => {
      CustomEventDispose(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    }
  }, [selectedYearAndWeekAtModal]);

  React.useEffect(() => {
    if (permissions.length === 0) {
      doListPermission(false);
    }
  }, [doListPermission]);

  function handleDeleteAllSchedule(year, week) {
    let schedulesExclude = filter(calendars.data, calendar => calendar.week !== parseInt(week));
    doDeleteAllSchedule({ year, week }, false);
    history.push(Routes.CALENDAR_WEEKLY.replace(":week", get(schedulesExclude, '[0].week', moment().isoWeek())).replace(":year", year));
  }

  React.useEffect(() => {
    if (calendars.data.length === 0) {
      history.push(`${Routes.CALENDAR}/weekly`);
    }
  }, [calendars]);

  return (
    <>
      <TwoColumnsLayout
        leftRenders={[
          () => <CalendarWeeklyLeftPart
            calendars={calendars}
            permissions={permissions}
            doOpenModal={(type) => {
              setOpenModal(true);
              setActionType(type);
            }}
          />
        ]}
        rightRender={
          () => (
            <CalendarWeeklyRightPart
              year={year} handleYearChanged={year => setYear(year)}
              scheduleOfWeek={scheduleOfWeek}
              calendar={calendars.data.find(item => item.week === parseInt(params.week, 10))}
              handleDeleteAllSchedule={(year, week) => handleDeleteAllSchedule(year, week)}
              bgColor={bgColor}
              permissions={permissions}
              doOpenModal={(type) => {
                setOpenModal(true);
                setActionType(type);
              }}
            />
          )
        }
      />
      <CreateWeeklyCalendar
        open={openModal}
        setOpen={setOpenModal}
        actionType={actionType}
        afterYearAndWeekChange={(data) => {
          setSelectedYearAndWeekAtModal(data);
        }}
      />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListSchedule: ({ year }, quite) => dispatch(listSchedule({ year }, quite)),
    CWPDoListScheduleOfWeek: ({ year, week }, quite) => dispatch(listScheduleOfWeek({ year, week }, quite)),
    doDeleteAllSchedule: ({ year, week }, quite) => dispatch(deleteAllSchedule({ year, week }, quite)),
    doListPermission: (quite) => dispatch(listCalendarPermission(quite)),
  };
};

const mapStateToProps = state => {
  return {
    calendars: calendarsSelector(state),
    scheduleOfWeek: scheduleOfWeekSelector(state),
    listWeeksInYear: listWeeksInYearSelector(state),
    bgColor: bgColorSelector(state),
    permissions: state.calendar.listCalendarPermission.data.permissions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeeklyPage);