import React from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import {
    TextField,
    Button,
    ButtonGroup
  } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  Box
} from "@material-ui/core";
import { mdiCalendar} from '@mdi/js';
import { changeVisibleExportPdfDrawer } from '../../../actions/system/system'
import { changeTimelineColor } from '../../../actions/gantt'
import { Scrollbars } from 'react-custom-scrollbars';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";
import "./drawerpdf.css";
const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const ExportPDF = ({ height,exportPdfDrawerVisible, type, changeVisibleExportPdfDrawer, timelineColor, changeTimelineColor }) => {
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
            changeVisibleExportPdfDrawer(false)}}
          visible={exportPdfDrawerVisible}
          width={400}
          style={{height, top: `calc(100vh - ${height}px`}}
          footer={ <div className="config--drawer--footer-section">
          <Button style={{backgroundColor:"#e3e3e3", borderRadius: 0, color: "#b9b9b9"}} fullWidth>Xem trước</Button>
          <Button style={{backgroundColor:"#619eff",borderRadius: 0, color: "#fff"}} fullWidth>Hoàn thành</Button>
                  </div>}
        >
           <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={'tail'}
        >
          <p className="config--drawer--section config--drawer--section-subtitle">THIẾT LÂP TRỤC THỜI GIAN <span style={{color: 'blue'}}>Xem mẫu</span></p>
          <div className="config--drawer--checkbox-section">
              <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 1" variant="outlined" />
          </div>
          <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 2" variant="outlined" />
          </div>
          <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 3" variant="outlined" />
          </div>
          <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 4" variant="outlined" />
          </div>
          <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 5" variant="outlined" />
          </div>
          <div className="export-pdf--input">
          <TextField fullWidth size="small" label="Nội dung 6" variant="outlined" />
          </div>
          </div>
          <p className="config--drawer--section config--drawer--section-subtitle">Khổ giấy <span style={{color: '#b9b9b9'}}>Tự động</span></p>
          <div className="config--drawer--checkbox-section"></div>
         
          </StyledScrollbarsSide>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    exportPdfDrawerVisible: state.system.exportPdfDrawerVisible
})

const mapDispatchToProps = {
    changeVisibleExportPdfDrawer,
}
export default connect(mapStateToProps, mapDispatchToProps)(ExportPDF)