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
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DialogUnShare from "./DialogUnShare";
import DialogReffer from "./DialogReffer";
import DialogUsing from "./DialogUsing";

const SingleAction = () => {
  const [anchorUnShareEl, setAnchorUnShareEl] = useState(null);
  const [anchorRefferEl, setAnchorRefferEl] = useState(null);
  const [anchorUsingEl, setAnchorUsingEl] = useState(null);

  const handleUnShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorUnShareEl(event.currentTarget);
  };

  const handleUnShareClose = () => {
    setAnchorUnShareEl(null);
  };
  const handleRefferClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorRefferEl(event.currentTarget);
  };

  const handleRefferClose = () => {
    setAnchorRefferEl(null);
  };
  const handleUsingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorUsingEl(event.currentTarget);
  };

  const handleUsingClose = () => {
    setAnchorUsingEl(null);
  };

  const openUnShare = Boolean(anchorUnShareEl);
  const unShareId = openUnShare ? "unshare-popover" : undefined;

  const openReffer = Boolean(anchorRefferEl);
  const refferId = openReffer ? "reffer-popover" : undefined;
  const openUsing = Boolean(anchorUsingEl);
  const usingId = openUsing ? "using-popover" : undefined;

  async function handleUnShare() {}
  async function handleUsing() {}

  return (
    <>
      <div>
        <Button
          aria-describedby={unShareId}
          variant="contained"
          sx={{
            backgroundColor: "#f0f2f5",
            color: "red",
            "&:hover": {
              backgroundColor: "#f0f2f5",
            },
          }}
          onClick={handleUnShareClick}
        >
          Huỷ chia sẻ
        </Button>
        <Popover
          id={unShareId}
          open={openUnShare}
          anchorEl={anchorUnShareEl}
          onClose={handleUnShareClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <DialogUnShare onClose={handleUnShareClose} onOk={handleUnShare} />
        </Popover>
      </div>
      <div>
        <Button
          aria-describedby={refferId}
          variant="contained"
          color="info"
          sx={{
            backgroundColor: "#f0f2f5",
            color: "black",
            "&:hover": {
              backgroundColor: "#f0f2f5",
            },
          }}
          onClick={handleRefferClick}
        >
          Giới thiệu
        </Button>
        <Popover
          id={refferId}
          open={openReffer}
          anchorEl={anchorRefferEl}
          onClose={handleRefferClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <DialogReffer onClose={handleRefferClose} />
        </Popover>
      </div>
      <div>
        <Button
          aria-describedby={usingId}
          variant="contained"
          color="primary"
          onClick={handleUsingClick}
        >
          Sử dụng mẫu
        </Button>
        <Popover
          id={usingId}
          open={openUsing}
          anchorEl={anchorUsingEl}
          onClose={handleUsingClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <DialogUsing onClose={handleUsingClose} onOk={handleUsing} />
        </Popover>
      </div>
    </>
  );
};

export default SingleAction;
