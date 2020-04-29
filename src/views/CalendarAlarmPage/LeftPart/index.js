import { createPersonalRemindCategory } from "actions/calendar/alarmCalendar/createPersonalRemindCategory";
import { deletePersonalRemindCategory } from "actions/calendar/alarmCalendar/deletePersonalRemindCategory";
import { updatePersonalRemindCategory } from "actions/calendar/alarmCalendar/updatePersonalRemindCategory";
import React from 'react';
import { connect } from 'react-redux';
import CreateGroupPersonalRemind from 'views/CalendarPage/views/Modals/CreateGroupPersonalRemind';
import UpdateGroupPersonalRemind from "views/CalendarPage/views/Modals/UpdateGroupPersonalRemind";
import CalendarAlarmLeftPartPresenter from './presenter';

function CalendarAlramLeftPart({
  personalRemindCategories, handleSortPersonalAlarm,
  doCreatePersonalRemindCategory, doDeletePersonalRemindCategory,
  doUpdatePersonalRemindCategory,
}) {
  const [openPersonalRemindModalCreate, setOpenPersonalRemindModalCreate] = React.useState(false);
  const [openPersonalRemindModalUpdate, setOpenPersonalRemindModalUpdate] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();
  function handleOpenModal(type) {
    switch (type) {
      case "PERSONAL_REMIND_CREATE":
        setOpenPersonalRemindModalCreate(true);
        return;
      default:
        return;
    }
  }

  function handleCreateGroupRemind(value) {
    doCreatePersonalRemindCategory({ name: value.title, color: value.color }, false);
  }

  function handleDeleteCategory(category) {
    doDeletePersonalRemindCategory({ categoryID: category.id });
  }

  function handleEditCategory(category) {
    setSelectedCategory(category);
    setOpenPersonalRemindModalUpdate(true);
  }

  function handleUpdateCategroy(value) {
    doUpdatePersonalRemindCategory({ categoryID: value.id, name: value.title, color: value.color });
  }

  return (
    <>
      <CalendarAlarmLeftPartPresenter
        personalRemindCategories={personalRemindCategories}
        handleSortPersonalAlarm={handleSortPersonalAlarm}
        handleOpenModal={(type) => handleOpenModal(type)}
        handleDeleteCategory={(category) => handleDeleteCategory(category)}
        handleEditCategory={(category) => handleEditCategory(category)}
      />
      <CreateGroupPersonalRemind
        open={openPersonalRemindModalCreate}
        setOpen={setOpenPersonalRemindModalCreate}
        onConfirm={(value) => handleCreateGroupRemind(value)}
      />
      <UpdateGroupPersonalRemind
        open={openPersonalRemindModalUpdate}
        setOpen={setOpenPersonalRemindModalUpdate}
        onConfirm={(value) => handleUpdateCategroy(value)}
        value={selectedCategory}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreatePersonalRemindCategory: ({ name, color }, quite) => dispatch(createPersonalRemindCategory({ name, color }, quite)),
    doDeletePersonalRemindCategory: ({ categoryID }, quite) => dispatch(deletePersonalRemindCategory({ categoryID }, quite)),
    doUpdatePersonalRemindCategory: ({ categoryID, name, color }, quite) => dispatch(updatePersonalRemindCategory({ categoryID, name, color }, quite)),
  };
};

export default connect(
  state => ({
  }),
  mapDispatchToProps
)(CalendarAlramLeftPart);