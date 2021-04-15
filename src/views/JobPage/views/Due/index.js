import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mapQueryStatusAndPriority } from "views/JobPage/utils";
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
  const { timeRange, listMenu, statusFilter } = useContext(JobPageContext);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        loadTaskDuePage({
          ...mapQueryStatusAndPriority(statusFilter),
        })
      );
    });
  }, [dispatch, statusFilter, timeRange]);
  const handlePageChange = (page) => {
    dispatch(
      loadTaskDuePage({
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
            {...{ color: listMenu[1].color, path: listMenu[1].icon }}
          ></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600",
            }}
          >
            {t(listMenu[1].title)}
          </Box>
        </Box>
      }
      killTimeOption={true}
    >
      <PageContainer maxWidth="xl">
        <Content onPageChange={handlePageChange} />
      </PageContainer>
    </Layout>
  );
};
export default React.memo(Due);
