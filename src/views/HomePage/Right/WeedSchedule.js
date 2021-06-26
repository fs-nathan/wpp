import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  mdiBellOutline,
  mdiCalendarStar,
  mdiMenuDown,
  mdiMenuLeft,
  mdiMenuRight,
} from "@mdi/js";
import Icon from "@mdi/react";
import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeek";
import AvatarCircleList from "components/AvatarCircleList";
import StyledTypo from "components/ColorTypo";
import CustomAvatar from "components/CustomAvatar";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import { template } from "lodash-es";
import get from "lodash/get";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import "views/CalendarWeeklyPage/RightPart/style.scss";
import {
  calendarsSelector,
  listWeeksInYearSelector,
  scheduleOfWeekSelector,
} from "views/CalendarWeeklyPage/selectors";
import ModalCommon, {
  DialogActions,
  DialogTitleCus,
} from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import no_calendar_image from "../components/no_calendar.png";
import TasksCard from "../components/TasksCard";
import { scheduleAttrs, weekScheduleAttrs } from "../contant/attrs";
import { weekScheduleModule } from "../redux/weekSchedule";
import WeekSelectMenu from "./WeekSelectMenu";
import { Scrollbars } from 'react-custom-scrollbars';
import PlaceIcon from '@material-ui/icons/Place';

const mapStateToProps = (state) => {
  return {
    calendars: calendarsSelector(state),
    scheduleOfWeek: scheduleOfWeekSelector(state),
    listWeeksInYear: listWeeksInYearSelector(state),
    bgColor: bgColorSelector(state),
    permissions: state.calendar.listCalendarPermission.data.permissions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doListSchedule: ({ year }, quite) =>
      dispatch(listSchedule({ year }, quite)),
    doListPermission: (quite) => dispatch(listCalendarPermission(quite)),
    CWPDoListScheduleOfWeek: ({ schedule_id }, quite) =>
      dispatch(listScheduleOfWeek({ schedule_id }, quite)),
  };
};
const CalendarDetailHeader = ({ className = "", ...props }) => (
  <p
    className={`view_WeeklyCalendar_rightContainer__header ${className}`}
    {...props}
  />
);

const CalendarItemContainer = ({ className = "", ...rest }) => (
  <div
    className={`view_WeeklyCalendar_rightContainer__itemContainer ${className}`}
    {...rest}
  />
);
const WeedDetailStateLess = ({
  calendar,
  scheduleOfWeek,
  i18nDays,
  week,
  year,
}) => {
  const { t } = useTranslation();
  return (
    (!calendar && (
      <Box maxWidth="400px" margin="auto">
        <EmptyHolder
          image={<img src={no_calendar_image} alt="no data found" />}
          title={""}
          description=""
        />
      </Box>
    )) || (
      <>
        <div className="view_WeeklyCalendar_rightContainer">
          <CalendarDetailHeader>
            {t("views.calendar_page.modal.create_weekly_calendar.title_right")}
            <Typography component={"span"}>
              {t("IDS_WP_WEEK")} {get(calendar, "name", "")} ( {get(calendar, "start", "")} -{" "}
              {get(calendar, "end", "")})
            </Typography>
          </CalendarDetailHeader>
          <TableContainer className="view_WeeklyCalendar_rightContainer__TableContainer">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Icon path={""} size={0.85} color="rgba(0, 0, 0, 0.7)" />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.label.title"
                      )}
                    </TableCell>
                    <TableCell>
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.content"
                      )}
                    </TableCell>
                    <TableCell>
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.receiver"
                      )}
                    </TableCell>
                    <TableCell>
                      {t("views.calendar_page.right_part.label.created_by")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleOfWeek.data.map((item, index) => {
                    if (item.schedules.length !== 0) {
                      return (
                        <>
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="view_WeeklyCalendar_rightContainer__TableHeaderGroup"
                            >
                              <Typography component={"div"} className="header">
                                <div className="header_time">
                                  <span>
                                    {
                                      i18nDays[
                                        new Date(
                                          item.schedules[0].time_original
                                        ).getDay()
                                      ]
                                    }
                                  </span>
                                  <span>({item.date})</span>
                                </div>
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {item.schedules.map((schedule) => {
                            return (
                              <TableRow hover>
                                <TableCell className="schedule_item_remind">
                                  {schedule.is_remind && (
                                    <Tooltip
                                      title={schedule.title_remind_before}
                                      placement="right"
                                    >
                                      <Icon
                                        path={mdiBellOutline}
                                        size={0.85}
                                        color="rgba(0, 0, 0, 0.7)"
                                      />
                                    </Tooltip>
                                  )}
                                  {!schedule.is_remind && (
                                    <Icon
                                      path={""}
                                      size={0.85}
                                      color="rgba(0, 0, 0, 0.7)"
                                    />
                                  )}
                                </TableCell>
                                <TableCell className="schedule_item_time">
                                  {schedule.time}
                                </TableCell>
                                <TableCell className="schedule_item_title">
                                  {schedule.title}
                                </TableCell>
                                <TableCell className="schedule_item_content">
                                  {schedule.content}
                                  {
                                    schedule.place && schedule.place !== "" && (
                                      <div className="schedule_item_content_place">
                                        <PlaceIcon />
                                        <span>{schedule.place}</span>
                                      </div>
                                    )
                                  }
                                </TableCell>
                                <TableCell>
                                  {schedule.assign_to_all && (
                                    <div className="assign_to_all">
                                      {t(
                                        "views.calendar_page.modal.create_weekly_calendar.all"
                                      )}
                                    </div>
                                  )}
                                  {!schedule.assign_to_all && (
                                    <AvatarCircleList
                                      users={schedule.members_assign.map(
                                        (member) => ({
                                          name: get(member, "name"),
                                          avatar: get(member, "avatar"),
                                        })
                                      )}
                                      display={3}
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Box className="schedule_item_created_by">
                                    <CustomAvatar
                                      style={{ width: 20, height: 20 }}
                                      src={schedule.user_create_avatar}
                                      alt="avatar"
                                    />
                                    <span>{schedule.user_create_name}</span>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </Scrollbars>
          </TableContainer>
        </div>
      </>
    )
  );
};
const WeekDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    doListSchedule,
    calendars,
    CWPDoListScheduleOfWeek,
    scheduleOfWeek,
    bgColor,
    doListPermission,
    permissions,
    year,
    week,
    weekScheduleDetail
  }) => {
    const { t } = useTranslation();
    const days = [
      t("views.calendar_page.modal.setting_weekly_calendar.sunday"),
      t("views.calendar_page.modal.setting_weekly_calendar.monday"),
      t("views.calendar_page.modal.setting_weekly_calendar.tuesday"),
      t("views.calendar_page.modal.setting_weekly_calendar.wednesday"),
      t("views.calendar_page.modal.setting_weekly_calendar.thursday"),
      t("views.calendar_page.modal.setting_weekly_calendar.friday"),
      t("views.calendar_page.modal.setting_weekly_calendar.saturday"),
    ];
    React.useEffect(() => {
      doListSchedule({ year }, false);
    }, [doListSchedule, year]);
    React.useEffect(() => {
      if (permissions.length === 0) {
        doListPermission(false);
      }
    }, [doListPermission, permissions.length]);
    React.useEffect(() => {
      CWPDoListScheduleOfWeek({ schedule_id: weekScheduleDetail.id });
    }, [CWPDoListScheduleOfWeek, week, year]);
    return (
      <WeedDetailStateLess
        {...{ scheduleOfWeek, week, year }}
        calendar={weekScheduleDetail}
        i18nDays={days}
      />
    );
  }
);

const WeedSchedule = ({ weekScheduleNow = emptyArray, defaultIndex, weekScheduleDetail = null }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [modal, setModal] = useState();
  const currentDay = weekScheduleNow[currentIndex];
  const canNext = currentIndex < weekScheduleNow.length - 1;
  const canPrev = currentIndex > 0;
  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const next = () =>
    setCurrentIndex(Math.min(weekScheduleNow.length - 1, currentIndex + 1));
  const { t } = useTranslation();
  const week = moment().format("W");
  const year = moment().format("YYYY");
  return (
    <>
      <TasksCard.Container>
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar
              style={{
                color: "#01a9f4",
                background: "#dbf3fd",
              }}
              aria-label="tasks"
            >
              <Icon path={mdiCalendarStar} size={1} />
            </TasksCard.HeaderAvatar>
          }
          title={
            <TasksCard.HeaderTitle>{t("LỊCH TUẦN")}</TasksCard.HeaderTitle>
          }
          subheader={
            <StyledTypo
              component={ButtonBase}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              color="orange"
            >
              {
                weekScheduleDetail ? weekScheduleDetail.name : t("LABEL_SCHEDULE_NAME_HOME", {
                  week,
                  year
                })
              }
              <Icon path={mdiMenuDown} size={1} />
            </StyledTypo>
          }
        />
        <Box
          display="flex"
          alignItems="center"
          padding="4px"
          style={{ background: "rgb(245, 246, 247)" }}
        >
          <IconButton onClick={prev} disabled={!canPrev} size="small">
            <Icon path={mdiMenuLeft} size={1}></Icon>
          </IconButton>
          <Box textAlign="center" flex="1">
            <StyledTypo bold color="red">
              {get(currentDay, weekScheduleAttrs.day_of_week)} -{" "}
              {get(currentDay, weekScheduleAttrs.date)}
            </StyledTypo>
          </Box>
          <IconButton onClick={next} disabled={!canNext} size="small">
            <Icon path={mdiMenuRight} size={1}></Icon>
          </IconButton>
        </Box>
        <TasksCard.Content>
          <Stack small>
            {[
              ...get(currentDay, weekScheduleAttrs.schedules, emptyArray),
              "empty",
            ].map((schedule, i) => {
              if (schedule === "empty")
                return (
                  i === 0 && (
                    <Box
                    key="no-data-weekschedule"
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <img src={no_calendar_image} alt="no data found" />
                    </Box>
                  )
                );
              return (
                <ListItemLayout
                  key={get(schedule, scheduleAttrs.id)}
                  left={
                    <Box padding="10px 10px 10px 0">
                      {get(schedule, scheduleAttrs.time)}
                    </Box>
                  }
                >
                  {get(schedule, scheduleAttrs.title)}
                </ListItemLayout>
              );
            })}
            <div>
              <ButtonBase
                onClick={() =>
                  setModal(
                    <Dialog
                      onClose={() => setModal(null)}
                      fullWidth={true}
                      maxWidth={"lg"}
                      aria-labelledby="customized-dialog-title"
                      open={true}
                      className="modal-common-container modal-week-schedule-home-page"
                    >
                      <DialogTitleCus
                        id="customized-dialog-title"
                        onClose={() => setModal(null)}
                        className="modal-cus"
                      >
                        {t("CHI TIẾT LỊCH TUẦN")}
                      </DialogTitleCus>
                      <div className="modal-content">
                        <WeekDetail year={year} week={week} weekScheduleDetail={weekScheduleDetail} />
                      </div>
                      <DialogActions>
                        <Button
                          onClick={() => setModal(null)}
                          disableRipple
                          className="common-btn-modal"
                        >
                          {t("THOÁT")}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )
                }
                style={{ float: "right" }}
              >
                {
                  weekScheduleDetail && (
                    <StyledTypo
                      className="u-fontSize12 u-colorBlue"
                      component="span"
                      color="blue"
                    >
                      {t("Xem thêm")}
                    </StyledTypo>
                  )
                }
              </ButtonBase>
            </div>
          </Stack>
        </TasksCard.Content>
        {modal}
      </TasksCard.Container>
      <WeekSelectMenu
        onItemClick={(week) => {
          setModal(
            <Dialog
              onClose={() => setModal(null)}
              fullWidth={true}
              maxWidth={"lg"}
              aria-labelledby="customized-dialog-title"
              open={true}
              className="modal-common-container modal-week-schedule-home-page"
            >
              <DialogTitleCus
                id="customized-dialog-title"
                onClose={() => setModal(null)}
                className="modal-cus"
              >
                {t("CHI TIẾT LỊCH TUẦN")}
              </DialogTitleCus>
              <div className="modal-content">
                <WeekDetail year={year} weekScheduleDetail={week} />
              </div>
              <DialogActions>
                <Button
                  onClick={() => setModal(null)}
                  disableRipple
                  className="common-btn-modal"
                >
                  {t("THOÁT")}
                </Button>
              </DialogActions>
            </Dialog>
          )
        }}
        menuAnchor={anchorEl}
        setMenuAnchor={setAnchorEl}
        year={year}
      />
    </>
  );
};
export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(weekScheduleModule.actions.loadListSchedule());
  }, [dispatch]);
  const weekScheduleNowResponse = useSelector(
    weekScheduleModule.selectors.listOfWeekNowSelector
  );
  const weekScheduleNow = get(weekScheduleNowResponse, "data", emptyArray);
  const weekScheduleDetail = get(weekScheduleNowResponse, "week_schedule", null);
  const defaultIndex = weekScheduleNow.findIndex(
    ({ is_date_now }) => is_date_now
  );
  if (defaultIndex < 0) return null;
  return (
    <WeedSchedule
      weekScheduleNow={weekScheduleNow}
      defaultIndex={defaultIndex}
      weekScheduleDetail={weekScheduleDetail}
    />
  );
};
