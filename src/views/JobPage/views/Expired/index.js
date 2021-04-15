import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mapQueryStatusAndPriority } from "views/JobPage/utils";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskExpiredPage } from "../../redux/actions";
import { formatTime } from "views/JobPage/utils/time";
import { Content } from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
`;

const Expired = () => {
  const { t } = useTranslation();
  const { timeRange, listMenu, statusFilter } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadTaskExpiredPage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate),
        ...mapQueryStatusAndPriority(statusFilter),
      })
    );
  }, [
    dispatch,
    timeRange.timeStart,
    timeRange.timeEnd,
    timeRange.startDate,
    timeRange.endDate,
    statusFilter,
  ]);
  const handlePageChange = (page) => {
    dispatch(
      loadTaskExpiredPage({
        ...mapQueryStatusAndPriority(statusFilter),
        page,
      })
    );
  };
  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon
            size={1.4}
            {...{ color: listMenu[2].color, path: listMenu[2].icon }}
          ></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600",
            }}
          >
            {t(listMenu[2].title)}
          </Box>
        </Box>
      }
    >
      <PageContainer maxWidth="xl">
        <Content onPageChange={handlePageChange} />
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Expired);
