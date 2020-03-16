import React from 'react';
import { IconButton, withStyles, Typography, Dialog, Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import TimeField from 'react-simple-timefield';
// import OutlinedInputSelect from './OutlinedInputSelect'
import {
  DEFAULT_DATE_TEXT, DEFAULT_END_TIME_TEXT, DEFAULT_START_TIME_TEXT
} from '../../../../helpers/jobDetail/stringHelper';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { convertDate } from '../../../../helpers/jobDetail/stringHelper'
import { updateTimeDuration } from '../../../../actions/taskDetail/taskDetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../selectors';
import TimeSelect, { listTimeSelect } from 'components/TimeSelect';
import get from 'lodash/get';

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
`

const BeginEndTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`

const InputDateTime = styled(TextField)`
  width: 186px;
  margin-right: 25px;
  & > div:nth-child(2) > input {
    padding: 14px;
  }
`
const InputDate = styled(KeyboardDatePicker)`

  & > div:nth-child(2) {
    width: 186px;
    padding-right: 5px;
    & > input {
      padding: 14px;
    }
    & > div > button {
      padding: 5px;
    }
  } 
`
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

const ProgressModal = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  // console.log("value time:::::", value);
  const [startTime, setStartTime] = React.useState(DEFAULT_START_TIME_TEXT)
  const [endTime, setEndTime] = React.useState(DEFAULT_END_TIME_TEXT)
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT)
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT)

  const handleStartTime = (startTime) => {
    setStartTime(startTime)
  }
  const handleEndTime = (endTime) => {
    setEndTime(endTime)
  }
  const handleStartDay = (startDay) => {
    setStartDay(startDay)
  }
  const handleEndDay = (endDay) => {
    setEndDay(endDay)
  }

  const setDataTimeDuration = () => {
    const data = {
      task_id: taskId,
      start_date: startDay,
      end_date: endDay,
      start_time: listTimeSelect[16],
      end_time: listTimeSelect[34],
    }
    console.log("data", data);
    dispatch(updateTimeDuration(data));
  }

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} >
      <DialogTitle id="customized-dialog-title" onClose={props.handleClickClose}>
        Điều chỉnh tiến độ
        </DialogTitle>
      <DialogContent dividers style={{ overflowY: 'hidden' }}>
        <StartEndDay component={'span'}>
          <BeginEndTime component={'span'}>Bắt đầu</BeginEndTime>
          <div>
            <TimeSelect
              value={startTime}
              onChange={(e) => handleStartTime(e.target.value)}
            ></TimeSelect>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InputDate
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              label="Ngày"
              value={startDay}
              onChange={e => handleStartDay(convertDate(e))}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </StartEndDay>
        <StartEndDay component={'span'}>
          <BeginEndTime component={'span'}>Kết thúc</BeginEndTime>
          <div>
            <TimeSelect
              value={endTime}
              onChange={(e) => handleEndTime(e.target.value)}
            ></TimeSelect>
            <InputDateTime
            />
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InputDate
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              label="Ngày"
              value={endDay}
              minDate={startDay}
              onChange={e => handleEndDay(convertDate(e))}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </StartEndDay>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClickClose} style={{ color: '#222222' }} >
          Hủy
        </Button>
        <Button onClick={() => {
          setDataTimeDuration()
          props.handleClickClose()
        }}
          style={{ color: groupActiveColor }}>
          Hoàn Thành
              </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProgressModal;