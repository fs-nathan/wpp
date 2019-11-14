import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteModalSubTask(props) {
console.log('delete', props.task.id)
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleCloseModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa công việc con"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa công việc con này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseModalDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={() => {
              props.handleCloseModalDelete()
              props.deleteSubTaskByTaskId(props.task.id)}} color="primary" autoFocus> Xóa </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}