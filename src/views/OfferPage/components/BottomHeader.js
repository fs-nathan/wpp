import { Grid, makeStyles } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import { forEach, get } from 'lodash';
import React, { Fragment, useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { colors, labels } from '../contants/attrs';
import { OfferPageContext } from '../OfferPageContext';
import Chart from './Chart';

const IconWrap = styled(Grid)`
  line-height: 1;
  margin-right: 12px;
  margin-left: 20px;
  display:  flex;
  align-items: center;
  margin-left:0 !important;
`;
const Header = styled.div`
    display:flex !important;
    justify-content : start;
    align-items: center; 
`
const Filter = styled.div`
    display: flex;
    margin-left:2em;    
    flex-direction: column;
`
const FilterRow1 = styled.div`
display :flex;
height:26px;    
flex-direction: row;
`
const FilterRow2 = styled.div`
display:flex;
height:26px;    
flex-direction: row; 
align-items: flex-end;  
`
const FilterRow2Item = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    color: #998f8f;
    padding-right:0.5em;  
    margin-left:5px;
    border-right: 1px solid #998f8f;
`
const FilterRow2Last = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    margin-left:5px;
    color: #998f8f;
    padding-right:0.5em;  
`
const Count = styled.div`
    display:flex;
    margin-left:2em;
    flex-direction: column;
`
const CountItem1 = styled.div`
    color : #03a9f4;
    font-size: 2.6em;
    font-weight: bold;
    font-family: Roboto, sans-serif;
`
const CountItem2 = styled.div`
color : #03a9f4;
font-size: 1em;
font-weight: bold;
font-family: Roboto, sans-serif;
`

const useStyles = makeStyles(theme => ({
    waiting: {
        color: colors.offer_status_waiting,
        marginRight: '5px'
    },
    cancel: {
        color: colors.offer_status_cancel,
        marginRight: '5px'
    },
    approved: {
        color: colors.offer_status_approved,
        marginRight: '5px'
    },
    processing: {
        color: colors.offer_status_processing,
        marginRight: '5px'
    }
}));
const BottomHeader = ({ statistic_status, count }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const series = [get(statistic_status, "waiting_rate"), get(statistic_status, "accepted_rate"), get(statistic_status, "approving_rate"), get(statistic_status, "rejected_rate")]
    const isMounted = useMountedState();
    const {
        statusFilter
    } = useContext(OfferPageContext);
    const [filterData, setFilterData] = useState({
        role: [],
        priorityLevel: [],
        status: []
    });

    React.useEffect(() => {
        if (isMounted) {
            var role = [];
            var priorityLevel = [];
            var status = [];
            forEach(statusFilter, function (value, key) {
                if (["you_offer", "you_monitor", "you_handle"].includes(key) && value) {
                    role = role.concat(t(get(labels, key)));
                } else if (["normal", "urgent", "very_urgent"].includes(key) && value) {
                    priorityLevel = priorityLevel.concat(t(get(labels, key)));
                } else if (value) {
                    status = status.concat(t(get(labels, key)));
                }
            });
            setFilterData({ role, priorityLevel, status });
        }
    }, [isMounted, statusFilter]);

    return (
        <Fragment>
            <Header>
                <div className="bottom-header__chart">
                    <Chart series={series} />
                </div>
                <Count>
                    <CountItem1>
                        {count}
                    </CountItem1>
                    <CountItem2>
                        {t("VIEW_OFFER_LABEL_OFFER")}
                    </CountItem2>
                </Count>
                <Filter>
                    <FilterRow1>
                        <div>
                            <IconWrap item >
                                {/* #ff9800 */}
                                <Icon path={mdiSquare} size={0.8} className={classes.waiting} />
                                <div>{t("VIEW_OFFER_LABEL_PENDING")} ({get(statistic_status, "waiting_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            <IconWrap item >
                                <Icon path={mdiSquare} size={0.8} className={classes.approved} />
                                <div >{t("VIEW_OFFER_LABEL_APPROVED")} ({get(statistic_status, "accepted_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            {/* #f44336 */}
                            <IconWrap item >
                                <Icon path={mdiSquare} size={0.8} className={classes.processing} />
                                <div >{t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_2")} ({get(statistic_status, "approving_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            {/* #f44336 */}
                            <IconWrap item >
                                <Icon path={mdiSquare} size={0.8} className={classes.cancel} />
                                <div >{t("VIEW_OFFER_LABEL_REJECTED")} ({get(statistic_status, "rejected_rate")}%)</div>
                            </IconWrap>
                        </div>
                    </FilterRow1>
                    <FilterRow2>
                        {
                            filterData.role.length != 0 && (
                                <FilterRow2Item>
                                    {t("VIEW_OFFER_LABEL_ROLE")}:
                                    {
                                        filterData.role.length === 3 ? t("VIEW_OFFER_LABEL_ALL") : filterData.role.map((role, idx) => idx !== filterData.role.length - 1 ? <span>{role},</span> : <span>{role}</span>)
                                    }
                                </FilterRow2Item>
                            )
                        }
                        {
                            filterData.priorityLevel.length != 0 && (
                                <FilterRow2Item>
                                    {t("VIEW_OFFER_LABEL_PRIORITY_LEVEL")}: {
                                        filterData.priorityLevel.length === 3 ? t("VIEW_OFFER_LABEL_ALL") : filterData.priorityLevel.map((item, idx) => idx !== filterData.priorityLevel.length - 1 ? <span>{item},</span> : <span>{item}</span>)
                                    }
                                </FilterRow2Item>
                            )
                        }
                        {
                            filterData.status.length != 0 && (
                                <FilterRow2Last>
                                    {t("VIEW_OFFER_LABEL_STATUS")}: {
                                        filterData.status.length === 4 ? t("VIEW_OFFER_LABEL_ALL") : filterData.status.map((item, idx) => idx !== filterData.status.length - 1 ? <span>{item},</span> : <span>{item}</span>)
                                    }
                                </FilterRow2Last>
                            )
                        }
                    </FilterRow2>
                </Filter>
            </Header>

        </Fragment>
    )
}

export default BottomHeader;