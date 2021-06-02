import DateFnsUtils from "@date-io/date-fns";
import { Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { updateTimeDuration } from 'actions/taskDetail/taskDetailActions';
import TimePicker from 'components/TimePicker';
import { listTimeSelect } from 'components/TimeSelect';
import TitleSectionModal from 'components/TitleSectionModal';
import "date-fns";
import { compareDateTime, convertDate, convertDateByFormat, DEFAULT_DATE_TEXT } from 'helpers/jobDetail/stringHelper';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import CommonProgressForm from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonProgressForm";
import { taskIdSelector } from '../../selectors';
import './styles.scss';

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin: 30px 0;
`

const BeginEndTime = styled(Typography)`
  width: 60px;
  margin-right: 20px;
  margin-top: 10px;
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
  const dateFormat = useSelector(state => state.system.profile.format_date);
  const isFetching = useSelector(state => state.taskDetail.trackingTime.isFetching)
  const error = useSelector(state => state.taskDetail.trackingTime.error)
  const date_status = useSelector(state => get(state, 'project.setting.detailStatus.data.status.date'));

  // console.log("value time:::::", value);
  const [startTime, setStartTime] = React.useState(listTimeSelect[16])
  const [endTime, setEndTime] = React.useState(listTimeSelect[34])
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT)
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT)
  const [type, setType] = React.useState(props.taskData ? props.taskData.type_time : date_status);

  const optionsList = useMemo(() => [
    { value: 2, label: t('LABEL_CHAT_TASK_NGAY_VA_GIO') },
    { value: 1, label: t('LABEL_CHAT_TASK_CHI_NHAP_NGAY') },
    { value: 0, label: t('LABEL_CHAT_TASK_KHONG_YEU_CAU') }
  ], [t]);

  React.useEffect(() => {
    // console.log('detailTask', detailTask)
    if (detailTask) {
      const {
        start_time,
        start_date,
        end_time,
        end_date,
        type_time,
      } = props.taskData ? props.taskData : detailTask;
      const defaultStart = convertDate(new Date());

      setStartDay(start_date ?
        convertDateByFormat(start_date, dateFormat) : defaultStart)
      if (start_time) setStartTime(start_time)
      setEndDay(end_date ?
        convertDateByFormat(end_date, dateFormat) : defaultStart)
      if (end_time) setEndTime(end_time)
      if (type_time === 0) setType(2)
      else if (type_time === 1) setType(1)
      else if (type_time === 2) setType(0)
    }
  }, [dateFormat, detailTask, props.taskData])

  const handleStartDay = (startDay) => {
    setStartDay(startDay)
  }
  const handleEndDay = (endDay) => {
    setEndDay(endDay)
  }

  const handlePressConfirm = () => {
    const data = {
      task_id: props.taskData ? props.taskData.id : taskId,
      start_date: startDay,
      end_date: endDay,
      start_time: startTime,
      end_time: endTime,
      from_view: props.fromView
    }
    if (type === 0) {
      data.start_date = undefined;
      data.start_time = undefined;
      data.end_date = undefined;
      data.end_time = undefined;
    } else if (type === 1) {
      data.start_time = undefined;
      data.end_time = undefined;
    }
    // console.log("data", data);
    dispatch(updateTimeDuration(data));
    // props.setOpen(false)
  }

  function validate() {
    try {
      const result = compareDateTime(`${startDay} ${startTime || '00:00'}`, `${endDay} ${endTime || '00:00'}`)
      // console.log('validate', result)
      return result < 0;// && type > 0;
    } catch (error) {
      // console.log('error', error)
      return false
    }
  }

  React.useEffect(() => {
    if (!isFetching && !error)
      props.setOpen(false);
    // eslint-disable-next-line
  }, [isFetching, error])

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => t('LABEL_CHAT_TASK_HOAN_THANH')}
      onConfirm={handlePressConfirm}
      canConfirm={validate()}
      manualClose
      onCancle={() => props.setOpen(false)}
      actionLoading={isFetching}
      maxWidth='sm'
      className="progressModal modal_height_40vh"
    >
      <TitleSectionModal label={t('LABEL_CHAT_TASK_TIEN_DO_CONG_VIEC')} isRequired />
      <CommonProgressForm
        items={optionsList}
        value={type}
        handleChange={setType}
        defaultState={date_status}
      />
      {type !== 0 &&
        <>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>{t('LABEL_CHAT_TASK_BAT_DAU')}</BeginEndTime>
            {type !== 1 && <TimePicker
              className="progressModal--timeSelect"
              value={startTime}
              onChange={setStartTime}
            />}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <InputDate
                autoOk
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
                invalidDateMessage={t('LABEL_CHAT_TASK_INVALID_DATE_FORMAT')}
              // invalidLabel="invalidLabel"
              // maxDateMessage="maxDateMessage"
              // minDateMessage="minDateMessage"
              />
            </MuiPickersUtilsProvider>
          </StartEndDay>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>{t('LABEL_CHAT_TASK_KET_THUC')}</BeginEndTime>
            {type !== 1 && <TimePicker
              className="progressModal--timeSelect"
              value={endTime}
              onChange={setEndTime}
            />}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <InputDate
                autoOk
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
                invalidDateMessage={t('LABEL_CHAT_TASK_INVALID_DATE_FORMAT')}
              />
            </MuiPickersUtilsProvider>
          </StartEndDay>
        </>}
    </JobDetailModalWrap>
  )
}

export default ProgressModal;