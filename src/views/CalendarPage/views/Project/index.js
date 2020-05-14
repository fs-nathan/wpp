import { createProjectSchedule } from "actions/calendar/projectCalendar/createProjectGroupSchedule";
import { deleteProjectSchedule } from "actions/calendar/projectCalendar/deleteProjectGroupSchedule";
import { listProjectSchedule } from "actions/calendar/projectCalendar/listSchedule";
import { updateProjectSchedule } from "actions/calendar/projectCalendar/updateProjectGroupSchedule";
import AlertModal from "components/AlertModal";
import { CREATE_PROJECT_GROUP_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP_SCHEDULE, UPDATE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import { get, isNil, reverse, set, sortBy } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Context as CalendarPageContext } from '../../index';
import { bgColorSelector } from '../../selectors';
import CreateProjectCalendar from '../Modals/CreateProjectCalendar';
import UpdateProjectCalendar from "../Modals/UpdateProjectCalendar";
import ProjectCalendarPresenter from './presenter';
import { newProjectGroupScheduleSelector, projectGroupScheduleSelector } from "./selectors";

function Project({
  bgColor, doListProjectSchedule, groupSchedules,
  doCreateGroupSchedule, doUpdateGroupSchedule, doDeleteGroupSchedule,
  newGroupSchedules
}) {
  const {
    expand,
    handleExpand, permissions
  } = React.useContext(CalendarPageContext);

  const { t } = useTranslation();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [sortType, setSortType] = React.useState({});
  const [sortedGroupSchedules, setSortedGroupSchedules] = React.useState(groupSchedules);
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

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
      case "DELETE":
        setAlertConfirm(true);
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

  const refreshAfterCreate = () => {
    if (!isNil(newGroupSchedules.afterCreate)) {
      let schedule = get(newGroupSchedules, "afterCreate");
      let _schedules = sortedGroupSchedules.data;
      _schedules = _schedules.concat(schedule);
      setSortedGroupSchedules({
        ...sortedGroupSchedules,
        data: _schedules
      });
      setIsLoading(false);
    }
  }

  const refreshAfterUpdate = () => {
    if (!isNil(newGroupSchedules.afterUpdate)) {
      let schedule = get(newGroupSchedules, "afterUpdate");
      let idx = sortedGroupSchedules.data.findIndex(item => item.id === schedule.id);
      if (idx !== -1) {
        let _schedules = sortedGroupSchedules.data;
        let _schedule = get(_schedules, `[${idx}]`);
        set(_schedule, 'name', schedule.name);
        set(_schedule, 'description', schedule.description);
        _schedules[idx] = _schedule;
        setSortedGroupSchedules({
          ...sortedGroupSchedules,
          data: _schedules
        });
      }
    }
    setIsLoading(false);
  }

  const refreshAfterDelete = () => {
    if (!isNil(newGroupSchedules.afterDelete)) {
      let scheduleID = get(newGroupSchedules, "afterDelete");
      let idx = sortedGroupSchedules.data.findIndex(item => item.id === scheduleID);
      if (idx !== -1) {
        let _schedules = sortedGroupSchedules.data;
        _schedules.splice(idx, 1);
        setSortedGroupSchedules({
          ...sortedGroupSchedules,
          data: _schedules
        });
      }
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    CustomEventListener(UPDATE_PROJECT_GROUP_SCHEDULE, refreshAfterUpdate);
    CustomEventListener(CREATE_PROJECT_GROUP_SCHEDULE, refreshAfterCreate);
    CustomEventListener(DELETE_PROJECT_GROUP_SCHEDULE, refreshAfterDelete);
    return () => {
      CustomEventDispose(UPDATE_PROJECT_GROUP_SCHEDULE, refreshAfterUpdate);
      CustomEventDispose(CREATE_PROJECT_GROUP_SCHEDULE, refreshAfterCreate);
      CustomEventListener(DELETE_PROJECT_GROUP_SCHEDULE, refreshAfterDelete);
    }
  }, [newGroupSchedules]);

  return (
    <>
      <ProjectCalendarPresenter
        expand={expand} handleExpand={handleExpand}
        havePermission={permissions['manage_project_schedule'] ?? false}
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
        handleDeleteSchedule={(schedule) => doOpenModal("DELETE", schedule)}
      />
      <CreateProjectCalendar
        open={openCreate}
        setOpen={setOpenCreate}
        onConfirm={(name, description) => {
          setIsLoading(true);
          handleCreateGroupSchedule(name, description);
        }}
        isLoading={isLoading}
      />
      <UpdateProjectCalendar
        open={openEdit}
        setOpen={setOpenEdit}
        schedule={selectedSchedule}
        onConfirm={(name, description) => {
          setIsLoading(true);
          handleUpdateGroupSchedule(name, description);
        }}
        isLoading={isLoading}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => handleDeleteSchedule(selectedSchedule)}
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
    newGroupSchedules: newProjectGroupScheduleSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);