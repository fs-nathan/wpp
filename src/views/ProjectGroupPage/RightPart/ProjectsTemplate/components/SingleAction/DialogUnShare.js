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

const DialogUnShare = ({ onClose, onOk }) => {
  return (
    <Box width={320}>
      <DialogTitle sx={{ textAlign: "center", fontSize: 14 }}>
        Huỷ chia sẻ mẫu
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
        <Typography>
          Bạn đã chia sẻ mẫu này cho cộng đồng và các thành viên khác sử dụng.
        </Typography>
        <Typography>
          Nếu bạn huỷ chia sẻ các thành viên khác sẽ không còn thấy mẫu.
        </Typography>
        <Typography>Bạn vẫn muốn tiếp tục huỷ chia sẻ.</Typography>
      </Box>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={onOk}>
          Đồng ý
        </Button>
      </DialogActions>
    </Box>
  );
};

export default DialogUnShare;
