import { Grid } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import styled from "styled-components";
import { colors, labels } from "../contants/attrs";
import './ChartLegend.css'

const IconWrap = styled(Grid)`
  line-height: 1;
  margin-right: 12px;
`;

const ChartLegend = ({ strings = [], xs = 4, showIndex = false, series = [] }) => {
  const map = strings.map(string => [labels[string], colors[string]]);
  const color = strings.map(string => [colors[string]]);
  const getIndexPercent = (value) => {
    const res = series.reduce((total,currentValue) => {
      return total + currentValue;
    });
    return Math.round((value / res) * 100);
  }
  return (
    <Grid container justify="center">
      {map.map(([label, color]) => (
        <Grid container alignItems="center" key={label} item xs={xs}>
          <IconWrap item>
            <Icon path={mdiSquare} size={1} color={color} />
          </IconWrap>
          <Grid title={label} item xs zeroMinWidth>
            {label}
          </Grid>
        </Grid>
      ))}
      {showIndex && (
        <Grid container>
          {series.map((value, key) => (
            <Grid container alignItems="baseline" item xs={xs} className="mt_5" key={key}>
              <span className="legend_index" style={{color: color[key]}}>{value}</span>
              <span className="legend_index_percent" style={{color: color[key]}}>{`${getIndexPercent(value)} %`}</span>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ChartLegend;
