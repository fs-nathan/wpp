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
    options: {
      plotOptions: {
        radar: {
          size: 100
        }
      },
      colors: [colors.task_all, colors.task_complete],
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      stroke: {
        width: 1
      },
      fill: {
        opacity: 0.4
      },
      marker: {
        size: 4,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      xaxis: {
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
        name: "Số lượng",
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
        // enabled: false
      },
      legend: {
        show: false
        // position: "bottom"
      },
      xaxis: {
        categories: strings.map(string => labels[string]),
        // show: false,
        labels: {
          // show: false,
          labels: strings.map(string => labels[string])
        }
        // axisBorder: {
        //   show: false
        // },
        // axisTicks: {
        //   show: false
        // }
      }
    },
    height: 250
  };
};
export const createColumnRoleChartProps = (strings, data) => {
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
    type: "bar",
    series,
    options: {
      colors: [colors.task_all, colors.task_complete],
      chart: {
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories,
        labels: {
          hideOverlappingLabels: false,
          style: {
            fontSize: "10px"
          }
        }
      },
      yaxis: {},
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true
      }
    },
    height: 250
  };
};
export const createPriorityRadialBarChartProps = (
  strings = [
    "task_hight_priority",
    "task_medium_priority",
    "task_low_priority"
  ],
  data
) => {
  return {
    type: "radialBar",
    series: strings.map(string => Number(get(data, statistic[string], 0))),
    options: {
      colors: strings.map(string => colors[string]),
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      labels: strings.map(string => labels[string]),
      legend: {
        show: false,
        floating: true,
        fontSize: "12px",
        position: "left",
        offsetX: 120,
        offsetY: 5,
        labels: {
          useSeriesColors: true
        },
        markers: {
          width: 0,
          height: 0
        },
        formatter: function(seriesName, opts) {
          return opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3
        }
      },
      tooltip: {
        enabled: true
      }
    },
    height: 250
  };
};
