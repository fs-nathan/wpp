import { get } from "lodash";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { statistic } from "../../contants/attrs";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";
import chart_no_data from '../../../../assets/chart_no_data.png';
import './styles.scss';

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
      {
        series.some(value => value !== 0)
          ? <Chart {...chartProps} />
          : <img className="offerOverview-defaultImgOfferBlock" src={chart_no_data} alt="" />
      }
      <ChartLegend strings={strings} showIndex series={series} />
    </Block>
  );
}
