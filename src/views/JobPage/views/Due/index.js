import { Container } from "@material-ui/core";
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
`;

const Due = () => {
  const { t } = useTranslation();
  const { timeRange } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTaskDuePage());
  }, [dispatch, timeRange]);
  return (
    <Layout title={t(labels.due)}>
      <PageContainer maxWidth="xl">
        <Content />
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Due);
