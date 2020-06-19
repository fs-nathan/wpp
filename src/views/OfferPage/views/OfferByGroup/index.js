import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import { useLocalStorage } from "hooks";
import { get, isNil } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "views/OfferPage/contants/routes";
import { CREATE_OFFER_SUCCESSFULLY, DELETE_APPROVAL_SUCCESS, DELETE_OFFER_SUCCESSFULLY } from "views/OfferPage/redux/types";
import { action } from "../../contants/attrs";
import { TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW } from '../../contants/localStorage';
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByGroupID, loadSummaryByGroup } from "../../redux/actions";
import Content from "./Content";
import FormDialog from "./modal";
import { getFirstSummaryGroup, getSummaryByGroupByKeyword } from "./selector";

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
    setTitle
  } = useContext(OfferPageContext);

  const idFirstGroup = useSelector(state => getFirstSummaryGroup(state));
  const groupList = useSelector(state => getSummaryByGroupByKeyword('', false, t)(state));
  const createOfferSuccess = useSelector(state => state.offerPage[CREATE_OFFER_SUCCESSFULLY])
  const { id } = useParams();
  const isMounted = useMountedState();
  const [timeFilterTypeOfferByGroup, storeTimeFilterTypeOfferByGroup] = useLocalStorage(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, { timeType: 1 });
  const searchParams = useLocation().search;

  useEffect(() => {
    if (isMounted) {
      setTitle(t("VIEW_OFFER_LABEL_GROUP_SUBTITLE"))
    }
  }, [isMounted, setTitle, t]);

  useEffect(() => {
    if (isMounted) {
      setTimeType(timeFilterTypeOfferByGroup.timeType);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      storeTimeFilterTypeOfferByGroup({
        ...timeFilterTypeOfferByGroup,
        timeType
      });
    }
  }, [isMounted, timeType]);

  useEffect(() => {
    if (isMounted) {
      var currentGroup = groupList.filter(group => group.url === history.location.pathname);
      setLayoutTitle(get(currentGroup, '[0].title'));
    }
  }, [isMounted, history.location.pathname, groupList]);

  useEffect(() => {
    dispatch(loadSummaryByGroup());
    const refreshSummaryByGroup = () => {
      dispatch(loadSummaryByGroup());
    }
    CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshSummaryByGroup);
    return () => {
      CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshSummaryByGroup);
    }
  }, [dispatch]);

  useEffect(() => {
    if (idFirstGroup === undefined || idFirstGroup === null) {
      return
    }
    history.push(Routes.OFFERBYGROUP + "/" + idFirstGroup);
  }, [history, idFirstGroup]);

  useEffect(() => {
    let urlSearchParams = new URLSearchParams(searchParams);
    const referrer = urlSearchParams.get("referrer");
    if (!isNil(referrer) && !isNil(id)) {
      history.push(Routes.OFFERBYGROUP + "/" + id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isNil(id)) {
      const startDate = timeType !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
      const endDate = timeType !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
      dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      document.getElementsByClassName("comp_LeftSideContainer___container ")[0].click();
    }
  }, [dispatch, id, timeRange]);

  useEffect(() => {
    const refreshAfterCreateOffer = () => {
      const startDate = timeType !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
      const endDate = timeType !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
      dispatch(loadSummaryByGroup());
      if (createOfferSuccess.offer_group_id === id) {
        dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      }
    }
    CustomEventListener(CREATE_OFFER_SUCCESSFULLY, refreshAfterCreateOffer);
    return () => {
      CustomEventDispose(CREATE_OFFER_SUCCESSFULLY, refreshAfterCreateOffer);
      CustomEventDispose(DELETE_APPROVAL_SUCCESS, refreshAfterCreateOffer);
    }
  }, [createOfferSuccess, id, timeRange]);

  useEffect(() => {
    if (isMounted) {
      const refreshAfterCreateOffer = () => {
        const startDate = timeType !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
        const endDate = timeType !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
        dispatch(loadOfferByGroupID({ id, startDate, endDate }));
      }
      CustomEventListener(DELETE_APPROVAL_SUCCESS, refreshAfterCreateOffer);
      return () => {
        CustomEventDispose(DELETE_APPROVAL_SUCCESS, refreshAfterCreateOffer);
      }
    }
  }, [isMounted, timeRange, id]);


  // Redirect to first group when enter
  return (
    <>
      <Layout
        title={
          <Box display="flex" alignItems="center">
            <Icon
              size={1.4}
              {...{ color: listMenu[2].color, path: listMenu[2].icon }}
            ></Icon>
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
