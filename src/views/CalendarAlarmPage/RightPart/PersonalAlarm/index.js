import { Box, Button, Typography } from "@material-ui/core";
import { createPersonalRemind } from "actions/calendar/alarmCalendar/createPersonalRemind";
import { createPersonalRemindCategory } from "actions/calendar/alarmCalendar/createPersonalRemindCategory";
import { deletePersonalRemind } from "actions/calendar/alarmCalendar/deletePersonalRemind";
import { listPersonalRemind } from "actions/calendar/alarmCalendar/listPersonalRemind";
import { updatePersonalRemind } from "actions/calendar/alarmCalendar/updatePersonalRemind";
import AlertModal from "components/AlertModal";
import { CREATE_PERSONAL_REMIND, CustomEventDispose, CustomEventListener, DELETE_PERSONAL_REMIND, DELETE_PERSONAL_REMIND_CATEGORY, UPDATE_PERSONAL_REMIND } from "constants/events";
import { useLocalStorage } from "hooks";
import moment from "moment";
import React from 'react';
import { useTranslation } from "react-i18next";
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import CreateGroupPersonalRemind from 'views/CalendarPage/views/Modals/CreateGroupPersonalRemind';
import CreatePersonalRemind from "views/CalendarPage/views/Modals/CreatePersonalRemind";
import UpdatePersonalRemind from "views/CalendarPage/views/Modals/UpdatePersonalRemind";
import ViewDetailRemind from "views/CalendarPage/views/Modals/ViewDetailRemind";
import { Context as CalendarAlarmContext } from '../../index';
import { bgColorSelector, personalRemindCategoriesSelector, personalRemindSelector } from "../../selectors";
import "../styles.scss";
import CalendarPersonalAlarmPresenter from './presenter';

function CalendarPersonalAlarm({
  bgColor, doListPersonalRemind,
  personalReminds, remindCategories,
  doCreatePersonalRemind, doUpdatePersonalRemind,
  doDeletePersonalRemind, doCreatePersonalRemindCategory
}) {

  const { t } = useTranslation();
  const {
    expand, handleExpand, permissions
  } = React.useContext(CalendarAlarmContext);

  const search = useLocation().search;
  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PERSONAL_REMIND_OPTIONS', {
    timeType: 3
  });
  const [timeRange, setTimeRange] = React.useState({
    start: moment().startOf("isoWeek"),
    end: moment().endOf("isoWeek")
  });
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openPersonalRemindModalCreate, setOpenPersonalRemindModalCreate] = React.useState(false);
  const [filteredReminds, setFilteredReminds] = React.useState(personalReminds);
  const [categoryID, setCategoryID] = React.useState(null);
  const [selectedRemind, setSelectedRemind] = React.useState();
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let searchParams = new URLSearchParams(search);
    setCategoryID(searchParams.get("category"));
  }, [search]);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType
    }));
  }, [timeType]);

  React.useEffect(() => {
    let fromTime = moment(timeRange.start).format("YYYY-MM-DD");
    let toTime = moment(timeRange.end).format("YYYY-MM-DD");
    doListPersonalRemind({ fromTime, toTime }, false);

    const refreshListPersonalRemind = () => {
      setIsLoading(false);
      doListPersonalRemind({ fromTime, toTime }, false);
    }
    CustomEventListener(CREATE_PERSONAL_REMIND, refreshListPersonalRemind);
    CustomEventListener(UPDATE_PERSONAL_REMIND, refreshListPersonalRemind);
    CustomEventListener(DELETE_PERSONAL_REMIND, refreshListPersonalRemind);
    CustomEventListener(DELETE_PERSONAL_REMIND_CATEGORY, refreshListPersonalRemind);
    return () => {
      CustomEventDispose(CREATE_PERSONAL_REMIND, refreshListPersonalRemind);
      CustomEventDispose(UPDATE_PERSONAL_REMIND, refreshListPersonalRemind);
      CustomEventDispose(DELETE_PERSONAL_REMIND, refreshListPersonalRemind);
      CustomEventDispose(DELETE_PERSONAL_REMIND_CATEGORY, refreshListPersonalRemind);
    }
  }, [doListPersonalRemind, timeType, timeRange]);

  React.useEffect(() => {
    if (categoryID !== null && personalReminds.data.length !== 0) {
      let filtered = personalReminds.data.find(item => item.id === categoryID);
      setFilteredReminds({
        ...personalReminds,
        data: Array.isArray(filtered) ? filtered : [filtered]
      });
    } else {
      setFilteredReminds({
        ...personalReminds
      });
    }
  }, [categoryID, personalReminds]);


  function handleOpenModal(type, data) {
    switch (type) {
      case "CREATE":
        remindCategories.data.length !== 0 ? setOpenModal(true) : setOpenAlert(true);
        return;
      case "EDIT":
        setOpenModalEdit(true);
        setSelectedRemind(data);
        return;
      case "VIEW":
        setOpenModalDetail(true);
        setSelectedRemind(data);
        return;
      default:
        return;
    }
  }

  function handleCreateRemind(model) {
    doCreatePersonalRemind({ model }, false);
  }

  function handleEditRemind(remind) {
    doUpdatePersonalRemind({ model: remind }, false);
  }

  function handleDeleteRemind(remind) {
    doDeletePersonalRemind({ remindID: remind.id }, false);
  }

  function handleCreateGroupRemind(value) {
    doCreatePersonalRemindCategory({ name: value.title, color: value.color }, false);
  }

  return (
    <>
      <CalendarPersonalAlarmPresenter
        bgColor={bgColor}
        timeType={timeType}
        expand={expand}
        handleExpand={handleExpand}
        handleTimeType={type => setTimeType(type)}
        handleTimeRange={(start, end) => setTimeRange({
          start: start ?? moment().startOf('year'),
          end: end ?? moment().endOf('year')
        })}
        personalReminds={filteredReminds}
        handleOpenModal={(type, props) => handleOpenModal(type, props)}
        handleDeleteRemind={(remind) => {
          setSelectedRemind(remind);
          setAlertConfirm(true);
        }}
        havePermission={permissions['manage_remind'] ?? false}
      />
      <CreatePersonalRemind
        open={openModal}
        setOpen={setOpenModal}
        onConfirm={(model) => {
          setIsLoading(true);
          handleCreateRemind(model);
        }}
        remindCategories={remindCategories.data}
        categoryID={categoryID}
        isLoading={isLoading}
      />
      <UpdatePersonalRemind
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        onConfirm={(model) => {
          setIsLoading(true);
          handleEditRemind(model);
        }}
        remindCategories={remindCategories.data}
        categoryID={categoryID}
        remind={selectedRemind}
        isLoading={isLoading}
      />
      <ViewDetailRemind
        open={openModalDetail}
        setOpen={setOpenModalDetail}
        remind={selectedRemind}
        remindType={"PERSONAL"}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        canConfirm={false}
        content={
          <Box className="personal_RemindCategoryEmpty_Alert">
            <Typography component={"p"} className="personal_RemindCategoryEmpty_Alert_description">
              {t('views.calendar_page.modal.create_personal_remind.empty_category_description')}
            </Typography>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              className="personal_RemindCategoryEmpty_Alert_buttonConfirm"
              style={{ backgroundColor: bgColor.color }}
              onClick={() => {
                setOpenAlert(false);
                setOpenPersonalRemindModalCreate(true);
              }}
            >
              {t('views.calendar_page.modal.create_group_personal_remind.title_create')}
            </Button>
          </Box>
        }
      />
      <CreateGroupPersonalRemind
        open={openPersonalRemindModalCreate}
        setOpen={setOpenPersonalRemindModalCreate}
        onConfirm={(value) => handleCreateGroupRemind(value)}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => handleDeleteRemind(selectedRemind)}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListPersonalRemind: ({ fromTime, toTime }, quite) => dispatch(listPersonalRemind({ fromTime, toTime }, quite)),
    doCreatePersonalRemind: ({ model }, quite) => dispatch(createPersonalRemind({ model }, quite)),
    doUpdatePersonalRemind: ({ model }, quite) => dispatch(updatePersonalRemind({ model }, quite)),
    doDeletePersonalRemind: ({ remindID }, quite) => dispatch(deletePersonalRemind({ remindID }, quite)),
    doCreatePersonalRemindCategory: ({ name, color }, quite) => dispatch(createPersonalRemindCategory({ name, color }, quite)),
  };
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    personalReminds: personalRemindSelector(state),
    remindCategories: personalRemindCategoriesSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPersonalAlarm);