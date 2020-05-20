import { get } from "lodash";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { statistic } from "../../contants/attrs";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";


export function OfferBlock({ strings = [], title, data = {}, time }) {
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
      extra={time}
    >
      <Chart {...chartProps} />
      <ChartLegend strings={strings} showIndex series={series} />
    </Block>
  );
}
