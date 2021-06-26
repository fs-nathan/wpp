import DateFnsUtils from '@date-io/date-fns';
import { Button, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiBellOutline, mdiCalendarMonthOutline, mdiPencilBoxMultipleOutline, mdiPlusCircleOutline, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import PlaceIcon from '@material-ui/icons/Place';
import { createSchedule } from 'actions/calendar/weeklyCalendar/createSchedule';
import { deleteSchedule } from "actions/calendar/weeklyCalendar/deleteSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeekFromModal";
import { updateSchedule } from "actions/calendar/weeklyCalendar/updateSchedule";
import { listUserOfGroup } from "actions/user/listUserOfGroup";
import AlertModal from "components/AlertModal";
import AvatarCircleList from 'components/AvatarCircleList';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import TimePicker from 'components/TimePicker';
import WeekSelect from 'components/WeekSelect';
import YearSelect from 'components/YearSelect';
import { CREATE_WEEKLY_SCHEDULE, CustomEventDispose, CustomEventListener, DELETE_WEEKLY_SCHEDULE, UPDATE_WEEKLY_SCHEDULE } from "constants/events";
import { findIndex, get, isNil, map, pick } from "lodash";
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import { membersSelector, scheduleOfWeekSelector } from './selectors';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Calendar_CreateWeekly_Modal_container ${className}`}
    {...props}
  />;
const RightHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Calendar_CreateWeekly_Modal_right-header ${className}`}
    {...props}
  />

const LeftHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Calendar_CreateWeekly_Modal_left-header ${className}`}
    {...props}
  />

const CalendarItemContainer = ({ className = "", ...rest }) => (
  <div className={`view_WeeklyCalendar_rightContainer__itemContainer ${className}`} {...rest} />
);
const DateWrapper = ({ className = '', ...props }) =>
  <div
    className={`view_Calendar_CreateWeekly_Modal__date-wrapper ${className}`}
    {...props}
  />

const DEFAULT_DATA = {
  selectedTime: moment().format("HH:mm"),
  selectedDate: moment().toDate(),
  title: "",
  place: "",
  content: "",
  notifyWhenDue: true,
  notifyBeforeTime: 30,
  notifyTimeType: 0
};

function CreateWeeklyCalendar({
  open, setOpen, dateSetting, actionType = "CREATE",
  members, doListScheduleOfWeek, scheduleOfWeek,
  doCreateSchedule, doDeleteSchedule, doListMemebers,
  doUpdateSchedule, loadingUpdate = false, loadingCreate = false,
  loadingDelete = false, weekSchedule = null
}) {
  const { t } = useTranslation();
  const params = useParams();
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [receiverListIndex, setReceiverListIndex] = React.useState([]);
  const [openReceiverDialog, setOpenReceiverDialog] = React.useState(false);
  const [operationType, setOperationType] = React.useState("CREATE");
  const [schedule, setSchedule] = React.useState(null);
  const dateFormatSetting = get(dateSetting, "date_format", "DD/MM/YYYYY");
  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [scheduleID, setScheduleID] = React.useState();
  const [weekScheduleSelf, setWeekScheduleSelf] = React.useState({});

  const [validation, setValidation] = React.useState({
    title: { error: false, message: "" },
    content: { error: false, message: "" }
  })

  const [weekSelectedLabel, setWeekSelectedLabel] = React.useState({
    start: "",
    end: ""
  });

  React.useEffect(() => {
    let keys = Array.from(members.members, (v, k) => k);
    setReceiverListIndex(keys);
    if (weekSchedule) {
      setWeekScheduleSelf(weekSchedule)
    }
    refreshForm();
  }, [open, weekSchedule]);

  const refreshForm = () => {
    setOperationType("CREATE");
    handleChangeData("title", '');
    handleChangeData("place", '');
    handleChangeData("content", '');
    handleChangeData("scheduleID", null);
    setValidationState("title", { error: false, message: "" });
    setValidationState("content", { error: false, message: "" });
    handleChangeData("selectedTime", moment().format("HH:mm"));
    handleChangeData("notifyWhenDue", true);
    handleChangeData("notifyTimeType", 0);
    handleChangeData("notifyBeforeTime", 30);
  }

  React.useEffect(() => {
    if (members.members.length === 0) {
      doListMemebers(false);
    }
  }, [doListMemebers]);

  React.useEffect(() => {
    if (members.members.length !== 0) {
      let keys = Array.from(members.members, (v, k) => k);
      setReceiverListIndex(keys);
    }
  }, [members]);

  const days = [
    t('views.calendar_page.modal.setting_weekly_calendar.sunday'),
    t('views.calendar_page.modal.setting_weekly_calendar.monday'),
    t('views.calendar_page.modal.setting_weekly_calendar.tuesday'),
    t('views.calendar_page.modal.setting_weekly_calendar.wednesday'),
    t('views.calendar_page.modal.setting_weekly_calendar.thursday'),
    t('views.calendar_page.modal.setting_weekly_calendar.friday'),
    t('views.calendar_page.modal.setting_weekly_calendar.saturday')
  ]

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  const handleReceiverChange = (value) => {
    setReceiverListIndex(value);
  }

  React.useEffect(() => {
    if (weekScheduleSelf.id) {
      setWeekSelectedLabel({
        start: weekScheduleSelf.start,
        end: weekScheduleSelf.end
      });
      handleChangeData("selectedDate", moment(weekScheduleSelf.start, dateFormatSetting));
    }
  }, [weekScheduleSelf]);

  React.useEffect(() => {
    if (open === true) {
      doListScheduleOfWeek({ schedule_id: weekScheduleSelf.id });
    }

    const reloadListScheduleOfWeek = () => {
      doListScheduleOfWeek({ schedule_id: weekScheduleSelf.id }, false);
      refreshForm();
    }

    CustomEventListener(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    return () => {
      CustomEventDispose(CREATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    }
  }, [open, weekScheduleSelf]);

  const setValidationState = (attName, value) => {
    setValidation(prevState => ({ ...prevState, [attName]: value }));
  }

  function handleCreateNew() {
    validate();
    if (data.title !== "" && data.content !== "") {
      doCreateSchedule({ schedule: createScheduleModal() }, false);
    }
  }

  const handleDeleteSchedule = (scheduleID) => {
    doDeleteSchedule({ scheduleID }, false);
  }

  function validate() {
    if (data.title === "") {
      setValidationState("title",
        {
          error: true,
          message: `${t('views.calendar_page.modal.create_weekly_calendar.label.title')} ${t('IDS_WP_REQUIRED')}`
        }
      );
    }
    else { setValidationState("title", { error: false, message: "" }) }
    if (data.content === "") {
      setValidationState("content",
        {
          error: true,
          message: `${t('views.calendar_page.modal.create_weekly_calendar.content')} ${t('IDS_WP_REQUIRED')}`
        }
      )
    }
    else { setValidationState("content", { error: false, message: "" }) }
  }

  const handleEditSchedule = (schedule, date) => {
    handleChangeData("selectedDate", moment(date, dateFormatSetting));
    handleChangeData("selectedTime", get(schedule, "time", data.selectedTime));
    handleChangeData("title", get(schedule, "title", data.title));
    handleChangeData("place", get(schedule, "place", data.place));
    handleChangeData("content", get(schedule, "content", data.selectedTime));
    handleChangeData("notifyWhenDue", get(schedule, "is_remind", data.notifyWhenDue));
    handleChangeData("scheduleID", get(schedule, "id", data.scheduleID));
    if (data.notifyWhenDue) {
      let notifyBeforeTime = get(schedule, "remind_before", null);
      let notifyTimeType = 0;
      if (notifyBeforeTime !== null) {
        if (notifyBeforeTime >= 24 * 60 * 60) {
          notifyTimeType = 2;
          notifyBeforeTime = notifyBeforeTime / 1440;
        } else if (notifyBeforeTime >= 60) {
          notifyTimeType = 1;
          notifyBeforeTime = notifyBeforeTime / 60;
        }
      }
      handleChangeData("notifyBeforeTime", notifyBeforeTime);
      handleChangeData("notifyTimeType", notifyTimeType);
    }
    setValidationState("title", { error: false, message: "" });
    setValidationState("content", { error: false, message: "" });

    if (get(schedule, "assign_to_all") === true) {
      let keys = Array.from(members.members, (v, k) => k);
      setReceiverListIndex(keys);
    } else {
      let receiverList = get(schedule, "members_assign", []);
      let idxArr = [];
      receiverList.map((item) => {
        let idx = findIndex(members.members, { id: item.id });
        idxArr.push(idx);
      });
      setReceiverListIndex(idxArr);
    }
    setOperationType("EDIT");
  }

  React.useEffect(() => {
    if (schedule !== null) {
      doUpdateSchedule({ schedule }, false);
      handleChangeData("title", '');
      handleChangeData("place", '');
      handleChangeData("content", '');
      handleChangeData("scheduleID", null);
    }
  }, [doUpdateSchedule, schedule, setSchedule]);

  function hanleCancelUpdate() {
    setOperationType("CREATE");
    handleChangeData("title", '');
    handleChangeData("place", '');
    handleChangeData("content", '');
    handleChangeData("scheduleID", null);
    setValidationState("title", { error: false, message: "" });
    setValidationState("content", { error: false, message: "" });
  }

  function handleUpdate() {
    validate();
    if (data.title !== "" && data.content !== "") {
      setSchedule(createScheduleModal());
    }
  }

  function createScheduleModal() {
    let date = moment(data.selectedDate, dateFormatSetting);
    let user_assign = Object.values(pick(members.members, receiverListIndex));
    let remindBeforeTime = data.notifyBeforeTime;
    if (data.notifyTimeType === 1) remindBeforeTime = remindBeforeTime * 60;
    if (data.notifyTimeType === 2) remindBeforeTime = remindBeforeTime * 60 * 24;
    let schedule = {
      week_schedule_id: weekScheduleSelf.id,
      schedule_id: data.scheduleID,
      schedule_date: date.format("YYYY-MM-DD"),
      schedule_time: data.selectedTime,
      title: data.title,
      place: data.place,
      content: data.content,
      remind_before: remindBeforeTime,
      set_remind: data.notifyWhenDue,
      assign_to_all: (members.members.length === receiverListIndex.length) ? true : false,
      user_assign: (receiverListIndex.length !== 0 && members.members.length !== receiverListIndex.length) ? map(user_assign, "id") : []
    }
    return schedule;
  }

  function handleFocusTextField(type) {
    if (type == "title") {
      setValidationState("title", { error: false, message: "" });
    } else {
      setValidationState("content", { error: false, message: "" });
    }
  }
  console.log(scheduleOfWeek)

  return (
    <>
      <CustomModal
        title={actionType === "CREATE" ? t("views.calendar_page.modal.create_weekly_calendar.title") : t("views.calendar_page.modal.edit_weekly_calendar.title")}
        open={open}
        setOpen={setOpen}
        height='medium'
        className={"comp_CustomModal modal-work-schedule-of-week views_createWeeklyCalendar_CustomModal"}
        actionLoading={scheduleOfWeek.loading}
        confirmRender={null}
        cancleRender={() => t("LABEL_EXIT")}
      >
        <div className="main_container">
          <div className="header_control">
            <div className="header_control_icon">
              <Icon
                path={mdiCalendarMonthOutline}
                size={1.4}
                color="#C46111"
              />
            </div>
            <div className="label_block">
              <Typography variant="h6">{weekScheduleSelf.name}</Typography>
              <Typography variant="subtitle1">{`${t('IDS_WP_WEEK')} ${weekScheduleSelf.week}/${weekScheduleSelf.year} (${weekScheduleSelf.start} - ${weekScheduleSelf.end})`}</Typography>
            </div>
          </div>
          <Container>
            <Scrollbars>
              <div className="left">
                <>
                  <LeftHeader>{t("views.calendar_page.modal.create_weekly_calendar.title_left")}</LeftHeader>
                  <abbr title={t('IDS_WP_REQUIRED_LABEL')}>
                    <ColorTypo className="label">{t('views.calendar_page.modal.create_weekly_calendar.select_time')}<span className="label_required">*</span></ColorTypo>
                  </abbr>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateWrapper>
                      <TimePicker
                        value={data.selectedTime}
                        onChange={(value) => handleChangeData('selectedTime', value)}
                      />
                      <KeyboardDatePicker
                        disableToolbar
                        contentEditable={false}
                        inputVariant="outlined"
                        variant="inline"
                        invalidDateMessage={t('DATE_ERROR_FORMAT_MESSAGE')}
                        minDateMessage={t('DATE_ERROR_INTERVAL_MIN_MESSAGE')}
                        maxDateMessage={t('DATE_ERROR_INTERVAL_MAX_MESSAGE')}
                        ampm={false}
                        value={data.selectedDate}
                        onChange={value => handleChangeData('selectedDate', value)}
                        format={dateFormatSetting.replace("DD", "dd").replace("YYYY", "yyyy")}
                        className="inputDate"
                        minDate={moment(weekSelectedLabel.start, dateFormatSetting)}
                        maxDate={moment(weekSelectedLabel.end, dateFormatSetting)}
                        autoOk={true}
                      />
                    </DateWrapper>
                  </MuiPickersUtilsProvider>
                  <abbr title={t('IDS_WP_REQUIRED_LABEL')}>
                    <ColorTypo className="label">
                      {t('views.calendar_page.modal.create_weekly_calendar.label.title')}
                      <span className="label_required">*</span>
                    </ColorTypo>
                  </abbr>
                  <TextField
                    size="small"
                    variant="outlined"
                    className="input_text"
                    value={data.title}
                    error={validation.title.error}
                    helperText={validation.title.message}
                    onChange={({ target }) => handleChangeData('title', target.value)}
                    onFocus={() => handleFocusTextField("title")}
                  />
                  <abbr title={t('IDS_WP_REQUIRED_LABEL')}>
                    <ColorTypo className="label">{t('views.calendar_page.modal.create_weekly_calendar.content')}<span className="label_required">*</span></ColorTypo>
                  </abbr>
                  <TextField
                    value={data.content}
                    size="small"
                    variant="outlined"
                    className="input_text"
                    multiline
                    error={validation.content.error}
                    helperText={validation.content.message}
                    rows={3}
                    fullWidth
                    onChange={({ target }) => handleChangeData('content', target.value)}
                    onFocus={() => handleFocusTextField("content")}
                  />
                  <abbr>
                    <ColorTypo className="label">
                      {t('LABEL_PLACE')}
                    </ColorTypo>
                  </abbr>
                  <TextField
                    value={data.place}
                    size="small"
                    variant="outlined"
                    className="input_text"
                    multiline
                    rows={2}
                    fullWidth
                    onChange={({ target }) => handleChangeData('place', target.value)}
                    onFocus={() => handleFocusTextField("place")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.notifyWhenDue} color="primary"
                        onChange={({ target }) => handleChangeData('notifyWhenDue', target.checked)}
                      />
                    }
                    label={t('views.calendar_page.modal.create_weekly_calendar.notify_due')}
                  />
                  {
                    data.notifyWhenDue && (
                      <div>
                        <Typography component={'div'} className="notify_setting_block block_grid">
                          <Typography component={'span'}>{t('views.calendar_page.modal.create_weekly_calendar.notify_before')}</Typography>
                          <TextField
                            className="notify_setting_block__notifyBeforeTime"
                            variant="outlined"
                            value={data.notifyBeforeTime}
                            onChange={({ target }) => handleChangeData('notifyBeforeTime', target.value)}
                          />
                          <Typography component={'span'} className="divider">-</Typography>
                          <Select
                            className={"notify_setting_block__timeTypeSelector"}
                            variant="outlined"
                            value={data.notifyTimeType}
                            onChange={({ target }) => handleChangeData('notifyTimeType', target.value)}
                            MenuProps={{
                              className: "notify_setting_block__timeTypeSelector--paper",
                              MenuListProps: {
                                component: Scrollbars,
                              },
                              variant: 'menu'
                            }}
                          >
                            <MenuItem key={'minues'} value={0}>{t('views.calendar_page.modal.create_weekly_calendar.minues')}</MenuItem>
                            <MenuItem key={'hours'} value={1}>{t('views.calendar_page.modal.create_weekly_calendar.hours')}</MenuItem>
                            <MenuItem key={'day'} value={2}>{t('views.calendar_page.modal.create_weekly_calendar.day')}</MenuItem>
                          </Select>
                        </Typography>
                        <Typography component={'div'} className="receiver_block block_grid">
                          <Typography component={'span'}>{t('views.calendar_page.modal.create_weekly_calendar.receiver')}</Typography>
                          {
                            (receiverListIndex.length === members.members.length) &&
                            <Typography component={'span'} className="selected_receiver">{t('views.calendar_page.modal.create_weekly_calendar.all')}</Typography>
                          }
                          {
                            (receiverListIndex.length !== 0 && receiverListIndex.length < members.members.length) &&
                            <AvatarCircleList
                              users={Object.values(pick(members.members, receiverListIndex)).map((member) => ({
                                name: get(member, 'name'),
                                avatar: get(member, 'avatar')
                              }))}
                              display={3}
                            />
                          }
                          <Typography component={'span'} className="divider"></Typography>
                          <Button
                            color="primary"
                            className="change_receiver_btn"
                            startIcon={<Icon
                              path={mdiPlusCircleOutline}
                              size={0.5}
                              color="#029CF3"
                            />}
                            onClick={evt => {
                              setOpenReceiverDialog(true)
                            }}
                          >
                            {t('views.calendar_page.modal.create_weekly_calendar.change')}
                          </Button>
                        </Typography>
                      </div>
                    )
                  }
                  <Typography component={'div'} className="centered_block">
                    {
                      operationType === "CREATE" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={handleCreateNew}
                          disableElevation
                          disabled={loadingCreate}
                        >
                          {loadingCreate && (
                            <CircularProgress size={20} className="margin-circular" color="secondary" />
                          )}
                          {t('IDS_WP_ADD')}
                        </Button>
                      )
                    }
                    {
                      operationType === "EDIT" && (
                        <div className="centered_block_group">
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleUpdate}
                            disableElevation
                            disabled={loadingUpdate}
                          >
                            {loadingUpdate && (
                              <CircularProgress size={20} className="margin-circular" color="secondary" />
                            )}
                            {t('IDS_WP_UPDATE')}
                          </Button>
                          <Button
                            variant="contained"
                            color="default"
                            size="medium"
                            onClick={() => hanleCancelUpdate()}
                            disableElevation
                          >
                            {t('IDS_WP_CANCEL')}
                          </Button>
                        </div>
                      )
                    }
                  </Typography>
                </>
              </div>
            </Scrollbars>
            <Scrollbars>
              <div className="right">
                <RightHeader>{t("views.calendar_page.modal.create_weekly_calendar.detail_content")}</RightHeader>
                <React.Fragment>
                  <div className={"view_createWeeklyCalendar_list_container"}>
                    <table className="table-work-shedule-modal">
                      {
                        scheduleOfWeek.data.map((item, index) => {
                          if (item.schedules.length !== 0) {
                            return (
                              <>
                                <tr key={"p" + index}>
                                  <td colspan="5" className="row-date">
                                    <b>{days[new Date(item.date_original).getDay()]}</b>
                                    <span>({item.date})</span>
                                  </td>
                                </tr>
                                {
                                  item.schedules.map(schedule => (
                                    <tr key={schedule.id}>
                                      <td className="step-bell">
                                        {
                                          schedule.is_remind && (
                                            <Tooltip title={schedule.title_remind_before} placement="right">
                                              <Icon path={mdiBellOutline} size={0.85} color="rgba(0, 0, 0, 0.7)" />
                                            </Tooltip>
                                          )
                                        }
                                        {
                                          !schedule.is_remind && <Icon path={''} size={0.75} color="#969696" />
                                        }
                                      </td>
                                      <td className="step-time">
                                        <span>{schedule.time}</span>
                                      </td>
                                      <td className="step-main-info">
                                        <b>{schedule.title}</b>
                                        <span>{schedule.content}</span>
                                        {
                                          schedule.place && schedule.place !== "" && (
                                            <div>
                                              <PlaceIcon />
                                              <span>{schedule.place}</span>
                                            </div>
                                          )
                                        }
                                      </td>
                                      <td>
                                        {
                                          schedule.assign_to_all && (
                                            <div className="assign_to_all">{t('views.calendar_page.modal.create_weekly_calendar.all')}</div>
                                          )
                                        }
                                        {
                                          !schedule.assign_to_all && (
                                            <AvatarCircleList
                                              users={schedule.members_assign.map((member) => ({
                                                name: get(member, 'name'),
                                                avatar: get(member, 'avatar')
                                              }))}
                                              display={3}
                                            />
                                          )
                                        }
                                      </td>
                                      <td className="step-control">
                                        {
                                          schedule.can_modify && (
                                            <>
                                              <abbr title={t('IDS_WP_EDIT')}>
                                                <IconButton
                                                  edge="end"
                                                  onClick={evt => handleEditSchedule(schedule, item.date)}
                                                >
                                                  <Icon
                                                    path={mdiPencilBoxMultipleOutline}
                                                    size={0.75}
                                                    color="#969696"
                                                  />
                                                </IconButton>
                                              </abbr>
                                              <abbr title={t('IDS_WP_DELETE')}>
                                                <IconButton edge="end"
                                                  key={`views_createWeeklyCalendar_delete_schedule_btn_${schedule.id}`}
                                                  onClick={evt => {
                                                    setScheduleID(schedule.id);
                                                    setAlertConfirm(true);
                                                  }}
                                                >
                                                  <Icon path={mdiTrashCanOutline} size={0.75} color="#969696" />
                                                </IconButton>
                                              </abbr>
                                            </>
                                          )
                                        }
                                      </td>
                                    </tr>
                                  ))
                                }
                              </>
                            )
                          }
                        })
                      }
                    </table>
                  </div>
                </React.Fragment>
              </div>
            </Scrollbars>
          </Container>
        </div>
      </CustomModal>
      <AddOfferMemberModal
        setOpen={setOpenReceiverDialog}
        isOpen={openReceiverDialog}
        members={members.members}
        value={receiverListIndex}
        disableIndexes={[]}
        onChange={value => handleReceiverChange(value)}
      />
      <AlertModal
        open={alertConfirm}
        setOpen={setAlertConfirm}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => {
          handleDeleteSchedule(scheduleID);
        }}
        actionLoading={loadingDelete}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateSchedule: ({ schedule }, quite) => dispatch(updateSchedule({ schedule }, quite)),
    doListScheduleOfWeek: ({ schedule_id }, quite) => dispatch(listScheduleOfWeek({ schedule_id }, quite)),
    doCreateSchedule: ({ schedule }, quite) => dispatch(createSchedule({ schedule }, quite)),
    doDeleteSchedule: ({ scheduleID }, quite) => dispatch(deleteSchedule({ scheduleID }, quite)),
    doListMemebers: (quite) => dispatch(listUserOfGroup(quite)),
  };
};

export default connect(
  state => ({
    members: membersSelector(state),
    scheduleOfWeek: scheduleOfWeekSelector(state),
    dateSetting: state.setting.settingDate.find(item => item.selected === true),
    loadingUpdate: state.calendar.updateSchedule.loading,
    loadingCreate: state.calendar.createSchedule.loading,
    loadingDelete: state.calendar.deleteSchedule.loading
  }),
  mapDispatchToProps
)(CreateWeeklyCalendar);