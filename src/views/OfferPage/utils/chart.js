import { colors, labels, statistic } from "../contants/attrs";
import { get } from "./index.js";

export const createPieChartProps = (strings, data) => {
  return {
    type: "donut",
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '55%',
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: 'ĐỀ XUẤT',
              },
              value: {
                fontWeight: 'bold',
              }
            },
          }
        }
      },
      
      subtitle: {
        text: undefined,
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '12px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#9699a2'
        },
      },
      labels: strings.map(string => labels[string]),
      colors: strings.map(string => colors[string]),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      floating: true,
    },
    series: data,
    height: 250
  };
};

export const createColumnRoleChartProps = (strings, data) => {
  const categories = data.map(role => role.name);
  const series = data.reduce(
    (result, value) => {
      const [all, complete] = result;
      const { number_offer_aprroved, number_offer } = value;
      all.data.push(number_offer);
      complete.data.push(number_offer_aprroved);
      return result;
    },
    [
      {
        name: "Đề xuất",
        color: colors.number_offer,
        data: []
      },
      {
        name: "Phê duyệt",
        color: colors.number_offer_aprroved,
        data: []
      }
    ]
  );
  return {
    type: "bar",
    series,
    options: {
      colors: [colors.number_offer, colors.number_offer_aprroved],
      chart: {
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          dataLabels: {
            position: 'center',
          },
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true
      },
    },
    height: 250
  };
};