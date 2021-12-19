import React from "react";
import { Grid } from "@material-ui/core";
import CardReportContent from "./CardReportContent";
import ChartTask from "./ChartTask";
import ChartGroup from "./ChartGroup";
import ChartMember from "./ChartMember";

const LeftReportContent = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardReportContent title="Công việc" count={1245} />
        </Grid>
        <Grid item xs={3}>
          <CardReportContent title="Nhóm việc" count={5} />
        </Grid>
        <Grid item xs={3}>
          <CardReportContent title="Thành viên" count={20} />
        </Grid>
        <Grid item xs={3}>
          <CardReportContent title="Tài liệu" count={36} />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 15 }}>
        <Grid item xs={6}>
          <ChartTask />
        </Grid>
        <Grid item xs={6}>
          <ChartGroup />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 15 }}>
        <Grid item xs={12}>
          <ChartMember />
        </Grid>
      </Grid>
    </>
  );
};

export default LeftReportContent;
