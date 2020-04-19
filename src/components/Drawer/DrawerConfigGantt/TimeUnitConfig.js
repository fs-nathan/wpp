import React from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import {
    Radio,
    FormControlLabel,
  } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  Box
} from "@material-ui/core";
import { mdiCalendar} from '@mdi/js';
import { changeVisibleConfigGantt } from '../../../actions/system/system'
import { changeTimelineColor } from '../../../actions/gantt'
import { Scrollbars } from 'react-custom-scrollbars';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";

const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const CommonConfig = ({ height,state, type, changeVisibleConfigGantt, timelineColor, changeTimelineColor }) => {
    return (
        <Drawer
          title={ <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
          <Icon
            className="comp_QuickViewFilter__headerIcon"
            path={mdiCalendar}
          ></Icon>
          <Box className="comp_QuickViewFilter__headerTitle">
            TIẾN ĐỘ
          </Box>
        </Box>}
          placement="right"
          closable={true}
          mask={false}
          onClose={() => {
            changeVisibleConfigGantt(false, '')}}
          visible={state && type === 'TIME'}
          width={400}
          style={{height, top: `calc(100vh - ${height}px`}}
        >
           <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={'tail'}
        >
          <p className="config--drawer--section">THIẾT LÂP TRỤC THỜI GIAN</p>
          <p className="config--drawer--title">Lựa chọn trục thời gian cho sơ đồ gantt</p>
          <div className="config--drawer--checkbox-section">
            <div className="">
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label={"Ngày"}
            checked={true}
          />
            </div><div className="">
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label={"Tuần"}
            checked={true}
          />
          </div><div className="">
           <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label={"Tháng"}
            checked={true}
          />
          </div><div className="">
           <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label={"Quý"}
            checked={true}
          />
          </div><div className="">
           <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label={"Năm"}
            checked={true}
          />
          </div>
          </div>
          </StyledScrollbarsSide>
        </Drawer>
    )
}

const mapStateToProps = state => ({
  state: state.system.ganttConfig.state,
  type: state.system.ganttConfig.type,
  timelineColor: state.gantt.timelineColor,
})

const mapDispatchToProps = {
    changeVisibleConfigGantt,
    changeTimelineColor
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonConfig)