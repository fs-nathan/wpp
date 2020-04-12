import DateFnsUtils from "@date-io/date-fns";
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { updateTimeDuration } from 'actions/taskDetail/taskDetailActions';
import CustomModal from 'components/CustomModal';
import TimeSelect, { listTimeSelect } from 'components/TimeSelect';
import "date-fns";
import { convertDate, convertDateToJSFormat, DEFAULT_DATE_TEXT } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { taskIdSelector } from '../../selectors';
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

const ProgressModal = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const listTime = useSelector(state => state.taskDetail.trackingTime.listTime);
  const trackings = listTime ? listTime.trackings : [];

  // console.log("value time:::::", value);
  const [startTime, setStartTime] = React.useState(listTimeSelect[16])
  const [endTime, setEndTime] = React.useState(listTimeSelect[34])
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT)
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT)

  React.useEffect(() => {
    if (trackings.length) {
      const lastTrack = trackings[trackings.length - 1]
      const { new_start, new_end } = lastTrack;
      // const startNew = parse(new_start, 'dd/MM/yyyy HH:mm', new Date());
      const [startNewDay, startNewTime] = new_start.split(' ')
      setStartDay(convertDateToJSFormat(startNewDay))
      setStartTime(startNewTime)
      const [endNewDay, endNewTime] = new_end.split(' ')
      setEndDay(convertDateToJSFormat(endNewDay))
      setEndTime(endNewTime)
    }
  }, [trackings])
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

  const handlePressConfirm = () => {
    const data = {
      task_id: taskId,
      start_date: startDay,
      end_date: endDay,
      start_time: startTime,
      end_time: endTime,
    }
    // console.log("data", data);
    dispatch(updateTimeDuration(data));
    props.setOpen(false)
  }

  function validate() {
    return true
  }

  return (
    <CustomModal
      title={"Điều chỉnh tiến độ"}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={handlePressConfirm}
      canConfirm={validate()}
      maxWidth='sm'
      className="progressModal"
    >
      <DialogContent >
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
    </CustomModal>
  )
}

export default ProgressModal;