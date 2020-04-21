import { Box, IconButton } from "@material-ui/core";
import { mdiCalendarStar, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Block from "views/JobPage/views/Overview/Block";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import GroupDetailContext from "../GroupDetailContext";

function Right() {
  const { t } = useTranslation()
  const { cover } = useContext(GroupDetailContext);
  return (
    <Stack>
      <TasksCard.Container>
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar aria-label="tasks">
              <Icon path={mdiCalendarStar} size={1} />
            </TasksCard.HeaderAvatar>
          }
          action={
            <AddButton label={t('Tạo lịch')} />
          }
          title={
            <TasksCard.HeaderTitle>
              {t("LỊCH TUẦN")}
            </TasksCard.HeaderTitle>
          }
          subheader={
            <StyledTypo color="orange">Tuần 25 năm 2020</StyledTypo>
          }
        />
        <Box display="flex" style={{ background: "rgb(245, 246, 247)" }}><IconButton size="small"><Icon path={mdiChevronLeft} size={1}></Icon></IconButton><Box textAlign="center" flex="1"><StyledTypo bold color="red">Thứ 3 - Ngày 01/09/2020</StyledTypo></Box><IconButton size="small"><Icon path={mdiChevronRight} size={1}></Icon></IconButton></Box>
        <TasksCard.Content>
          <ListItemLayout left={<div>09:00</div>} >
            - Tong giam doc di cong tac hai phong
        </ListItemLayout>
          <ListItemLayout left={<div>09:00</div>} >
            - Tong giam doc di cong tac hai phong
        </ListItemLayout>
          <ListItemLayout left={<div>09:00</div>} >
            - Tong giam doc di cong tac hai phong
        </ListItemLayout>
          <ListItemLayout left={<div>09:00</div>} >
            - Tong giam doc di cong tac hai phong
        </ListItemLayout>
        </TasksCard.Content>

      </TasksCard.Container>
      <Block title="Tim nổi bật"></Block>
      <Block title="Thống kê"></Block>
    </Stack>
  );
}

export default Right;
