import { Box, Grid, makeStyles } from "@material-ui/core";
import { useTimes } from "components/CustomPopover";
import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChartLegend from "../../components/ChartLegend";
import { createColumnRoleChartProps } from "../../utils/chart";
import { Block } from "./Block";

const strings = ["number_offer_aprroved", "number_offer"];
const groups = [
  {
    name: "NGHỈ LÀM",
    number_offer_aprroved: 3,
    number_offer: 6
  },
  {
    name: "TĂNG LƯƠNG",
    number_offer_aprroved: 32,
    number_offer: 44
  },
  {
    name: "MUA SẮM CÔNG CỤ, DỤNG CỤ",
    number_offer_aprroved: 32,
    number_offer: 65
  },
  {
    name: "SỬ DỤNG PHÒNG HỌP",
    number_offer_aprroved: 44,
    number_offer: 80
  },
  {
    name: "SỬ DỤNG XE",
    number_offer_aprroved: 4,
    number_offer: 7
  },
  {
    name: "CÔNG TÁC",
    number_offer_aprroved: 12,
    number_offer: 44
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
export function GroupBlock() {
  const classes = useStyles();

  const chartProps = (group) => {
    return createColumnRoleChartProps(
      strings,
      [group]
    );
  }
  const { t } = useTranslation();
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
