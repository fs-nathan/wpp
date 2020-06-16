import React from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import {
    Radio,
    FormControlLabel,
  Box,
  IconButton
  } from '@material-ui/core';
import Icon from '@mdi/react';
import CloseIcon from "@material-ui/icons/Close";
import { mdiCalendar} from '@mdi/js';
import { changeVisibleConfigGantt } from '../../../actions/system/system'
import { changeTimelineColor, changeInstanceGird } from '../../../actions/gantt'
import { Scrollbars } from 'react-custom-scrollbars';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";

const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const TimeUnitConfig = ({changeInstanceGird, height,state, type, changeVisibleConfigGantt, girdType }) => {
    const handleOnChange = (e) => {
      changeInstanceGird(e.target.value)
    }
    return (
        <Drawer
        closable={false}
          title={ <div style={{flexDirection: 'row'}} className="comp_QuickViewWrapper">
            <div className="comp_QuickViewHeaderLeft">
          <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
          <Icon
            className="comp_QuickViewFilter__headerIcon"
            path={mdiCalendar}
          ></Icon>
          <Box className="comp_QuickViewFilter__headerTitle">
            TIẾN ĐỘ
          </Box>
        </Box>
        </div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton >
            <CloseIcon onClick={() =>changeVisibleConfigGantt(false,'')}/>
          </IconButton>
        </div>
        </div>
        }
          placement="right"
          mask={false}
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
          <div className="config--drawer--checkbox-section gantt--time-unit__label-container">
            <div className="">
          <FormControlLabel
            value={'HOUR'}
            control={<Radio color="primary" />}
            label={"Giờ"}
            onChange={handleOnChange}
            checked={girdType === 'HOUR'}
            
          />
            </div><div className="">
          <FormControlLabel
            value={'DAY'}
            control={<Radio color="primary" />}
            label={"Ngày"}
            onChange={handleOnChange}
            checked={girdType === 'DAY'}
          />
          <div className="">
           <FormControlLabel
            value={'WEEK'}
            control={<Radio color="primary" />}
            label={"Tuần"}
            onChange={handleOnChange}
            checked={girdType === 'WEEK'}
          />
          </div>
          </div><div className="">
           <FormControlLabel
            value={'MONTH'}
            control={<Radio color="primary" />}
            label={"Tháng"}
            onChange={handleOnChange}
            checked={girdType === 'MONTH'}
          />
          </div><div className="">
           <FormControlLabel
            value={'QUARTER'}
            control={<Radio color="primary" />}
            label={"Quý"}
            onChange={handleOnChange}
            checked={girdType === 'QUARTER'}
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
  girdType: state.gantt.girdType,
})

const mapDispatchToProps = {
    changeVisibleConfigGantt,
    changeInstanceGird
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeUnitConfig)