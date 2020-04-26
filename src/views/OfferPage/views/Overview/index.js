import { Box, Container, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { mapQueryStatusAndPriority } from "views/JobPage/utils";
import { OfferPageContext } from "../../OfferPageContext";
import Layout from "../../Layout";
import { loadTaskOverViewPage } from "../../redux/actions";
import { formatTime } from "../../utils/time";
import { OfferBlock } from "./OfferBlock";
import { GroupBlock } from "./GroupBlock";
export const PageContainer = styled(Container)`
  overflow: auto;
  background: #f6f6f6;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;


//dữ liệu mẫu
const stringsSelfOffer = ["offer_of_me_sending", "offer_of_me_approved", "offer_of_me_monitoring"];
const stringsStatusOffer = ["offer_status_waiting", "offer_status_approved", "offer_status_cancel"];
const stringsPiorityOffer = ["offer_piority_normal", "offer_piority_urgent", "offer_piority_very_urgent"];
const data = {
  static: {
    offer_of_me_sending: 32,
    offer_of_me_approved: 44,
    offer_of_me_monitoring: 54,
    offer_status_waiting: 411,
    offer_status_approved: 122,
    offer_status_cancel: 44,
    offer_piority_normal: 11,
    offer_piority_urgent: 33,
    offer_piority_very_urgent: 42,
  }
}


const Overview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listMenu, timeRange = {}, statusFilter } = useContext(OfferPageContext);
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
            {[
              <OfferBlock strings={stringsSelfOffer} data={data} title={t("ĐỀ XUẤT CỦA BẠN")} />,
              <OfferBlock strings={stringsStatusOffer} data={data} title={t("ĐỀ XUẤT THEO TRẠNG THÁI")} />,
              <OfferBlock strings={stringsPiorityOffer} data={data} title={t("ĐỀ XUẤT THEO MỨC ĐỘ")} />
            ].map(
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
            <Grid xs={12} md={12} item>
              <GroupBlock />
            </Grid>
          </Grid>
        </PageContainer>
      )}
    </Layout>
  );
};
export default React.memo(Overview);
