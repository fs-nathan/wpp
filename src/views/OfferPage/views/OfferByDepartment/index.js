import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import { useLocalStorage } from "hooks";
import { get, isNil } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { DELETE_OFFER_SUCCESSFULLY, HANDLE_OFFER_OFFERPAGE, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS } from "views/OfferPage/redux/types";
import { TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW } from '../../contants/localStorage';
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
  max-width: 100%;
`;

function Department({
    doListOffersByDepartment,
    doListOffersByDepartmentID,
    idFirstGroup, departments
}) {
    const { t } = useTranslation();
    const history = useHistory();
    const {
        listMenu,
        timeType,
        setTimeType,
        timeRange,
        setTitle
    } = useContext(OfferPageContext);

    const { id } = useParams();
    const isMounted = useMountedState();
    const [layoutTitle, setLayoutTitle] = useState('');
    const [timeFilterTypeOfferByDepartment, storeTimeFilterTypeOfferByDepartment] = useLocalStorage(TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW, { timeType: 1 });

    useEffect(() => {
        if (isMounted) {
            setTitle(t("VIEW_OFFER_LABEL_DEPARTMENT_SUBTITLE"));
        }
    }, [isMounted, setTitle, t]);

    useEffect(() => {
        if (isMounted) {
            setTimeType(timeFilterTypeOfferByDepartment.timeType);
        }
    }, [isMounted]);

    useEffect(() => {
        if (isMounted) {
            storeTimeFilterTypeOfferByDepartment({
                ...timeFilterTypeOfferByDepartment,
                timeType
            });
        }
    }, [isMounted, timeType]);

    useEffect(() => {
        doListOffersByDepartment({ timeRange });
    }, [timeRange]);

    useEffect(() => {
        if (isMounted) {
            let currentDepartment = departments.filter(item => item.url === history.location.pathname);
            setLayoutTitle(get(currentDepartment, '[0].title'));
        }
    }, [isMounted, history.location.pathname, idFirstGroup]);

    useEffect(() => {
        if (idFirstGroup !== null) {
            history.push(Routes.OFFERBYDEPARTMENT + "/" + idFirstGroup);
        }
    }, [idFirstGroup]);

    useEffect(() => {
        if (!isNil(id)) {
            const startDate = moment(timeRange.startDate).format("YYYY-MM-DD");
            const endDate = moment(timeRange.endDate).format("YYYY-MM-DD");
            doListOffersByDepartmentID({ id, startDate, endDate });

            const refreshData = () => {
                doListOffersByDepartmentID({ id, startDate, endDate });
                doListOffersByDepartment({ timeRange });
            }

            const refreshOffersList = () => {
                doListOffersByDepartmentID({ id, startDate, endDate });
            }

            CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshData);
            CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshData);
            CustomEventListener(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshOffersList);
            return () => {
                CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshData);
                CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshData);
                CustomEventDispose(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshOffersList);
            }
        }
    }, [id, timeRange]);
    // Redirect to first group when enter
    return (
        <>
            <Layout
                title={
                    <Box display="flex" alignItems="center">
                        <Icon
                            size={1.4}
                            {...{ color: listMenu[4].color, path: listMenu[4].icon }}
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
            </Layout>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        doListOffersByDepartment: ({ timeRange }) => dispatch(loadOfferByDepartment({ timeRange })),
        doListOffersByDepartmentID: ({ id, startDate, endDate }) => dispatch(loadOfferByDepartmentID({ id, startDate, endDate }))
    };
};

const mapStateToProps = state => {
    return {
        idFirstGroup: getFirstSummaryGroup(state),
        departments: getDepartmentGroupByKeyword('')(state)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
