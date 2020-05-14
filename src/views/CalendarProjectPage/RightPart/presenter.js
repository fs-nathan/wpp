import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiClose, mdiPencilBoxOutline, mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingBox from 'components/LoadingBox';
import { ScrollbarsContainer } from "components/TableComponents";
import { CustomEventDispose, CustomEventListener, PROJECT_SCHEDULE_ADD_DAY_OFF, PROJECT_SCHEDULE_ADD_WORKING_DAYS, PROJECT_SCHEDULE_CREATE_SHIFT_STAGE, PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, PROJECT_SCHEDULE_CREATE_WORKING_STAGE, PROJECT_SCHEDULE_DELETE_DAY_OFF, PROJECT_SCHEDULE_DELETE_SHIFT_STAGE, PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, PROJECT_SCHEDULE_DELETE_WORKING_DAYS, PROJECT_SCHEDULE_DELETE_WORKING_STAGE, PROJECT_SCHEDULE_SETTING_STARTING_DAY, PROJECT_SCHEDULE_SETTING_WORKING_DAY, PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE, PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, PROJECT_SCHEDULE_UPDATE_WORKING_STAGE } from "constants/events";
import { filter, get, isNil, set } from "lodash";
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ShiftStageModal from 'views/CalendarPage/views/Modals/ShiftStageModal';
import WorkingStageModal from 'views/CalendarPage/views/Modals/WorkingStageModal';
import { bgColorSelector } from "../selectors";
import { projectGroupNewScheduleDetailSelector } from "./selectors";
import './style.scss';

function CalendarProjectRightPartPresenter({
  havePermission, settingDate, scheduleDetail, handleSettingStartingDayOfWeek,
  handleAddWorkingDay, handleDeleteWorkingDays, handleDeleteDayOff,
  handleAddDayOff, handleAddWorkingDayInWeek, handleAddWorkingStage,
  handleDeleteWorkingStage, handleUpdateWorkingStage, handleCreateShiftStage,
  hanleDeleteShiftStage, handleUpdateShiftStage, handleDeleteShiftStageAllTime,
  handleDeleteGroup, handleEditGroupSchedule, newScheduleDetail,
}) {

  const DEFAULT_DATA = {
    selectedDateFrom: moment().toDate(),
    selectedDateTo: moment().add(1, 'day').toDate(),
    selectedDayType: 1,
    selectedFistDayInWeek: 1,
    selectedWorkingType: 1,
  };

  const { t } = useTranslation();
  const daysInWeek = [
    { value: 1, name: t('views.calendar_page.modal.setting_weekly_calendar.monday') },
    { value: 0, name: t('views.calendar_page.modal.setting_weekly_calendar.sunday') }
  ];

  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [workingDayInWeek, changeWorkingDayInWeek] = React.useState([]);
  const [workingDayList, setWorkingDayList] = React.useState({ list: [] });
  const [dayOffList, setdayOffList] = React.useState({ list: [] });
  const [workingStageAll, setWorkingStateAll] = React.useState([]);
  const [workingStage, setWorkingState] = React.useState({ list: [] });
  const [openModalAddTimeWorkingStage, setOpenModalAddTimeWorkingStage] = React.useState(false);
  const [selectedWorkingStage, setSelectedWorkingStage] = React.useState();
  const [openShiftStage, setOpenShiftStage] = React.useState(false);
  const [selectedShiftStage, setSelectedShiftStage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [actionFrom, setActionFrom] = React.useState();
  const [actionType, setActionType] = React.useState();

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  const handleAddDay = (evt) => {
    setIsLoading(true);
    switch (data.selectedWorkingType) {
      case 1:
        data.selectedDayType === 1 ?
          handleAddWorkingDay(
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
            moment(data.selectedDateTo).format("YYYY-MM-DD"),
          ) :
          handleAddWorkingDay(
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
          );
        return;
      case 2:
        data.selectedDayType === 1 ?
          handleAddDayOff(
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
            moment(data.selectedDateTo).format("YYYY-MM-DD"),
          ) :
          handleAddDayOff(
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
            moment(data.selectedDateFrom).format("YYYY-MM-DD"),
          );
        return;
    }
  }

  React.useEffect(() => {
    if (scheduleDetail.data.length !== 0) {
      changeWorkingDayInWeek(scheduleDetail.data.work_days_of_week);
      setWorkingDayList({
        list: scheduleDetail.data.work_days_of_schedule
      });
      setdayOffList({
        list: scheduleDetail.data.day_not_work_of_schedule
      });
      setWorkingState({
        list: scheduleDetail.data.work_hours_of_stage
      });
      handleChangeData("selectedFistDayInWeek", scheduleDetail.data.day_start_week);
      setWorkingStateAll(scheduleDetail.data.work_hours_of_stage_all);
    }
  }, [scheduleDetail]);

  function handleChangeWorkingInWeek(value, index) {
    let _workingDaysInWeek = [...workingDayInWeek];
    set(_workingDaysInWeek[index], 'worked', value);
    let workingDay = filter(_workingDaysInWeek, { 'worked': true });
    handleAddWorkingDayInWeek(workingDay.map(day => day.value));
  }

  const refreshAfterChangeStartingDay = () => {
    if (!isNil(newScheduleDetail.afterSettingStartingDayOfWeek)) {
      let dayStartWeek = get(newScheduleDetail.afterSettingStartingDayOfWeek, "day_start_week", 0);
      let listDayOfWeek = get(newScheduleDetail.afterSettingStartingDayOfWeek, "list_day_of_week", []);
      handleChangeData("selectedFistDayInWeek", dayStartWeek);
      changeWorkingDayInWeek(listDayOfWeek);
    }
  }

  const refreshAfterSettingWorkingDay = () => {
    if (!isNil(newScheduleDetail.afterSettingWorkingDayInWeek)) {
      let listDayOfWeek = get(newScheduleDetail.afterSettingWorkingDayInWeek, "list_day_of_week", []);
      changeWorkingDayInWeek(listDayOfWeek);
    }
  }

  const refeshAfterAddWorkingDay = () => {
    setIsLoading(false);
    if (!isNil(newScheduleDetail.afterAddWorkingDay)) {
      let listWorkingDay = get(newScheduleDetail, "afterAddWorkingDay", []);
      setWorkingDayList({
        list: listWorkingDay
      });
    }
  }

  const refreshAfterDeleteWorkingDay = () => {
    if (!isNil(newScheduleDetail.afterDeleteWorkingDay)) {
      let listWorkingDay = get(newScheduleDetail, "afterDeleteWorkingDay", []);
      setWorkingDayList({
        list: listWorkingDay
      });
    }
  }

  const refreshAfterAddDayOff = () => {
    setIsLoading(false);
    if (!isNil(newScheduleDetail.afterAddDayOff)) {
      let listDayOff = get(newScheduleDetail, "afterAddDayOff", []);
      setdayOffList({
        list: listDayOff
      });
    }
  }

  const refreshDeleteAddDayOff = () => {
    if (!isNil(newScheduleDetail.afterDeleteDayOff)) {
      let listDayOff = get(newScheduleDetail, "afterDeleteDayOff", []);
      setdayOffList({
        list: listDayOff
      });
    }
  }

  const refreshAfterAddWorkingStage = () => {
    if (!isNil(newScheduleDetail.afterAddWorkingStage)) {
      let stage = get(newScheduleDetail, "afterAddWorkingStage", null);
      setWorkingState({
        list: workingStage.list.concat(stage)
      });
    }
  }

  const refreshAfterUpdateWorkingStage = () => {
    if (!isNil(newScheduleDetail.afterUpdateWorkingStage)) {
      let stage = get(newScheduleDetail, "afterUpdateWorkingStage", null);
      let idx = workingStage.list.findIndex(item => item.id === stage.id);
      let list = workingStage.list;
      let shifts = get(list, `[${idx}].shifts`, []);
      set(stage, 'shifts', shifts);
      list[idx] = stage;
      setWorkingState({
        list: list
      });
    }
  }

  const refreshAfterDeleteWorkingStage = () => {
    if (!isNil(newScheduleDetail.afterDeleteWorkingStage)) {
      let stageID = get(newScheduleDetail, "afterDeleteWorkingStage");
      let list = workingStage.list;
      let idx = list.findIndex(item => item.id === stageID);
      if (idx !== -1) {
        list.splice(idx, 1);
        setWorkingState({
          list: list
        });
      }
    }
  }

  const refreshAfterOperateShiftStage = () => {
    let shifts = null;
    let stageID = null;
    switch (actionType) {
      case "CREATE_SHIFT_STAGE":
        shifts = get(newScheduleDetail, "afterCreateShiftStage.shifts");
        stageID = get(newScheduleDetail, "afterCreateShiftStage.stageID");
        break;
      case "DELETE_SHIFT_STAGE":
        shifts = get(newScheduleDetail, "afterDeleteShiftStage.shifts");
        stageID = get(newScheduleDetail, "afterDeleteShiftStage.stageID");
        break;
      case "UPDATE_SHIFT_STAGE":
        shifts = get(newScheduleDetail, "afterUpdateShiftStage.shifts");
        stageID = get(newScheduleDetail, "afterUpdateShiftStage.stageID");
        console.log("PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE");
        break;
      case "CREATE_SHIFT_STAGE_ALLTIME":
        shifts = get(newScheduleDetail, "afterCreateShiftStageAllTime.shifts");
        break;
      case "UPDATE_SHIFT_STAGE_ALLTIME":
        shifts = get(newScheduleDetail, "afterUpdateShiftStageAllTime.shifts");
        break;
      case "DELETE_SHIFT_STAGE_ALLTIME":
        shifts = get(newScheduleDetail, "afterDeleteShiftStageAllTime.shifts");
        break;
      default: break;
    }

    if (!isNil(shifts)) {
      if (!isNil(stageID)) {
        let workingStageList = workingStage.list;
        let idx = workingStageList.findIndex(item => item.id === stageID);
        set(workingStageList, `[${idx}].shifts`, shifts);
        setWorkingState({
          list: workingStageList
        });
      } else {
        setWorkingStateAll(shifts);
      }
    }
  }

  console.log(newScheduleDetail);

  React.useEffect(() => {
    CustomEventListener(PROJECT_SCHEDULE_SETTING_STARTING_DAY, refreshAfterChangeStartingDay);
    CustomEventListener(PROJECT_SCHEDULE_SETTING_WORKING_DAY, refreshAfterSettingWorkingDay);
    CustomEventListener(PROJECT_SCHEDULE_ADD_WORKING_DAYS, refeshAfterAddWorkingDay);
    CustomEventListener(PROJECT_SCHEDULE_DELETE_WORKING_DAYS, refreshAfterDeleteWorkingDay);
    CustomEventListener(PROJECT_SCHEDULE_ADD_DAY_OFF, refreshAfterAddDayOff);
    CustomEventListener(PROJECT_SCHEDULE_DELETE_DAY_OFF, refreshDeleteAddDayOff);
    CustomEventListener(PROJECT_SCHEDULE_CREATE_WORKING_STAGE, refreshAfterAddWorkingStage);
    CustomEventListener(PROJECT_SCHEDULE_DELETE_WORKING_STAGE, refreshAfterDeleteWorkingStage);
    CustomEventListener(PROJECT_SCHEDULE_UPDATE_WORKING_STAGE, refreshAfterUpdateWorkingStage);
    CustomEventListener(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE, refreshAfterOperateShiftStage);
    CustomEventListener(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE, refreshAfterOperateShiftStage);
    CustomEventListener(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE, refreshAfterOperateShiftStage);
    CustomEventListener(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
    CustomEventListener(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
    CustomEventListener(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
    return () => {
      CustomEventDispose(PROJECT_SCHEDULE_SETTING_STARTING_DAY, refreshAfterChangeStartingDay);
      CustomEventDispose(PROJECT_SCHEDULE_SETTING_WORKING_DAY, refreshAfterSettingWorkingDay);
      CustomEventDispose(PROJECT_SCHEDULE_ADD_WORKING_DAYS, refeshAfterAddWorkingDay);
      CustomEventDispose(PROJECT_SCHEDULE_DELETE_WORKING_DAYS, refreshAfterDeleteWorkingDay);
      CustomEventDispose(PROJECT_SCHEDULE_ADD_DAY_OFF, refreshAfterAddDayOff);
      CustomEventDispose(PROJECT_SCHEDULE_DELETE_DAY_OFF, refreshDeleteAddDayOff);
      CustomEventDispose(PROJECT_SCHEDULE_DELETE_WORKING_STAGE, refreshAfterDeleteWorkingStage);
      CustomEventDispose(PROJECT_SCHEDULE_UPDATE_WORKING_STAGE, refreshAfterUpdateWorkingStage);
      CustomEventDispose(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE, refreshAfterOperateShiftStage);
      CustomEventDispose(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE, refreshAfterOperateShiftStage);
      CustomEventDispose(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE, refreshAfterOperateShiftStage);
      CustomEventDispose(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
      CustomEventDispose(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
      CustomEventDispose(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME, refreshAfterOperateShiftStage);
    }
  }, [newScheduleDetail]);

  return (
    <>
      <React.Fragment>
        <CustomTableProvider
          value={{
            options: {
              title: t('views.calendar_page.right_part.project_detail'),
              mainAction: havePermission ? {
                label: t('views.calendar_page.right_part.delete_calendar'),
                onClick: () => handleDeleteGroup()
              } : null,
              subActions: [
                havePermission ? {
                  label: t('IDS_WP_EDIT_TEXT'),
                  iconPath: mdiPencilBoxOutline,
                  onClick: evt => handleEditGroupSchedule()
                } : null
              ]
            }
          }}
        >
          <CustomTableLayout children={
            <ScrollbarsContainer
              autoHide
              autoHideTimeout={500}
            >
              {
                scheduleDetail.loading && (
                  <LoadingBox />
                )
              }
              {
                !scheduleDetail.loading && (
                  <Typography component={'div'} className="view_ProjectCalendar_rightContainer">
                    <div className={"uppercase_title"}>{t('views.calendar_page.right_part.label.description')}</div>
                    <p className="view_ProjectCalendar_rightContainer_text">{scheduleDetail.data.description}</p>
                    <div className={"uppercase_title"}>{t('views.calendar_page.right_part.label.setting_calendar')}</div>
                    <p className="view_ProjectCalendar_rightContainer_text">{t('views.calendar_page.modal.setting_weekly_calendar.day_begining')}</p>
                    <FormControl variant="outlined">
                      <Select
                        value={data.selectedFistDayInWeek}
                        disabled={!havePermission}
                        onChange={({ target }) => handleSettingStartingDayOfWeek(target.value)}
                        className="selector"
                        MenuProps={{
                          className: "view_ProjectCalendar_rightContainer_Selector",
                          MenuListProps: {
                            component: Scrollbars,
                          },
                          variant: 'menu'
                        }}
                      >
                        {
                          daysInWeek.map((day) => {
                            return (
                              <MenuItem value={get(day, "value", "")} key={get(day, "value", "")}>{get(day, "name", "")}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                    <p className={"normal_title"}>{t('views.calendar_page.right_part.label.working_day_inWeek')}</p>
                    <FormGroup aria-label="position" row>
                      {
                        workingDayInWeek.map((day, index) => {
                          return (
                            <FormControlLabel
                              key={get(day, "value", "")}
                              value={get(day, "value", "")}
                              control={
                                <Checkbox
                                  disabled={!havePermission}
                                  color="primary"
                                  checked={get(day, "worked", false)}
                                  onChange={({ target }) => handleChangeWorkingInWeek(target.checked, index)}
                                />
                              }
                              label={get(day, "name", "")}
                              labelPlacement="bottom"
                            />
                          )
                        })
                      }
                    </FormGroup>
                    <p className={"normal_title"}>{t('views.calendar_page.right_part.label.add_working_and_off_day')}</p>
                    <Typography component={"div"} className={"add_working_off_day_container"}>
                      <FormControl variant="outlined">
                        <Select
                          value={data.selectedDayType}
                          className="selector"
                          onChange={({ target }) => handleChangeData('selectedDayType', target.value)}
                          MenuProps={{
                            className: "view_ProjectCalendar_rightContainer_Selector",
                            MenuListProps: {
                              component: Scrollbars,
                            },
                            variant: 'menu'
                          }}
                        >
                          <MenuItem value={0}>{t('views.calendar_page.right_part.label.one_day')}</MenuItem>
                          <MenuItem value={1}>{t('views.calendar_page.right_part.label.many_day')}</MenuItem>
                        </Select>
                      </FormControl>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          inputVariant="outlined"
                          variant="inline"
                          ampm={false}
                          value={data.selectedDateFrom}
                          onChange={value => handleChangeData('selectedDateFrom', value)}
                          format="dd/MM/yyyy"
                          className="view_ProjectCalendar_rightContainer_inputDate"
                          autoOk={true}
                        />
                        {
                          data.selectedDayType === 1 && (
                            <KeyboardDatePicker
                              disableToolbar
                              inputVariant="outlined"
                              variant="inline"
                              disabled={!data.selectedDayType}
                              ampm={false}
                              value={data.selectedDateTo}
                              minDate={data.selectedDayType === 1 ? moment(data.selectedDateFrom).add(1, 'day') : null}
                              onChange={value => handleChangeData('selectedDateTo', value)}
                              format="dd/MM/yyyy"
                              className="view_ProjectCalendar_rightContainer_inputDate"
                              autoOk={true}
                            />
                          )
                        }
                      </MuiPickersUtilsProvider>
                      <FormControl variant="outlined">
                        <Select
                          value={data.selectedWorkingType}
                          className="selector"
                          onChange={({ target }) => handleChangeData('selectedWorkingType', target.value)}
                          MenuProps={{
                            className: "view_ProjectCalendar_rightContainer_Selector",
                            MenuListProps: {
                              component: Scrollbars,
                            },
                            variant: 'menu'
                          }}
                        >
                          <MenuItem value={1} key={`select_workingType_1`}>
                            <div className="color_mark_green"></div>
                            {t('views.calendar_page.right_part.label.working_day')}
                          </MenuItem>
                          <MenuItem value={2} key={`select_workingType_2`}>
                            <div className="color_mark_red"></div>
                            {t('views.calendar_page.right_part.label.off_day')}
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {
                        havePermission && (
                          <Button
                            variant="outlined"
                            color="default"
                            size="small"
                            disabled={isLoading}
                            onClick={handleAddDay}
                          >
                            <Icon path={mdiPlus} size={1} color="#fff" />
                          </Button>
                        )
                      }
                    </Typography>
                    <Typography component={"div"} className="table_working_day">
                      <div className={"table_header"}>
                        <div className="color_mark_green"></div>
                        {t('views.calendar_page.right_part.label.working_day')}
                      </div>
                      <div className={"table_header"}>
                        <div className="color_mark_red"></div>
                        {t('views.calendar_page.right_part.label.off_day')}
                      </div>
                      <div className={"table_data"}>
                        {
                          get(workingDayList, "list", []).map((item, index) => {
                            return (
                              <Box className="table_working_day_item" style={{ backgroundColor: '#deffe0' }} key={`workingDayList_${index}`}>
                                <Typography component={"div"}>
                                  {get(item, "label", "")}
                                </Typography>
                                {
                                  havePermission && (
                                    <IconButton
                                      onClick={() => handleDeleteWorkingDays(item)}
                                    >
                                      <Icon path={mdiClose} size={0.7} color="rgba(0, 0, 0, 0.7)" />
                                    </IconButton>
                                  )
                                }
                              </Box>
                            )
                          })
                        }
                      </div>
                      <div className={"table_data"}>
                        {
                          get(dayOffList, "list", []).map((item, index) => {
                            return (
                              <Box className="table_working_day_item" style={{ backgroundColor: '#ffdedb' }} key={`workingDay_item_${index}`}>
                                <Typography component={"div"}>
                                  {get(item, "label", "")}
                                </Typography>
                                {
                                  havePermission && (
                                    <IconButton
                                      onClick={() => handleDeleteDayOff(item)}
                                    >
                                      <Icon path={mdiClose} size={0.7} color="rgba(0, 0, 0, 0.7)" />
                                    </IconButton>
                                  )
                                }
                              </Box>
                            )
                          })
                        }
                      </div>
                    </Typography>
                    <p className={"normal_title"}>{t('views.calendar_page.right_part.label.setting_working_time')}</p>
                    <Typography component={"div"} className="table_working_stage">
                      <div className={"table_header"}>
                        {t('views.calendar_page.right_part.label.time')}
                      </div>
                      <div className={"table_header"}>
                        {t('views.calendar_page.right_part.label.working_time')}
                      </div>
                      <div className={"table_data full_time"}>
                        <span>{t('views.calendar_page.right_part.label.full_time')}</span>
                      </div>
                      <div className={"table_data table_data_padding1"}>
                        <List dense={false}>
                          {
                            workingStageAll.map((shift, index) => {
                              return (
                                <>
                                  <ListItem
                                    alignItems="flex-start" key={`stage_working_all_item_${index}`}
                                    className="table_working_stage_workingStageItemContainer"
                                  >
                                    <ListItemText>{shift.name}</ListItemText>
                                    <ListItemText>{shift.start} - {shift.end}</ListItemText>
                                    <ListItemSecondaryAction>
                                      {
                                        havePermission && (
                                          <Link
                                            onClick={() => {
                                              setSelectedShiftStage(shift);
                                              setSelectedWorkingStage(null);
                                              setActionFrom("SHIFT_STAGE_ALL");
                                              setActionType("UPDATE_SHIFT_STAGE_ALLTIME");
                                              setOpenShiftStage(true);
                                            }}
                                            color="primary" variant="body2"
                                          >
                                            {t('views.calendar_page.right_part.edit')}
                                          </Link>
                                        )
                                      }
                                      {
                                        shift.can_delete && havePermission && (
                                          <Link
                                            onClick={() => {
                                              setActionType("DELETE_SHIFT_STAGE_ALLTIME");
                                              handleDeleteShiftStageAllTime(shift.id);
                                            }}
                                            color="primary" variant="body2"
                                            className="table_data_buttonLinkDanger"
                                          >
                                            {t('views.calendar_page.right_part.delete')}
                                          </Link>
                                        )
                                      }
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                  <Divider component="li" />
                                </>
                              )
                            })
                          }
                          {
                            havePermission && (
                              <ListItem key={`Item_control`}>
                                <Link
                                  onClick={() => {
                                    setSelectedWorkingStage(null);
                                    setSelectedShiftStage(null);
                                    setActionFrom("SHIFT_STAGE_ALL");
                                    setActionType("CREATE_SHIFT_STAGE_ALLTIME");
                                    setOpenShiftStage(true);
                                  }}
                                  color="primary"
                                >
                                  + {t('views.calendar_page.right_part.label.add_stage')}
                                </Link>
                              </ListItem>
                            )
                          }
                        </List>
                      </div>
                      {
                        workingStage.list.map((stage, index) => {
                          return (
                            <>
                              <Box className={"table_data stage_setting_date"} key={`working_stage_item_${index}`}>
                                {
                                  havePermission && (
                                    <Box className="stage_setting_date_control">
                                      <Box className="stage_setting_date_control_group">
                                        <IconButton
                                          key={`btn-edit-working-stage-${stage.id}`}
                                          onClick={() => {
                                            setSelectedWorkingStage(stage);
                                            setOpenModalAddTimeWorkingStage(true);
                                          }}
                                        >
                                          <abbr title={t('IDS_WP_EDIT')}>
                                            <Icon path={mdiPencilBoxOutline} size={0.85} color="#9E9E9E" />
                                          </abbr>
                                        </IconButton>
                                        <IconButton
                                          key={`btn-delete-working-stage-${stage.id}`}
                                          onClick={() => {
                                            handleDeleteWorkingStage(stage.id);
                                          }}
                                        >
                                          <abbr title={t('IDS_WP_DELETE')}>
                                            <Icon path={mdiTrashCanOutline} size={0.85} color="#9E9E9E" />
                                          </abbr>
                                        </IconButton>
                                      </Box>
                                    </Box>
                                  )
                                }
                                <Box className="stage_setting_date_label">
                                  <span className="stage_setting_date_label">{`${stage.start} - ${stage.end}`}</span>
                                </Box>
                              </Box>
                              <Box className="table_data table_data_padding1">
                                <List dense={false}>
                                  {
                                    get(stage, "shifts", []).map((shift, shiftIdx) => {
                                      return (
                                        <>
                                          <ListItem
                                            alignItems="flex-start" key={`stage_working_shift_item_${shiftIdx}`}
                                            className="table_working_stage_workingStageItemContainer"
                                          >
                                            <ListItemText>{shift.name}</ListItemText>
                                            <ListItemText>{shift.start} - {shift.end}</ListItemText>
                                            {
                                              havePermission && (
                                                <ListItemSecondaryAction>
                                                  <Link
                                                    color="primary" variant="body2"
                                                    onClick={() => {
                                                      setSelectedShiftStage(shift);
                                                      setSelectedWorkingStage(stage);
                                                      setActionFrom("SHIFT_STAGE");
                                                      setActionType("UPDATE_SHIFT_STAGE");
                                                      setOpenShiftStage(true);
                                                    }}
                                                  >
                                                    {t('views.calendar_page.right_part.edit')}
                                                  </Link>
                                                  <Link
                                                    onClick={() => {
                                                      setActionType("DELETE_SHIFT_STAGE");
                                                      hanleDeleteShiftStage(stage.id, shift.id);
                                                    }}
                                                    color="primary" variant="body2"
                                                    className="table_data_buttonLinkDanger"
                                                  >
                                                    {t('views.calendar_page.right_part.delete')}
                                                  </Link>
                                                </ListItemSecondaryAction>
                                              )
                                            }
                                          </ListItem>
                                          <Divider component="li" />
                                        </>
                                      )
                                    })
                                  }
                                  {
                                    havePermission && (
                                      <ListItem key={`Item_control_${stage.id}`}>
                                        <Link
                                          key={`add_shift_stage_btn_${stage.id}`}
                                          onClick={() => {
                                            setSelectedWorkingStage(stage);
                                            setSelectedShiftStage(null);
                                            setActionFrom("SHIFT_STAGE");
                                            setActionType("CREATE_SHIFT_STAGE");
                                            setOpenShiftStage(true);
                                          }}
                                          color="primary"
                                        >
                                          + {t('views.calendar_page.right_part.label.add_stage')}
                                        </Link>
                                      </ListItem>
                                    )
                                  }
                                </List>
                              </Box>
                            </>
                          )
                        })
                      }
                    </Typography>
                    {
                      havePermission && (
                        <Link
                          onClick={() => {
                            setSelectedWorkingStage(null);
                            setOpenModalAddTimeWorkingStage(true);
                          }}
                          color="primary"
                        >
                          + {t('views.calendar_page.right_part.label.add_time')}
                        </Link>
                      )
                    }
                  </Typography>
                )
              }
            </ScrollbarsContainer>
          } />
        </CustomTableProvider>
      </React.Fragment>

      <WorkingStageModal
        open={openModalAddTimeWorkingStage}
        setOpen={setOpenModalAddTimeWorkingStage}
        onConfirm={(actionType, stageID, dateFrom, dateTo) => {
          if (actionType === "CREATE") {
            handleAddWorkingStage(
              moment(dateFrom).format("YYYY-MM-DD"),
              moment(dateTo).format("YYYY-MM-DD")
            );
          } else {
            handleUpdateWorkingStage(
              stageID,
              moment(dateFrom).format("YYYY-MM-DD"),
              moment(dateTo).format("YYYY-MM-DD")
            )
          }
        }}
        workingStage={selectedWorkingStage}
      />
      <ShiftStageModal
        open={openShiftStage}
        setOpen={setOpenShiftStage}
        onConfirm={(actionType, data) => {
          if (actionType === "CREATE") {
            handleCreateShiftStage(
              get(selectedWorkingStage, "id", null),
              data.shiftName, data.selectedTimeStart,
              data.selectedTimeEnd
            );
          } else {
            handleUpdateShiftStage(
              get(selectedWorkingStage, "id", null),
              selectedShiftStage.id,
              data.shiftName,
              data.selectedTimeStart,
              data.selectedTimeEnd
            );
          }
        }}
        shiftStage={selectedShiftStage}
        actionFrom={actionFrom}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    settingDate: state.setting.settingDate,
    newScheduleDetail: projectGroupNewScheduleDetailSelector(state)
  };
};

export default connect(mapStateToProps)(CalendarProjectRightPartPresenter);