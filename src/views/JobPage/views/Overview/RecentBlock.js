import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";
import AnalyticButton from "../../components/AnalyticButton";
import PrimaryButton from "../../components/PrimaryButton";
import RecentTableRow from "../../components/RecentTableRow";
import { colors, recent, taskAtrrs, taskStatusMap } from "../../contants/attrs";
import { useMultipleSelect } from "../../hooks/useMultipleSelect";
import { TASK_OVERVIEW_RECENT } from "../../redux/types";
import { createMapPropsFromAttrs, loginlineFunc } from "../../utils";

export const RecentTable = ({ tasks = [] }) => {
  return (
    <Table className="header-document">
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
export function RecentBlock() {
  const { t } = useTranslation();
  const [
    statusFilter,
    setstatusFilter,
    handleRemovestatusFilter
  ] = useMultipleSelect(defaultStatusFilter, false);
  // const [
  //   hoverstatusFilter,
  //   setHoverstatusFilter,
  //   handleRemovesHovertatusFilter
  // ] = useMultipleSelect(defaultStatusFilter, false);
  const [waiting, doing, complete, expired, tasks = []] = useSelector(state => {
    return loginlineFunc(
      createMapPropsFromAttrs([
        recent.waiting,
        recent.doing,
        recent.complete,
        recent.expired,
        recent.tasks
      ])
    )(state.taskPage[TASK_OVERVIEW_RECENT]);
  });

  const createAnalyticButtonProps = string => ({
    onCloseClick: () => handleRemovestatusFilter(string),
    // onMouseEnter: () => setHoverstatusFilter(string),
    // onMouseLeave: () => handleRemovesHovertatusFilter(string),
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
              item => statusFilter[taskStatusMap[item.status_code]]
              // ||
              // hoverstatusFilter[taskStatusMap[item.status_code]]
            )
          : tasks
      );
    },
    300,
    [tasks, statusFilter]
  );
  const allCount = [waiting, doing, complete, expired].reduce(
    (result = 0, value) => result + value
  );
  return (
    <Card variant="outlined">
      <CardHeader title={"Công việc gần đây"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item flex={1}>
            <PrimaryButton
              onClick={() => setstatusFilter(undefined)}
              count={[waiting, doing, complete, expired].reduce(
                (result = 0, value) => result + value
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
              circleText={`${Math.floor((waiting * 100) / allCount)}%`}
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              {...createAnalyticButtonProps("doing")}
              count={doing}
              label={t("Đang làm")}
              color={colors.task_doing}
              circleText={`${Math.floor((doing * 100) / allCount)}%`}
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              {...createAnalyticButtonProps("complete")}
              count={complete}
              label={t("Hoàn thành")}
              color={colors.task_complete}
              circleText={`${Math.floor((complete * 100) / allCount)}%`}
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              {...createAnalyticButtonProps("expired")}
              count={expired}
              label={t("Quá hạn")}
              color={colors.task_expired}
              circleText={`${Math.floor((expired * 100) / allCount)}%`}
            />
          </Grid>
          <Grid item container xs={12}>
            <RecentTable tasks={debouncedFilteredTasks} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
