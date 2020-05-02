import { Box, ButtonBase, IconButton } from "@material-ui/core";
import { mdiCalendarStar, mdiMenuLeft, mdiMenuRight } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { workScheduleModule } from "../redux/workSchedule";
const WeedSchedule = () => {
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
        // action={<AddButton onClick={() => {}} label={t("Tạo lịch")} />}
        title={<TasksCard.HeaderTitle>{t("LỊCH TUẦN")}</TasksCard.HeaderTitle>}
        subheader={<StyledTypo color="orange">Tuần 25 năm 2020</StyledTypo>}
      />
      <Box
        display="flex"
        alignItems="center"
        padding="4px"
        style={{ background: "rgb(245, 246, 247)" }}
      >
        <IconButton size="small">
          <Icon path={mdiMenuLeft} size={1}></Icon>
        </IconButton>
        <Box textAlign="center" flex="1">
          <StyledTypo bold color="red">
            Thứ 3 - Ngày 01/09/2020
          </StyledTypo>
        </Box>
        <IconButton size="small">
          <Icon path={mdiMenuRight} size={1}></Icon>
        </IconButton>
      </Box>
      <TasksCard.Content>
        <Stack small>
          <ListItemLayout left={<Box padding="10px">09:00</Box>}>
            - Tong giam doc di cong tac hai phong
          </ListItemLayout>
          <ListItemLayout left={<Box padding="10px">09:00</Box>}>
            - Tong giam doc di cong tac hai phongup
          </ListItemLayout>
          <ListItemLayout left={<Box padding="10px">09:00</Box>}>
            - Tong giam doc di cong tac hai phong
          </ListItemLayout>
          <ListItemLayout left={<Box padding="10px">09:00</Box>}>
            - Tong giam doc di cong tac hai phong
          </ListItemLayout>
          <div>
            <ButtonBase style={{ float: "right" }}>
              <StyledTypo component="span" color="blue">
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
    dispatch(workScheduleModule.actions.loadListSchedule());
    dispatch(workScheduleModule.actions.loadListWeek());
  }, [dispatch]);
  return <WeedSchedule />;
};
