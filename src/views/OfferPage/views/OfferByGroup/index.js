import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import { useLocalStorage } from "hooks";
import { findIndex, get, isNil, last } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "views/OfferPage/contants/routes";
import { CREATE_OFFER_SUCCESSFULLY, DELETE_APPROVAL_SUCCESS, DELETE_OFFER_SUCCESSFULLY, HANDLE_OFFER_OFFERPAGE, SORT_GROUP_OFFER_SUCCESS, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, ADD_MEMBER_MONITOR_SUCCESS, DELETE_MEMBER_MONITOR_SUCCESS, UPDATE_OFFER_SUCCESS } from "views/OfferPage/redux/types";
import { action } from "../../contants/attrs";
import { TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW_CUSTOM} from '../../contants/localStorage';
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByGroupID, loadSummaryByGroup, sortOfferGroup } from "../../redux/actions";
import Content from "./Content";
import FormDialog from "./modal";
import { getFirstSummaryGroup, getGroupOfferList, getSummaryByGroupByKeyword } from "./selector";
import {getValueInLocalStorage} from '../../utils';

export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
  max-width: 100%;
`;

const OfferByGroup = props => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [layoutTitle, setLayoutTitle] = useState("");

  const {
    listMenu,
    setOpenModalOfferByGroup,
    openModalOfferByGroup,
    timeType,
    setTimeType,
    timeRange,
    setTitle,
    onDraggEnd,
    setFilterTab,
    setTimeRange
  } = useContext(OfferPageContext);

  const idFirstGroup = useSelector(state => getFirstSummaryGroup(state));
  const groupList = useSelector(state => getSummaryByGroupByKeyword('', false, t)(state));
  const groupOfferList = useSelector(state => getGroupOfferList(state));
  const createOfferSuccess = useSelector(state => state.offerPage[CREATE_OFFER_SUCCESSFULLY])
  const { id } = useParams();
  const isMounted = useMountedState();
  const [timeFilterTypeOfferByGroup, storeTimeFilterTypeOfferByGroup] = useLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, { timeType: 1 });
  const searchParams = useLocation().search;
  const [syncTimeType, setSyncTimeType] = useState(false)

  useEffect(() => {
    if (isMounted) {
      setTitle(t("VIEW_OFFER_LABEL_GROUP_SUBTITLE"))
    }
  }, [isMounted, setTitle, t]);

  useEffect(() => {
    const timeTypeStored = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType');
    setTimeType(timeTypeStored);
    setSyncTimeType(true)
    if (timeTypeStored === 6) {
      const timeRangeStored = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW_CUSTOM, null)
      const timeRangeSetState = timeRangeStored ? timeRangeStored : {
        startDate: null,
        endDate: null
      }
      setTimeRange(timeRangeSetState)
    }
  }, []);

  useEffect(() => {
    if (syncTimeType) {
      setTimeType(timeType);
      window.localStorage.setItem(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, JSON.stringify({timeType}))
      if (timeType === 6) {
        window.localStorage.setItem(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW_CUSTOM, JSON.stringify(timeRange))
      }
    }
  }, [timeRange]);

  useEffect(() => {
    if (isMounted) {
      let currentGroup = groupList.filter(group => group.url === history.location.pathname);
      setLayoutTitle(get(currentGroup, '[0].title'));
    }
  }, [isMounted, history.location.pathname, groupList]);

  useEffect(() => {
    if (syncTimeType) {
      const startDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
      const endDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
      dispatch(loadSummaryByGroup({startDate, endDate}));
      const refreshSummaryByGroup = () => {
        setFilterTab("");
        dispatch(loadSummaryByGroup({startDate, endDate}));
      }
      CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshSummaryByGroup);
      CustomEventListener(SORT_GROUP_OFFER_SUCCESS, refreshSummaryByGroup);
      return () => {
        CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshSummaryByGroup);
        CustomEventDispose(SORT_GROUP_OFFER_SUCCESS, refreshSummaryByGroup);
      }
    }
  }, [dispatch, timeRange, syncTimeType]);

  useEffect(() => {
    if (idFirstGroup && !id) {
      history.push(Routes.OFFERBYGROUP + "/" + idFirstGroup);
    }
  }, [history, idFirstGroup]);

  useEffect(() => {
    let urlSearchParams = new URLSearchParams(searchParams);
    const referrer = urlSearchParams.get("referrer");
    if (!isNil(referrer) && !isNil(id)) {
      history.push(Routes.OFFERBYGROUP + "/" + id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isNil(id) && syncTimeType) {
      const startDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
      const endDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
      dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      document.getElementsByClassName("comp_LeftSideContainer___container ")[0].click();
    }
  }, [dispatch, id, timeRange, syncTimeType]);

  useEffect(() => {
    const refreshAfterCreateOffer = () => {
      const startDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
      const endDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
      dispatch(loadSummaryByGroup({startDate, endDate}));
      dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      // if (createOfferSuccess.offer_group_id === id) {
      //   dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      // }
    }
    CustomEventListener(CREATE_OFFER_SUCCESSFULLY, refreshAfterCreateOffer);
    return () => {
      CustomEventDispose(CREATE_OFFER_SUCCESSFULLY, refreshAfterCreateOffer);
    }
  }, [createOfferSuccess, id, timeRange]);

  useEffect(() => {
    if (isMounted) {
      const refreshListOffers = () => {
        const startDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
        const endDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
        dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      }
      CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshListOffers);
      CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshListOffers);
      CustomEventListener(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshListOffers);
      CustomEventListener(ADD_MEMBER_MONITOR_SUCCESS, refreshListOffers);
      CustomEventListener(DELETE_MEMBER_MONITOR_SUCCESS, refreshListOffers);
      CustomEventListener(UPDATE_OFFER_SUCCESS, refreshListOffers);
      return () => {
        CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshListOffers);
        CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshListOffers);
        CustomEventDispose(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshListOffers);
        CustomEventDispose(ADD_MEMBER_MONITOR_SUCCESS, refreshListOffers);
        CustomEventDispose(DELETE_MEMBER_MONITOR_SUCCESS, refreshListOffers);
        CustomEventDispose(UPDATE_OFFER_SUCCESS, refreshListOffers);
      }
    }
  }, [isMounted, timeRange, id]);

  useEffect(() => {
    if (isMounted) {
      if (onDraggEnd.source !== null && onDraggEnd.destination !== null) {
        const id = last(onDraggEnd.id.split("/"));
        const groupSource = get(groupList, `[${onDraggEnd.destination.index}]`);
        const originalIndex = findIndex(groupOfferList, (group) => groupSource.url.includes(group.id));
        dispatch(sortOfferGroup({ group_offer_id: id, position: originalIndex }));
      }
    }
  }, [dispatch, isMounted, onDraggEnd]);

  // Redirect to first group when enter
  return (
    <>
      <Layout
        title={
          <Box display="flex" alignItems="center">
            <Icon
              size={1.4}
              {...{ color: listMenu[2].color, path: listMenu[2].icon }}
            />
            <Box
              {...{
                paddingLeft: "20px",
                fontSize: "21px",
                lineHeight: "1",
                fontWeight: "600"
              }}
            >
              {layoutTitle}
            </Box>
          </Box>
        }
      >
        <PageContainer>
          <Content />
        </PageContainer>
        <FormDialog
          type={action.CREATE_OFFER}
          open={openModalOfferByGroup}
          setOpen={setOpenModalOfferByGroup}
        />,
      </Layout>
    </>
  );
};

export default React.memo(OfferByGroup);
