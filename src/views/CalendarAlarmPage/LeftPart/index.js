import { createPersonalRemindCategory } from "actions/calendar/alarmCalendar/createPersonalRemindCategory";
import { deletePersonalRemindCategory } from "actions/calendar/alarmCalendar/deletePersonalRemindCategory";
import { updatePersonalRemindCategory } from "actions/calendar/alarmCalendar/updatePersonalRemindCategory";
import AlertModal from "components/AlertModal";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CreateGroupPersonalRemind from 'views/CalendarPage/views/Modals/CreateGroupPersonalRemind';
import UpdateGroupPersonalRemind from "views/CalendarPage/views/Modals/UpdateGroupPersonalRemind";
import CalendarAlarmLeftPartPresenter from './presenter';

function CalendarAlramLeftPart({
  personalRemindCategories, handleSortPersonalAlarm,
  doCreatePersonalRemindCategory, doDeletePersonalRemindCategory,
  doUpdatePersonalRemindCategory, permissions
}) {

  const { t } = useTranslation();
  const [openPersonalRemindModalCreate, setOpenPersonalRemindModalCreate] = React.useState(false);
  const [openPersonalRemindModalUpdate, setOpenPersonalRemindModalUpdate] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleOpenModal(type) {
    switch (type) {
      case "PERSONAL_REMIND_CREATE":
        setOpenPersonalRemindModalCreate(true);
        return;
      case "DELETE_CATEGORY":
        setAlertConfirm(true);
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

  React.useEffect(() => {
    setIsLoading(false);
  }, [personalRemindCategories]);

  return (
    <>
      <CalendarAlarmLeftPartPresenter
        personalRemindCategories={personalRemindCategories}
        havePermission={permissions['manage_group_remind'] ?? false}
        handleSortPersonalAlarm={handleSortPersonalAlarm}
        handleOpenModal={(type) => handleOpenModal(type)}
        handleDeleteCategory={(category) => {
          setSelectedCategory(category);
          handleOpenModal("DELETE_CATEGORY");
        }}
        handleEditCategory={(category) => handleEditCategory(category)}
      />
      <CreateGroupPersonalRemind
        open={openPersonalRemindModalCreate}
        setOpen={setOpenPersonalRemindModalCreate}
        onConfirm={(value) => {
          setIsLoading(true);
          handleCreateGroupRemind(value);
        }}
        isLoading={isLoading}
      />
      <UpdateGroupPersonalRemind
        open={openPersonalRemindModalUpdate}
        setOpen={setOpenPersonalRemindModalUpdate}
        onConfirm={(value) => {
          setIsLoading(true);
          handleUpdateCategroy(value);
        }}
        value={selectedCategory}
        isLoading={isLoading}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => handleDeleteCategory(selectedCategory)}
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