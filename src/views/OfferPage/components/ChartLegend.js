import { Grid } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { colors, labels } from "../contants/attrs";
import './ChartLegend.scss';

const IconWrap = styled(Grid)`
  line-height: 1;
  margin-right: 0.2em;
`;

const ChartLegend = ({ strings = [], xs = 4, showIndex = false, series = [] }) => {
  const { t } = useTranslation();
  if (series.length === 4) xs = 3;
  const map = strings.map(string => [
    typeof labels[string] === 'function' ? labels[string](t) : t(labels[string]),
    colors[string],
  ]);
  const color = strings.map(string => [colors[string]]);
  const getIndexPercent = (value) => {
    const res = series.reduce((total, currentValue) => {
      return total + currentValue;
    });
    return res > 0 ? Math.round((value / res) * 100) : 0;
  }
  return (
    <Grid container justify="center">
      {map.map(([label, color]) => (
        <Grid container alignItems="center" justify="center" key={label} item xs={xs}>
          <IconWrap item>
            <Icon path={mdiSquare} size={0.8} color={color} />
          </IconWrap>
          <Grid title={label} item xs zeroMinWidth className="ChartLegend_legendLabelText">
            {label}
          </Grid>
        </Grid>
      ))}
      {showIndex && (
        <Grid container>
          {series.map((value, key) => (
            <Grid container alignItems="baseline" item xs={xs} className="mt_5" key={key}>
              <span className="legend_index" style={{ color: color[key] }}>{value}</span>
              <span className="legend_index_percent" style={{ color: color[key] }}>{`${getIndexPercent(value)} %`}</span>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ChartLegend;
