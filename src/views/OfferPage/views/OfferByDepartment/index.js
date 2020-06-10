import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { get } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "../../contants/routes";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByDepartment, loadOfferByDepartmentID } from "../../redux/actions";
import Content from "./Content";
import { getDepartmentGroupByKeyword, getFirstSummaryGroup } from "./selector";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const Department = props => {
    const { t } = useTranslation();
    const context = useContext(OfferPageContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        keyword,
        listMenu,
        timeRange,
        statusFilter,
        setTitle
    } = useContext(OfferPageContext);
    const idFirstGroup = useSelector(state => getFirstSummaryGroup(state));
    const departments = useSelector(state => getDepartmentGroupByKeyword('')(state));
    const { id } = useParams();
    const isMounted = useMountedState();
    const [layoutTitle, setLayoutTitle] = useState('');

    useEffect(() => {
        if (isMounted) {
            setTitle(t("VIEW_OFFER_LABEL_DEPARTMENT_SUBTITLE"));
        }
    }, [
        dispatch,
        isMounted,
        timeRange.startDate,
        timeRange.endDate,
        statusFilter,
        context,
        setTitle,
        timeRange
    ]);

    useEffect(() => {
        dispatch(loadOfferByDepartment());
    }, [dispatch]);
    useEffect(() => {
        if (isMounted) {
            var currentDepartment = departments.filter(item => item.url === history.location.pathname);
            setLayoutTitle(get(currentDepartment, '[0].title'));
        }
    }, [isMounted, history.location.pathname, idFirstGroup]);

    useEffect(() => {
        if (
            idFirstGroup !== null &&
            window.location.pathname === Routes.OFFERBYDEPARTMENT
        ) {
            history.push(Routes.OFFERBYDEPARTMENT + "/" + idFirstGroup);
        }
    }, [history, idFirstGroup]);

    useEffect(() => {
        const startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
        const endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
        dispatch(loadOfferByDepartmentID({ id, startDate, endDate }));
    }, [dispatch, id, timeRange]);
    // Redirect to first group when enter
    return (
        <>
            <Layout
                title={
                    <Box display="flex" alignItems="center">
                        <Icon
                            size={1.4}
                            {...{ color: listMenu[4].color, path: listMenu[4].icon }}
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
            </Layout>
        </>
    );
};
export default React.memo(Department);
