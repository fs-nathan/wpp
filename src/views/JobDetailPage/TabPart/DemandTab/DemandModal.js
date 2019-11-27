import React from 'react';
import { IconButton, Button, Dialog, Typography, TextField } from '@material-ui/core';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect'

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


const TexTitle = styled(Typography)`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 0;
`

// const TitleText = styled(Typography)`
//   font-size: 15px;
//   margin: 20px 0
// `

// const HelperText = styled(TextField)`
//   & > *:last-child {
//     font-size: 12px;
//     margin: 8px 0 0;
//     & > select {
//       font-size: 14px;
//     }
//   }
// `
const Text = styled(TextField)`
  & > label {
      font-size: 14px;
      z-index: 0
  }
`


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

const selector = [
  { label: 'Chỉ đạo', value: 1 },
  { label: 'Quyết định', value: 0 }
]

const DemandModal = (props) => {

  const [tempSelectedItem, setTempSelectedItem] = React.useState({ task_id: "",content: "", type: -1 })

  React.useEffect(() => {
    setTempSelectedItem(props.item)
  }, [props.item])

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen} fullWidth>
      <DialogTitle onClose={props.handleClose}>
        Chỉ đạo, quyết định
        </DialogTitle>
      <DialogContent dividers>
        <TexTitle >Chọn loại</TexTitle>
        <OutlinedInputSelect
          selectedIndex={tempSelectedItem.type}
          setOptions={typeId => setParams("type", typeId)}
          commandSelect={selector}
        />
        {/* <Text 
                component="span"
                id="outlined-full-width"
                placeholder="Nhập nội dung nhắc hẹn"
                fullWidth
                margin="normal"
                multiline rows="4"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            /> */}
        <Text
          label="Nội dung"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          value={tempSelectedItem.content}
          onChange={e => setParams("content", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {(props.isEditDemand) ?
          <Button
            autoFocus
            onClick={() => {
              props.handleClose()
              props.confirmUpdateCommand(tempSelectedItem)
              setParams("content", '')
            }}
            color="primary">
            Chỉnh sửa
          </Button>
          :
          <Button
            autoFocus
            onClick={() => {
              props.handleClose()
              props.confirmCreateCommand(tempSelectedItem)
              setParams("content", '')
            }}
            color="primary">
            Tạo mới
          </Button>
        }
      </DialogActions>
    </Dialog>

  )
}

export default DemandModal