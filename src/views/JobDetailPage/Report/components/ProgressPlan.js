import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Progress from "./Progress";

const ProgressPlan = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
          Tiến độ
        </Typography>
        <DescriptionProgress />
        <Progress
          title="Kế hoạch"
          progress={67}
          stateProgress={67}
          color="#feb019"
          isPlan
        />
        <Progress
          title="Thực tế"
          progress={43}
          stateProgress={67}
          color="#00e396"
        />
        <WrapperFooter>
          <ArrowDropDownIcon />
          Hôm nay: 08/09/2021
        </WrapperFooter>
      </CardContent>
    </Card>
  );
};

const DescriptionProgress = () => (
  <Grid container spacing={2} style={{ marginTop: "15px" }}>
    <Grid item xs={5}>
      <WrapperContent>
        <p>Bắt đầu</p>
        <p>00:00 02/09/2021</p>
      </WrapperContent>
    </Grid>
    <Grid item xs={2}>
      <WrapperContent style={{ color: "red" }}>
        <p>Tiến độ</p>
        <p>9 ngày</p>
      </WrapperContent>
    </Grid>
    <Grid item xs={5}>
      <WrapperContent className="content-right">
        <p>Kết thúc</p>
        <p>00:00 10/09/2021</p>
      </WrapperContent>
    </Grid>
  </Grid>
);

const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
  &.content-right {
    align-items: flex-end;
  }
`;

const WrapperFooter = styled.div`
  display: flex;
  align-items: center;
  color: red;
  margin-top: 15px;
`;

export default ProgressPlan;
