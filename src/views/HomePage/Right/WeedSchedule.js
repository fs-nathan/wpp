import { Box, ButtonBase, IconButton, Typography } from "@material-ui/core";
import { mdiCalendarStar, mdiMenuLeft, mdiMenuRight } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { scheduleAttrs, weekScheduleAttrs } from "../contant/attrs";
import { weekScheduleModule } from "../redux/weekSchedule";

const WeedSchedule = ({ weekScheduleNow = emptyArray }) => {
  const [currentIndex, setCurrentIndex] = useState(
    weekScheduleNow.findIndex(({ is_date_now }) => is_date_now)
  );
  const currentDay = weekScheduleNow[currentIndex];
  const canNext = currentIndex < weekScheduleNow.length - 1;
  const canPrev = currentIndex > 0;
  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const next = () =>
    setCurrentIndex(Math.min(weekScheduleNow.length - 1, currentIndex + 1));
  const { t } = useTranslation();
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
        subheader={<StyledTypo color="orange">Tuần 25 năm 2020</StyledTypo>}
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
            <ButtonBase style={{ float: "right" }}>
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
    </TasksCard.Container>
  );
};
export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(weekScheduleModule.actions.loadListSchedule());
  }, [dispatch]);
  const weekScheduleNow = useSelector(
    weekScheduleModule.selectors.listOfWeekNowSelector
  );
  return (
    <WeedSchedule weekScheduleNow={get(weekScheduleNow, "data", emptyArray)} />
  );
};
