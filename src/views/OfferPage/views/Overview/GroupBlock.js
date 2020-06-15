import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import chart_no_data from '../../../../assets/chart_no_data.png';
import ChartLegend from "../../components/ChartLegend";
import { createColumnRoleChartProps } from "../../utils/chart";
import { Block } from "./Block";

const useStyles = makeStyles(theme => ({
  chartItem: {
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    alignItems: 'center'
  },
  subTitle: {
    color: "#444",
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'uppercase',
  }
}));
export function GroupBlock({ strings = [], title, data = {}, time }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const chartProps = (group) => {
    return createColumnRoleChartProps(
      t,
      strings,
      [group]
    );
  }
  const hasNoData = data.some(group =>
    group.number_offer !== 0
    || group.number_offer_approving !== 0
    || group.number_offer_rejected !== 0
    || group.number_offer_accepted !== 0
  );
  return (
    <Block
      title={title}
      extra={time}
    >
      <div className="OfferPage__overView__chartGroup">
        <ChartLegend strings={strings} xs={1} />
        {
          hasNoData ? (
            <Scrollbars
              autoHide
              autoHideTimeout={500}
              renderView={props => (
                <div {...props} style={{ ...props.style, overflowY: 'hidden' }} />
              )}
            >
              <div className="OfferPage__overView__chartGroup_wrapper">
                {
                  data.map(group => (
                    <Box classes={{ root: classes.chartItem }} key={group.name}>
                      <Chart {...chartProps(group)} />
                      <div className={classes.subTitle}>{group.name}</div>
                    </Box>
                  ))
                }
              </div>
            </Scrollbars>
          ) : (
              <Grid container justify="center" alignItems="center">
                <img className="offerOverview-defaultImgGroupBlock" src={chart_no_data} alt="" />
              </Grid>
            )
        }
      </div>
    </Block >
  );
}
