import React from 'react';
import { IconButton, Dialog, Button, TextField, withStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCloudDownloadOutline } from '@mdi/js';
// import ColorTypo from '../../../../components/ColorTypo';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IntegrationReactSelect from '../Tag/index'
// import colorPal from '../../../../helpers/colorPalette';
import { makeStyles } from '@material-ui/core/styles';


const TexTitle = styled(Typography)`
  font-size: 15px;
  margin: 15px 0;
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
const ButtonFile = styled.label`
      & > span {
        margin: 20px 0 0 0;
        & > span {
          display: flex;
          align-items: center;
          justify-content: start;
          padding: 3px 10px;
          font-size: 14px;
          font-weight: 500;
        }
      }
`
const TextContent = styled(TextField)`
  & > label {
      font-size: 14px;
      z-index: 0
  }
`
// bien cua modal
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

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

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
// end modal



const OfferModal = (props) => {

  const [tempSelectedItem, setTempSelectedItem] = React.useState({ offer_id: "", content: "" })

  React.useEffect(() => {
    setTempSelectedItem(props.item)
  }, [props.item])

  

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }
  const classes = useStyles()
  return (
    <Dialog open={props.isOpen} onClose={props.handleClickClose} fullWidth>
      <DialogTitle onClose={props.handleClickClose}>
        Tạo đề xuất
        </DialogTitle>
      <DialogContent dividers>
        <TexTitle >Chọn người duyệt</TexTitle>
        <IntegrationReactSelect />
        <TextContent
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          style={{ marginTop: 20 }}
          value={tempSelectedItem? tempSelectedItem.content : ""}
          onChange={e => setParams("content", e.target.value)}
        />
        <input
          accept="image/*"
          className={classes.input}
          multiple
          type="file"
        />
        <ButtonFile htmlFor="outlined-button-file">
          <Button variant="outlined" component="span" fullWidth className={classes.button}>
            <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />
            Đính kèm tài liệu
                </Button>
        </ButtonFile>

      </DialogContent>
      <DialogActions>
        {props.isOffer ?
          <Button
            color="primary"
            onClick={() => {
              props.handleClickClose()
              if (tempSelectedItem.content){
                props.updateOfferById(tempSelectedItem.offer_id, tempSelectedItem.content)
              }
              setParams("content", '')
            }}>
            Chỉnh sửa
        </Button>
          :
          <Button
            color="primary"
            onClick={() => {
              props.handleClickClose()
              if (tempSelectedItem.content)
                props.createOfferByTaskId("5da1821ad219830d90402fd8", tempSelectedItem.content)
              setParams("content", '')
            }}>
            Hoàn Thành
          </Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default OfferModal