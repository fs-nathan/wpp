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
import SelectGroupProject from "../../../../Modals/SelectGroupProject";

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
  const [isDayStart, setIsDayStart] = useState(true);

  const formatDate = useSelector((state) => state.system.profile.format_date);

  const loading = useSelector((state) => state.project.useTemplate.loading);
  function handleOk() {
    onOk({
      name,
      curProjectGroupId,
      startDate: isDayStart ? startDate : undefined,
    });
  }
  return (
    <>
      <Box width={320} p={1}>
        <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
          {t("TEMPLATE.Create new")}
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
              control={
                <Checkbox
                  defaultChecked
                  checked={isDayStart}
                  onChange={() => setIsDayStart((pre) => !pre)}
                />
              }
              label={t("TEMPLATE.Clone start time")}
            />
          </FormGroup>
          {isDayStart && (
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
          )}
          <Typography>{t("TEMPLATE.Using subtitle")}</Typography>
        </Box>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
          <Button
            loading={loading}
            variant="contained"
            onClick={handleOk}
            sx={{
              backgroundColor: "#0076F3",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {t("TEMPLATE.Create")}
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
