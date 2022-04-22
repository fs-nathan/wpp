import React, { useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Popover,
  Typography,
  InputLabel,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextboxSelect from "components/CustomTextboxSelect";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRequiredDate, useRequiredString } from "hooks";
import moment from "moment";
import { useSelector } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CustomTextbox from "components/CustomTextbox";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "components/CustomDatePicker";
import SelectGroupProject from "./SelectGroupProject";

const DialogUsing = ({ onClose, onOk }) => {
  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString("", 200);
  const [curProjectGroupName, setCurProjectGroupName] = useState("");
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    useState(false);
  const [curProjectGroupId, setCurProjectGroupId] = useState("");
  const [startDate, setStartDate, errorDate] = useRequiredDate(
    moment().toDate()
  );

  const formatDate = useSelector((state) => state.system.profile.format_date);

  function handleOk() {
    onOk({
      name,
      curProjectGroupId,
      startDate,
    });
  }
  return (
    <>
      <Box width={320} p={1}>
        <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
          Tạo bảng mới từ mẫu này
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <Box p={2}>
          <div className="per-line-step-in-form">
            <CustomTextbox
              size="small"
              value={name}
              onChange={(value) => setName(value)}
              label={`${t("LABEL_WORKING_BOARD_NAME")}`}
              fullWidth
              required
              className={
                "view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"
              }
            />
          </div>
          <div className="select-customer-from-input per-line-step-in-form">
            <CustomTextboxSelect
              id="group"
              value={curProjectGroupName}
              onClick={() => {
                setOpenSelectGroupProjectModal(true);
              }}
              label={`${t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}`}
              // fullWidth
              required={true}
              className={"view_ProjectGroup_CreateNew_Project_Modal_formItem "}
              isReadOnly={true}
            />
            <ArrowDropDownIcon className="icon-arrow" />
          </div>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Sao chép tiến độ công việc"
            />
          </FormGroup>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CustomDatePicker
              label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.DATE")}
              ampm={false}
              value={startDate}
              onChange={setStartDate}
              format={formatDate}
              required={true}
              size="small"
            />
          </MuiPickersUtilsProvider>
          <Typography>
            Mọi hoạt động thảo luận, tài liệu trong bảng sẽ không được sao chép
            sang bảng mới.
          </Typography>
        </Box>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
          <Button variant="contained" color="primary" onClick={handleOk}>
            Tạo mới
          </Button>
        </DialogActions>
      </Box>

      {/* Select Group */}
      {openSelectGroupProjectModal && (
        <SelectGroupProject
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupProjectModal(value)}
          selectedOption={(group) => {
            setCurProjectGroupId(group.id);
            setCurProjectGroupName(group.name);
          }}
          groupSelected={curProjectGroupId}
        />
      )}
    </>
  );
};

export default DialogUsing;
