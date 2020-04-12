import React from 'react';
import { connect } from 'react-redux';
import { Context as CalendarPageContext } from '../../index';
import CreateWeeklyCalendar from '../../Modals/WeeklyCalendar/CreateWeeklyCalendar';
import SettingWeeklyCalendar from '../../Modals/WeeklyCalendar/SettingWeeklyCalendar';
import CalendarListTablePresenter from './presenter';
import { bgColorSelector } from './selectors';

function CalendarListTable({
  expand, handleExpand,
  showHidePendings, route,
  bgColor
}) {
  const {
    setTimeRange,
    localOptions, setLocalOptions
  } = React.useContext(CalendarPageContext);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const [openSetting, setOpenSetting] = React.useState(false);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType,
    }));
  }, [timeType]);

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

  return (
    <>
      <CalendarListTablePresenter
        expand={expand} handleExpand={handleExpand}
        canCreate={true}
        handleOpenModal={doOpenModal}
        timeType={timeType} handleTimeType={type => setTimeType(type)}
        bgColor={bgColor}
        handleTimeRange={(start, end) => setTimeRange({
          timeStart: start,
          timeEnd: end,
        })}
      />
      <SettingWeeklyCalendar
        open={openSetting}
        setOpen={setOpenSetting}
      />
      <CreateWeeklyCalendar
        open={openCreate}
        setOpen={setOpenCreate}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  };
};

export default connect(mapStateToProps)(CalendarListTable);