import { useTimes } from "components/CustomPopover";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";
import { statistic } from "../../contants/attrs";
import { get } from "lodash";

const times = "Tháng này (01/04/2020 - 30/04/2020)"

export function OfferBlock({ strings = [], title, data = {} }) {
  const series = strings.map(string =>
    Math.max(Number(get(data, statistic[string], 0)), 0)
  )
  const chartProps = useSelector(state => {
    return createPieChartProps(
      strings,
      series
    );
  });
  return (
    <Block
      title={title}
      extra={times}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} showIndex series={series} />
    </Block>
  );
}
