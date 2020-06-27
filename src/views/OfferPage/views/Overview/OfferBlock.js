import { get } from "lodash";
import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import chart_no_data from '../../../../assets/chart_no_data.png';
import ChartLegend from "../../components/ChartLegend";
import { statistic } from "../../contants/attrs";
import { createPieChartProps } from "../../utils/chart";
import { Block } from "./Block";
import './styles.scss';

export function OfferBlock({ strings = [], title, data = {}, time }) {
  const { t } = useTranslation();
  const series = strings.map(string =>
    Math.max(Number(get(data, statistic[string], 0)), 0)
  )
  const chartProps = useSelector(state => {
    return createPieChartProps(
      strings,
      series,
      t
    );
  });
  return (
    <Block
      title={title.toUpperCase()}
      extra={time}
    >
      {
        series.some(value => value !== 0)
          ? <Chart className="offerOverview-donutChart" {...chartProps} />
          : <img className="offerOverview-defaultImgOfferBlock" src={chart_no_data} alt="" />
      }
      <ChartLegend strings={strings} showIndex series={series} />
    </Block>
  );
}
