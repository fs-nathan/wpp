import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createColumnChartProps } from "../../utils/chart";
import { Block } from "./Block";
const strings = [
  "task_hight_priority",
  "task_medium_priority",
  "task_low_priority"
];
export function PiorityBlock() {
  const chartProps = useSelector(state => {
    return createColumnChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  return (
    <Block
      title="Ưu tiên"
      subheader="Biểu đồ tỗng hợp mức ưu tiên của công việc"
      extra={<div>tháng này</div>}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} xs={4} />
    </Block>
  );
}
