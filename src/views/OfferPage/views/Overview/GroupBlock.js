import { Box, Grid, makeStyles } from "@material-ui/core";
import { useTimes } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { createColumnRoleChartProps } from "../../utils/chart";
import { Block } from "./Block";
import { getWaitingOfferTitle } from './i18nSelectors';

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
  return (
    <Block
      title={t("BIỂU ĐỒ ĐỀ XUẤT THEO NHÓM")}
      extra={times}
    >
      <Grid container>
        <ChartLegend strings={strings} xs={1} />
        {groups.map(group => (
          <Grid xs={12} md={2} classes={{ root: classes.root }} key={group.name} item>
            <Chart {...chartProps(group)} />
            <span className={classes.subTitle}>{group.name}</span>
          </Grid>
        ))}
      </Grid>
    </Block>
  );
}
