import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { Analytic } from "views/JobPage/components/Analytic";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import RecentTableRow from "views/JobPage/components/RecentTableRow";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { useCustomList } from "views/JobPage/hooks/useCustomList";
import { JobPageContext } from "views/JobPage/JobPageContext";
import { colors, labels, recent, taskAtrrs } from "../../contants/attrs";
import { TASK_OVERVIEW_RECENT } from "../../redux/types";
import { createMapPropsFromAttrs } from "../../utils";
export const RecentTable = ({ tasks = emptyArray }) => {
  const hadData = tasks && tasks.length;
  if (!hadData) return <EmptyHolder />;
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
            priority_code,
            priority_name,
            time_end,
            haveNewChat,
            duration_value,
            duration_unit,
            complete,
            number_member,
            url_redirect,
          ] = createMapPropsFromAttrs([
            taskAtrrs.project_id,
            taskAtrrs.id,
            taskAtrrs.user_create_avatar,
            taskAtrrs.user_create_name,
            taskAtrrs.name,
            taskAtrrs.status_code,
            taskAtrrs.status_name,
            taskAtrrs.priority_code,
            taskAtrrs.priority_name,
            taskAtrrs.time_end,
            taskAtrrs.haveNewChat,
            taskAtrrs.duration_value,
            taskAtrrs.duration_unit,
            taskAtrrs.complete,
            taskAtrrs.number_member,
            taskAtrrs.url_redirect,
          ])(task);
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
                priority_code,
                priority_name,
                user_name,
                complete,
                number_member,
                url_redirect,
              }}
              className="table-body-row"
              key={index}
              task={task}
            ></RecentTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
const selector = (state) => {
  return createMapPropsFromAttrs([
    recent.waiting,
    recent.doing,
    recent.complete,
    recent.expired,
    recent.stop,
    recent.tasks,
  ])(state.taskPage[TASK_OVERVIEW_RECENT]);
};
export function RecentBlock() {
  const { t } = useTranslation();
  const { statusFilter, keyword } = useContext(JobPageContext);

  const [
    waiting,
    doing,
    complete,
    expired,
    stop,
    tasks = emptyArray,
  ] = useSelector(selector);

  const [isToggleSortName] = useToggle();
  const [list] = useCustomList({
    tasks,
    statusFilter,
    isToggleSortName: false,
    keyword,
  });
  return (
    <Card variant="outlined">
      <CardHeader title={t("C??ng vi???c g???n ????y")} />
      <CardContent>
        <Analytic
          {...{
            options: [
              {
                key: "waiting",
                label: t(labels.task_waiting),
                color: colors.task_waiting,
                count: waiting,
                show: statusFilter["waiting"],
              },
              {
                key: "doing",
                label: t(labels.task_doing),
                color: colors.task_doing,
                count: doing,
                show: statusFilter["doing"],
              },
              {
                key: "complete",
                label: t(labels.task_complete),
                color: colors.task_complete,
                count: complete,
                show: statusFilter["complete"],
              },
              {
                key: "expired",
                label: t(labels.task_expired),
                color: colors.task_expired,
                count: expired,
                show: statusFilter["expired"],
              },
              {
                key: "stop",
                label: t(labels.task_stop),
                color: colors.task_stop,
                count: stop,
                show: statusFilter["stop"],
              },
            ],
          }}
        />
        <br />
        <RecentTable tasks={list} />
        {list.length === 0 && <EmptyHolder />}
      </CardContent>
    </Card>
  );
}
