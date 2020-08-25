import { Box, Container, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { mapQueryStatusAndPriority } from "views/JobPage/utils";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskOverViewPage } from "../../redux/actions";
import { formatTime } from "../../utils/time";
import { PiorityBlock } from "./PiorityBlock";
import { RecentBlock } from "./RecentBlock";
import { RoleBlock } from "./RoleBlock";
import { StatusBlock } from "./StatusBlock";
export const PageContainer = styled(Container)`
  overflow: auto;
  background: #f6f6f6;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const Overview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listMenu, timeRange = {}, statusFilter } = useContext(JobPageContext);
  const isMounted = useMountedState();
  useEffect(() => {
    isMounted &&
      dispatch(
        loadTaskOverViewPage({
          timeStart: formatTime(timeRange.startDate),
          timeEnd: formatTime(timeRange.endDate),
          ...mapQueryStatusAndPriority(statusFilter),
        })
      );
  }, [
    dispatch,
    isMounted,
    timeRange.startDate,
    timeRange.endDate,
    statusFilter,
  ]);
  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon
            size={1.4}
            {...{ color: listMenu[0].color, path: listMenu[0].icon }}
          ></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600",
            }}
          >
            {t(listMenu[0].title)}
          </Box>
        </Box>
      }
    >
      {isMounted && (
        <PageContainer maxWidth="xl">
          <Grid container spacing={3}>
            {[<StatusBlock />, <RoleBlock />, <PiorityBlock />].map(
              (children, i) => (
                <Grid
                  key={i}
                  container
                  alignItems="stretch"
                  item
                  xs={12}
                  md={4}
                >
                  {children}
                </Grid>
              )
            )}
            <Grid item xs={12} md={12}>
              <RecentBlock />
            </Grid>
          </Grid>
        </PageContainer>
      )}
    </Layout>
  );
};
export default React.memo(Overview);
