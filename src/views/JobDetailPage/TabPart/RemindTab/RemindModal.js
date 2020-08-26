import DateFnsUtils from "@date-io/date-fns";
import { Button, InputAdornment, TextField, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { openCreateRemind } from 'actions/chat/chat';
import TimePicker from 'components/TimePicker';
import TitleSectionModal from 'components/TitleSectionModal';
import "date-fns";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { postRemindDuration, postRemindWithTimeDetail, updateRemindWithDuration, updateRemindWithTimeDetail } from '../../../../actions/taskDetail/taskDetailActions';
import ColorChip from '../../../../components/ColorChip';
import { convertDate, DEFAULT_DATE_TEXT, DEFAULT_TIME_TEXT, isValidDuration, REMIND_SCHEDULE_TYPE, REMIND_TIME_TYPE } from '../../../../helpers/jobDetail/stringHelper';
// import TimeField from 'react-simple-timefield';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect';

const TitleText = styled(Typography)`
    font-size: 15px;
    margin: 0 0 15px 0;
  `

const HelperText = styled(Typography)`
      color: #a3a3a3
      font-size: 12px;
      margin: 8px 0 0;
  `

const BadgeItem = styled(ColorChip)`
    font-weight: 600;
    border-radius: 3px;
    margin: 5px 6px 5px 0;
  `

const InputDate = styled(KeyboardDatePicker)`
  & > div:nth-child(2) {
    width: 146px;
    padding-right: 5px;
    & > div > button {
      padding: 5px;
    }
  } 
`

const ContentText = styled(TextField)`
    & > label {
      font-size: 14px;
      z-index: 0
    }
`
const InputSelect = styled(OutlinedInputSelect)`
    & > *:first-child > div > div {
      padding: 12px;
    }
`
const InputProgress = styled(OutlinedInput)`
    & > input {
      padding: 0 0 0 14px;
    }
`
const DurationButton = styled(Button)`
  margin-left: 20px;
  width: 90px;
  box-shadow: none;
`

const DEFAULT_DATA = {
  id: "",
  type: REMIND_TIME_TYPE,
  content: "",
  date_remind: DEFAULT_DATE_TEXT,
  time_remind: DEFAULT_TIME_TEXT,
  type_remind: REMIND_SCHEDULE_TYPE,
  frequency: 1,
  duration: [],
}

const KEYCODE_ENTER = 13;

function RemindModal(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [data, setData] = React.useState(DEFAULT_DATA)
  const isOpenCreateRemind = useSelector(state => state.chat.isOpenCreateRemind);
  const isCreateRemind = useSelector(state => state.chat.isCreateRemind);
  const dataRemind = useSelector(state => state.chat.dataRemind);
  const isFetching = useSelector(state => state.taskDetail.taskRemind.isFetching)
  const error = useSelector(state => state.taskDetail.taskRemind.error)

  const selector = [
    {
      value: 0,
      label: t('LABEL_CHAT_TASK_NHAC_HEN_THEO_THOI_GIAN'),
    },
    {
      value: 1,
      label: t('LABEL_CHAT_TASK_NHAC_HEN_THEO_TIEN_DO_THUC_TE'),
    }
  ];

  const badges = [
    {
      value: 0,
      label: t('LABEL_CHAT_TASK_NHAC_1_LAN'),
    },
    {
      value: 1,
      label: t('LABEL_CHAT_TASK_THEO_NGAY'),
    },
    {
      value: 2,
      label: t('LABEL_CHAT_TASK_THEO_TUAN'),
    },
    {
      value: 3,
      label: t('LABEL_CHAT_TASK_THEO_THANG'),
    },
  ]
  function setOpenCreate(isOpen) {
    dispatch(openCreateRemind(isOpen))
  }

  React.useEffect(() => {
    if (isCreateRemind) {
      setData(DEFAULT_DATA)
    } else if (dataRemind) {
      let tempData = { ...dataRemind }
      tempData.date_remind = dataRemind.created_at_original || DEFAULT_DATE_TEXT
      if (!tempData.time_remind) tempData.time_remind = DEFAULT_TIME_TEXT
      if (!tempData.type_remind) tempData.type_remind = REMIND_SCHEDULE_TYPE
      if (!tempData.duration) tempData.duration = []
      setData(tempData)
    }
  }, [dataRemind, isCreateRemind])

  React.useEffect(() => {
    if (!isFetching && !error)
      dispatch(openCreateRemind(false));
  }, [isFetching, error])

  const handleChangeData = (attName, value) => {
    setData(prevState => ({ ...prevState, [attName]: value }))
  }

  const handlePressConfirm = () => {
    const dataUpdateRemind = {
      task_id: taskId,
      remind_id: data.id,
      type: data.type,
      content: data.content,
      date_remind: data.date_remind + " " + data.time_remind,
      type_remind: data.type_remind
    }
    const dataCreateRemindDuration = {
      task_id: taskId,
      content: data.content,
      duration: data.duration
    }
    const dataUpdateRemindDuration = {
      task_id: taskId,
      remind_id: data.id,
      content: data.content,
      duration: data.duration
    }
    if (isCreateRemind) {
      // Case 1: Call create remind with time
      if (data.type === REMIND_TIME_TYPE) {
        dispatch(postRemindWithTimeDetail({ taskId: taskId, data }))
      }
      // Case 2: Call create remind with progress
      else {
        dispatch(postRemindDuration(dataCreateRemindDuration))
      }
    } else {
      // Case 3: Call update remind with time
      if (data.type === REMIND_TIME_TYPE) {
        dispatch(updateRemindWithTimeDetail({ data: dataUpdateRemind, taskId }))
      }
      // Case 4: Call update remind with progress
      else {
        dispatch(updateRemindWithDuration({ data: dataUpdateRemindDuration, taskId }))
      }
    }
  }

  const [value, setValue] = React.useState('')

  const handleChangeDuration = value => {
    if (isValidDuration(value) || value === "")
      setValue(value)
  }

  const handlePressKeyInDurationInput = keyCode => {
    // Check key that user press
    if (keyCode === KEYCODE_ENTER) {
      // Call add duration function
      addDuration()
      // Reset input field
      setValue("")
    }
  }

  const addDuration = () => {
    if (isValidDuration(value)) {
      // Add new duration and sort array
      let sortedArr = data.duration.concat(parseInt(value)).sort()
      // Remove duplicate element
      sortedArr = Array.from(new Set(sortedArr))
      // Set new duration
      handleChangeData("duration", sortedArr)
      // Reset input field
      setValue("")
    }
  }

  // Remove duration by it's index
  const removeAnDuration = durationIdx => {
    let newDuration = [...data.duration]
    newDuration.splice(durationIdx, 1)
    handleChangeData("duration", newDuration)
  }

  function validate() {
    return data.content
  }

  return (
    <JobDetailModalWrap
      maxWidth='sm'
      className="remindModal"
      title={(isCreateRemind) ? t('LABEL_CHAT_TASK_TAO_NHAC_HEN_LABEL') : t('LABEL_CHAT_TASK_SUA_NHAC_HEN_LABEL')}
      open={isOpenCreateRemind}
      setOpen={setOpenCreate}
      confirmRender={() => (!isCreateRemind) ? t('IDS_WP_UPDATE') : t('LABEL_CHAT_TASK_TAO_NHAC_HEN')}
      onConfirm={handlePressConfirm}
      actionLoading={isFetching}
      manualClose
      onCancle={() => setOpenCreate(false)}
      canConfirm={validate()}
    >
      <React.Fragment>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_LOAI_NHAC_HEN')} isRequired />
        <InputSelect
          commandSelect={selector}
          selectedIndex={data.type}
          setOptions={typeId => { handleChangeData("type", typeId); }}
          isDisabled={!isCreateRemind}
        />
        {/* Middle JSX */}
        {data.type === REMIND_TIME_TYPE ?
          <Typography component="div">
            <HelperText>{t('LABEL_CHAT_TASK_BAN_CO_LICH_HEN')}</HelperText>
            <div className="remind-title">
              <div className="remindModal--dateRemind">
                <TitleSectionModal label={t('LABEL_CHAT_TASK_NGAY_NHAC')} isRequired />
              </div>
              <div className="remindModal--timeRemind">
                <TitleSectionModal label={t('LABEL_CHAT_TASK_GIO_NHAC')} isRequired />
              </div>
              <div className="remindModal--repeatRemind">
                <TitleSectionModal label={t('LABEL_CHAT_TASK_NHAC_HEN_DINH_KY')} isRequired />
              </div>
              {
                data.type_remind !== 0 && (
                    <div className="remindModal--frequencyRemind">
                      <TitleSectionModal label={t('views.calendar_page.modal.create_personal_remind.frequency')} isRequired />
                    </div>
                )
              }
            </div>
            <div className="remind-body">
              <div className={"remind-date"}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <InputDate
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      value={data.date_remind}
                      onChange={e => handleChangeData("date_remind", convertDate(e))}
                      KeyboardButtonProps={{
                        "aria-label": "date change"
                      }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={"remind-time"}>
                <TimePicker
                  variant="outlined"
                  value={data.time_remind}
                  onChange={value => handleChangeData("time_remind", value)}
                  width={data.type_remind !== 0 ? 15 : 20}
                />
              </div>
              <div className="type-remind" >
                <OutlinedInputSelect
                  commandSelect={badges}
                  selectedIndex={data.type_remind}
                  setOptions={typeId => { handleChangeData("type_remind", typeId); }}
                />
              </div>
              {
                data.type_remind !== 0 && (
                    <div className={"remind_setting_frequency"}>
                      <OutlinedInput
                          className={"remind_setting_frequency_input"}
                          value={data.frequency}
                          onChange={({target}) => handleChangeData('frequency', target.value)}
                          endAdornment={
                            <InputAdornment
                                position="end"
                                disableTypography={true}
                                variant={"filled"}
                            >
                              {t(`IDS_WP_REMIND_CALENDAR_FREQUENCY_${data.type_remind}`)}
                            </InputAdornment>
                          }
                      />
                    </div>
                )
              }
            </div>
          </Typography>
          :
          <div>
            <HelperText>{t('LABEL_CHAT_TASK_KHI_TIEN_DO_CONG')}</HelperText>
            <Typography className="remindModal--mileStone" component="div">
              <TitleSectionModal label={t('LABEL_CHAT_TASK_MOC_TIEN_DO_CAN_NHAC')} isRequired />
            </Typography>
            <div className="wrapper-progress">
              <InputProgress
                fullWidth
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                value={value}
                type="number" min={0} max={100}
                onChange={e => handleChangeDuration(e.target.value)}
                onKeyDown={e => handlePressKeyInDurationInput(e.keyCode)}
              />
              <DurationButton onClick={addDuration}
                variant="contained"
              >{t('LABEL_CHAT_TASK_THEM')}</DurationButton>
            </div>
            <Typography component={'div'} className="remindModal--chipWrap">
              {data.duration.map((item, key) => (
                <BadgeItem
                  className="remindModal--chip"
                  // onClick={() => removeAnDuration(key)}
                  key={key}
                  color={'orangelight'}
                  label={item + ' %'}
                  onDelete={() => removeAnDuration(key)}
                  deleteIcon={<CloseIcon />}
                  badge component='span' />
              ))}
            </Typography>
          </div>
        }
        {/* ------- */}
        <TitleSectionModal label={t('LABEL_CHAT_TASK_NOI_DUNG_NHAC_HEN')} isRequired />
        <ContentText
          fullWidth
          multiline
          rowsMax={18}
          rows="7"
          value={data.content}
          margin="normal"
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG_NHAC_HEN')}
          variant="outlined"
          styled={{ zIndex: 1 }}
          onChange={e => handleChangeData("content", e.target.value)}
        />
      </React.Fragment>
    </JobDetailModalWrap >
  )
}

export default RemindModal