import { Container } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatTime } from "views/JobPage/utils/time";
import { labels } from "../../contants/attrs";
import { JobPageContext } from "../../JobPageContext";
import Layout from "../../Layout";
import { loadTaskAssignPage } from "../../redux/actions";
import { Content } from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
`;

const Assign = () => {
  const { typeAssign } = useParams();
  const { t } = useTranslation();
  const { timeRange = {} } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadTaskAssignPage({
        timeStart: formatTime(timeRange.timeStart),
        timeEnd: formatTime(timeRange.timeEnd),
        typeAssign
      })
    );
  }, [dispatch, timeRange.timeStart, timeRange.timeEnd, typeAssign]);
  return (
    <Layout title={t(labels.due)}>
      <PageContainer maxWidth="xl">
        <Content />
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Assign);
