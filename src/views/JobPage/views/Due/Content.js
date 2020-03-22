import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useList, useToggle } from "react-use";
import { Analytic } from "views/JobPage/components/Analytic";
import { TaskTable } from "views/JobPage/components/TaskTable";
import { JobPageContext } from "views/JobPage/JobPageContext";
import { TASK_DUE } from "views/JobPage/redux/types";
import { colors, labels, recent, taskStatusMap } from "../../contants/attrs";
import { createMapPropsFromAttrs } from "../../utils";

export function Content() {
  const { t } = useTranslation();

  const { statusFilter } = useContext(JobPageContext);
  const [isToggleSortName, toggleSortName] = useToggle();
  const [waiting, doing, stop, expired, tasks = []] = useSelector(state => {
    return createMapPropsFromAttrs([
      recent.waiting,
      recent.doing,
      recent.stop,
      recent.expired,
      recent.tasks
    ])(state.taskPage[TASK_DUE]);
  });

  const [
    list,
    {
      set,
      push,
      updateAt,
      insertAt,
      update,
      updateFirst,
      upsert,
      sort,
      filter,
      removeAt,
      clear,
      reset
    }
  ] = useList(tasks);
  const sortMemo = useMemo(
    () => (a, b) =>
      !isToggleSortName
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    [isToggleSortName]
  );
  const filterStatusMemo = useMemo(
    () => item => statusFilter[taskStatusMap[item.status_code]],
    [statusFilter]
  );
  useEffect(() => {
    set(tasks);
    sort(sortMemo);
    if (Object.values(statusFilter).filter(item => item).length) {
      filter(filterStatusMemo);
    }
  }, [filter, filterStatusMemo, set, sort, sortMemo, statusFilter, tasks]);
  const createAnalyticButtonProps = string => ({
    // onCloseClick: () => handleRemovestatusFilter(string),
    active: statusFilter[string]
    // onClick: () => setstatusFilter(string)
  });

  const allCount = [waiting, doing, stop, expired].reduce(
    (result = 0, value) => result + value
  );
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
