import { listRemindRecently } from "actions/calendar/alarmCalendar/listRemindRecently";
import React from 'react';
import { connect } from 'react-redux';
import { Context as CalendarAlarmContext } from '../../index';
import { bgColorSelector, remindRecentlySelector } from "../../selectors";
import "../styles.scss";
import CalendarRecentlyAlarmPresenter from "./presenter";

function CalendarRecentlyAlarm({
  bgColor, doListRemindRecently,
  listReminds
}) {

  const {
    expand, handleExpand
  } = React.useContext(CalendarAlarmContext);

  React.useEffect(() => {
    doListRemindRecently(false);
  }, [doListRemindRecently]);

  return (
    <CalendarRecentlyAlarmPresenter
      bgColor={bgColor}
      expand={expand}
      handleExpand={handleExpand}
      remindCalendars={listReminds}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListRemindRecently: (quite) => dispatch(listRemindRecently(quite)),
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    listReminds: remindRecentlySelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRecentlyAlarm);