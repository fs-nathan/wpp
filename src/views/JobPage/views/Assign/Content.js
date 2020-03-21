import { Box, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useList, useToggle } from "react-use";
import { TaskTable } from "views/JobPage/components/TaskTable";
import { JobPageContext } from "views/JobPage/JobPageContext";
import { TASK_ASSIGN } from "views/JobPage/redux/types";
import AnalyticButton from "../../components/AnalyticButton";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, recent, taskStatusMap } from "../../contants/attrs";
import { createMapPropsFromAttrs } from "../../utils";

export const defaultStatusFilter = {
  all: false,
  waiting: false,
  doing: false,
  stop: false,
  complete: false,
  expired: false
};

const emptyArray = [];

export function Content() {
  const { t } = useTranslation();

  const {
    statusFilter,
    setstatusFilter,
    handleRemovestatusFilter
  } = useContext(JobPageContext);
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
  }, [
    filter,
    filterStatusMemo,
    isToggleSortName,
    set,
    sort,
    sortMemo,
    statusFilter,
    tasks
  ]);
  const createAnalyticButtonProps = string => ({
    onCloseClick: () => handleRemovestatusFilter(string),
    active: statusFilter[string]
    // onClick: () => setstatusFilter(string)
  });

  const allCount = [waiting, doing, stop, complete, expired].reduce(
    (result = 0, value) => result + value
  );
  return (
    <Grid container spacing={3}>
      <Grid item flex={1}>
        <PrimaryButton count={allCount} label={t("Công việc được thực hiện")} />
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
      <Grid item>
        <AnalyticButton
          {...createAnalyticButtonProps("stop")}
          count={stop}
          label={t("Tạm dừng")}
          color={"rgb(0, 0, 0)"}
          circleText={`${Math.floor((stop * 100) / allCount)}%`}
        />
      </Grid>
      <Grid item container xs={12}>
        <TaskTable tasks={list} {...{ isToggleSortName, toggleSortName }} />
      </Grid>
    </Grid>
  );
}
