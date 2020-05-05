import React, {useState , useEffect} from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import {
    TextField,
    Button,
    IconButton,
    Box, FormControl, Select, InputLabel
  } from '@material-ui/core';
  import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Icon from '@mdi/react';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from "@material-ui/icons/Close";
import { mdiFilePdf} from '@mdi/js';
import { changeVisibleExportPdfDrawer } from '../../../actions/system/system'
import {  changePreviewContent, changeRenderFullDay, changeFilterExportPdf } from '../../../actions/gantt'
import { Scrollbars } from 'react-custom-scrollbars';
import PreviewPdfModal from '../../PreviewModal'
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";
import "./drawerpdf.css";
import kendo from '@progress/kendo-ui'
const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const ExportPDF = ({ 
  height,
  exportPdfDrawerVisible,
  changeVisibleExportPdfDrawer,
  changePreviewContent,
  previewContent,
  changeRenderFullDay,
  changeFilterExportPdf
 }) => {
  const [showModalPreview, setShowModalPreview ] = useState(false)
  const [contentPreview, setContentPreview ] = useState([])
  const [srcPreview, setSrcPreview ] = useState([])
  const [showFullTime, setShowFullTime ] = useState(1)
  const [startTime, setStartTime ] = useState(Date.now())
  const [endTime, setEndTime ] = useState(Date.now())

  useEffect(() =>{
    setContentPreview(previewContent)
  })
  const handleChangePreviewPdf = (e) => {
    const newContentPreview = [...contentPreview]
    newContentPreview[e.target.name] = e.target.value
    setContentPreview(newContentPreview)
    changePreviewContent(newContentPreview)
  }
  const handleShowModalPreview = () => {
    if(showModalPreview) {
      changeRenderFullDay(false)
      changeFilterExportPdf(null, null)
    }
    setShowModalPreview(!showModalPreview)
  }
  const callBackPreview = dataUrl => {
    setShowModalPreview(true)
    setSrcPreview(dataUrl)
  }
  const handleOnClickPreview = () => {
    changePreviewContent(contentPreview)
    changeRenderFullDay(true)
    if(!showFullTime){
      changeFilterExportPdf(startTime, endTime)
    }
    setTimeout(() => window.getDataUrlPdf(kendo, 'previewPdf.pdf', callBackPreview), 2000)
  }
  const handleOnClickOk = () => {
    changePreviewContent(contentPreview)
    window.convertToPdfFullWidth(kendo, 'previewPdf.pdf')
  }
  const handleShowFullTime = (e) => {
    setShowFullTime(parseInt(e.target.value))}
  const handleChangeStartTime = value => {
    setStartTime(value)
  }
  const handleChangeEndTime = value => {
    setEndTime(value)
  }
  const renderInput = () => {
    let inputs = []
    for(let i =0; i< 6; i++){
      inputs.push(
        <div className="export-pdf--input">
        <TextField defaultValue={previewContent[i]} onChange={handleChangePreviewPdf} fullWidth name={i} size="small" label={`Nội dung ${i +1}`} variant="outlined" />
        </div>
      )
    }
    return inputs
  }
  const renderShowDatePicker = (show) => {
    console.log(show)
    if(!show) return null
    return  <div className="export-pdf--drawer__date-wrapper">
    <div className="export-pdf--drawer__date-picker">
      <div>Từ ngày</div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker 
            disableToolbar
            onChange={handleChangeStartTime}
            value={startTime}
            inputVariant="outlined"
            variant="inline"
            ampm={false}
            format="dd/MM/yyyy"
          />
    </MuiPickersUtilsProvider>
    </div>
    <div className="export-pdf--drawer__date-picker">
    <div>Đến ngày</div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker 
            disableToolbar
            inputVariant="outlined"
            variant="inline"
            onChange={handleChangeEndTime}
            value={endTime}
            ampm={false}
            format="dd/MM/yyyy"
          />
    </MuiPickersUtilsProvider>
    </div>
    </div>
  } 
    return (
      <React.Fragment>
        <Drawer
        closable={false}
          title={ <div style={{flexDirection: 'row'}} className="comp_QuickViewWrapper">
            <div className="comp_QuickViewHeaderLeft">
          <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
          <Icon
            className="comp_QuickViewFilter__headerIcon"
            path={mdiFilePdf}
          ></Icon>
          <Box className="comp_QuickViewFilter__headerTitle">
            XUẤT FILE PDF
          </Box>
        </Box>
        </div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton >
            <CloseIcon onClick={() =>changeVisibleExportPdfDrawer(false)}/>
          </IconButton>
        </div>
        </div>
        }
          placement="right"
          closable={false}
          mask={false}
          visible={exportPdfDrawerVisible}
          width={400}
          style={{height, top: `calc(100vh - ${height}px`}}
          footer={ <div className="config--drawer--footer-section">
          <Button onClick={handleOnClickPreview} style={{backgroundColor:"#e3e3e3", borderRadius: 0, color: "#b9b9b9"}} fullWidth>Xem trước</Button>
          <Button onClick={handleOnClickOk} style={{backgroundColor:"#619eff",borderRadius: 0, color: "#fff"}} fullWidth>Hoàn thành</Button>
                  </div>}
        >
           <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={'tail'}
        >
          <div className="export-pdf--drawer__container">
          <p className="config--drawer--section config--drawer--section-subtitle">THIẾT LÂP TRỤC THỜI GIAN <span style={{color: 'blue'}}>Xem mẫu</span></p>
          <div className="config--drawer--checkbox-section">
              {renderInput()}
          </div>
          <p className="config--drawer--section config--drawer--section-subtitle">Khổ giấy <span style={{color: '#b9b9b9'}}>Tự động</span></p>
          <div className="config--drawer--checkbox-section"></div>
          <p className="config--drawer--section config--drawer--section-subtitle">THỜI GIAN</p>
          <div className="config--drawer--checkbox-section">
          <FormControl size="small" variant="outlined" >
        <InputLabel htmlFor="outlined-filter-native-simple"></InputLabel>
        <Select
          native
          defaultValue={showFullTime}
          onChange={handleShowFullTime}
          inputProps={{
            id: 'outlined-filter-native-simple',
          }}
        >
          <option value={1}>Toàn bộ thời gian</option>
          <option value={0}>Tùy chỉnh</option>
        </Select>
        </FormControl>
          </div>
          {renderShowDatePicker(!showFullTime)}
          </div>
          </StyledScrollbarsSide>
        </Drawer>
        <PreviewPdfModal srcPreview={srcPreview} open={showModalPreview} setOpen={handleShowModalPreview} title={'Sản xuất phim "Sống chung với mẹ chồng"'}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    exportPdfDrawerVisible: state.system.exportPdfDrawerVisible,
    previewContent: state.gantt.previewContent
})

const mapDispatchToProps = {
    changeVisibleExportPdfDrawer,
    changePreviewContent,
    changeRenderFullDay,
    changeFilterExportPdf
}
export default connect(mapStateToProps, mapDispatchToProps)(ExportPDF)