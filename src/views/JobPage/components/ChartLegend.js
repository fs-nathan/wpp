import { Grid } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors, labels } from "../contants/attrs";
const ChartLegendWrap = styled(Grid)`
  width: 300px;
`;
const IconWrap = styled(Grid)`
  line-height: 1;
  margin-right: 12px;
  margin-left: 20px;
`;
const ChartLegend = ({ strings = [], xs = 6 }) => {
  const map = strings.map((string) => [labels[string], colors[string]]);
  const { t } = useTranslation();
  return (
    <ChartLegendWrap container>
      {map.map(([label, color]) => (
        <Grid container alignItems="center" key={label} item xs={xs}>
          <IconWrap item>
            <Icon path={mdiSquare} size={"1.2rem"} color={color} />
          </IconWrap>
          <Grid title={label} item xs zeroMinWidth>
            {t(label)}
          </Grid>
        </Grid>
      ))}
    </ChartLegendWrap>
  );
};

export default ChartLegend;
