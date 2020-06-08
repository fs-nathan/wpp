import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByProjectID, loadSummaryProject } from "../../redux/actions";
import Content from "./Content";
export const PageContainer = styled(Container)`
  overflow: auto;  
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const OfferByProject = () => {
    const { t } = useTranslation();
    const context = useContext(OfferPageContext)
    const dispatch = useDispatch();
    const { listMenu, timeRange = {}, statusFilter, setTitle } = useContext(OfferPageContext);
    const isMounted = useMountedState();
    const state = useSelector(state => state)
    const { id } = useParams()

    useEffect(() => {
        const startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
        const endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
        dispatch(loadOfferByProjectID({ id, startDate, endDate }))
    }, [dispatch, id, timeRange]);

    useEffect(() => {
        if (isMounted) {
            setTitle(t("VIEW_OFFER_LABEL_PROJECT_SUBTITLE"))
        }
    }, [dispatch, isMounted, timeRange.startDate, timeRange.endDate, statusFilter, context, setTitle]);

    useEffect(() => {
        dispatch(loadSummaryProject())
    }, [dispatch]);

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
                        {t(listMenu[3].title)}
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
