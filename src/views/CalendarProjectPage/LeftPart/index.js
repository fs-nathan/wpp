import { createProjectSchedule } from "actions/calendar/projectCalendar/createProjectGroupSchedule";
import { deleteProjectSchedule } from "actions/calendar/projectCalendar/deleteProjectGroupSchedule";
import { updateProjectSchedule } from "actions/calendar/projectCalendar/updateProjectGroupSchedule";
import AlertModal from "components/AlertModal";
import { CREATE_PROJECT_GROUP_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP_SCHEDULE, UPDATE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import { Routes } from "constants/routes";
import { filter, get, isNil, set } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import CreateProjectCalendar from "../../CalendarPage/views/Modals/CreateProjectCalendar";
import { projectGroupNewScheduleDetailSelector } from "../RightPart/selectors";
import CalendarProjectLeftPartPresenter from './presenter';
import './style.scss';

function CalendarProjectLeftPart({
  groupSchedules, doCreateGroupSchedule, doDeleteGroupSchedule,
  doUpdateGroupSchedule, permissions, newGroupSchedules
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [searchPattern, setSearchPattern] = React.useState('');
  const [defaultGroup, setDefaultGroup] = React.useState();
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [selectedGroupSchedule, setSelectedGroupSchedule] = React.useState();
  const [filterdGroupSchedules, setFilterdGroupSchedules] = React.useState(groupSchedules);
  const [isLoading, setIsLoading] = React.useState(false);

  function doOpenModal(type, data) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
      case 'DELETE':
        setAlertConfirm(true);
        setSelectedGroupSchedule(data);
        return;
      default: return;
    }
  }

  React.useEffect(() => {
    let filtered = filter(groupSchedules.data, schedule => get(schedule, 'name', '').toLowerCase().includes(searchPattern.toLowerCase()));
    setFilterdGroupSchedules({
      ...groupSchedules,
      data: filtered
    });
  }, [searchPattern, groupSchedules]);

  function handleCreateGroupSchedule(name, description) {
    setIsLoading(true);
    if (name !== "" && description !== "") {
      doCreateGroupSchedule({ name, description }, false);
    }
  }

  function handleDeleteGroup(groupID) {
    doDeleteGroupSchedule({ schedule_group_id: groupID }, false);
    history.push(Routes.CALENDAR_PROJECT.replace(":scheduleID", get(defaultGroup, "id")));
  }

  function handleUpdateGroupSchedule(id, name, description) {
    doUpdateGroupSchedule({ schedule_group_id: id, name, description }, false);
  }

  React.useEffect(() => {
    setIsLoading(false);
    if (Array.isArray(groupSchedules.data) && groupSchedules.data.length !== 0) {
      setDefaultGroup(get(groupSchedules, "data[0]"));
    }
  }, [groupSchedules]);

  const refreshAfterCreate = () => {
    if (!isNil(newGroupSchedules.afterCreate)) {
      let schedule = get(newGroupSchedules, "afterCreate");
      let _schedules = filterdGroupSchedules.data;
      _schedules = _schedules.concat(schedule);
      setFilterdGroupSchedules({
        ...filterdGroupSchedules,
        data: _schedules
      });
      setIsLoading(false);
    }
  }

  const refreshAfterUpdate = () => {
    if (!isNil(newGroupSchedules.afterUpdate)) {
      let schedule = get(newGroupSchedules, "afterUpdate");
      let idx = groupSchedules.data.findIndex(item => item.id === schedule.id);
      if (idx !== -1) {
        let _schedules = groupSchedules.data;
        let _schedule = get(_schedules, `[${idx}]`);
        set(_schedule, 'name', schedule.name);
        set(_schedule, 'description', schedule.description);
        _schedules[idx] = _schedule;
        setFilterdGroupSchedules({
          ...filterdGroupSchedules,
          data: _schedules
        });
      }
    }
    setIsLoading(false);
  }

  const refreshAfterDelete = () => {
    if (!isNil(newGroupSchedules.afterDelete)) {
      let scheduleID = get(newGroupSchedules, "afterDelete");
      let idx = groupSchedules.data.findIndex(item => item.id === scheduleID);
      if (idx !== -1) {
        let _schedules = groupSchedules.data;
        _schedules.splice(idx, 1);
        setFilterdGroupSchedules({
          ...filterdGroupSchedules,
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
      <CalendarProjectLeftPartPresenter
        groupSchedules={filterdGroupSchedules}
        handleOpenModal={doOpenModal}
        handleDeleteGroup={(groupID) => doOpenModal("DELETE", groupID)}
        searchPattern={searchPattern}
        handleSearchPattern={value => setSearchPattern(value)}
        handleUpdateGroupSchedule={(id, name, description) => handleUpdateGroupSchedule(id, name, description)}
        havePermission={permissions['manage_project_schedule'] ?? false}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <CreateProjectCalendar
        open={openCreate}
        isLoading={isLoading}
        setOpen={setOpenCreate}
        onConfirm={(name, description) => handleCreateGroupSchedule(name, description)}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => {
          setIsLoading(true);
          handleDeleteGroup(selectedGroupSchedule);
        }}
        actionLoading={isLoading}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    newGroupSchedules: projectGroupNewScheduleDetailSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doCreateGroupSchedule: ({ name, description }, quite) => dispatch(createProjectSchedule({ name, description }, quite)),
    doDeleteGroupSchedule: ({ schedule_group_id }, quite) => dispatch(deleteProjectSchedule({ schedule_group_id }, quite)),
    doUpdateGroupSchedule: ({ schedule_group_id, name, description }, quite) => dispatch(updateProjectSchedule({ schedule_group_id, name, description }, quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarProjectLeftPart);