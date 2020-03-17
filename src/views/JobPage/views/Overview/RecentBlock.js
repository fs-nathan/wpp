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
import AnalyticButton from "../../components/AnalyticButton";
import PrimaryButton from "../../components/PrimaryButton";
import RecentTableRow from "../../components/RecentTableRow";
import { colors, recent, taskAtrrs } from "../../contants/attrs";
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
              taskAtrrs.user_create.avatar,
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
export function RecentBlock() {
  const { t } = useTranslation();
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
  return (
    <Card variant="outlined">
      <CardHeader title={"Công việc gần đây"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item flex={1}>
            <PrimaryButton
              count={[waiting, doing, complete, expired].reduce(
                (result = 0, value) => result + value
              )}
              label={t("Công việc được thực hiện")}
            />
          </Grid>
          <Box flex={1}></Box>
          <Grid item>
            <AnalyticButton
              count={waiting}
              label={t("Đang chờ")}
              color={colors.task_waiting}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={doing}
              label={t("Đang làm")}
              color={colors.task_doing}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={complete}
              label={t("Hoàn thành")}
              color={colors.task_complete}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={expired}
              label={t("Quá hạn")}
              color={colors.task_expired}
              circleText="10%"
            />
          </Grid>
          <Grid item container xs={12}>
            <RecentTable tasks={tasks} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
