import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDeleteConfirm({
  isOpen,
  handleCloseModalDelete,
  confirmDelete,
}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseModalDelete}
      >
        <DialogTitle>{"Thông báo hệ thống"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Bạn có chắc muốn xoá không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} style={{ color: "#222" }}>
            Hủy
          </Button>
          <Button
            color="primary" autoFocus
            onClick={() => {
              confirmDelete()
              handleCloseModalDelete()
            }} > Xóa </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}