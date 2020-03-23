import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
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
  return (
    <Block
      title="Trạng thái"
      subheader="Biểu đồ theo trạng thái công việc"
      extra={<div>tháng này</div>}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} />
    </Block>
  );
}
