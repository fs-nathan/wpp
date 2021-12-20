import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import TableResultWorking from "./TableResultWorking";

const ResultWorking = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
          Kết quả làm việc
        </Typography>
        <TableResultWorking />
      </CardContent>
    </Card>
  );
};

export default ResultWorking;
