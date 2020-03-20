import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { TASK_DUE } from "views/JobPage/redux/types";
import AnalyticButton from "../../components/AnalyticButton";
import PrimaryButton from "../../components/PrimaryButton";
import RecentTableRow from "../../components/RecentTableRow";
import { colors, recent, taskAtrrs, taskStatusMap } from "../../contants/attrs";
import { useMultipleSelect } from "../../hooks/useMultipleSelect";
import { createMapPropsFromAttrs, loginlineFunc } from "../../utils";

export const RecentTable = ({ tasks = [] }) => {
  const { t } = useTranslation();
  return (
    <Table className="header-document">
      <TableHead>
        <TableRow>
          <TableCell width="5%"></TableCell>
          <TableCell sortDirection={true} align="left">
            <TableSortLabel
              active={true}
              direction={"asc"}
              onClick={loginlineFunc}
            >
              {t("Tên công việc")}
            </TableSortLabel>
          </TableCell>
          <TableCell width="10%" align="left">
            {t("Tiến độ")}
          </TableCell>
          <TableCell width="10%" align="right">
            {t("Kết thúc")}
          </TableCell>
          <TableCell width="10%" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, index) => {
          const [
            project_id,
            id,
            avatar,
            user_name,
            name,
            status_code,
            status_name,
            time_end,
            haveNewChat,
            duration_value,
            duration_unit,
            complete,
            number_member
          ] = loginlineFunc(
            createMapPropsFromAttrs([
              taskAtrrs.project_id,
              taskAtrrs.id,
              taskAtrrs.user_create_avatar,
              taskAtrrs.user_create_name,
              taskAtrrs.name,
              taskAtrrs.status_code,
              taskAtrrs.status_name,
              taskAtrrs.time_end,
              taskAtrrs.haveNewChat,
              taskAtrrs.duration_value,
              taskAtrrs.duration_unit,
              taskAtrrs.complete,
              taskAtrrs.number_member
            ])
          )(task);
          return (
            <RecentTableRow
              {...{
                project_id,
                id,
                avatar,
                name,
                status_code,
                status_name,
                time_end,
                haveNewChat,
                duration_value,
                duration_unit,
                user_name,
                complete,
                number_member
              }}
              className="table-body-row"
              key={index}
            ></RecentTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export const defaultStatusFilter = {
  all: false,
  waiting: false,
  doing: false,
  complete: false,
  expired: false
};
export function Content() {
  const { t } = useTranslation();

  const [
    statusFilter,
    setstatusFilter,
    handleRemovestatusFilter
  ] = useMultipleSelect(defaultStatusFilter);
  const [
    hoverstatusFilter,
    setHoverstatusFilter,
    handleRemovesHovertatusFilter
  ] = useMultipleSelect(defaultStatusFilter, false);
  const [waiting, doing, stop, expired, tasks = []] = useSelector(state => {
    return createMapPropsFromAttrs([
      recent.waiting,
      recent.doing,
      recent.stop,
      recent.expired,
      recent.tasks
    ])(state.taskPage[TASK_DUE]);
  });

  const createAnalyticButtonProps = string => ({
    onCloseClick: () => handleRemovestatusFilter(string),
    onMouseEnter: () => setHoverstatusFilter(string),
    onMouseLeave: () => handleRemovesHovertatusFilter(string),
    active: statusFilter[string],
    onClick: () => setstatusFilter(string)
  });
  const [debouncedFilteredTasks, setdebouncedFilteredTasks] = React.useState(
    []
  );

  useDebounce(
    () => {
      setdebouncedFilteredTasks(
        Object.values(statusFilter).filter(item => item).length
          ? tasks.filter(
              item =>
                statusFilter[taskStatusMap[item.status_code]] ||
                hoverstatusFilter[taskStatusMap[item.status_code]]
            )
          : tasks
      );
    },
    300,
    [tasks, statusFilter, hoverstatusFilter]
  );
  return (
    <Grid container spacing={3}>
      <Grid item flex={1}>
        <PrimaryButton
          onClick={() => setstatusFilter(undefined)}
          count={[waiting, doing, stop, expired].reduce(
            (result = 0, value = 0) => result + value
          )}
          label={t("Công việc được thực hiện")}
        />
      </Grid>
      <Box flex={1}></Box>
      <Grid item>
        <AnalyticButton
          {...createAnalyticButtonProps("waiting")}
          count={waiting}
          label={t("Đang chờ")}
          color={colors.task_waiting}
          circleText="10%"
        />
      </Grid>
      <Grid item>
        <AnalyticButton
          {...createAnalyticButtonProps("doing")}
          count={doing}
          label={t("Đang làm")}
          color={colors.task_doing}
          circleText="10%"
        />
      </Grid>

      <Grid item>
        <AnalyticButton
          {...createAnalyticButtonProps("expired")}
          count={expired}
          label={t("Quá hạn")}
          color={colors.task_expired}
          circleText="10%"
        />
      </Grid>
      <Grid item>
        <AnalyticButton
          {...createAnalyticButtonProps("stop")}
          count={stop}
          label={t("Tạm dừng")}
          color={"rgb(0, 0, 0)"}
          circleText="10%"
        />
      </Grid>
      <Grid item container xs={12}>
        <RecentTable tasks={debouncedFilteredTasks} />
      </Grid>
    </Grid>
  );
}
