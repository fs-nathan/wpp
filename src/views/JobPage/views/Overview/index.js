import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { labels } from "../../contants/attrs";
import Layout from "../../Layout";
import { loadTaskOverViewPage } from "../../redux/actions";
import { PiorityBlock } from "./PiorityBlock";
import { RecentBlock } from "./RecentBlock";
import { RoleBlock } from "./RoleBlock";
import { StatusBlock } from "./StatusBlock";
export const PageContainer = styled(Container)`
  overflow: auto;
  background: #f6f6f6;
  padding: 16px;
`;
const Overview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMounted = useMountedState();
  useEffect(() => {
    isMounted && dispatch(loadTaskOverViewPage());
  }, [dispatch, isMounted]);
  return (
    <Layout title={t(labels.overview)}>
      {isMounted && (
        <PageContainer maxWidth="xl">
          <Grid container spacing={3}>
            {[<StatusBlock />, <RoleBlock />, <PiorityBlock />].map(
              (children, i) => (
                <Grid
                  key={i}
                  container
                  alignItems="stretch"
                  justify="stretch"
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
