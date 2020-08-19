import { listRemindRecently } from "actions/calendar/alarmCalendar/listRemindRecently";
import React from 'react';
import { connect } from 'react-redux';
import ViewDetailRemind from "views/CalendarPage/views/Modals/ViewDetailRemind";
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
  const [selectedRemind, setSelectedRemind] = React.useState();
  const [openModalDetail, setOpenModalDetail] = React.useState(false);

  React.useEffect(() => {
    doListRemindRecently(false);
  }, [doListRemindRecently]);

  function handleOpenDetail(remind) {
    setOpenModalDetail(true);
    setSelectedRemind(remind);
  }

  return (
    <>
      <CalendarRecentlyAlarmPresenter
        bgColor={bgColor}
        expand={expand}
        handleExpand={handleExpand}
        remindCalendars={listReminds}
        handleOpenDetail={(remind) => handleOpenDetail(remind)}
      />
      <ViewDetailRemind
        open={openModalDetail}
        setOpen={setOpenModalDetail}
        remind={selectedRemind}
      />
    </>
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