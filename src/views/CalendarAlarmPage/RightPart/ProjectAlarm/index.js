import { listRemindProject } from "actions/calendar/alarmCalendar/listRemindProject";
import moment from "moment";
import React from 'react';
import { connect } from 'react-redux';
import ViewDetailRemind from "views/CalendarPage/views/Modals/ViewDetailRemind";
import { Context as CalendarAlarmContext } from '../../index';
import { bgColorSelector, remindProjectSelector } from "../../selectors";
import CalendarProjectAlarmPresenter from './presenter';

function CalendarProjectAlarm({
  bgColor, doListRemindProject,
  projectReminds
}) {

  const {
    localOptions, setLocalOptions,
    expand, handleExpand,
    timeRange, setTimeRange
  } = React.useContext(CalendarAlarmContext);

  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [selectedRemind, setSelectedRemind] = React.useState();
  const [openModalDetail, setOpenModalDetail] = React.useState(false);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType
    }));
  }, [timeType]);

  React.useEffect(() => {
    let fromTime = moment(timeRange.start).format("YYYY-MM-DD");
    let toTime = moment(timeRange.end).format("YYYY-MM-DD");
    doListRemindProject({ fromTime, toTime }, false);
  }, [doListRemindProject, timeRange]);

  function handleOpenDetail(remind) {
    setOpenModalDetail(true);
    setSelectedRemind(remind);
  }

  return (
    <>
      <CalendarProjectAlarmPresenter
        bgColor={bgColor}
        timeType={timeType}
        expand={expand}
        handleExpand={handleExpand}
        handleTimeType={type => setTimeType(type)}
        handleTimeRange={(start, end) => setTimeRange({
          startDate: start,
          endDate: end,
        })}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        projectReminds={projectReminds}
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
    doListRemindProject: ({ fromTime, toTime }, quite) => dispatch(listRemindProject({ fromTime, toTime }, quite)),
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    projectReminds: remindProjectSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarProjectAlarm);