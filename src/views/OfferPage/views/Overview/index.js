import { Box, Container, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import { useLocalStorage } from "hooks";
import moment from "moment";
import React, { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { useTimes } from '../../../../components/CustomPopover';
import { TIME_FILTER_TYPE_OFFER_OVERVIEW } from '../../contants/localStorage';
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadSummaryOverview } from "../../redux/actions";
import { GroupBlock } from "./GroupBlock";
import { OfferBlock } from "./OfferBlock";
import { getGroupOffers, getMyOffers, getPriorityOffers, getStatusOffers } from './selector';
export const PageContainer = styled(Container)`
  overflow: auto;
  background: #f6f6f6;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const stringsSelfOffer = ["offer_of_me_sending", "offer_of_me_approved", "offer_of_me_monitoring"];
const stringsStatusOffer = ["offer_status_waiting", "offer_status_approved", "offer_status_cancel", "offer_status_approving"];
const stringsPriorityOffer = ["offer_priority_normal", "offer_priority_urgent", "offer_priority_very_urgent"];
const stringsGroupOffer = [
  "number_offer",
  "number_offer_approving",
  "number_offer_rejected",
  "number_offer_accepted"
];

const Overview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listMenu, timeType, timeRange = {}, setTitle, setTimeType } = useContext(OfferPageContext);
  const isMounted = useMountedState();
  const times = useTimes();
  const myOffers = useSelector(state => getMyOffers(state))
  const statusOffers = useSelector(state => getStatusOffers(state))
  const priorityOffers = useSelector(state => getPriorityOffers(state))
  const groupOffers = useSelector(getGroupOffers);
  const [timeFilterTypeOfferOverview, storeTimeFilterTypeOfferOverview] = useLocalStorage(TIME_FILTER_TYPE_OFFER_OVERVIEW, { timeType: 1 });

  useEffect(() => {
    if (isMounted) {
      setTimeType(timeFilterTypeOfferOverview.timeType);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      storeTimeFilterTypeOfferOverview({
        ...timeFilterTypeOfferOverview,
        timeType
      });
    }
  }, [isMounted, timeType]);

  useEffect(() => {
    dispatch(loadSummaryOverview({ timeRange }));
  }, [dispatch, timeRange]);

  useEffect(() => {
    isMounted &&
      setTitle(t("VIEW_OFFER_LABEL_YOUR_OFFER"))
  }, [isMounted, setTitle, t]);

  const renderDataStatusOffer = useMemo(() => {
    if (timeRange) {
      return statusOffers
    }
  }, [statusOffers, timeRange]);

  const renderDataPriorityOffer = useMemo(() => {
    if (timeRange) {
      return priorityOffers
    }
  }, [priorityOffers, timeRange]);

  const renderDataMyOfferGroup = useMemo(() => {
    if (timeRange) {
      return myOffers
    }
  }, [myOffers, timeRange]);

  const renderDataGroupOffer = useMemo(() => {
    if (timeRange) {
      return groupOffers;
    }
  }, [groupOffers, timeRange]);

  const renderExtraTimeTitle = useMemo(() => {
    let startDate = undefined;
    let endDate = undefined;
    if (timeRange.startDate && timeRange.endDate) {
      startDate = moment(timeRange.startDate).format("DD/MM/YYYY")
      endDate = moment(timeRange.endDate).format("DD/MM/YYYY")
    }
    return startDate && endDate
      ? `${times[timeType].title} (${startDate} - ${endDate})`
      : t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.ALL_TIME');
  }, [timeType, timeRange, times, t]);

  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon
            size={1.4}
            {...{ color: listMenu[0].color, path: listMenu[0].icon }}
          />
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
              <OfferBlock time={renderExtraTimeTitle} strings={stringsSelfOffer} data={renderDataMyOfferGroup} title={t("VIEW_OFFER_LABEL_YOUR_OFFER")} />,
              <OfferBlock time={renderExtraTimeTitle} strings={stringsStatusOffer} data={renderDataStatusOffer} title={t("VIEW_OFFER_LABEL_OFFER_BY_STATUS")} />,
              <OfferBlock time={renderExtraTimeTitle} strings={stringsPriorityOffer} data={renderDataPriorityOffer} title={t("VIEW_OFFER_LABEL_OFFER_BY_LEVEL")} />
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
              <GroupBlock
                time={renderExtraTimeTitle}
                strings={stringsGroupOffer}
                data={renderDataGroupOffer}
                title={t("VIEW_OFFER_LABEL_CHART_BY_GROUP").toUpperCase()}
              />
            </Grid>
          </Grid>
        </PageContainer>
      )}
    </Layout>
  );
};
export default React.memo(Overview);
