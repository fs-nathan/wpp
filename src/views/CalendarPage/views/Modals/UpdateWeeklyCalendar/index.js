import DateFnsUtils from '@date-io/date-fns';
import { Button, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiBellOutline, mdiCalendarMonthOutline, mdiPencilBoxMultipleOutline, mdiPlusCircleOutline, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteSchedule } from "actions/calendar/weeklyCalendar/deleteSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeek";
import { updateSchedule } from "actions/calendar/weeklyCalendar/updateSchedule";
import AvatarCircleList from 'components/AvatarCircleList';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import TimePicker from 'components/TimePicker';
import WeekSelect from 'components/WeekSelect';
import YearSelect from 'components/YearSelect';
import { CustomEventDispose, CustomEventListener, DELETE_WEEKLY_SCHEDULE, UPDATE_WEEKLY_SCHEDULE } from 'constants/events';
import { findIndex, get, map, pick } from "lodash";
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import { membersSelector, scheduleOfWeekSelector } from './selectors';


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
  scheduleID: null,
  selectedTime: '08:30',
  selectedDate: moment().toDate(),
  title: "",
  content: "",
  selectedYear: (new Date()).getFullYear(),
  selectedWeek: moment().isoWeek(),
  notifyWhenDue: true,
  notifyBeforeTime: 30,
  notifyTimeType: 0
};

function UpdateWeeklyCalendar({
  open, setOpen, dateSetting,
  members, WeeksInYear,
  scheduleOfWeek, handleOnClose,
  doUpdateSchedule, doListScheduleOfWeek,
  doDeleteSchedule
}) {

  const { t } = useTranslation();
  const params = useParams();
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [receiverListIndex, setReceiverListIndex] = React.useState([]);
  const [openReceiverDialog, setOpenReceiverDialog] = React.useState(false);
  const [schedule, setSchedule] = React.useState(null);
  const dateFormatSetting = get(dateSetting, "date_format", "DD/MM/YYYYY");

  const [validation, setValidation] = React.useState({
    title: { error: false, message: "" },
    content: { error: false, message: "" }
  })

  const [weekSelectedLabel, setWeekSelectedLabel] = React.useState({
    start: "",
    end: ""
  });

  React.useEffect(() => {
    setReceiverListIndex([]);
  }, [open]);

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
    setDataMember(DEFAULT_DATA);
    setReceiverListIndex([]);
    handleChangeData("selectedYear", params.year);
    handleChangeData("selectedWeek", params.week);
  }, [params])

  React.useEffect(() => {
    if (WeeksInYear.length !== 0) {
      setWeekSelectedLabel({
        start: WeeksInYear[data.selectedWeek - 1].start,
        end: WeeksInYear[data.selectedWeek - 1].end
      });
      handleChangeData("selectedDate", moment(WeeksInYear[data.selectedWeek - 1].start, dateFormatSetting));
    }
  }, [WeeksInYear, data.selectedWeek])

  const setValidationState = (attName, value) => {
    setValidation(prevState => ({ ...prevState, [attName]: value }));
  }

  function handleUpdate() {
    if (data.title === "") { setValidationState("title", { error: true, message: "title is required" }) }
    else { setValidationState("title", { error: false, message: "" }) }
    if (data.content === "") { setValidationState("content", { error: true, message: "content is required" }) }
    else { setValidationState("content", { error: false, message: "" }) }

    if (data.title !== "" && data.content !== "") {
      let date = moment(data.selectedDate, dateFormatSetting);
      let user_assign = Object.values(pick(members.members, receiverListIndex));
      let schedule = {
        schedule_id: data.scheduleID,
        schedule_date: date.format("YYYY-MM-DD"),
        schedule_time: data.selectedTime,
        title: data.title,
        content: data.content,
        set_remind: data.notifyWhenDue,
        assign_to_all: receiverListIndex.length === 0 ? true : false,
        user_assign: receiverListIndex.length !== 0 ? map(user_assign, "id") : []
      }
      setSchedule(schedule);
    }
  }

  React.useEffect(() => {
    if (schedule !== null) {
      doUpdateSchedule({ schedule }, false);
      const reloadListScheduleOfWeek = () => {
        doListScheduleOfWeek({ year: params.year, week: params.week });
      }
      CustomEventListener(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      return () => {
        CustomEventDispose(UPDATE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
      }
    }
  }, [doUpdateSchedule, schedule, setSchedule])

  const handleDeleteSchedule = (scheduleID) => {
    doDeleteSchedule({ scheduleID }, false);
    const reloadListScheduleOfWeek = () => {
      doListScheduleOfWeek({ year: params.year, week: params.week });
    }
    CustomEventListener(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    return () => {
      CustomEventDispose(DELETE_WEEKLY_SCHEDULE, reloadListScheduleOfWeek);
    }
  }

  const handleEditSchedule = (schedule, date) => {
    handleChangeData("selectedDate", moment(date, dateFormatSetting));
    handleChangeData("selectedTime", get(schedule, "time", data.selectedTime));
    handleChangeData("title", get(schedule, "title", data.selectedTime));
    handleChangeData("content", get(schedule, "content", data.selectedTime));
    handleChangeData("notifyWhenDue", get(schedule, "is_remind", data.notifyWhenDue));
    handleChangeData("scheduleID", get(schedule, "id", data.scheduleID));
    let receiverList = get(schedule, "members_assign", []);
    let idxArr = [];
    receiverList.map((item) => {
      let idx = findIndex(members.members, { id: item.id });
      idxArr.push(idx);
    });
    setReceiverListIndex(idxArr);
  }

  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.edit_weekly_calendar.title")}
        open={open}
        setOpen={setOpen}
        onConfirm={handleOnClose}
        onCancle={handleOnClose}
        canConfirm={data.title !== '' && data.content !== '' && data.selectedTime !== ''}
        height='medium'
        className={"comp_CustomModal views_createWeeklyCalendar_CustomModal"}
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
              <Typography variant="h6">{t('IDS_WP_CALENDAR_WEEK')}</Typography>
              <Typography variant="subtitle1">{`${t('IDS_WP_WEEK')} ${data.selectedWeek}/${data.selectedYear} (${weekSelectedLabel.start} - ${weekSelectedLabel.end})`}</Typography>
            </div>
            <div className="control_block">
              <WeekSelect
                year={data.selectedYear}
                value={data.selectedWeek}
                onChange={() => null}
              />
              <YearSelect
                value={data.selectedYear}
                onChange={() => null}
                numberOfYears={2}
              />
            </div>
          </div>
          <Container>
            <div className="left">
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
                    inputVariant="outlined"
                    variant="inline"
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
                <ColorTypo className="label">{t('views.calendar_page.modal.create_weekly_calendar.label.title')}<span className="label_required">*</span></ColorTypo>
              </abbr>
              <TextField
                size="small"
                variant="outlined"
                className="input_text"
                value={data.title}
                error={validation.title.error}
                helperText={validation.title.message}
                onChange={({ target }) => handleChangeData('title', target.value)}
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
                rows={2}
                fullWidth
                onChange={({ target }) => handleChangeData('content', target.value)}
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
                        receiverListIndex.length === 0 &&
                        <Typography component={'span'} className="selected_receiver">{t('views.calendar_page.modal.create_weekly_calendar.all')}</Typography>
                      }
                      {
                        receiverListIndex.length !== 0 &&
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
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleUpdate}
                  disableElevation
                >
                  {t('IDS_WP_UPDATE')}
                </Button>
              </Typography>
            </div>
            <div className="right">
              <RightHeader>{t("views.calendar_page.modal.create_weekly_calendar.detail_content")}</RightHeader>
              <React.Fragment>
                <div className={"view_createWeeklyCalendar_list_container"}>
                  {
                    scheduleOfWeek.data.map((item, index) => {
                      if (item.schedules.length !== 0) {
                        return (
                          <CalendarItemContainer>
                            <Typography component={'div'}>
                              <span>{days[new Date(item.schedules[0].time_original).getDay()]}</span>
                              <span>({item.date})</span>
                            </Typography>
                            <List component={'nav'} key={`views_updateWeeklyCalendar_listSchedule_${index}`}>
                              {
                                item.schedules.map((schedule) => {
                                  return (
                                    <ListItem
                                      button key={`list_schedule_item_${schedule.id}`}
                                      className="view_createWeeklyCalendar_list_scheduleItemContainer"
                                    >
                                      <ListItemIcon>
                                        {
                                          schedule.is_remind && <Icon path={mdiBellOutline} size={0.75} color="#969696" />
                                        }
                                        <div className="calendar_item_time">{schedule.time}</div>
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={schedule.title}
                                        secondary={schedule.content}
                                      >
                                      </ListItemText>
                                      <ListItemSecondaryAction>
                                        {
                                          schedule.assign_to_all && (
                                            <div className="assign_to_all">Tất cả</div>
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
                                        <IconButton edge="end"
                                          key={schedule.id}
                                          onClick={evt => handleEditSchedule(schedule, item.date)}
                                        >
                                          <Icon
                                            key={schedule.id}
                                            path={mdiPencilBoxMultipleOutline}
                                            size={0.75}
                                            color="#969696"
                                          />
                                        </IconButton>
                                        <IconButton edge="end"
                                          key={`delete_button_schedule_${schedule.id}`}
                                          onClick={evt => handleDeleteSchedule(schedule.id)}
                                        >
                                          <Icon path={mdiTrashCanOutline} size={0.75} color="#969696" />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  )
                                })
                              }
                            </List>
                          </CalendarItemContainer>
                        )
                      }
                    })
                  }
                </div>
              </React.Fragment>
            </div>
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
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateSchedule: ({ schedule }, quite) => dispatch(updateSchedule({ schedule }, quite)),
    doListScheduleOfWeek: ({ year, week }, quite) => dispatch(listScheduleOfWeek({ year, week }, quite)),
    doDeleteSchedule: ({ scheduleID }, quite) => dispatch(deleteSchedule({ scheduleID }, quite)),
  };
};

export default connect(
  state => ({
    members: membersSelector(state),
    WeeksInYear: state.calendar.listWeeksInYear.data.weeks,
    scheduleOfWeek: scheduleOfWeekSelector(state),
    dateSetting: state.setting.settingDate.find(item => item.selected === true),
  }),
  mapDispatchToProps
)(UpdateWeeklyCalendar);