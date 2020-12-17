import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";


const PieChart = ({ series }) => {
    const { t } = useTranslation();

    const options = {
        labels: [t("VIEW_OFFER_LABEL_PENDING"), t("VIEW_OFFER_LABEL_APPROVED"), t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_2"), t("VIEW_OFFER_LABEL_REJECTED")],
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        chart: {
            height: '50px',
            width: '50px',
            type: 'pie',
        },
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        fill: {
            colors: ['#9e9e9e', '#0ab711', '#ff9800', '#f44336']
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: '50px',
                    width: '50px'
                },
                legend: {
                    show: false
                }
            }
        }]
    }
    return (
        <div id="chart">
            <ReactApexChart series={series} options={options} type="pie" width={70} />
        </div>
    )
}
export default PieChart;