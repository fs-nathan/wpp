import { Grid } from "@material-ui/core";
import React from "react";
import ProgressPlan from "views/JobDetailPage/Report/components/ProgressPlan";
import LeftReportContent from "./LeftReportContent";
import ResultWorking from "./ResultWorking";

const WrapperReport = () => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: "15px 25px",
        maxHeight: "calc(100vh - 130px)",
        width: "calc(100% + 6px)",
        marginTop: 0,
        overflow: "auto",
      }}
    >
      <Grid item xs={7}>
        <LeftReportContent />
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProgressPlan />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: 15 }}>
            <ResultWorking />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WrapperReport;
