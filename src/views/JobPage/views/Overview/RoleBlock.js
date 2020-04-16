import { useTimes } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { JobPageContext } from "views/JobPage/JobPageContext";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createColumnRoleChartProps } from "../../utils/chart";
import { Block } from "./Block";
const strings = ["task_all", "task_complete"];
export function RoleBlock() {
  const chartProps = useSelector(state => {
    return createColumnRoleChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  const { t } = useTranslation();
  const { timeType = 0 } = useContext(JobPageContext);
  const times = useTimes();
  return (
    <Block
      title={t("Vai trò")}
      subheader={t("Biểu đồ vai trò của công việc")}
      extra={times[timeType].title}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} />
    </Block>
  );
}
