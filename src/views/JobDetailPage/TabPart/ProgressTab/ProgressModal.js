import DateFnsUtils from "@date-io/date-fns";
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { updateTimeDuration } from 'actions/taskDetail/taskDetailActions';
import TimePicker from 'components/TimePicker';
import { listTimeSelect } from 'components/TimeSelect';
import "date-fns";
import { convertDate, DEFAULT_DATE_TEXT } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { taskIdSelector } from '../../selectors';
import './styles.scss';

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
`

const BeginEndTime = styled(Typography)`
  width: 60px;
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails) || {};

  // console.log("value time:::::", value);
  const [startTime, setStartTime] = React.useState(listTimeSelect[16])
  const [endTime, setEndTime] = React.useState(listTimeSelect[34])
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT)
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT)

  React.useEffect(() => {
    if (detailTask) {
      const {
        start_time,
        start_date,
        end_time,
        end_date,
      } = detailTask;
      setStartDay(start_date)
      setStartTime(start_time)
      setEndDay(end_date)
      setEndTime(end_time)
    }
  }, [detailTask])

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
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => t('LABEL_CHAT_TASK_HOAN_THANH')}
      onConfirm={handlePressConfirm}
      canConfirm={validate()}
      maxWidth='sm'
      className="progressModal modal_height_30vh"
    >
      <DialogContent >
        <StartEndDay component={'span'}>
          <BeginEndTime component={'span'}>{t('LABEL_CHAT_TASK_BAT_DAU')}</BeginEndTime>
          <TimePicker
            className="progressModal--timeSelect"
            value={startTime}
            onChange={setStartTime}
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
          <BeginEndTime component={'span'}>{t('LABEL_CHAT_TASK_KET_THUC')}</BeginEndTime>
          <TimePicker
            className="progressModal--timeSelect"
            value={endTime}
            onChange={setEndTime}
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
    </JobDetailModalWrap>
  )
}

export default ProgressModal;