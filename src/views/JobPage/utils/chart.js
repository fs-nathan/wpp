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
  const roles = get(data, statistic.roles, []);
  const maxValue = roles.reduce((result, role) => {
    if (role.number_task > result) {
      return role.number_task;
    }
    return result;
  }, 0);
  // const roles = [
  //   {
  //     id: "5e70408ce2f6b848a81653b5",
  //     name: "Công nhân",
  //     tasks: ["5e7b044b12e9e7f8cfb35dfb"],
  //     number_task_complete: 1,
  //     number_task: 8
  //   },
  //   {
  //     id: "5e70408ce2f6b848a81653b5",
  //     name: "Lao công",
  //     tasks: ["5e7b044b12e9e7f8cfb35dfb"],
  //     number_task_complete: 1,
  //     number_task: 10
  //   },
  //   {
  //     id: "5e70408ce2f6b848a81653b5",
  //     name: "GIám sát công việc",
  //     tasks: ["5e7b044b12e9e7f8cfb35dfb"],
  //     number_task_complete: 9,
  //     number_task: 14
  //   },
  //   {
  //     id: "5e65e39b22db895ea23b6229",
  //     name: "Giám sát dự án",
  //     tasks: ["5e7b044b12e9e7f8cfb35dfb"],
  //     number_task_complete: 7,
  //     number_task: 15
  //   },
  //   {
  //     id: "5e70408ce2f6b848a81653b5",
  //     name: "GIám sát công việc",
  //     tasks: ["5e7b044b12e9e7f8cfb35dfb"],
  //     number_task_complete: 12,
  //     number_task: 22
  //   }
  // ];
  const categories = roles.map(role => role.name);
  const series = roles.reduce(
    (result, value) => {
      const [all, complete] = result;
      const { number_task_complete, number_task } = value;
      all.data.push(number_task);
      complete.data.push(number_task_complete);
      return result;
    },
    [
      {
        name: "Tất cả",
        color: colors.task_all,
        data: []
      },
      {
        name: "Hoàn thành",
        color: colors.task_complete,
        data: []
      }
    ]
  );
  return {
    type: "radar",

    series,
    // [
    //   {
    //     name: "Series",
    //     data: [80, 50, 30, 40, 100, 20]
    //   },
    //   {
    //     name: "Series 2",
    //     data: [20, 30, 40, 80, 20, 80]
    //   },
    //   {
    //     name: "Series 3",
    //     data: [44, 76, 78, 13, 43, 10]
    //   }
    // ]

    options: {
      plotOptions: {
        radar: {
          size: 100
        }
      },
      colors: [colors.task_all, colors.task_complete],
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
        // categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
        categories
      },
      yaxis: {
        tickAmount: maxValue < 4 ? maxValue : undefined,
        labels: {
          formatter: function(val, i) {
            return Math.floor(val);
          }
        }
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
