import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, FormControl, IconButton, InputLabel, Select, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { mdiFilePdf } from "@mdi/js";
import Icon from "@mdi/react";
import kendo from "@progress/kendo-ui";
import { Drawer } from "antd";
import { apiService } from "constants/axiosInstance";
import { get } from 'lodash';
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { changeFilterExportPdf, changePreviewContent, changeRenderFullDay } from "../../../actions/gantt";
import { changeVisibleExportPdfDrawer } from "../../../actions/system/system";
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";
import PreviewPdfModal from "../../PreviewModal";
import "./drawerpdf.css";
const StyledScrollbarsSide = ({ className = "", height, ...props }) => (
  <Scrollbars
    className={`comp_CustomModal___scrollbar-side-${height} ${className}`}
    {...props}
  />
);
const ExportPDF = ({
  height,
  exportPdfDrawerVisible,
  dataSource,
  changeVisibleExportPdfDrawer,
  changePreviewContent,
  previewContent,
  profileDetail,
  changeRenderFullDay,
  changeFilterExportPdf,
  projectInfo
}) => {
  const [showModalPreview, setShowModalPreview] = useState(false);
  const [contentPreview, setContentPreview] = useState([]);
  const [srcPreview, setSrcPreview] = useState([]);
  const [showFullTime, setShowFullTime] = useState(1);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams()
  const { t } = useTranslation()
  useEffect(() => {
    setContentPreview(previewContent);
  });
  const handleChangePreviewPdf = (e) => {
    const newContentPreview = [...contentPreview];
    newContentPreview[e.target.name] = e.target.value;
    setContentPreview(newContentPreview);
    changePreviewContent(newContentPreview);
  };
  const handleShowModalPreview = () => {
    if (showModalPreview) {
      changeRenderFullDay(false);
      document.getElementById('stringAppendFirst').remove()
      document.getElementById('stringAppendLast').remove()
      const container = document.getElementById('printContent')
      container.classList.remove('gantt-no-overflow')
      changeFilterExportPdf(null, null);
    } else {
    }
    setShowModalPreview(!showModalPreview);
  };
  const callBackPreview = (dataUrl) => {
    setSrcPreview(dataUrl);
    setIsLoading(false)
  };
  const handleOnClickPreview = () => {
    changePreviewContent(contentPreview);
    changeRenderFullDay(true);
    if (!showFullTime) {
      changeFilterExportPdf(startTime, endTime);
    }
    const container = document.getElementById('printContent')
    const contentLast = document.getElementById('content-last')
    container.classList.add("gantt-no-overflow");
    const stringAppend = previewContent.reduce((result, value, index) => {
      const temp = [...result]
      temp[index < 3 ? 0 : 1] = temp[index < 3 ? 0 : 1] + `<p>${value}</p>`
      return temp
    }, ['', ''])
    container.style.height = `${dataSource.length * 37 + 1500}px`
    const stringAppendFirst = `<div id="stringAppendFirst" style="display:flex">${stringAppend[0]}</div>`
    const stringAppendLast = `<div id="stringAppendLast"  style="display: flex">${stringAppend[1]}</div>`
    contentLast.insertAdjacentHTML('beforeend', stringAppendLast)
    container.insertAdjacentHTML('afterbegin', stringAppendFirst)
    setShowModalPreview(true);
    setIsLoading(true)
    setTimeout(
      () => window.getDataUrlPdf(kendo, "previewPdf.pdf", callBackPreview),
      100
    );
  };
  const handleOnClickOk = () => {
    changePreviewContent(contentPreview);
    window.ganttConvertToPdfFullWidth(kendo, "previewPdf.pdf");
  };
  const handleShowFullTime = (e) => {
    setShowFullTime(parseInt(e.target.value));
  };
  const handleChangeStartTime = (value) => {
    setStartTime(value);
  };
  const handleChangeEndTime = (value) => {
    setEndTime(value);
  };
  const renderInput = () => {
    let inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <div className="export-pdf--input">
          <TextField
            // defaultValue={previewContent[i]}
            onChange={handleChangePreviewPdf}
            fullWidth
            name={i}
            size="small"
            defaultValue={previewContent[i]}
            placeholder={t('GANTT_CONTENT_PDF', { index: i })}
            variant="outlined"
          />
        </div>
      );
    }
    return inputs;
  };
  const renderShowDatePicker = (show) => {
    console.log(show);
    if (!show) return null;
    return (
      <div className="export-pdf--drawer__date-wrapper">
        <div className="export-pdf--drawer__date-picker">
          <div>Từ ngày</div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk={true}
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
              autoOk={true}
              onChange={handleChangeEndTime}
              value={endTime}
              ampm={false}
              format="dd/MM/yyyy"
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  };
  const handleSavePdfInfo = async () => {
    try {
      const { projectId } = params;
      const data = {
        project_id: projectId,
        top_left: contentPreview[0],
        top_center: contentPreview[1],
        top_right: contentPreview[2],
        bottom_left: contentPreview[3],
        bottom_center: contentPreview[4],
        bottom_right: contentPreview[5],
      }
      await apiService({
        url: `/gantt/setting-export-pdf-info`,
        data,
        method: 'post'
      });
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, "Lưu thành công");
    } catch (e) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(e, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
      console.log(e);
      return false;
    }
  }
  return (
    <React.Fragment>
      <Drawer

        className="gantt--export-pdf__dialog"
        closable={false}
        title={
          <div
            style={{ flexDirection: "row" }}
            className="comp_QuickViewWrapper"
          >
            <div className="comp_QuickViewHeaderLeft">
              <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
                <Icon
                  className="comp_QuickViewFilter__headerIcon"
                  path={mdiFilePdf}
                ></Icon>
                <Box className="comp_QuickViewFilter__headerTitle">
                  {t('LABEL_GANTT_NAME_EXPORT_MENU').toUpperCase()}
                </Box>
              </Box>
            </div>
            <div onClick={() => {
              changeVisibleExportPdfDrawer(false)
            }} className="comp_QuickViewHeaderRight">
              <IconButton>
                <CloseIcon
                  onClick={() => {
                    changeVisibleExportPdfDrawer(false)
                  }}
                />
              </IconButton>
            </div>
          </div>
        }
        placement="right"
        closable={false}
        mask={false}
        visible={exportPdfDrawerVisible}
        width={400}
        style={{ height, top: `calc(100vh - ${height}px` }}
        footer={
          <div className="config--drawer--footer-section">
            <Button
              onClick={handleOnClickPreview}
              className="config--drawer--footer-section__preview"
              fullWidth
              style={{
                color: get(profileDetail, 'group_active.color', '#f2f2f2')
              }}
            >
              {t('LABEL_GANTT_NAME_EXPORT_MENU')}
            </Button>
          </div>
        }
      >
        <StyledScrollbarsSide autoHide autoHideTimeout={500} height={"tail"}>
          <div className="export-pdf--drawer__container">
            <p className="config--drawer--section config--drawer--section-subtitle">
              {t('GANTT_EXPORT_PDF_SET_CONTENT')} <span onClick={handleSavePdfInfo} className="config--drawer--section-subtitle__blue-text" >{t('GANTT_EXPORT_PDF_SAVE_CONTENT')}</span>
            </p>
            <div className="config--drawer--checkbox-section">
              {renderInput()}
            </div>
            <p className="config--drawer--section config--drawer--section-subtitle">
              {t('GANTT_EXPORT_PDF_PAPER_SIZE')}  <span style={{ color: "#b9b9b9" }}>{t('GANTT_EXPORT_PDF_AUTO')} </span>
            </p>
            <div className="config--drawer--checkbox-section"></div>
            <p className="config--drawer--section config--drawer--section-subtitle">
              {t('GANTT_EXPORT_PDF_TIME')}
            </p>
            <div className="config--drawer--checkbox-section">
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-filter-native-simple"></InputLabel>
                <Select
                  native
                  defaultValue={showFullTime}
                  onChange={handleShowFullTime}
                  inputProps={{
                    id: "outlined-filter-native-simple",
                  }}
                >
                  <option value={1}>{t('GANTT_EXPORT_PDF_ALL_TIME')}</option>
                  <option value={0}>{t('GANTT_EXPORT_PDF_LIMIT_TIME')}</option>
                </Select>
              </FormControl>
            </div>
            {renderShowDatePicker(!showFullTime)}
          </div>
        </StyledScrollbarsSide>
      </Drawer>
      <PreviewPdfModal
        srcPreview={srcPreview}
        isLoading={isLoading}
        open={showModalPreview}
        setOpen={handleShowModalPreview}
        title={projectInfo.name}
        onConfirm={handleOnClickOk}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  exportPdfDrawerVisible: state.system.exportPdfDrawerVisible,
  previewContent: state.gantt.previewContent,
  projectInfo: state.gantt.projectInfo,
});

const mapDispatchToProps = {
  changeVisibleExportPdfDrawer,
  changePreviewContent,
  changeRenderFullDay,
  changeFilterExportPdf,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExportPDF);
