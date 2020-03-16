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
  DEFAULT_DATE_TEXT,
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

import './styles.scss';

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
  const [startTime, setStartTime] = React.useState(listTimeSelect[16])
  const [endTime, setEndTime] = React.useState(listTimeSelect[34])
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT)
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT)

  const handleStartTime = ({ target }) => {
    setStartTime(target.value)
  }
  const handleEndTime = ({ target }) => {
    setEndTime(target.value)
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
      start_time: startTime,
      end_time: endTime,
    }
    console.log("data", data);
    dispatch(updateTimeDuration(data));
  }

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} >
      <DialogTitle id="customized-dialog-title" onClose={props.handleClickClose}>
        Điều chỉnh tiến độ
        </DialogTitle>
      <DialogContent dividers >
        <StartEndDay component={'span'}>
          <BeginEndTime component={'span'}>Bắt đầu</BeginEndTime>
          <TimeSelect
            className="progressModal--timeSelect"
            value={startTime}
            onChange={handleStartTime}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InputDate
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={startDay}
              size="small"
              onChange={e => handleStartDay(convertDate(e))}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </StartEndDay>
        <StartEndDay component={'span'}>
          <BeginEndTime component={'span'}>Kết thúc</BeginEndTime>
          <TimeSelect
            className="progressModal--timeSelect"
            value={endTime}
            onChange={handleEndTime}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InputDate
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={endDay}
              size="small"
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