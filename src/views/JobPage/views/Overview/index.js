import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableRow
} from "@material-ui/core";
import { mdiAccount } from "@mdi/js";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import CustomAvatar from "../../../../components/CustomAvatar";
import { apiService } from "../../../../constants/axiosInstance";
import colors from "../../../../helpers/colorPalette";
import { StyledTableBodyCell } from "../../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import AnalyticButton from "../../components/AnalyticButton";
import InlineBadge from "../../components/InlineBadge";
import PrimaryButton from "../../components/PrimaryButton";
import { labels } from "../../contants/attrs";
import Layout from "../../Layout";
import loginlineFunc from "../../utils";
import {
  createColumnChartProps,
  createPieChartProps,
  createRadarChartProps
} from "../../utils/chart";
export const PageContainer = styled(Container)`
  overflow: auto;
  background: #f6f6f6;
  padding: 16px;
`;
const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  card: {
    flex: 1,
    width: "100%",
    boxShadow: "none"
  },
  cardHeader: {
    height: "30px",
    alignItems: "start"
  },
  cardContent: {
    justifyContent: "center",
    height: "270px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardHeaderTitle: {
    fontSize: "1rem",
    fontWeight: "bold"
  },
  cardHeaderSubTitle: {
    marginTop: "0.2rem",
    fontSize: "0.9rem"
  }
}));

const Block = ({ title, subheader, extra, children, ...props }) => {
  const classes = useStyles();
  return (
    <Card
      classes={{
        root: classes.card
      }}
      variant="outlined"
    >
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardHeaderTitle,
          subheader: classes.cardHeaderSubTitle
        }}
        action={extra}
        title={title}
        subheader={subheader}
      />
      <CardContent
        classes={{
          root: classes.cardContent
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
const CustomRow = () => {};
const Overview = () => {
  const { t } = useTranslation();
  const [statisticraw, setstatisticraw] = useState();
  const [recentlyraw, setrecentlyraw] = useState();
  useEffect(() => {
    window.callApi = apiService;
    setTimeout(
      () =>
        apiService({
          url:
            "https://appapi.workplus.vn/api/v1/task-statistic?from_time=2019/01/01&&to_time=2020/05/01",
          method: "get"
        }).then(setstatisticraw),
      100
    );
    setTimeout(
      () =>
        apiService({
          url: "https://appapi.workplus.vn/api/v1/task-statistic/recently",
          method: "get"
        }).then(setrecentlyraw),
      500
    );
  }, []);
  console.log({
    statisticraw,
    recentlyraw
  });
  return (
    <Layout title={t(labels.overview)}>
      <PageContainer maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="trạng thái"
              subheader="Biểu đồ theo trạng thái công việc"
              extra={<div>tháng này</div>}
            >
              {statisticraw && (
                <Chart
                  {...createPieChartProps(
                    [
                      "task_waiting",
                      "task_doing",
                      "task_complete",
                      "task_expired"
                    ],
                    statisticraw
                  )}
                />
              )}
            </Block>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="vai trò"
              subheader="Biểu đồ vai trò của công việc"
              extra={<div>tháng này</div>}
            >
              <Chart
                {...createRadarChartProps(
                  [
                    "task_waiting",
                    "task_doing",
                    "task_complete",
                    "task_expired"
                  ],
                  statisticraw
                )}
              />
            </Block>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justify="stretch"
            item
            xs={12}
            md={4}
          >
            <Block
              title="ưu tiên"
              subheader="Biểu đồ tỗng hợp mức ưu tiên của công việc"
              extra={<div>tháng này</div>}
            >
              {statisticraw && (
                <Chart
                  {...createColumnChartProps(
                    [
                      "task_hight_priority",
                      "task_medium_priority",
                      "task_low_priority"
                    ],
                    statisticraw
                  )}
                />
              )}
            </Block>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card variant="outlined">
              <CardHeader title={"Công việc gần đây"} />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item>
                    <PrimaryButton />
                  </Grid>
                  <Grid item>
                    <AnalyticButton
                      label="đang chờ"
                      color={colors.orange[0]}
                      circleText="10%"
                    />
                  </Grid>
                  <Grid item>
                    <AnalyticButton
                      label="đang làm"
                      color={colors.blue[0]}
                      circleText="10%"
                    />
                  </Grid>
                  <Grid item>
                    <AnalyticButton
                      label="hoàn thành"
                      color={colors.green[0]}
                      circleText="10%"
                    />
                  </Grid>
                  <Grid item>
                    <AnalyticButton
                      label="quá hạn"
                      color={colors.pink[0]}
                      circleText="10%"
                    />
                  </Grid>
                </Grid>
                <br />
                <Table stickyHeader>
                  <TableBody>
                    {["công việc", "tiến độ", "kết thúc", "xem nhanh"].map(
                      (file, index) => {
                        return (
                          <TableRow key={index}>
                            <StyledTableBodyCell
                              align="left"
                              width="5%"
                              className="cursor-pointer"
                              onClick={loginlineFunc}
                            >
                              <CustomAvatar
                                src={
                                  "https://storage.googleapis.com/storage_vtask_net/Icon_default/bt11.png"
                                }
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell
                              align="left"
                              className="cursor-pointer"
                              onClick={loginlineFunc}
                            >
                              <b>
                                Marketing chiến lược sản phẩm phần mềm VTASK
                              </b>{" "}
                              <InlineBadge color={colors.gray[0]}>
                                đang chờ
                              </InlineBadge>{" "}
                              <InlineBadge color={colors.pink[0]}>
                                quá hạn 10 ngày
                              </InlineBadge>{" "}
                              <InlineBadge color={colors.green[0]}>
                                15%
                              </InlineBadge>{" "}
                              <InlineBadge
                                icon={mdiAccount}
                                color={colors.yellow[0]}
                              >
                                3
                              </InlineBadge>
                            </StyledTableBodyCell>
                            <StyledTableBodyCell
                              align="left"
                              width="10%"
                              className="cursor-pointer"
                              onClick={loginlineFunc}
                            >
                              3 ngày
                            </StyledTableBodyCell>
                            <StyledTableBodyCell
                              align="left"
                              width="10%"
                              className="cursor-pointer"
                              onClick={loginlineFunc}
                            >
                              18/02/2020
                            </StyledTableBodyCell>
                            <StyledTableBodyCell
                              align="left"
                              width="10%"
                              className="cursor-pointer"
                              onClick={loginlineFunc}
                            >
                              <Link to="/">xem nhanh</Link>
                            </StyledTableBodyCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Overview);
