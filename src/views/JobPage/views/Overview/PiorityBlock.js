import { Box } from "@material-ui/core";
import { times } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { JobPageContext } from "views/JobPage/JobPageContext";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createPriorityRadialBarChartProps } from "../../utils/chart";
import { Block } from "./Block";
const strings = [
  "task_hight_priority",
  "task_medium_priority",
  "task_low_priority"
];
export function PiorityBlock() {
  const chartProps = useSelector(state => {
    return createPriorityRadialBarChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  const { t } = useTranslation();
  const { timeType = 0 } = useContext(JobPageContext);
  return (
    <Block
      title={t("Ưu tiên")}
      subheader={t("Biểu đồ tỗng hợp mức ưu tiên của công việc")}
      extra={times[timeType].title}
    >
      <Box display="flex" flex="1" alignItems="center">
        <Chart {...chartProps} />
      </Box>

      <ChartLegend strings={strings} xs={4} />
    </Block>
  );
}
