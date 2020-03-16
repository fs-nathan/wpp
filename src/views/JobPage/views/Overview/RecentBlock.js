import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableRow
} from "@material-ui/core";
import { mdiAccount } from "@mdi/js";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { StyledTableBodyCell } from "../../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import AnalyticButton from "../../components/AnalyticButton";
import InlineBadge from "../../components/InlineBadge";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, recent, taskAtrrs } from "../../contants/attrs";
import { TASK_OVERVIEW_RECENT } from "../../redux/types";
import { createMapPropsFromAttrs, loginlineFunc } from "../../utils";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "25px",
    height: "25px"
  },
  titleCell: {
    padding: "10px"
  }
}));
export function ImageAvatars({ ...props }) {
  const classes = useStyles();
  return <Avatar className={classes.avatar} {...props} />;
}
export function TitleCell({ ...props }) {
  const classes = useStyles();
  return (
    <StyledTableBodyCell
      className={classes.titleCell}
      {...props}
    ></StyledTableBodyCell>
  );
}
export function RecentBlock() {
  const { t } = useTranslation();
  const [waiting, doing, complete, expired, tasks = []] = useSelector(state => {
    return loginlineFunc(
      createMapPropsFromAttrs([
        recent.waiting,
        recent.doing,
        recent.complete,
        recent.expired,
        recent.tasks
      ])
    )(state.taskPage[TASK_OVERVIEW_RECENT]);
  });
  return (
    <Card variant="outlined">
      <CardHeader title={"Công việc gần đây"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item flex={1}>
            <PrimaryButton
              count={[waiting, doing, complete, expired].reduce(
                (result = 0, value) => result + value
              )}
              label={t("Công việc được thực hiện")}
            />
          </Grid>
          <Box flex={1}></Box>
          <Grid item>
            <AnalyticButton
              count={waiting}
              label={t("Đang chờ")}
              color={colors.task_waiting}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={doing}
              label={t("Đang làm")}
              color={colors.task_doing}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={complete}
              label={t("Hoàn thành")}
              color={colors.task_complete}
              circleText="10%"
            />
          </Grid>
          <Grid item>
            <AnalyticButton
              count={expired}
              label={t("Quá hạn")}
              color={colors.task_expired}
              circleText="10%"
            />
          </Grid>
          <Grid item container xs={12}>
            <Table stickyHeader>
              <TableBody>
                {tasks.map((task, index) => {
                  const [
                    avatar,
                    name,
                    status_code,
                    status_name,
                    time_end,
                    haveNewChat,
                    duration_value,
                    duration_unit,
                    complete,
                    number_member
                  ] = loginlineFunc(
                    createMapPropsFromAttrs([
                      taskAtrrs.user_create.avatar,
                      taskAtrrs.name,
                      taskAtrrs.status_code,
                      taskAtrrs.status_name,
                      taskAtrrs.time_end,
                      taskAtrrs.haveNewChat,
                      taskAtrrs.duration_value,
                      taskAtrrs.duration_unit,
                      taskAtrrs.complete,
                      taskAtrrs.number_member
                    ])
                  )(task);
                  return (
                    <TableRow hover key={index}>
                      <StyledTableBodyCell
                        align="left"
                        width="5%"
                        className="cursor-pointer"
                        onClick={loginlineFunc}
                      >
                        <ImageAvatars src={avatar} />
                      </StyledTableBodyCell>
                      <TitleCell align="left" onClick={loginlineFunc}>
                        <b>{name}</b>{" "}
                        {[
                          complete === 100 && (
                            <InlineBadge color={colors.task_complete}>
                              {t("Hoàn thành")}
                            </InlineBadge>
                          ),
                          status_code === 0 && (
                            <InlineBadge color={colors.task_waiting}>
                              {status_name}
                            </InlineBadge>
                          ),
                          status_code === 1 && (
                            <InlineBadge color={colors.task_expired}>
                              quá hạn 10 ngày
                            </InlineBadge>
                          ),
                          <InlineBadge color={colors.task_complete}>
                            15%
                          </InlineBadge>,
                          <InlineBadge
                            icon={mdiAccount}
                            color={colors.task_complete}
                          >
                            {complete}
                          </InlineBadge>,
                          <InlineBadge
                            icon={mdiAccount}
                            color={colors.task_waiting}
                          >
                            {number_member}
                          </InlineBadge>
                        ]
                          .filter(item => item)
                          .map((item, i) => (
                            <React.Fragment key={i}>{item} </React.Fragment>
                          ))}
                      </TitleCell>
                      <StyledTableBodyCell
                        align="left"
                        width="10%"
                        className="cursor-pointer"
                        onClick={loginlineFunc}
                      >
                        {duration_value} {t(duration_unit)}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align="right"
                        width="10%"
                        className="cursor-pointer"
                        onClick={loginlineFunc}
                      >
                        {time_end}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align="right"
                        width="10%"
                        className="cursor-pointer"
                        onClick={loginlineFunc}
                      >
                        <Link to="/">xem nhanh</Link>
                      </StyledTableBodyCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
