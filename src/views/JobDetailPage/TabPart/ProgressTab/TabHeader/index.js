import React from 'react';
import { IconButton, withStyles, Typography, Dialog, Button} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TimeField from 'react-simple-timefield';
import OutlinedInputSelect from '../OutlinedInputSelect'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 92px;
  overflow-y: hidden;
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;
const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
`
const StartEndDate = styled(Typography)`
  margin: 0 20px;
`
const OutlineInput = styled(OutlinedInput)`
& > input {
  padding: 10px 5px;
  margin-left: 10px;
}
`
const BeginEndTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`
const TexTitle = styled(Typography)`
  font-size: 15px;
  margin-right: 10px;
`

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const InputTime = styled(TimeField)`
  width: 146px !important;
  padding: 10px 5px 10px 13px;
  border: 0;
  border-radius: 4px;
`
const DivTime = styled.div`
  border: 1px solid #cfcfcf;
  border-radius: 4px;
`
const InputSelect = styled(OutlinedInputSelect)`
  width: 331px;
`
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

function TabHeader({ setShow }) {
  const [time, setTime] = React.useState('')

  const handleTime = () => {
    setTime(time);
  }
  // bien cua modal cong viec con
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ColorTypo uppercase bold>Tiến độ công việc</ColorTypo>
      <IconButton onClick={handleClickClose, handleClickOpen}>
        <Icon path={mdiSettings} size={1} />
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
      {/* modal tao moi cong viec con */}
      <Dialog aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Điều chỉnh tiến độ
        </DialogTitle>
        <DialogContent dividers style={{  overflowY: 'hidden'}}>
          <Div>
            <TexTitle >Phạm vi điều chỉnh </TexTitle>
            <InputSelect />
          </Div>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>Bắt đầu</BeginEndTime>
            <DivTime>
              <InputTime value={time} onChange={handleTime} />
            </DivTime>
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput type={'date'}/>
          </StartEndDay>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>Kết thúc</BeginEndTime>
            <DivTime>
              <InputTime value={time} onChange={handleTime} />
            </DivTime>
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput type={'date'}/>
          </StartEndDay>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Hoàn Thành
              </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TabHeader;
