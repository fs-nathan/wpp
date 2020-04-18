import DateFnsUtils from "@date-io/date-fns";
import { Button, InputAdornment, TextField, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { postRemindDuration, postRemindWithTimeDetail, updateRemindWithDuration, updateRemindWithTimeDetail } from '../../../../actions/taskDetail/taskDetailActions';
import ColorChip from '../../../../components/ColorChip';
import { convertDate, DEFAULT_DATE_TEXT, DEFAULT_TIME_TEXT, isValidDuration, REMIND_SCHEDULE_TYPE, REMIND_TIME_TYPE } from '../../../../helpers/jobDetail/stringHelper';
// import TimeField from 'react-simple-timefield';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect';

const selector = [
  {
    value: 0,
    label: 'Nhắc hẹn theo thời gian',
  },
  {
    value: 1,
    label: 'Nhắc hẹn theo tiến độ thực tế',
  }
];

const badges = [
  {
    value: 0,
    label: 'Nhắc 1 lần',
  },
  {
    value: 1,
    label: 'Theo ngày',
  },
  {
    value: 2,
    label: 'Theo tuần',
  },
  {
    value: 3,
    label: 'Theo tháng',
  },
]

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

const InputDateTime = styled(TextField)`
    width: 146px !important;
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
  duration: [],
}

const KEYCODE_ENTER = 13;

function RemindModal(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [data, setData] = React.useState(DEFAULT_DATA)
  const [isCreateModal] = React.useState(props.isCreate)

  React.useEffect(() => {
    if (props.data) {
      let tempData = { ...props.data }
      tempData.date_remind = props.data.created_at_original || DEFAULT_DATE_TEXT
      if (!tempData.time_remind) tempData.time_remind = DEFAULT_TIME_TEXT
      if (!tempData.type_remind) tempData.type_remind = REMIND_SCHEDULE_TYPE
      if (!tempData.duration) tempData.duration = []
      setData(tempData)
    }
  }, [props.data])

  const handleChangeData = (attName, value) => {
    // console.log('valueRemind:::',attName, value)
    setData(prevState => ({ ...prevState, [attName]: value }))
  }

  const handlePressConfirm = () => {
    // TODO: validate
    // const [dd, mm, yyyy] = data.date_remind.split('/')
    // data.date_remind = `${yyyy}/${mm}/${dd}`;
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
    if (isCreateModal) {
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
    // Close modal
    props.setOpen(false)
  }
  const [value, setValue] = React.useState('')
  // console.log("daataaA::::", data)

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
    let newDuration = data.duration
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
      title={"Nhắc hẹn"}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => (props.isRemind) ? "Chỉnh sửa nhắc hẹn" : "Tạo nhắc hẹn"}
      onConfirm={handlePressConfirm}
      canConfirm={validate()}
    >
      <React.Fragment>
        <TitleText component="div">Loại nhắc hẹn</TitleText>
        <InputSelect
          commandSelect={selector}
          selectedIndex={data.type}
          setOptions={typeId => { handleChangeData("type", typeId); }}
          isDisabled={!isCreateModal}
        />
        {/* Middle JSX */}
        {data.type === REMIND_TIME_TYPE ?
          <Typography component="div">
            <HelperText>Bạn có lịch hẹn, ghi chú, sự kiện... quan trọng ? Hãy tạo nhắc hẹn theo thời gian để hệ thống nhắc nhở bạn khi đến hẹn</HelperText>
            <div className="remind-title">
              <div className="remindModal--dateRemind" component="span">Ngày nhắc</div>
              <div className="remindModal--timeRemind" component="span">Giờ nhắc</div>
              <div className="remindModal--repeatRemind" component="span">Nhắc hẹn định kỳ</div>
            </div>
            <div className="remind-body">
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
              <span>
                <InputDateTime
                  type={'time'}
                  variant="outlined"
                  value={data.time_remind}
                  onChange={e => handleChangeData("time_remind", e.target.value)}
                />
              </span>
              <div className="type-remind" >
                <OutlinedInputSelect
                  commandSelect={badges}
                  selectedIndex={data.type_remind}
                  setOptions={typeId => { handleChangeData("type_remind", typeId); }}
                />
              </div>
            </div>
          </Typography>
          :
          <div>
            <HelperText>Khi tiến độ công việc được xác định (tự động) dựa trên thời gian hiện tại (thời gian thực) lớn hơn hoặc bằng mốc đã chọn, hệ thống sẽ nhắc nhở bạn</HelperText>
            <Typography className="remindModal--mileStone" component="div">Mốc tiến độ cần nhắc</Typography>
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
              >Thêm</DurationButton>
            </div>
            <Typography component={'div'}>
              {data.duration.map((item, key) => (
                <BadgeItem onClick={() => removeAnDuration(key)} key={key} color={'orangelight'} label={item + ' %'} size='small' badge component='small' />
              ))}
            </Typography>
          </div>
        }
        {/* ------- */}
        <ContentText
          label="Nội dung"
          fullWidth
          multiline
          rows="7"
          value={data.content}
          margin="normal"
          placeholder="Nhập nội dung nhắc hẹn"
          variant="outlined"
          styled={{ zIndex: 1 }}
          onChange={e => handleChangeData("content", e.target.value)}
        />
      </React.Fragment>
    </JobDetailModalWrap >
  )
}

export default RemindModal