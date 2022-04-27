import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import copy from "copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const DialogReffer = ({ onClose }) => {
  const { t } = useTranslation();
  function copyUrl() {
    copy(window.location.href);
    onClose();
  }
  return (
    <Box width={320}>
      <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
        {t("TEMPLATE.Reffer")}
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
      <Box
        p={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          defaultValue={window.location.href || ""}
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={copyUrl}>
          {t("TEMPLATE.copy")}
        </Button>
      </Box>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box sx={{ p: 1 }}>
          <Typography>{t("TEMPLATE.Reffer 1")}</Typography>
          <Typography>{t("TEMPLATE.Reffer 2")}</Typography>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default DialogReffer;
