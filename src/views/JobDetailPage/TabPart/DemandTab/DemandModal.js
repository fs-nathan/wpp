import React from 'react';
import { IconButton, Button, Dialog, Typography, TextField } from '@material-ui/core';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect'
import { updateCommand, createCommand } from 'actions/taskDetail/taskDetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../selectors';

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


const TexTitle = styled(Typography)`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 0;
`

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
      <Typography className={classes.title} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
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
    padding: "15px 24px",
  },
}))(MuiDialogActions);

const selector = [
  { label: 'Chỉ đạo', value: 1 },
  { label: 'Quyết định', value: 0 }
]

const DemandModal = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const [tempSelectedItem, setTempSelectedItem] = React.useState({ task_id: props.taskId, content: "", type: -1 })

  React.useEffect(() => {
    setTempSelectedItem(props.item)
  }, [props.item])

  const setParams = (nameParam, value) => {
    setTempSelectedItem({ ...tempSelectedItem, [nameParam]: value })
  }

  function onClickCreate() {
    props.handleClose()
    props.confirmCreateCommand(tempSelectedItem)
    setParams("content", '')
  }

  function onClickUpdate() {
    props.handleClose();
    tempSelectedItem.taskId = taskId;
    dispatch(updateCommand(tempSelectedItem))
    setParams("content", '')
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
        <Button autoFocus onClick={props.handleClose} color='#222'>
          Hủy
        </Button>
        {(props.isEditDemand) ?
          <Button
            autoFocus
            onClick={onClickUpdate}
            color="primary">
            Chỉnh sửa
          </Button>
          :
          <Button
            autoFocus
            onClick={onClickCreate}
            color="primary">
            Tạo mới
          </Button>
        }
      </DialogActions>
    </Dialog>

  )
}

export default DemandModal