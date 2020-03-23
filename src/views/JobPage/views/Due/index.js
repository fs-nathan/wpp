import { Box, Container } from "@material-ui/core";
import { mdiAlarm } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { labels } from "../../contants/attrs";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskDuePage } from "../../redux/actions";
import { Content } from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
`;

const Due = () => {
  const { t } = useTranslation();
  const { timeRange } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadTaskDuePage());
    });
  }, [dispatch, timeRange]);
  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon size={1.4} {...{ color: "#FF9800", path: mdiAlarm }}></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "26px",
              fontWeight: "600"
            }}
          >
            {t(labels.due)}
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
export default React.memo(Due);
