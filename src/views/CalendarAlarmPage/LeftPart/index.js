import { createPersonalRemindCategory } from "actions/calendar/alarmCalendar/createPersonalRemindCategory";
import { deletePersonalRemindCategory } from "actions/calendar/alarmCalendar/deletePersonalRemindCategory";
import { updatePersonalRemindCategory } from "actions/calendar/alarmCalendar/updatePersonalRemindCategory";
import AlertModal from "components/AlertModal";
import { CustomEventDispose, CustomEventListener, UPDATE_PERSONAL_REMIND_CATEGORY } from "constants/events";
import { get, isNil, set } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CreateGroupPersonalRemind from 'views/CalendarPage/views/Modals/CreateGroupPersonalRemind';
import UpdateGroupPersonalRemind from "views/CalendarPage/views/Modals/UpdateGroupPersonalRemind";
import { afterUpdateRemindCategorySelector, personalRemindSelector } from "../selectors";
import CalendarAlarmLeftPartPresenter from './presenter';

function CalendarAlarmLeftPart({
  personalRemindCategories, handleSortPersonalAlarm,
  doCreatePersonalRemindCategory, doDeletePersonalRemindCategory,
  doUpdatePersonalRemindCategory, permissions, reminds,
  afterUpdateRemindCategory
}) {

  const { t } = useTranslation();
  const [openPersonalRemindModalCreate, setOpenPersonalRemindModalCreate] = React.useState(false);
  const [openPersonalRemindModalUpdate, setOpenPersonalRemindModalUpdate] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [remindCategories, setRemindCategories] = React.useState(personalRemindCategories);

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

  function handleUpdateCategory(value) {
    doUpdatePersonalRemindCategory({ categoryID: value.id, name: value.title, color: value.color }, false);
  }

  React.useEffect(() => {
    setIsLoading(false);
    setRemindCategories(personalRemindCategories);
  }, [personalRemindCategories]);

  const refreshAfterUpdateCategory = () => {
    if (!isNil(afterUpdateRemindCategory.afterUpdate)) {
      let category = get(afterUpdateRemindCategory, 'afterUpdate');
      let idx = remindCategories.data.findIndex(item => item.id === category.id);
      if (idx !== -1) {
        let categories = remindCategories.data
        set(categories, `[${idx}]`, category);
        setRemindCategories({
          ...remindCategories,
          data: categories
        });
      }
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    CustomEventListener(UPDATE_PERSONAL_REMIND_CATEGORY, refreshAfterUpdateCategory);
    return () => {
      CustomEventDispose(UPDATE_PERSONAL_REMIND_CATEGORY, refreshAfterUpdateCategory);
    }
  }, [afterUpdateRemindCategory]);

  return (
    <>
      <CalendarAlarmLeftPartPresenter
        personalRemindCategories={remindCategories}
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
          handleUpdateCategory(value);
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
    reminds: personalRemindSelector(state),
    afterUpdateRemindCategory: afterUpdateRemindCategorySelector(state)
  }),
  mapDispatchToProps
)(CalendarAlarmLeftPart);