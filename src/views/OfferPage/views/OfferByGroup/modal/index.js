import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { action } from "views/OfferPage/contants/attrs";
import { createOfferGroup, updateOfferGroup } from "views/OfferPage/redux/actions";

const Wrapper = styled.div`
  h2 : {
    font-weight: 300 !important;
  }
`;
const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: "500px !important",
    paddingLeft: "50px",
    paddingRight: "50px"
  },
  dialog_header: {
    paddingLeft: "50px",
    backgroundColor: "#e8e8e8"
  },
  color_green: {
    color: "#03a9f4"
  },
  title: {
    fontWeight: 300,
    fontSize: "16px"
  },
  input: {
    width: "100%",
    height: "40px",
    border: "1px solid #3333",
    borderRadius: "3px",
    paddingLeft: "5px"
  },
  textarea: {
    resize: "none",
    width: "100%",
    padding: "5px",
    minHeight: "100px",
    border: "1px solid #3333",
    borderRadius: "3px"
  }
}));
const Form = styled.div`
  *:focus {
    outline: none !important;
  }
  input:focus {
    outline: none !important;
  }
`;

export default function FormDialog({ type, open, handleOpenModal, ...rest }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: rest.name || "", description: rest.description || "" });
  const { name, description } = form
  const { offer_group_id } = rest
  const canConfirm = () => {
    if (name !== "" && description !== "") {
      return false;
    }
    return true;
  };
  const classes = useStyles();
  const handleClose = () => {
    setForm({ name: "", description: "" })
    handleOpenModal();
  };

  const createGroup = () => {
    handleOpenModal();
    //
    if (type === action.CREATE_OFFER) {
      dispatch(createOfferGroup({ name, description }))
      return
    }
    if (type === action.UPDATE_OFFER) {
      dispatch(updateOfferGroup({ name, description, offer_group_id }))
      return
    }
  }
  return (
    <Wrapper>
      <Dialog
        maxWidth={false}
        open={open}
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.dialog_header}>
          {type === action.CREATE_OFFER && (
            <span className={classes.title}>Tạo nhóm đề xuất</span>
          )}
          {type === action.UPDATE_OFFER && (
            <span className={classes.title}>Chỉnh sửa đề xuất</span>
          )}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          {
            type === action.CREATE_OFFER &&
            <Form>
              <h5>Tên nhóm đề xuất</h5>
              <input
                id="outlined-basic"
                onChange={e => setForm({ description, name: e.target.value })}
                className={classes.input}
                variant="outlined"
              />
              <h5>Mô tả nhóm đề xuất</h5>
              <textarea
                id="outlined-basic"
                onChange={e => setForm({ name, description: e.target.value })}
                className={classes.textarea}
              />
            </Form>
          }
          {
            type === action.UPDATE_OFFER &&
            <Form>
              <h5>Tên nhóm đề xuất</h5>
              <input
                id="outlined-basic"
                onChange={e => setForm({ description, name: e.target.value })}
                className={classes.input}
                variant="outlined"
                value={name}
              />
              <h5>Mô tả nhóm đề xuất</h5>
              <textarea
                id="outlined-basic"
                onChange={e => setForm({ name, description: e.target.value })}
                className={classes.textarea}
                value={description}
              />
            </Form>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            onClick={createGroup}
            disabled={canConfirm()}
            className={classes.color_green}
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}
