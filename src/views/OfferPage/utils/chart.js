import { colors, labels } from "../contants/attrs";
import { getAcceptedOfferTitle, getApprovingOfferTitle, getRejectedOfferTitle, getWaitingOfferTitle } from '../views/Overview/i18nSelectors';

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
          fontSize: '12px',
          fontWeight: 'normal',
          fontFamily: undefined,
          color: '#9699a2'
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

export const createColumnRoleChartProps = (t, strings, data) => {
  const categories = data.map(role => role.name);
  const dataToShow = [
    {
      name: getWaitingOfferTitle(t),
      data: [],
    },
    {
      name: getApprovingOfferTitle(t),
      data: [],
    },
    {
      name: getRejectedOfferTitle(t),
      data: [],
    },
    {
      name: getAcceptedOfferTitle(t),
      data: [],
    },
  ];
  const series = data.reduce((result, value) => {
    const [waiting, approving, rejected, accepted] = result;
    const {
      number_offer,
      number_offer_approving,
      number_offer_rejected,
      number_offer_accepted
    } = value;
    waiting.data.push(number_offer);
    approving.data.push(number_offer_approving);
    rejected.data.push(number_offer_rejected);
    accepted.data.push(number_offer_accepted);
    return result;
  }, dataToShow);

  return {
    type: "bar",
    series,
    options: {
      colors: [
        colors.number_offer,
        colors.number_offer_approving,
        colors.number_offer_rejected,
        colors.number_offer_accepted
      ],
      chart: {
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
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
        categories: categories,
        labels: {
          show: false,
          rotate: 0,
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
