import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-use";
import styled from "styled-components";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { formatTime } from "views/JobPage/utils/time";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskRolePage } from "../../redux/actions";
import { Content } from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
`;

const Role = () => {
  const { roleId } = useParams();
  const { t } = useTranslation();
  const { timeRange = {}, listMenu } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadTaskRolePage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate),
        roleId
      })
    );
  }, [
    dispatch,
    timeRange.timeStart,
    timeRange.timeEnd,
    roleId,
    timeRange.startDate,
    timeRange.endDate
  ]);
  const location = useLocation();
  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon
            size={1.4}
            {...{ color: listMenu[3].color, path: listMenu[3].icon }}
          ></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600"
            }}
          >
            {t(listMenu[3].title)}:{" "}
            {
              (
                (listMenu[3].sub || emptyArray).find(
                  item => item.url === location.pathname
                ) || {}
              ).name
            }
          </Box>
        </Box>
      }
    >
      <PageContainer maxWidth="xl">
        <Content />
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Role);
