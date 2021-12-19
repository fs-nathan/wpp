import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";

const ChartTask = () => {
  const data = {
    options: { legend: { show: true } },
    series: [44, 55, 41, 17],
    labels: ["D", "B", "C", "D", "E"],
  };
  return (
    <Card style={{ minHeight: 375 }}>
      <CardContent>
        <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
          Biểu đồ tổng hợp công việc
        </Typography>

        <Chart type="donut" width="350" {...data} />
      </CardContent>
    </Card>
  );
};

export default ChartTask;
