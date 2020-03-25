import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { Analytic } from "views/JobPage/components/Analytic";
import { TaskTable } from "views/JobPage/components/TaskTable";
import { useCustomList } from "views/JobPage/hooks/useCustomList";
import { JobPageContext } from "views/JobPage/JobPageContext";
import { TASK_ASSIGN } from "views/JobPage/redux/types";
import { colors, labels, recent } from "../../contants/attrs";
import { createMapPropsFromAttrs } from "../../utils";

const emptyArray = [];
export function Content() {
  const { t } = useTranslation();
  const { statusFilter, keyword } = useContext(JobPageContext);
  const [isToggleSortName, toggleSortName] = useToggle();
  const [
    waiting,
    doing,
    stop,
    complete,
    expired,
    tasks = emptyArray
  ] = useSelector(state => {
    return createMapPropsFromAttrs([
      recent.waiting,
      recent.doing,
      recent.stop,
      recent.complete,
      recent.expired,
      recent.tasks
    ])(state.taskPage[TASK_ASSIGN]);
  });
  const [list] = useCustomList({
    tasks,
    statusFilter,
    isToggleSortName,
    keyword
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Analytic
          {...{
            options: [
              {
                key: "waiting",
                label: t(labels.task_waiting),
                color: colors.task_waiting,
                count: waiting,
                show: statusFilter["waiting"]
              },
              {
                key: "doing",
                label: t(labels.task_doing),
                color: colors.task_doing,
                count: doing,
                show: statusFilter["doing"]
              },
              {
                key: "complete",
                label: t(labels.task_complete),
                color: colors.task_complete,
                count: complete,
                show: statusFilter["complete"]
              },
              {
                key: "expired",
                label: t(labels.task_expired),
                color: colors.task_expired,
                count: expired,
                show: statusFilter["expired"]
              },
              {
                key: "stop",
                label: t(labels.task_stop),
                color: colors.task_stop,
                count: stop,
                show: statusFilter["stop"]
              }
            ]
          }}
        />
      </Grid>

      <Grid item container xs={12}>
        <TaskTable tasks={list} {...{ isToggleSortName, toggleSortName }} />
      </Grid>
    </Grid>
  );
}
