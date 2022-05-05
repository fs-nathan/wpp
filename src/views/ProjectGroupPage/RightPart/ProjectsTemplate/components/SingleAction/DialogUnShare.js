import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const DialogUnShare = ({ onClose, onOk }) => {
  const { t } = useTranslation();
  return (
    <Box width={320}>
      <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
        {t("TEMPLATE.Unshare full")}
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
        <Typography>{t("TEMPLATE.Unshare 1")}</Typography>
        <Typography>{t("TEMPLATE.Unshare 2")}</Typography>
        <Typography>{t("TEMPLATE.Unshare 3")}</Typography>
      </Box>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={onOk}>
          {t("TEMPLATE.Agree")}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default DialogUnShare;
