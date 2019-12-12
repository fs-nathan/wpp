import React from 'react';
import {
  IconButton, Typography, Dialog, Button,
  TextField, withStyles, InputAdornment
} from '@material-ui/core';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ColorChip from '../../../../components/ColorChip';
import TimeField from 'react-simple-timefield';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect'
import {
  DEFAULT_DATE_TEXT, DEFAULT_TIME_TEXT, REMIND_TIME_TYPE,
  REMIND_SCHEDULE_TYPE, isValidDuration
} from '../../../../helpers/jobDetail/stringHelper'
import { WrapperContext } from '../../index'

const selector = [
  {
    value: 0,
    label: 'Nhắc hẹn theo thời gian',
  },
  {
    value: 1,
    label: 'Nhắc hẹn theo tiến độ thực tế',
  }
  // ,
  // {
  //   value: 2,
  //   label: 'Nhắc hẹn theo tiến độ kế hoạch',
  // },
  // {
  //   value: 3,
  //   label: 'Nhắc hẹn theo chênh lệch tiến độ hoàn thành giữa Kế hoạch - Thực tế',
  // },
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
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 160,
  },
}));

const TitleText = styled(Typography)`
    font-size: 15px;
    margin: 0 0 15px 0;
  `

const TexTitle = styled(Typography)`
    font-size: 15px;
    width: 204px;
    padding: 15px 0 8px 0;
  `
const HelperText = styled(Typography)`
      color: #a3a3a3
      font-size: 12px;
      margin: 8px 0 0;
  `
const DivTitle = styled.div`
    display: flex;
    margin: 15px 0 0 0;
  `

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
// const Text = styled(TextField)`
//     & > *:first-child {
//       margin-bottom: 20px;
//       & > input {
//         font-size: 16px;
//         margin-bottom: 30px;
//       }
//     }
//   `
const BadgeItem = styled(ColorChip)`
    font-weight: 600;
    border-radius: 3px;
    margin: 5px 6px 5px 0;
  `

const TextRemind = styled(Typography)`
    font-size: 15px;
    display: flex;
    align-items: center;
  `
const InputTime = styled(TimeField)`
    width: 146px !important;
    padding: 18px 5px 18px 13px;
    border: 0;
    border-radius: 4px;
  `
const DivTime = styled.span`
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    height: 100% !important;
    margin-top: 8px;
  `
const SelectInput = styled.div`
    margin-top: 8px;
    width: 160px;
    & > div > div > div  {
        padding : 7px 0;
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

const DEFAULT_DATA = {
  id: "",
  type: REMIND_TIME_TYPE,
  content: "",
  date_remind: DEFAULT_DATE_TEXT,
  time_remind: DEFAULT_TIME_TEXT,
  type_remind: REMIND_SCHEDULE_TYPE,
  duration: [],
}
// const DATA_REMIND_DURATION = {
//   id: "",
//   type: REMIND_TIME_TYPE,
//   content: "",
//   duration: REMINDER_PROGRESS,
// }


function RemindModal(props) {
  console.log('props remind:::', props);
  
  const KEYCODE_ENTER = 13
  const valueRemind = React.useContext(WrapperContext)
  const classes = useStyles()
  // bien menu item
  const [data, setData] = React.useState(DEFAULT_DATA)
  // const [dataDuration, setDataDuration] = React.useState(DATA_REMIND_DURATION)
  const [isCreateModal] = React.useState(props.isCreate)

  // Life cycle
  // React.useEffect(() => {
  //   if (props.dataDuration) {
  //     let templateData = props.dataDuration
  //     if (!templateData.duration) templateData.duration = REMINDER_PROGRESS
  //     setDataDuration(templateData)
  //   }
  // }, [props.dataDuration])

  React.useEffect(() => {
    if (props.data) {
      let tempData = props.data
      if (!tempData.date_remind) tempData.date_remind = DEFAULT_DATE_TEXT
      if (!tempData.time_remind) tempData.time_remind = DEFAULT_TIME_TEXT
      if (!tempData.type_remind) tempData.type_remind = REMIND_SCHEDULE_TYPE
      if (!tempData.duration) tempData.duration = []
      setData(tempData)
    }
  }, [props.data])

  const handleChangeData = (attName, value) => {
    setData(prevState => ({ ...prevState, [attName]: value }))
  }

  // const createRemind = (data) => {
  //   console.log(data);

  //   valueRemind.createRemindWithTimeDetail(data)
  // }

  const handlePressConfirm = () => {
    // TODO: validate
    const dataUpdateRemind = {
      remind_id: data.id,
      type: data.type,
      content: data.content,
      date_remind: data.date_remind + " " + data.time_remind,
      type_remind: data.type_remind
    }
    const dataCreateRemindDuration = {
      task_id: "5da1821ad219830d90402fd8",
      content: data.content,
      duration: data.duration
    }
    const dataUpdateRemindDuration = {
      remind_id: data.id,
      content: data.content,
      duration: data.duration
    }
    if (isCreateModal) {
      // Case 1: Call create remind with time
      if (data.type === REMIND_TIME_TYPE) { valueRemind.createRemindWithTimeDetail({ taskId: "5da1821ad219830d90402fd8", data }) }
      // Case 2: Call create remind with progress
      else { valueRemind.createRemindWithDurationDetail(dataCreateRemindDuration) }
    } else {
      // Case 3: Call update remind with time
      if (data.type === REMIND_TIME_TYPE) { valueRemind.updateRemindWithTimeDetail(dataUpdateRemind) }
      // Case 4: Call update remind with progress
      else { valueRemind.updateRemindWithDurationDetail(dataUpdateRemindDuration) }
    }

    // Close modal
    props.handleClickClose()
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
    let newDuration = data.duration
    newDuration.splice(durationIdx, 1)
    handleChangeData("duration", newDuration)
  }

  const handleCloseModal = () => {
    // Reset data
    setData(DEFAULT_DATA)
    // Close modal
    props.handleClickClose()
  }

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle id="customized-dialog-title" onClose={() => props.handleClickClose()}>
        Nhắc hẹn
      </DialogTitle>
      <DialogContent dividers style={{ overflow: 'hidden' }}>
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
            <DivTitle component="div">
              <TexTitle component="span">Ngày nhắc</TexTitle>
              <TexTitle component="span">Giờ nhắc</TexTitle>
              <TextRemind component="span">Nhắc hẹn định kỳ</TextRemind>
            </DivTitle>
            <Div>
              <TextField
                component="span"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type="date"
                value={data.date_remind}
                onChange={e => handleChangeData("date_remind", e.target.value)}
              />
              <DivTime>
                <InputTime
                  value={data.time_remind}
                  onChange={e => handleChangeData("time_remind", e.target.value)}
                />
              </DivTime>
              <SelectInput >
                <OutlinedInputSelect
                  commandSelect={badges}
                  selectedIndex={data.type_remind}
                  setOptions={typeId => { handleChangeData("type_remind", typeId); }}
                />
              </SelectInput>
            </Div>
          </Typography>
          :
          <div>
            <HelperText>Khi tiến độ công việc được xác định (tự động) dựa trên thời gian hiện tại (thời gian thực) lớn hơn hoặc bằng mốc đã chọn, hệ thống sẽ nhắc nhở bạn</HelperText>
            <TexTitle component="div">Mốc tiến độ cần nhắc</TexTitle>
            <div style={{ display: 'flex' }}>
              <InputProgress
                fullWidth
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                value={value}
                type="number" min={0} max={100}
                onChange={e => handleChangeDuration(e.target.value)}
                onKeyDown={e => handlePressKeyInDurationInput(e.keyCode)}
              />
              <Button onClick={addDuration}
                variant="contained"
                style={{ marginLeft: 20, width: 90, boxShadow: 'none' }}
              >Thêm</Button>
            </div>
            <Typography component={'div'}>
              {data.duration.map((item, key) => (
                <BadgeItem onClick={() => removeAnDuration(key)} key={key} color={'orangelight'} label={item} size='small' badge component='small' />
              ))}
            </Typography>
          </div>
        }
        {/* ------- */}
        <ContentText
          id="outlined-multiline-static"
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
      </DialogContent>
      <DialogActions>
        {props.isRemind ?
          <Button onClick={handlePressConfirm} color="primary">
            Chỉnh sửa nhắc hẹn
        </Button>
          :
          <Button onClick={handlePressConfirm} color="primary">
            Tạo nhắc hẹn
        </Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default RemindModal