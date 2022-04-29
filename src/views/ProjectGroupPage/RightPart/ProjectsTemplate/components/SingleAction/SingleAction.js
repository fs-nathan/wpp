/* eslint-disable react-hooks/rules-of-hooks */
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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DialogUnShare from "./DialogUnShare";
import DialogReffer from "./DialogReffer";
import DialogUsing from "./DialogUsing";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelShare } from "actions/project/cancelShare";
import { useTemplate } from "actions/project/useTemplate";
import { useTranslation } from "react-i18next";
import { actionToast } from "actions/system/system";
import { getListTemplateMeShared } from "actions/project/getListTemplateMeShared";
import { CANCEL_SHARE_SUCCESS } from "constants/actions/project/cancelShare";
import moment from "moment";
const SingleAction = ({ isOpenUsing, closeUsing }) => {
  const { id: projectId } = useParams();
  const [anchorUnShareEl, setAnchorUnShareEl] = useState(null);
  const [anchorRefferEl, setAnchorRefferEl] = useState(null);
  const [anchorUsingEl, setAnchorUsingEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.project.getDetailTemplate.data);

  const { t } = useTranslation();
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
  const handleUsingClick = () => {
    const event = document.getElementById("using-button");
    console.log(event);
    if (event) {
      setAnchorUsingEl(event);
    }
  };

  const handleUsingClose = () => {
    setAnchorUsingEl(null);
    closeUsing();
  };

  const openUnShare = Boolean(anchorUnShareEl);
  const unShareId = openUnShare ? "unshare-popover" : undefined;

  const openReffer = Boolean(anchorRefferEl);
  const refferId = openReffer ? "reffer-popover" : undefined;
  const openUsing = Boolean(anchorUsingEl);
  const usingId = openUsing ? "using-popover" : undefined;

  const handleToast = (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => {
      dispatch(actionToast("", null));
    }, 2000);
  };
  const status = useSelector((state) => state.project.cancelShare.status);

  useEffect(() => {
    if (status === CANCEL_SHARE_SUCCESS) {
      dispatch(getListTemplateMeShared());
    }
  }, [status]);

  useEffect(() => {
    if (isOpenUsing) {
      handleUsingClick();
    } else {
      handleUsingClose();
    }
  }, [isOpenUsing]);

  async function handleUnShare() {
    try {
      dispatch(cancelShare({ projectId }));
      handleUnShareClose();
      history.replace("/projects/template");
    } catch (error) {}
  }
  async function handleUsing({ name, curProjectGroupId, startDate }) {
    try {
      await dispatch(
        useTemplate({
          template_id: projectId,
          name,
          project_group_id: curProjectGroupId,
          day_start: startDate
            ? moment(startDate).format("YYYY-MM-DD")
            : undefined,
        })
      );
    } catch (error) {}
  }

  return (
    <>
      {template.is_me_share && (
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
      )}
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
          id="using-button"
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