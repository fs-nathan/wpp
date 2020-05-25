import React from "react";
import ReactApexChart from "react-apexcharts";


const PieChart = ({ series }) => {
    const options = {
        labels: ["Chờ duyệt", "Đã duyệt", "Đang duyệt", "Từ chối"],
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
            colors: ['#03c30b', '#ff9800', '#03a9f4', '#f44336']
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