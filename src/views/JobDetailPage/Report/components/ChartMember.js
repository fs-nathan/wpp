import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";

const ChartMember = () => {
  const data = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43, 21, 49, 12, 23, 23, 27, 12, 23, 23, 27],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27, 33, 12, 12, 23, 23, 27, 12, 23, 23, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14, 15, 13, 12, 23, 23, 27, 12, 23, 23, 27],
      },
      {
        name: "PRODUCT D",
        data: [11, 17, 15, 15, 21, 14, 15, 13, 12, 23, 23, 27, 12, 23, 23, 27],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Giai đoạn 1",
          "Giai đoạn 2",
          "Giai đoạn 3",
          "Giai đoạn 4",
          "Giai đoạn 5",
        ],
      },
      fill: {
        opacity: 1,
      },
    },
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
          Biểu đồ tổng hợp thành viên
        </Typography>
        <Chart type="bar" height={300} {...data} />
      </CardContent>
    </Card>
  );
};

export default ChartMember;
