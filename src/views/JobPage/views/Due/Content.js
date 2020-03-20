import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useList, useToggle } from "react-use";
import { RecentTable } from "views/JobPage/components/RecentTable";
import { TASK_DUE } from "views/JobPage/redux/types";
import AnalyticButton from "../../components/AnalyticButton";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, recent, taskStatusMap } from "../../contants/attrs";
import { useMultipleSelect } from "../../hooks/useMultipleSelect";
import { createMapPropsFromAttrs } from "../../utils";

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
    active: statusFilter[string],
    onClick: () => setstatusFilter(string)
  });

  const allCount = [waiting, doing, stop, expired].reduce(
    (result = 0, value) => result + value
  );
  return (
    <Grid container spacing={3}>
      <Grid item flex={1}>
        <PrimaryButton
          onClick={() => setstatusFilter(undefined)}
          count={allCount}
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
        <RecentTable tasks={list} {...{ isToggleSortName, toggleSortName }} />
      </Grid>
    </Grid>
  );
}
