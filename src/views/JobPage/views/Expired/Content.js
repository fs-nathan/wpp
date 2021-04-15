import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { Analytic } from "views/JobPage/components/Analytic";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { TaskTable } from "views/JobPage/components/TaskTable";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { useCustomList } from "views/JobPage/hooks/useCustomList";
import { JobPageContext } from "views/JobPage/JobPageContext";
import { TASK_PAGE_EXPIRED } from "views/JobPage/redux/types";
import { colors, labels, recent } from "../../contants/attrs";
import { createMapPropsFromAttrs } from "../../utils";

export function Content({ onPageChange }) {
  const { t } = useTranslation();
  const { statusFilter, keyword } = useContext(JobPageContext);
  const [isToggleSortName, toggleSortName] = useToggle();
  const [
    expired,
    tasks = emptyArray,
    total_page,
  ] = useSelector((state) => {
    return createMapPropsFromAttrs([
      recent.expired,
      recent.tasks,
      recent.total_page,
    ])(state.taskPage[TASK_PAGE_EXPIRED]);
  });
  const [list] = useCustomList({
    tasks,
    isToggleSortName,
    statusFilter,
    keyword,
  });
  const hadData = tasks && tasks.length;
  if (!hadData) return <EmptyHolder />;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Analytic
          {...{
            options: [
              
            ],
            totalTask: expired
          }}
        />
      </Grid>
      <Grid item container xs={12}>
        <TaskTable tasks={list} {...{ isToggleSortName, toggleSortName }} />
      </Grid>
      <Grid item container xs={12} justify="flex-end">
        <Pagination
          count={total_page}
          onChange={(e, page) => onPageChange(page)}
        />
      </Grid>
    </Grid>
  );
}
