import { times } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { JobPageContext } from "views/JobPage/JobPageContext";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";
const strings = ["task_waiting", "task_doing", "task_complete", "task_expired"];

export function StatusBlock() {
  const chartProps = useSelector(state => {
    return createPieChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  const { t } = useTranslation();
  const { timeType = 0 } = useContext(JobPageContext);
  return (
    <Block
      title={t("Trạng thái")}
      subheader={t("Biểu đồ theo trạng thái công việc")}
      extra={times[timeType].title}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} />
    </Block>
  );
}
