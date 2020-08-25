import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import { settingStartingDay } from "actions/calendar/weeklyCalendar/settingStartingDay";
import { CREATE_WEEKLY_SCHEDULE, CustomEventDispose, CustomEventListener, WEEKLY_SCHEDULE_SETTING_START_DAY } from "constants/events";
import { get, reverse, sortBy } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { listUserOfGroup } from '../../../../actions/user/listUserOfGroup';
import { Context as CalendarPageContext } from '../../index';
import { bgColorSelector } from '../../selectors';
import CreateWeeklyCalendar from '../Modals/CreateWeeklyCalendar';
import SettingWeeklyCalendar from '../Modals/SettingWeeklyCalendar';
import WeeklyCalendarPresenter from './presenter';
import { calendarsSelector } from "./selectors";

function Weekly({
  calendars, doListSchedule,
  bgColor, doListUserOfGroup,
  doSettingStartingDay,
}) {
  const {
    expand, handleExpand, permissions
  } = React.useContext(CalendarPageContext);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [openSetting, setOpenSetting] = React.useState(false);
  const [sortType, setSortType] = React.useState({});
  const [newCalendars, setnewCalendars] = React.useState(calendars);
  const [startingDayInWeek, setStartingDayInWeek] = React.useState(null);

  React.useEffect(() => {
    doListUserOfGroup(true);
  }, [doListUserOfGroup]);

  React.useEffect(() => {
    doListSchedule({ year }, false);
    const refreshList = () => {
      doListSchedule({ year }, false);
    }
    CustomEventListener(CREATE_WEEKLY_SCHEDULE, refreshList);
    CustomEventListener(WEEKLY_SCHEDULE_SETTING_START_DAY, refreshList);
    return () => {
      CustomEventDispose(CREATE_WEEKLY_SCHEDULE, refreshList);
      CustomEventDispose(WEEKLY_SCHEDULE_SETTING_START_DAY, refreshList);
    }
  }, [doListSchedule, year]);

  React.useEffect(() => {
    let _calendars = [...calendars.data];
    _calendars = sortBy(_calendars, o => get(o, sortType.col));
    _calendars = sortType.dir === 1 ? reverse(_calendars) : _calendars;
    setnewCalendars({
      ...calendars,
      data: _calendars
    });
  }, [calendars, sortType]);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
      case 'SETTING': {
        setOpenSetting(true);
        return;
      }
      default: return;
    }
  }

  function handleSettingStartingDay(day) {
    setStartingDayInWeek(day);
  }

  React.useEffect(() => {
    if (startingDayInWeek !== null) {
      doSettingStartingDay({ day: startingDayInWeek }, false);
    }
  }, [doSettingStartingDay, startingDayInWeek])

  return (
    <>
      <WeeklyCalendarPresenter
        expand={expand} handleExpand={handleExpand}
        canCreate={permissions['manage_week_schedule'] ?? false}
        handleOpenModal={doOpenModal}
        bgColor={bgColor}
        year={year} handleYearChanged={year => setYear(year)}
        handleSortType={type => setSortType(oldType => {
          const newCol = type;
          const newDir = type === oldType.col ? -oldType.dir : 1;
          return {
            col: newCol,
            dir: newDir,
          }
        })}
        calendars={newCalendars}
      />
      <CreateWeeklyCalendar
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <SettingWeeklyCalendar
        open={openSetting}
        setOpen={setOpenSetting}
        permission={permissions['manage_week_schedule'] ?? false}
        onConfirm={handleSettingStartingDay}
      />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doListSchedule: ({ year }, quite) => dispatch(listSchedule({ year }, quite)),
    doSettingStartingDay: ({ day }, quite) => dispatch(settingStartingDay({ day }, quite))
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    calendars: calendarsSelector(state),
    settingStartingDayResult: state.calendar.settingStartingDay.data.state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weekly);