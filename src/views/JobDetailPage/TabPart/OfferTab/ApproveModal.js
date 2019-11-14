import React from 'react';
import styled from 'styled-components';
import {
   IconButton, Button, Dialog, Typography, InputBase, TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import colorPal from '../../../../helpers/colorPalette';
import CloseIcon from '@material-ui/icons/Close';

const TexTitle = styled(Typography)`
  font-size: 14px;
  color: ${colorPal['gray'][0]}
  margin-bottom: 20px;
  margin-left: 0;
`
const InputText = styled(InputBase)`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 30px;
`
// const Text = styled(TextField)`
//   & > *:first-child {
//     margin-bottom: 20px;
//     & > input {
//       font-size: 16px;
//       margin-bottom: 100px;
//     }
//   }
// `

// const TitleText = styled(Typography)`
//   font-size: 15px;
//   margin: 15px 0;
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
  

const ApproveModal = (props) => {
    return (
        // {/* modal phe duyet */}
        <Dialog onClose={props.handleClickClose} aria-labelledby="customized-dialog-title" open={props.isOpen} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClickClose}>
          Phê duyệt đề xuất
      </DialogTitle>
        <DialogContent dividers>
          <TexTitle >Nội dung công việc </TexTitle>
          <InputText
            inputProps={{ 'aria-label': 'naked' }}
            value={'Xin phê duyệt chi phí tiếp khách'}
            fullWidth
          />
          {/* <TitleText component="div">Nội dung phê duyệt(nếu có)</TitleText>
          <Text component="span"
            id="outlined-full-width"
            value={'Đồng ý phê duyệt'}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          /> */}
          <TextField
          id="outlined-multiline-static"
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          defaultValue="Đồng ý phê duyệt"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
        />

        </DialogContent>
        <DialogActions>
          <Button 
          autoFocus 
          color="primary"
          onClick={() => {

            props.handleClickClose()
          }} 
          >
            Phê duyệt
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ApproveModal;