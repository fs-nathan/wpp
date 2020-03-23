import { times } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { JobPageContext } from "views/JobPage/JobPageContext";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createRadarChartProps } from "../../utils/chart";
import { Block } from "./Block";
const strings = ["task_waiting", "task_doing"];
export function RoleBlock() {
  const chartProps = useSelector(state => {
    return createRadarChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  const { timeType = 0 } = useContext(JobPageContext);
  return (
    <Block
      title="Vai trò"
      subheader="Biểu đồ vai trò của công việc"
      extra={times[timeType].title}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} />
    </Block>
  );
}
