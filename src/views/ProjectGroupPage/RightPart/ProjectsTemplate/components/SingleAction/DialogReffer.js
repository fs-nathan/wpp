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

const DialogReffer = ({ onClose }) => {
  function copyUrl() {
    copy(window.location.href);
    onClose();
  }
  return (
    <Box width={320}>
      <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
        Giới thiệu mẫu cho thành viên
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
          Sao chép
        </Button>
      </Box>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box sx={{ p: 1 }}>
          <Typography>
            Chia sẻ mẫu này bằng cách gửi đường dẫn cho các thành viên khác.
          </Typography>

          <Typography>Chỉ xem được mẫu này sau khi đăng nhập</Typography>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default DialogReffer;
