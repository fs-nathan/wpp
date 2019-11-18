import React from 'react';
import styled from 'styled-components';
import {IconButton, Dialog, withStyles, Typography, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import colorPal from '../../../../helpers/colorPalette';

// const TexTitle = styled(Typography)`
//   font-size: 14px;
//   color: ${colorPal['gray'][0]}
//   margin-bottom: 30px;
// `
// const TextInput = styled(TextField)`
//   font-size: 14px;
//   margin-bottom: 20px
// `

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

const SubtaskModal = (props) => {
  
  const [name, setStateName] = React.useState(props.name)
    return (
        // {/* Modal chinh sua cong viec con */}
        <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClickClose}>
          Chỉnh sửa công việc con
        </DialogTitle>
        <DialogContent dividers>
            <TextField
            label="Nội dung công việc"
            margin="normal"
            fullWidth
            onChange={e => setStateName(e.target.value)}
            value={name}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            props.handleClickClose()
            props.updateSubTaskByTaskId(props.task.id, name)
            }} color="primary">
            Hoàn Thành
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default SubtaskModal;