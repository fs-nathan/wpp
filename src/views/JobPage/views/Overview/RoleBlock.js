import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createRadarChartProps } from "../../utils/chart";
import { Block } from "./Block";
export function RoleBlock() {
  const chartProps = useSelector(state => {
    return createRadarChartProps(
      ["task_waiting", "task_doing", "task_complete", "task_expired"],
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  return (
    <Block
      title="Vai trò"
      subheader="Biểu đồ vai trò của công việc"
      extra={<div>tháng này</div>}
    >
      <Chart {...chartProps} />
    </Block>
  );
}
