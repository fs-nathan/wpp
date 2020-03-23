import { Grid } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import styled from "styled-components";
import { colors, labels } from "../contants/attrs";
const ChartLegendWrap = styled(Grid)`
  width: 300px;
`;
const IconWrap = styled(Grid)`
  line-height: 1;
  margin-right: 12px;
  margin-left: 30px;
`;
const ChartLegend = ({ strings = [], xs = 6 }) => {
  const map = strings.map(string => [labels[string], colors[string]]);
  return (
    <ChartLegendWrap container>
      {map.map(([label, color]) => (
        <Grid container alignItems="center" key={label} item xs={xs}>
          <IconWrap item alignItems="center">
            <Icon path={mdiSquare} size={1} color={color} />
          </IconWrap>
          <Grid item xs zeroMinWidth>
            {label}
          </Grid>
        </Grid>
      ))}
    </ChartLegendWrap>
  );
};

export default ChartLegend;
