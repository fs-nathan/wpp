import { Typography } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import { get, map, reduce } from "lodash";
import React from "react";
import Chart from "react-apexcharts";
import "./style.scss";

export const ChartBox = ({ className = "", ...props }) => (
  <div
    className={`comp_CustomDonutChart___chart-box ${className}`}
    {...props}
  />
);

export const ChartDrawer = ({ className = "", ...props }) => (
  <div
    className={`comp_CustomDonutChart___chart-drawer ${className}`}
    {...props}
  />
);

export const ChartTitle = ({ className = "", ...props }) => (
  <span
    className={`comp_CustomDonutChart___chart-title ${className}`}
    {...props}
  />
);
export const ChartPlacedolder = ({ className = "", ...props }) => (
  <span className={`-placeholder ${className}`} {...props} />
);

export const ChartLegendBox = ({ className = "", ...props }) => (
  <div
    className={`comp_CustomDonutChart___chart-legend-box ${className}`}
    {...props}
  />
);
export const ChartLegendTitleBox = ({ className = "", ...props }) => (
  <div
    className={`comp_CustomDonutChart___chart-legend-box-title ${className}`}
    {...props}
  />
);

export const CustomChart = ({ className = "", ...props }) => (
  <Chart className={`comp_CustomDonutChart___chart ${className}`} {...props} />
);

export const ChartInfoBox = ({ className = "", data }) => (
  <>
    <ChartLegendTitleBox className={className}>
      <span>Tổng số công việc:</span>
      <span>
        {reduce(data, (sum, info) => (sum += get(info, "value", 0)), 0)}
      </span>
    </ChartLegendTitleBox>
    {map(data, info => (
      <ChartLegendBox className={className}>
        <Icon path={mdiSquare} size={1} color={get(info, "color", "#000")} />
        <Typography>{get(info, "title", "")}</Typography>
        <Typography>{get(info, "value", 0)}</Typography>
      </ChartLegendBox>
    ))}
  </>
);
