import { Box } from "@material-ui/core";
import { useTimes } from "components/CustomPopover";
import get from "lodash/get";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { JobPageContext } from "views/JobPage/JobPageContext";
import ChartLegend from "../../components/ChartLegend";
import { TASK_OVERVIEW_STATISTIC } from "../../redux/types";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";
import nodataimg from "./chart_no_data.png";
const strings = ["task_waiting", "task_doing", "task_complete", "task_expired"];

export function StatusBlock() {
  const chartProps = useSelector((state) => {
    console.log(state.taskPage[TASK_OVERVIEW_STATISTIC]);
    return createPieChartProps(
      strings,
      state.taskPage[TASK_OVERVIEW_STATISTIC]
    );
  });
  const ready = useSelector((state) => {
    return get(state.taskPage, [TASK_OVERVIEW_STATISTIC, "state"]);
  });
  const { t } = useTranslation();
  const { timeType = 0 } = useContext(JobPageContext);
  const times = useTimes();
  return (
    <Block
      title={t("Trạng thái")}
      subheader={t("Biểu đồ theo trạng thái công việc")}
      extra={t(times[timeType].title)}
    >
      <Box display="flex" flex="1" alignItems="center">
        {ready ? (
          <Chart {...chartProps} />
        ) : (
          <img style={{ width: "100%" }} src={nodataimg} alt="empty"></img>
        )}
      </Box>
      <ChartLegend strings={strings} />
    </Block>
  );
}
