import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
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
import { TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW } from '../../contants/localStorage';
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByProjectID, loadSummaryProject } from "../../redux/actions";
import Content from "./Content";
import { getFirstSummaryProject, getSummaryByProjectAndKeyword } from "./selector";

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
    const { listMenu, timeRange = {}, setTitle, timeType, setTimeType } = useContext(OfferPageContext);
    const idFirstProject = useSelector(state => getFirstSummaryProject(state));
    const listProjects = useSelector(state => getSummaryByProjectAndKeyword('')(state));
    const isMounted = useMountedState();
    const history = useHistory();
    const { id } = useParams();
    const [layoutTitle, setLayoutTitle] = useState("");
    const [timeFilterTypeOfferByProject, storeTimeFilterTypeOfferByProject] = useLocalStorage(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, { timeType: 1 });

    useEffect(() => {
        if (isMounted) {
            setTimeType(timeFilterTypeOfferByProject.timeType);
        }
    }, [isMounted]);

    useEffect(() => {
        if (isMounted) {
            storeTimeFilterTypeOfferByProject({
                ...timeFilterTypeOfferByProject,
                timeType
            });
        }
    }, [isMounted, timeType]);


    useEffect(() => {
        if (!isNil(id)) {
            const startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
            const endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
            dispatch(loadOfferByProjectID({ id, startDate, endDate }))
        }
    }, [dispatch, id, timeRange]);

    useEffect(() => {
        setTitle(t("VIEW_OFFER_LABEL_PROJECT_SUBTITLE"))
    }, [dispatch, setTitle]);

    useEffect(() => {
        dispatch(loadSummaryProject())
    }, [dispatch]);

    useEffect(() => {
        if (isMounted) {
            var currentProject = null;
            forEach(listProjects, item => {
                var projects = get(item, 'projects');
                currentProject = filter(projects, project => get(project, 'id') === id);
                if (currentProject.length !== 0) {
                    setLayoutTitle(get(currentProject, '[0].name'));
                    return;
                }
            });
        }
    }, [isMounted, history.location.pathname, idFirstProject]);

    useEffect(() => {
        if (history.location.pathname !== Routes.OFFERBYPROJECT
            || idFirstProject === undefined
            || idFirstProject === null) {
            return
        }
        history.push(Routes.OFFERBYPROJECT + "/" + idFirstProject);
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