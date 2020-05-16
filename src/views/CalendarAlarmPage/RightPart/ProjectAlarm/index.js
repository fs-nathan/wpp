import { listRemindProject } from "actions/calendar/alarmCalendar/listRemindProject";
import { listProjectBasicInfo } from "actions/project/listBasicInfo";
import { useLocalStorage } from "hooks";
import get from "lodash/get";
import moment from "moment";
import React from 'react';
import { connect } from 'react-redux';
import ViewDetailRemind from "views/CalendarPage/views/Modals/ViewDetailRemind";
import { Context as CalendarAlarmContext } from '../../index';
import { bgColorSelector, listProjectBasicInfoSelector, remindProjectSelector } from "../../selectors";
import CalendarProjectAlarmPresenter from './presenter';

function CalendarProjectAlarm({
  bgColor, doListRemindProject, projects,
  projectReminds, doListProjectBasicInfo,
}) {

  const {
    expand, handleExpand
  } = React.useContext(CalendarAlarmContext);

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_REMINDS_OPTIONS', {
    timeType: 3,
    timeRange: {
      startDate: moment().startOf("isoWeeks"),
      endDate: moment().endOf("isoWeeks")
    }
  });
  const [timeRange, setTimeRange] = React.useState(localOptions.timeRange);
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [selectedRemind, setSelectedRemind] = React.useState();
  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const [groupRemind, setGroupRemind] = React.useState();

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType,
      timeRange
    }));
  }, [timeType, timeRange]);

  React.useEffect(() => {
    let fromTime = moment(get(timeRange, 'startDate') ?? moment().startOf('year')).format("YYYY-MM-DD");
    let toTime = moment(get(timeRange, 'endDate') ?? moment().endOf('year')).format("YYYY-MM-DD");
    doListRemindProject({ fromTime, toTime }, false);
  }, [doListRemindProject, timeRange]);

  React.useEffect(() => {
    doListProjectBasicInfo(false);
  }, [doListProjectBasicInfo]);

  function handleOpenDetail(data) {
    setOpenModalDetail(true);
    setSelectedRemind(data.remind);
    setGroupRemind(data.item);
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
        projects={projects}
        handleOpenDetail={(data) => handleOpenDetail(data)}
      />
      <ViewDetailRemind
        open={openModalDetail}
        setOpen={setOpenModalDetail}
        remind={selectedRemind}
        groupRemind={groupRemind}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListRemindProject: ({ fromTime, toTime }, quite) => dispatch(listRemindProject({ fromTime, toTime }, quite)),
    doListProjectBasicInfo: (quite) => dispatch(listProjectBasicInfo(quite)),
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    projectReminds: remindProjectSelector(state),
    projects: listProjectBasicInfoSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarProjectAlarm);