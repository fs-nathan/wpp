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
    background: '#f5f8fc'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400,
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
      <Typography className={classes.title} variant="h6">{children}</Typography>
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
    padding: '15px 24px',
  },
}))(MuiDialogActions);


const ApproveModal = (props) => {
  const DEFAULT_VALUE = {
    offer_id: props.offer.id,
    content: "Đồng ý phê duyệt",
    status: 1
  }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(DEFAULT_VALUE)
  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  return (
    // {/* modal phe duyet */}
    <Dialog onClose={props.handleClickClose} open={props.isOpen} fullWidth>
      <DialogTitle onClose={props.handleClickClose}>
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
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          value={tempSelectedItem.content}
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          onChange={e => setParams("content", e.target.value)}
        />

      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          onClick={() => {
            props.handleClickClose()
            props.handleOfferById(tempSelectedItem)
          }}
        >
          Phê duyệt
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApproveModal;