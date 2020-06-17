import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, FormControl, IconButton, InputLabel, Select, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { mdiFilePdf } from "@mdi/js";
import Icon from "@mdi/react";
import kendo from "@progress/kendo-ui";
import { Drawer } from "antd";
import { get } from 'lodash';
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { changeFilterExportPdf, changePreviewContent, changeRenderFullDay } from "../../../actions/gantt";
import { changeVisibleExportPdfDrawer } from "../../../actions/system/system";
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
      changeFilterExportPdf(null, null);
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
            placeholder={previewContent[i]}
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
    );
  };
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
                  XUẤT FILE PDF
                </Box>
              </Box>
            </div>
            <div className="comp_QuickViewHeaderRight">
              <IconButton>
                <CloseIcon
                  onClick={() => changeVisibleExportPdfDrawer(false)}
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
              Xuất file PDF
            </Button>
          </div>
        }
      >
        <StyledScrollbarsSide autoHide autoHideTimeout={500} height={"tail"}>
          <div className="export-pdf--drawer__container">
            <p className="config--drawer--section config--drawer--section-subtitle">
              Thiết lập trục thời gian{" "}
            </p>
            <div className="config--drawer--checkbox-section">
              {renderInput()}
            </div>
            <p className="config--drawer--section config--drawer--section-subtitle">
              Khổ giấy <span style={{ color: "#b9b9b9" }}>Tự động</span>
            </p>
            <div className="config--drawer--checkbox-section"></div>
            <p className="config--drawer--section config--drawer--section-subtitle">
              Thời gian
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
                  <option value={1}>Toàn bộ thời gian</option>
                  <option value={0}>Tùy chỉnh</option>
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
