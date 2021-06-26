import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import { deleteAllSchedule } from "actions/calendar/weeklyCalendar/deleteAllSchedule";
import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeek";
import AlertModal from "components/AlertModal";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { CREATE_WEEKLY_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_ALL_WEEKLY_SCHEDULE, DELETE_WEEKLY_SCHEDULE, UPDATE_WEEKLY_SCHEDULE } from "constants/events";
import { Routes } from "constants/routes";
import { filter, isNil } from "lodash";
import get from "lodash/get";
import moment from "moment";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useMountedState } from "react-use";
import CreateWeeklyCalendar from '../CalendarPage/views/Modals/CreateWeeklyCalendar';
import CalendarWeeklyLeftPart from "./LeftPart";
import CalendarWeeklyRightPart from "./RightPart";
import { bgColorSelector, calendarsSelector, listWeeksInYearSelector, scheduleOfWeekSelector } from "./selectors";
import CreateWeeklySchedule from '../CalendarPage/views/Modals/CreateWeeklySchedule';
import DeleteWeekSchedule from "../CalendarPage/views/Modals/DeleteWeekSchedule"

function CalendarWeeklyPage({
  doListSchedule, calendars, doDeleteAllSchedule,
  CWPDoListScheduleOfWeek, scheduleOfWeek, bgColor,
  doListPermission, permissions
}) {

  const { t } = useTranslation();
  const params = useParams();
  const history = useHistory();
  const [year, setYear] = React.useState(params.year ?? new Date().getFullYear());
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = React.useState("CREATE");
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState({
    year: null,
    week: null
  });

  const [openCreateWeeklySchedule, setOpenCreateWeeklySchedule] = React.useState(false);
  const [weekScheduleSelected, setWeekScheduleSelected] = React.useState(false);
  const [openDeleteWeekSchedule, setOpenDeleteWeekSchedule] = React.useState(false);
  const [isCreateWeekSchedule, setCreateWeekSchedule] = React.useState(false);

  React.useEffect(() => {
    doListSchedule({ year }, false);
    // const reloadListSchedule = () => {
    //   doListSchedule({ year }, false);
    // }
    // CustomEventListener(CREATE_WEEKLY_SCHEDULE, reloadListSchedule);
    // CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListSchedule);
    // CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListSchedule);
    // CustomEventListener(DELETE_ALL_WEEKLY_SCHEDULE, reloadListSchedule);
    // return () => {
    //   CustomEventDispose(CREATE_WEEKLY_SCHEDULE, reloadListSchedule);
    //   CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListSchedule);
    //   CustomEventDispose(DELETE_ALL_WEEKLY_SCHEDULE, reloadListSchedule);
    //   CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListSchedule);
    // }
  }, [doListSchedule, year]);

  React.useEffect(() => {
    CWPDoListScheduleOfWeek({ schedule_id: params.schedule_id }, false);
  }, [CWPDoListScheduleOfWeek, year, params.schedule_id]);

  React.useEffect(() => {
    const reloadListScheduleOfWeek = () => {
      CWPDoListScheduleOfWeek({ schedule_id: params.schedule_id }, false);
    }
    CustomEventListener(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    return () => {
      CustomEventDispose(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    }
  }, [params.schedule_id]);

  React.useEffect(() => {
    doListPermission(false);
  }, [doListPermission, useMountedState()]);

  function handleDeleteAllSchedule(year, week) {
    let schedulesExclude = filter(calendars.data, calendar => calendar.week !== parseInt(week));
    doDeleteAllSchedule({ year, week }, false);
    history.push(Routes.CALENDAR_WEEKLY.replace(":week", get(schedulesExclude, '[0].week', moment().isoWeek())).replace(":year", year));
  }

  React.useEffect(() => {
    if (calendars.data.length === 0 && isNil(params.schedule_id)) {
      history.push(`${Routes.CALENDAR}/weekly`);
    }
    setWeekScheduleSelected(calendars.data.find(item => item.id === params.schedule_id))
  }, [calendars, params.schedule_id]);

  return (
    <>
      <TwoColumnsLayout
        leftRenders={[
          () => <CalendarWeeklyLeftPart
            calendars={calendars}
            permissions={permissions}
            doOpenModal={() => {
              setCreateWeekSchedule(true)
              setOpenCreateWeeklySchedule(true)
            }}
          />
        ]}
        rightRender={
          () => (
            <CalendarWeeklyRightPart
              year={year} handleYearChanged={year => setYear(year)}
              scheduleOfWeek={scheduleOfWeek}
              calendar={weekScheduleSelected}
              handleDeleteAllSchedule={(year, week) => {
                setDataDelete({ year, week });
                setAlertConfirm(true);
              }}
              bgColor={bgColor}
              permissions={permissions}
              doOpenModal={(type) => {
                setOpenModal(true);
                setActionType(type);
              }}
              handleEditWeekSchedule={() => {
                setCreateWeekSchedule(false)
                setOpenCreateWeeklySchedule(true)
              }}
              handleDeleteWeekSchedule={() => setOpenDeleteWeekSchedule(true)}
            />
          )
        }
      />
      <CreateWeeklyCalendar
        open={openModal}
        setOpen={setOpenModal}
        actionType={actionType}
        weekSchedule={weekScheduleSelected}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => handleDeleteAllSchedule(dataDelete.year, dataDelete.week)}
      />
      {
        openCreateWeeklySchedule &&
        <CreateWeeklySchedule
          open={openCreateWeeklySchedule}
          setOpen={setOpenCreateWeeklySchedule}
          reloadList={(newYear) => {
            if (year !== newYear) {
              setYear(newYear)
            }
            doListSchedule({ year: newYear }, false)
          }}
          schedule={!isCreateWeekSchedule && weekScheduleSelected ? weekScheduleSelected : null}
        />
      }
      {
        openDeleteWeekSchedule && (
          <DeleteWeekSchedule
            scheduleDeleteSelected={weekScheduleSelected}
            setScheduleDeleteSelected={(value) => setOpenDeleteWeekSchedule(value)}
            doReload={() => history.push(`${Routes.CALENDAR}/weekly`)}
          />
        )
      }
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListSchedule: ({ year }, quite) => dispatch(listSchedule({ year }, quite)),
    CWPDoListScheduleOfWeek: ({ schedule_id }, quite) => dispatch(listScheduleOfWeek({ schedule_id }, quite)),
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