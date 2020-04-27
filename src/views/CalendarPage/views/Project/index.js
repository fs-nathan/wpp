import { createProjectSchedule } from "actions/calendar/projectCalendar/createProjectGroupSchedule";
import { deleteProjectSchedule } from "actions/calendar/projectCalendar/deleteProjectGroupSchedule";
import { listProjectSchedule } from "actions/calendar/projectCalendar/listSchedule";
import { updateProjectSchedule } from "actions/calendar/projectCalendar/updateProjectGroupSchedule";
import { CREATE_PROJECT_GROUP_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP_SCHEDULE, UPDATE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import { get, reverse, sortBy } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Context as CalendarPageContext } from '../../index';
import { bgColorSelector } from '../../selectors';
import CreateProjectCalendar from '../Modals/CreateProjectCalendar';
import UpdateProjectCalendar from "../Modals/UpdateProjectCalendar";
import ProjectCalendarPresenter from './presenter';
import { projectGroupScheduleSelector } from "./selectors";

function Project({
  bgColor, doListProjectSchedule, groupSchedules,
  doCreateGroupSchedule, doUpdateGroupSchedule, doDeleteGroupSchedule
}) {
  const {
    expand,
    handleExpand,
  } = React.useContext(CalendarPageContext);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [sortType, setSortType] = React.useState({});
  const [sortedGroupSchedules, setSortedGroupSchedules] = React.useState(groupSchedules);
  const [selectedSchedule, setSelectedSchedule] = React.useState();

  React.useEffect(() => {
    let _schedules = groupSchedules.data;
    _schedules = sortBy(_schedules, o => get(o, sortType.col));
    _schedules = sortType.dir === 1 ? reverse(_schedules) : _schedules;
    setSortedGroupSchedules({
      ...groupSchedules,
      data: _schedules
    });
  }, [groupSchedules, sortType]);

  React.useEffect(() => {
    doListProjectSchedule(false);
    const reloadListProjectSchedule = () => {
      doListProjectSchedule(false);
    }
    CustomEventListener(CREATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    CustomEventListener(UPDATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    CustomEventListener(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
      CustomEventDispose(UPDATE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
      CustomEventDispose(DELETE_PROJECT_GROUP_SCHEDULE, reloadListProjectSchedule);
    }
  }, [doListProjectSchedule])

  function doOpenModal(type, data) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
      case "EDIT":
        setOpenEdit(true);
        setSelectedSchedule(data);
        return;
      default: return;
    }
  }

  function handleCreateGroupSchedule(name, description) {
    if (name !== "" && description !== "") {
      doCreateGroupSchedule({ name, description }, false);
    }
  }

  function handleUpdateGroupSchedule(name, description) {
    doUpdateGroupSchedule({
      schedule_group_id: selectedSchedule.id,
      name: name,
      description: description
    }, false);
  }

  function handleDeleteSchedule(schedule) {
    doDeleteGroupSchedule({ schedule_group_id: schedule.id }, false);
  }

  return (
    <>
      <ProjectCalendarPresenter
        expand={expand} handleExpand={handleExpand}
        canCreate={true}
        handleOpenModal={doOpenModal}
        bgColor={bgColor}
        handleSortType={type => setSortType(oldType => {
          const newCol = type;
          const newDir = type === oldType.col ? -oldType.dir : 1;
          return {
            col: newCol,
            dir: newDir,
          }
        })}
        handleSortCalendar={sortData => {
          setSortedGroupSchedules({ ...groupSchedules, data: sortData })
        }}
        groupSchedules={sortedGroupSchedules}
        handleEditSchedule={(schedule) => doOpenModal("EDIT", schedule)}
        handleDeleteSchedule={(schedule) => handleDeleteSchedule(schedule)}
      />
      <CreateProjectCalendar
        open={openCreate}
        setOpen={setOpenCreate}
        onConfirm={(name, description) => handleCreateGroupSchedule(name, description)}
      />
      <UpdateProjectCalendar
        open={openEdit}
        setOpen={setOpenEdit}
        schedule={selectedSchedule}
        onConfirm={(name, description) => handleUpdateGroupSchedule(name, description)}
      />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doListProjectSchedule: (quite) => dispatch(listProjectSchedule(quite)),
    doCreateGroupSchedule: ({ name, description }, quite) => dispatch(createProjectSchedule({ name, description }, quite)),
    doUpdateGroupSchedule: ({ schedule_group_id, name, description }, quite) => dispatch(updateProjectSchedule({ schedule_group_id, name, description }, quite)),
    doDeleteGroupSchedule: ({ schedule_group_id }, quite) => dispatch(deleteProjectSchedule({ schedule_group_id }, quite)),
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    groupSchedules: projectGroupScheduleSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);