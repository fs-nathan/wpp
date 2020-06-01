import { Box, Grid, makeStyles } from "@material-ui/core";
import { useTimes } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import chart_no_data from '../../../../assets/chart_no_data.png';
import ChartLegend from "../../components/ChartLegend";
import { createColumnRoleChartProps } from "../../utils/chart";
import { Block } from "./Block";

const strings = [
  "number_offer",
  "number_offer_approving",
  "number_offer_rejected",
  "number_offer_accepted"
];
const groups = [
  {
    name: "NGHỈ LÀM",
    number_offer: 9,
    number_offer_approving: 2,
    number_offer_rejected: 4,
    number_offer_accepted: 3
  },
  {
    name: "TĂNG LƯƠNG",
    number_offer: 44,
    number_offer_approving: 20,
    number_offer_rejected: 10,
    number_offer_accepted: 14
  },
  {
    name: "MUA SẮM CÔNG CỤ, DỤNG CỤ",
    number_offer: 65,
    number_offer_approving: 25,
    number_offer_rejected: 15,
    number_offer_accepted: 25
  },
  {
    name: "SỬ DỤNG PHÒNG HỌP",
    number_offer: 80,
    number_offer_approving: 30,
    number_offer_rejected: 10,
    number_offer_accepted: 40
  },
  {
    name: "SỬ DỤNG XE",
    number_offer: 7,
    number_offer_approving: 2,
    number_offer_rejected: 3,
    number_offer_accepted: 2
  },
  {
    name: "CÔNG TÁC",
    number_offer: 44,
    number_offer_approving: 15,
    number_offer_rejected: 10,
    number_offer_accepted: 19
  },
]

const times = "Tháng này (01/04/2020 - 30/04/2020)"

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  subTitle: {
    color: "#444",
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'uppercase',
  }
}));
export function GroupBlock({  }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const chartProps = (group) => {
    return createColumnRoleChartProps(
      t,
      strings,
      [group]
    );
  }
  const hasNoData = groups.some(group =>
    group.number_offer !== 0
    || group.number_offer_approving !== 0
    || group.number_offer_rejected !== 0
    || group.number_offer_accepted !== 0
  );
  return (
    <Block
      title={t("BIỂU ĐỒ ĐỀ XUẤT THEO NHÓM")}
      extra={times}
    >
      <Grid container>
        <ChartLegend strings={strings} xs={1} />
        {
          hasNoData ? (
            groups.map(group => (
              <Grid xs={12} md={2} classes={{ root: classes.root }} key={group.name} item>
                <Chart {...chartProps(group)} />
                <div className={classes.subTitle}>{group.name}</div>
              </Grid>
            ))
          ) : (
            <Grid xs={12} md={2} item justify="center">
              <img className="offerOverview-defaultImgGroupBlock" src={chart_no_data} alt="" />
            </Grid>
          )
        }
      </Grid>
    </Block>
  );
}
