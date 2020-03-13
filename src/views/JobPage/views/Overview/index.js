import React, { useEffect, useState } from "react";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import Layout from "../../Layout";
import Chart from "react-apexcharts";
import { apiService } from "../../../../constants/axiosInstance";
import { labels, colors, statistic } from "../../contants/attrs";
import loginlineFunc, { get, loginlineParams } from "../../utils";
const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    boxShadow: "none",
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  chartBox: {
    width: "100%",
    header: {
      display: "flex",
      flexWrap: "wrap"
    }
  }
}));

const createPieChartProps = (strings, data) => {
  return {
    type: "pie",
    options: {
      chart: {
        animations: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      labels: strings.map(string => labels[string]),
      colors: strings.map(string => colors[string])
    },
    series: strings.map(
      loginlineFunc(string =>
        Math.max(
          Number(
            loginlineFunc(get)(
              loginlineParams(data),
              "data." + statistic[string],
              0
            )
          ),
          1
        )
      )
    ),
    width: 250,
    height: 250
  };
};
const createRadarChartProps = (strings, data) => {
  return {
    type: "radar",

    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20]
      },
      {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80]
      },
      {
        name: "Series 3",
        data: [44, 76, 78, 13, 43, 10]
      }
    ],
    colors: [],
    options: {
      chart: {
        animations: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 1
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
      }
    },
    width: 300,
    height: 300
  };
};
const createLineChartProps = (strings, data) => {
  return {
    type: "column",
    series: [
      {
        name: "Net Profit",
        data: [44]
      },
      {
        name: "Revenue",
        data: [76]
      },
      {
        name: "Free Cash Flow",
        data: [35]
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    }
  };
};
const Overview = () => {
  const classes = useStyles();
  const [statisticraw, setstatisticraw] = useState();
  const [recentlyraw, setrecentlyraw] = useState();
  useEffect(() => {
    window.callApi = apiService;
    setTimeout(() =>
      apiService({
        url:
          "https://appapi.workplus.vn/api/v1/task-statistic?from_time=2019/01/01&&to_time=2020/05/01",
        method: "get"
      }).then(setstatisticraw)
    );
    setTimeout(() =>
      apiService({
        url: "https://appapi.workplus.vn/api/v1/task-statistic/recently",
        method: "get"
      }).then(setrecentlyraw)
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
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Paper className={classes.paper}>
              <Chart
                {...createLineChartProps(
                  [
                    "task_waiting",
                    "task_doing",
                    "task_complete",
                    "task_expired"
                  ],
                  statisticraw
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default React.memo(Overview);
