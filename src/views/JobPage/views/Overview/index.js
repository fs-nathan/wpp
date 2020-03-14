import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Container,
  Card,
  CardHeader,
  IconButton,
  CardContent
} from "@material-ui/core";
import Layout from "../../Layout";
import Chart from "react-apexcharts";
import { apiService } from "../../../../constants/axiosInstance";
import { labels, colors, statistic } from "../../contants/attrs";
import {
  createPieChartProps,
  createRadarChartProps,
  createColumnChartProps
} from "../../utils/chart";
const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  card: {
    flex: 1,
    width: "100%",
    boxShadow: "none"
  },
  cardHeader: {
    height: "30px",
    alignItems: "start"
  },
  cardContent: {
    justifyContent: "center",
    height: "270px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardHeaderTitle: {
    fontSize: "1rem",
    fontWeight: "bold"
  }
}));
const Block = ({ title, subheader, extra, children, ...props }) => {
  const classes = useStyles();
  return (
    <Card
      classes={{
        root: classes.card
      }}
    >
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardHeaderTitle
        }}
        action={extra}
        title={title}
        subheader={subheader}
      />
      <CardContent classes={{ root: classes.cardContent }}>
        {children}
      </CardContent>
    </Card>
  );
};

const Overview = () => {
  const classes = useStyles();
  const [statisticraw, setstatisticraw] = useState();
  const [recentlyraw, setrecentlyraw] = useState();
  useEffect(() => {
    window.callApi = apiService;
    setTimeout(
      () =>
        apiService({
          url:
            "https://appapi.workplus.vn/api/v1/task-statistic?from_time=2019/01/01&&to_time=2020/05/01",
          method: "get"
        }).then(setstatisticraw),
      100
    );
    setTimeout(
      () =>
        apiService({
          url: "https://appapi.workplus.vn/api/v1/task-statistic/recently",
          method: "get"
        }).then(setrecentlyraw),
      500
    );
  }, []);
  console.log({ statisticraw, recentlyraw });
  return (
    <Layout title="OVERVIEW">
      <Container>
        <Grid container spacing={3}>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="trạng thái"
              subheader="Biểu đồ theo trạng thái công việc"
              extra={<div>tháng này</div>}
            >
              {statisticraw && (
                <Chart
                  {...createPieChartProps(
                    [
                      "task_waiting",
                      "task_doing",
                      "task_complete",
                      "task_expired"
                    ],
                    statisticraw
                  )}
                />
              )}
            </Block>
          </Grid>

          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="vai trò"
              subheader="Biểu đồ vai trò của công việc"
              extra={<div>tháng này</div>}
            >
              <Chart
                {...createRadarChartProps(
                  [
                    "task_waiting",
                    "task_doing",
                    "task_complete",
                    "task_expired"
                  ],
                  statisticraw
                )}
              />
            </Block>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="ưu tiên"
              subheader="Biểu đồ tỗng hợp mức ưu tiên của công việc"
              extra={<div>tháng này</div>}
            >
              {statisticraw && (
                <Chart
                  {...createColumnChartProps(
                    [
                      "task_hight_priority",
                      "task_medium_priority",
                      "task_low_priority"
                    ],
                    statisticraw
                  )}
                />
              )}
            </Block>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default React.memo(Overview);
