import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDeleteConfirm(props) {

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleCloseModalDelete}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo hệ thống"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xoá không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseModalDelete} color="primary">
            Hủy
          </Button>
          <Button
            color="primary" autoFocus
            onClick={() => {
              props.handleCloseModalDelete()
              props.confirmDelete()
            }} > Xóa </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}