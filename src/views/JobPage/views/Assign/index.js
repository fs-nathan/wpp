import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-use";
import styled from "styled-components";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { mapQueryStatusAndPriority } from "views/JobPage/utils";
import { formatTime } from "views/JobPage/utils/time";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskAssignPage } from "../../redux/actions";
import { Content } from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
`;

const Assign = () => {
  const { typeAssign } = useParams();
  const { t } = useTranslation();
  const { timeRange = {}, listMenu, statusFilter } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadTaskAssignPage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate),
        typeAssign,
        ...mapQueryStatusAndPriority(statusFilter),
      })
    );
  }, [
    dispatch,
    timeRange.timeStart,
    timeRange.timeEnd,
    typeAssign,
    timeRange.startDate,
    timeRange.endDate,
    statusFilter,
  ]);
  const handlePageChange = (page) => {
    dispatch(
      loadTaskAssignPage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate),
        typeAssign,
        ...mapQueryStatusAndPriority(statusFilter),
        page,
      })
    );
  };

  const location = useLocation();
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
            {t(listMenu[2].title)}:{" "}
            {t(
              (
                (listMenu[2].sub || emptyArray).find(
                  (item) => item.url === location.pathname
                ) || {}
              ).name
            )}
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
export default React.memo(Assign);
