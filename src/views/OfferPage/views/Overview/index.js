import { Box, Container, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { labels } from "../../contants/attrs";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadSummaryOverview } from "../../redux/actions";
import { get } from "../../utils";
import { GroupBlock } from "./GroupBlock";
import { OfferBlock } from "./OfferBlock";
import { getMyOffers, getPriorityOffers, getStatusOffers } from "./selector";
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


const Overview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listMenu, timeRange = {}, statusFilter, setTitle } = useContext(OfferPageContext);
  const isMounted = useMountedState();
  const myOffers = useSelector(state => getMyOffers(state))
  const statusOffers = useSelector(state => getStatusOffers(state))
  const piorityOffers = useSelector(state => getPriorityOffers(state))
  useEffect(() => {
    dispatch(loadSummaryOverview({ timeRange }))
  }, [dispatch, timeRange])
  useEffect(() => {
    isMounted &&
      setTitle(get(labels, "pageTitle"))
  }, [dispatch, isMounted, timeRange.startDate, timeRange.endDate, statusFilter, setTitle]);
  const renderDataGroupOffer = useMemo(() => {
    if (timeRange) {
      return statusOffers
    }
  }, [statusOffers, timeRange])
  const renderDataPiorityOffer = useMemo(() => {
    if (timeRange) {
      return piorityOffers
    }
  }, [piorityOffers, timeRange])
  const renderDataMyOfferGroup = useMemo(() => {
    if (timeRange) {
      return myOffers
    }
  }, [myOffers, timeRange])
  const renderExtraTimeTitle = useMemo(() => {
    const startDate = moment(timeRange.startDate).format("DD/MM/YYYY")
    const endDate = moment(timeRange.endDate).format("DD/MM/YYYY")
    return `Tháng này (${startDate} - ${endDate})`
  }, [timeRange])
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
              <OfferBlock time={renderExtraTimeTitle} strings={stringsSelfOffer} data={renderDataMyOfferGroup} title={t("ĐỀ XUẤT CỦA BẠN")} />,
              <OfferBlock time={renderExtraTimeTitle} strings={stringsStatusOffer} data={renderDataGroupOffer} title={t("ĐỀ XUẤT THEO TRẠNG THÁI")} />,
              <OfferBlock time={renderExtraTimeTitle} strings={stringsPiorityOffer} data={renderDataPiorityOffer} title={t("ĐỀ XUẤT THEO MỨC ĐỘ")} />
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
