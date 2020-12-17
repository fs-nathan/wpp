import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import { useLocalStorage } from "hooks";
import { filter, forEach, get, isNil } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "views/OfferPage/contants/routes";
import { DELETE_OFFER_SUCCESSFULLY, HANDLE_OFFER_OFFERPAGE, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, ADD_MEMBER_MONITOR_SUCCESS, DELETE_MEMBER_MONITOR_SUCCESS } from "views/OfferPage/redux/types";
import { TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW_CUSTOM } from '../../contants/localStorage';
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByProjectID, loadSummaryProject } from "../../redux/actions";
import Content from "./Content";
import { getFirstSummaryProject, getSummaryByProjectAndKeyword } from "./selector";
import {getValueInLocalStorage} from '../../utils';

export const PageContainer = styled(Container)`
  overflow: auto;  
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
  max-width: 100%;
`;

const OfferByProject = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { listMenu, timeRange = {}, setTitle, timeType, setTimeType, setTimeRange } = useContext(OfferPageContext);
    const idFirstProject = useSelector(state => getFirstSummaryProject(state));
    const listProjects = useSelector(state => getSummaryByProjectAndKeyword('')(state));
    const isMounted = useMountedState();
    const history = useHistory();
    const { id } = useParams();
    const [layoutTitle, setLayoutTitle] = useState("");
    const [timeFilterTypeOfferByProject, storeTimeFilterTypeOfferByProject] = useLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, { timeType: 1 });
    const [syncTimeType, setSyncTimeType] = useState(false)

    useEffect(() => {
        const timeTypeStored = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, 1, 'timeType')
        setTimeType(timeTypeStored);
        setSyncTimeType(true)
        if (timeTypeStored === 6) {
            const timeRangeStored = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW_CUSTOM, null)
            console.log(timeRangeStored)
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
            window.localStorage.setItem(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, JSON.stringify({timeType}))
            if (timeType === 6) {
                window.localStorage.setItem(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW_CUSTOM, JSON.stringify(timeRange))
            }
        }
    }, [timeRange]);

    useEffect(() => {
        if (!isNil(id) && syncTimeType) {
            const startDate =  getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
            const endDate =  getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
            dispatch(loadOfferByProjectID({ id, startDate, endDate }));
            const refreshListOffers = () => {
                dispatch(loadOfferByProjectID({ id, startDate, endDate }));
            }
            CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshListOffers);
            CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshListOffers);
            CustomEventListener(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshListOffers);
            CustomEventListener(ADD_MEMBER_MONITOR_SUCCESS, refreshListOffers);
            CustomEventListener(DELETE_MEMBER_MONITOR_SUCCESS, refreshListOffers);
            return () => {
                CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshListOffers);
                CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshListOffers);
                CustomEventDispose(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshListOffers);
                CustomEventDispose(ADD_MEMBER_MONITOR_SUCCESS, refreshListOffers);
                CustomEventDispose(DELETE_MEMBER_MONITOR_SUCCESS, refreshListOffers);
            }
        }
    }, [dispatch, id, timeRange, syncTimeType]);

    useEffect(() => {
        setTitle(t("VIEW_OFFER_LABEL_PROJECT_HEADER_TITLE"))
    }, [dispatch, setTitle]);

    useEffect(() => {
        if (syncTimeType) {
            const startDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.startDate).format("YYYY-MM-DD") : null;
            const endDate = getValueInLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, 1, 'timeType') !== 5 ? moment(timeRange.endDate).format("YYYY-MM-DD") : null;
            dispatch(loadSummaryProject({startDate, endDate}));
        }
    }, [dispatch, timeRange, syncTimeType]);

    useEffect(() => {
        if (isMounted) {
            let currentProject = null;
            forEach(listProjects, item => {
                let projects = get(item, 'projects');
                currentProject = filter(projects, project => get(project, 'id') === id);
                if (currentProject.length !== 0) {
                    setLayoutTitle(get(currentProject, '[0].name'));
                    return;
                }
            });
        }
    }, [isMounted, history.location.pathname, idFirstProject]);

    useEffect(() => {
        if (idFirstProject && !id) {
            history.push(Routes.OFFERBYPROJECT + "/" + idFirstProject);
        }
    }, [history, idFirstProject]);

    return (
        <Layout
            title={
                <Box display="flex" alignItems="center">
                    <Icon
                        size={1.4}
                        {...{ color: listMenu[3].color, path: listMenu[3].icon }}
                    ></Icon>
                    <Box
                        {...{
                            paddingLeft: "20px",
                            fontSize: "21px",
                            lineHeight: "1",
                            fontWeight: "600",
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
        </Layout>
    );
};
export default React.memo(OfferByProject);