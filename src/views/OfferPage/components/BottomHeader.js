import { Grid, makeStyles } from "@material-ui/core";
import { mdiSquare } from "@mdi/js";
import Icon from "@mdi/react";
import { get } from 'lodash';
import React, { Fragment } from 'react';
import styled from "styled-components";
import { colors } from '../contants/attrs';
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
    orange: {
        color: colors.offer_status_waiting
    },
    red: {
        color: colors.offer_status_cancel
    },
    green: {
        color: colors.offer_status_approved
    },
    blue: {
        color: "#03a9f4"
    }
}));
const BottomHeader = ({ statistic_status, count }) => {
    const classes = useStyles()
    const series = [get(statistic_status, "waiting_rate"), get(statistic_status, "accepted_rate"), get(statistic_status, "approving_rate"), get(statistic_status, "rejected_rate")]
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
                        Đề xuất
                    </CountItem2>
                </Count>
                <Filter>
                    <FilterRow1>
                        <div>
                            <IconWrap item >
                                {/* #ff9800 */}
                                <Icon path={mdiSquare} size={1} className={classes.green} />
                                <div>Chờ duyệt ({get(statistic_status, "waiting_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            <IconWrap item >
                                <Icon path={mdiSquare} size={1} className={classes.orange} />
                                <div >Đã duyệt ({get(statistic_status, "accepted_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            {/* #f44336 */}
                            <IconWrap item >
                                <Icon path={mdiSquare} size={1} className={classes.blue} />
                                <div >Đang duyệt ({get(statistic_status, "approving_rate")}%)</div>
                            </IconWrap>
                        </div>
                        <div>
                            {/* #f44336 */}
                            <IconWrap item >
                                <Icon path={mdiSquare} size={1} className={classes.red} />
                                <div >Từ chối ({get(statistic_status, "rejected_rate")}%)</div>
                            </IconWrap>
                        </div>
                    </FilterRow1>
                    <FilterRow2>
                        <FilterRow2Item>
                            Vai trò: Tất cả
                        </FilterRow2Item>
                        <FilterRow2Item>
                            Mức độ ưu tiên: Tất cả
                        </FilterRow2Item>
                        <FilterRow2Last>
                            Trạng thái: Tất cả
                        </FilterRow2Last>
                    </FilterRow2>
                </Filter>
            </Header>

        </Fragment>
    )
}

export default BottomHeader;