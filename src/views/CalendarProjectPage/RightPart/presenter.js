import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiClose, mdiPencilBoxOutline, mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingBox from 'components/LoadingBox';
import { ScrollbarsContainer } from "components/TableComponents";
import { filter, get, set } from "lodash";
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ShiftStageModal from 'views/CalendarPage/views/Modals/ShiftStageModal';
import WorkingStageModal from 'views/CalendarPage/views/Modals/WorkingStageModal';
import { bgColorSelector } from "../selectors";
import './style.scss';

function CalendarProjectRightPartPresenter({
  havePermission, settingDate, scheduleDetail, handleSettingStartingDayOfWeek,
  handleAddWorkingDay, handleDeleteWorkingDays, handleDeleteDayOff,
  handleAddDayOff, handleAddWorkingDayInWeek, handleAddWorkingStage,
  handleDeleteWorkingStage, handleUpdateWorkingStage, handleCreateShiftStage,
  hanleDeleteShiftStage, handleUpdateShiftStage, handleDeleteShiftStageAllTime,
  handleDeleteGroup, handleEditGroupSchedule
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

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  const handleAddDay = (evt) => {
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
    changeWorkingDayInWeek(_workingDaysInWeek);
    let workingDay = filter(_workingDaysInWeek, { 'worked': true });
    handleAddWorkingDayInWeek(workingDay.map(day => day.value));
  }

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
                scheduleDetail.loading ? (
                  <LoadingBox />
                ) : (
                    <Typography component={'div'} className="view_ProjectCalendar_rightContainer">
                      <div className={"uppercase_title"}>{t('views.calendar_page.right_part.label.description')}</div>
                      <p className="view_ProjectCalendar_rightContainer_text">{scheduleDetail.data.description}</p>
                      <div className={"uppercase_title"}>{t('views.calendar_page.right_part.label.setting_calendar')}</div>
                      <p className="view_ProjectCalendar_rightContainer_text">{t('views.calendar_page.modal.setting_weekly_calendar.day_begining')}</p>
                      <FormControl variant="outlined">
                        <Select
                          value={data.selectedFistDayInWeek}
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
                            className="inputDate"
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
                                className="inputDate"
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
                            <MenuItem value={1}>
                              <div className="color_mark_green"></div>
                              {t('views.calendar_page.right_part.label.working_day')}
                            </MenuItem>
                            <MenuItem value={2}>
                              <div className="color_mark_red"></div>
                              {t('views.calendar_page.right_part.label.off_day')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="outlined"
                          color="default"
                          size="small"
                          onClick={handleAddDay}
                        >
                          <Icon path={mdiPlus} size={1} color="#fff" />
                        </Button>
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
                            get(workingDayList, "list", []).map((item) => {
                              return (
                                <Box className="table_working_day_item" style={{ backgroundColor: '#deffe0' }}>
                                  <Typography component={"div"}>
                                    {get(item, "label", "")}
                                  </Typography>
                                  <IconButton
                                    onClick={() => handleDeleteWorkingDays(item)}
                                  >
                                    <Icon path={mdiClose} size={0.7} color="rgba(0, 0, 0, 0.7)" />
                                  </IconButton>
                                </Box>
                              )
                            })
                          }
                        </div>
                        <div className={"table_data"}>
                          {
                            get(dayOffList, "list", []).map((item, index) => {
                              return (
                                <Box className="table_working_day_item" style={{ backgroundColor: '#ffdedb' }}>
                                  <Typography component={"div"}>
                                    {get(item, "label", "")}
                                  </Typography>
                                  <IconButton
                                    onClick={() => handleDeleteDayOff(item)}
                                  >
                                    <Icon path={mdiClose} size={0.7} color="rgba(0, 0, 0, 0.7)" />
                                  </IconButton>
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
                                        <Link
                                          onClick={() => {
                                            setSelectedShiftStage(shift);
                                            setSelectedWorkingStage(null);
                                            setOpenShiftStage(true);
                                          }}
                                          color="primary" variant="body2"
                                        >
                                          {t('views.calendar_page.right_part.edit')}
                                        </Link>
                                        {
                                          shift.can_delete && (
                                            <Link
                                              onClick={() => handleDeleteShiftStageAllTime(shift.id)}
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
                            <ListItem key={`Item_control`}>
                              <Link
                                onClick={() => {
                                  setSelectedWorkingStage(null);
                                  setOpenShiftStage(true);
                                }}
                                color="primary"
                              >
                                + {t('views.calendar_page.right_part.label.add_stage')}
                              </Link>
                            </ListItem>
                          </List>
                        </div>
                        {
                          workingStage.list.map((stage, index) => {
                            return (
                              <>
                                <Box className={"table_data stage_setting_date"}>
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
                                              <ListItemSecondaryAction>
                                                <Link
                                                  color="primary" variant="body2"
                                                  onClick={() => {
                                                    setSelectedShiftStage(shift);
                                                    setSelectedWorkingStage(stage);
                                                    setOpenShiftStage(true);
                                                  }}
                                                >
                                                  {t('views.calendar_page.right_part.edit')}
                                                </Link>
                                                <Link
                                                  onClick={() => hanleDeleteShiftStage(stage.id, shift.id)}
                                                  color="primary" variant="body2"
                                                  className="table_data_buttonLinkDanger"
                                                >
                                                  {t('views.calendar_page.right_part.delete')}
                                                </Link>
                                              </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider component="li" />
                                          </>
                                        )
                                      })
                                    }
                                    <ListItem key={`Item_control_${stage.id}`}>
                                      <Link
                                        key={`add_shift_stage_btn_${stage.id}`}
                                        onClick={() => {
                                          setSelectedWorkingStage(stage);
                                          setOpenShiftStage(true);
                                        }}
                                        color="primary"
                                      >
                                        + {t('views.calendar_page.right_part.label.add_stage')}
                                      </Link>
                                    </ListItem>
                                  </List>
                                </Box>
                              </>
                            )
                          })
                        }
                      </Typography>
                      <Link
                        onClick={() => {
                          setSelectedWorkingStage(null);
                          setOpenModalAddTimeWorkingStage(true);
                        }}
                        color="primary"
                      >
                        + {t('views.calendar_page.right_part.label.add_time')}
                      </Link>
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
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    settingDate: state.setting.settingDate,
  };
};

export default connect(mapStateToProps)(CalendarProjectRightPartPresenter);