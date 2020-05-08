import {
  Box,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  mdiBellOutline,
  mdiCalendarStar,
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
import get from "lodash/get";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import { useToggle } from "react-use";
import {
  calendarsSelector,
  listWeeksInYearSelector,
  scheduleOfWeekSelector,
} from "views/CalendarWeeklyPage/selectors";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { scheduleAttrs, weekScheduleAttrs } from "../contant/attrs";
import { weekScheduleModule } from "../redux/weekSchedule";
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
    CWPDoListScheduleOfWeek: ({ year, week }, quite) =>
      dispatch(listScheduleOfWeek({ year, week }, quite)),
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
const WeedDetailStateLess = ({ calendar, scheduleOfWeek, i18nDays, week }) => {
  const { t } = useTranslation();
  return (
    calendar !== undefined &&
    scheduleOfWeek.data.length !== 0 && (
      <>
        <div className="view_WeeklyCalendar_rightContainer">
          {calendar !== undefined && (
            <CalendarDetailHeader>
              {t(
                "views.calendar_page.modal.create_weekly_calendar.title_right"
              )}
              <Typography component={"span"}>
                {t("IDS_WP_WEEK")} {week} ( {get(calendar, "start", "")} -{" "}
                {get(calendar, "end", "")})
              </Typography>
            </CalendarDetailHeader>
          )}
          {scheduleOfWeek.data.map((item, index) => {
            if (item.schedules.length !== 0) {
              return (
                <CalendarItemContainer>
                  <Typography component={"div"} className="header">
                    <div className="header_time">
                      <span>
                        {
                          i18nDays[
                            new Date(item.schedules[0].time_original).getDay()
                          ]
                        }
                      </span>
                      <span>({item.date})</span>
                    </div>
                    <div className="header_title">
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.label.title"
                      )}
                    </div>
                    <div className="header_content">
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.content"
                      )}
                    </div>
                    <div className="header_members_joined">
                      {t(
                        "views.calendar_page.modal.create_weekly_calendar.receiver"
                      )}
                    </div>
                    <div className="header_created_by">
                      {t("views.calendar_page.right_part.label.created_by")}
                    </div>
                  </Typography>
                  <List
                    component={"div"}
                    key={`views_CalendarWeeklyPage_rightPart_list_${index}`}
                  >
                    {item.schedules.map((schedule) => {
                      return (
                        <ListItem
                          key={`views_CalendarWeeklyPage_rightPart_list_item_${schedule.id}`}
                          className="shedule_item"
                        >
                          <ListItemIcon>
                            {schedule.is_remind && (
                              <Icon
                                path={mdiBellOutline}
                                size={0.85}
                                color="rgba(0, 0, 0, 0.7)"
                              />
                            )}
                          </ListItemIcon>
                          <ListItemText className="schedule_item_time">
                            <span>{schedule.time}</span>
                          </ListItemText>
                          <ListItemText className="schedule_item_title">
                            <span>{schedule.title}</span>
                          </ListItemText>
                          <ListItemText className="schedule_item_content">
                            <span>{schedule.content}</span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            {schedule.assign_to_all && (
                              <div className="assign_to_all">Tất cả</div>
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
                            <Box className="schedule_item_created_by">
                              <CustomAvatar
                                style={{ width: 20, height: 20 }}
                                src={schedule.user_create_avatar}
                                alt="avatar"
                              />
                              <span>{schedule.user_create_name}</span>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </CalendarItemContainer>
              );
            }
          })}
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
      CWPDoListScheduleOfWeek({ year, week });
    }, [CWPDoListScheduleOfWeek, week, year]);

    return (
      <WeedDetailStateLess
        {...{ scheduleOfWeek, week }}
        calendar={calendars.data.find(
          (item) => item.week === parseInt(week, 10)
        )}
        i18nDays={days}
      />
    );
  }
);

const WeedSchedule = ({ weekScheduleNow = emptyArray, defaultIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isToggle, toggle] = useToggle();
  const currentDay = weekScheduleNow[currentIndex];
  const canNext = currentIndex < weekScheduleNow.length - 1;
  const canPrev = currentIndex > 0;
  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const next = () =>
    setCurrentIndex(Math.min(weekScheduleNow.length - 1, currentIndex + 1));
  const { t } = useTranslation();
  const week = moment(currentDay.date, "DD/MM/YYYY").format("W");
  const year = moment(currentDay.date, "DD/MM/YYYY").format("YYYY");
  return (
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
        title={<TasksCard.HeaderTitle>{t("LỊCH TUẦN")}</TasksCard.HeaderTitle>}
        subheader={<StyledTypo color="orange">Tuần {week} năm 2020</StyledTypo>}
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
                  <Typography bold color="textSecondary">
                    {t("No data found")}
                  </Typography>
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
                - {get(schedule, scheduleAttrs.title)}
              </ListItemLayout>
            );
          })}
          <div>
            <ButtonBase onClick={() => toggle()} style={{ float: "right" }}>
              <StyledTypo
                className="u-fontSize12 u-colorBlue"
                component="span"
                color="blue"
              >
                {t("Xem thêm")}
              </StyledTypo>
            </ButtonBase>
          </div>
        </Stack>
      </TasksCard.Content>
      {isToggle && (
        <ModalCommon
          maxWidth="lg"
          title={t("CHI TIẾT LỊCH TUẦN")}
          footerAction={[]}
          onClose={() => toggle()}
        >
          <div style={{ overflowX: "hidden" }}>
            <WeekDetail year={year} week={week} />
          </div>
        </ModalCommon>
      )}
    </TasksCard.Container>
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
  const defaultIndex = weekScheduleNow.findIndex(
    ({ is_date_now }) => is_date_now
  );
  if (defaultIndex < 0) return null;
  return (
    <WeedSchedule
      weekScheduleNow={weekScheduleNow}
      defaultIndex={defaultIndex}
    />
  );
};
