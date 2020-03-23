import { colors, labels, statistic } from "../contants/attrs";
import { get } from "./index.js";
export const createPieChartProps = (strings, data) => {
  return {
    type: "pie",
    options: {
      chart: {
        // animations: {
        //   enabled: false
        // },
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
        // position: "bottom"
      },
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      labels: strings.map(string => labels[string]),
      colors: strings.map(string => colors[string]),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      floating: true
    },
    series: strings.map(string =>
      Math.max(Number(get(data, statistic[string], 0)), 0)
    ),
    height: 250
  };
};

export const createRadarChartProps = (strings, data) => {
  return {
    type: "radar",

    series: [
      {
        name: "Series",
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
      legend: {
        show: false
        // position: "bottom"
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
    height: 250
  };
};
export const createColumnChartProps = (
  strings = [
    "task_hight_priority",
    "task_medium_priority",
    "task_low_priority"
  ],
  data
) => {
  return {
    type: "bar",
    series: [
      {
        data: strings.map(string =>
          Math.max(Number(get(data, statistic[string], 0)), 0)
        )
      }
    ],
    options: {
      chart: {
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        },
        toolbar: {
          show: false
        }
      },
      colors: strings.map(string => colors[string]),
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
        // position: "bottom"
      },
      xaxis: {
        categories: strings.map(string => labels[string]),
        show: false,
        labels: {
          show: false,
          labels: strings.map(string => labels[string])
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      }
    },
    height: 250
  };
};
