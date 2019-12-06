import React from 'react';
import {
  IconButton, Typography, Dialog, Button, withStyles, Radio, RadioGroup,
  // Input, Select, 
  TextField
} from '@material-ui/core';
import styled from 'styled-components';
import { mdiHelpCircle, mdiAccountPlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import SearchInput from '../../../../components/SearchInput';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import addMemberIcon from '../../../../assets/addMemberIcon.png';
import colorPal from '../../../../helpers/colorPalette';
import AddMemberModal from './AddMemberModal';
import TimeField from 'react-simple-timefield';
import InputSelect from '../../TabPart/ProgressTab/OutlinedInputSelect'
// import { Scrollbars } from 'react-custom-scrollbars'
import { WrapperContext } from '../../index'
import {
  DEFAULT_DATE_TEXT, DEFAULT_END_TIME_TEXT, DEFAULT_START_TIME_TEXT, EMPTY_STRING, DEFAULT_GROUP_TASK_VALUE
} from '../../../../helpers/jobDetail/stringHelper';


// const Header = styled.div`
//   padding: 0 15px;
//   height: 85px;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.1);
//   & > * {
//     display: flex; 
//     align-items: center;
//     justify-content: space-between;
//     cursor: pointer;
//   }
// `;

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`

const StartEndDate = styled(Typography)`
  margin: 0 15px;
`

const Typotitle = styled(Typography)`
  font-size: 16px;
  color: #444444;
`

const ProgressWork = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-top: 20px;
`

const TitleText = styled(Typography)`
  display: flex;
  justify-content: space-between;
  & > *:first-child {
    font-size: 15px;
    color: #444444;
  }
  & > *:last-child {
    color: #fa0000;
    font-size: 14px;
  }
`

const OutlineInput = styled(OutlinedInput)`
& > input {
  padding: 10px 5px;
  margin-left: 10px;
}
`

// const HeaderBottomBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CustomSelect = styled(Select)`
//   width: 100%;
//   & > div:focus {
//     background-color: #fff !important;
//   }
//   &::before, &:hover::before, &:focus::before {    
//     border-bottom: none !important;
//   }
//   &::after, &:hover::after, &:focus::after {
//     border-bottom: none !important;
//   }
// `;

const BeginEndTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`
const TypoText = styled(Typography)`
  font-size: 15px;
  color: #505050;
  margin: 20px 0 15px 0;
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

const PriorityFormControl = styled(FormControl)`
  display: flex;
`

const PriorityRadioGroup = styled(RadioGroup)`
  justify-content: space-evenly;
`

const SpecialControlLabel = styled(FormControlLabel)`
  background-color: ${props => props.checked
    ? colorPal['#ffd3b4'][0]
    : colorPal['grey'][0]};
  width: 27%;
  border-radius: 30px;
  margin: 0;
  justify-content: center;
  padding: 5px 0;
  & > span:first-child { display: none; }
`;


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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
    justifyContent: 'space-between',
    padding: "15px 24px",
  },
}))(MuiDialogActions);

const DefaultFlex = styled(Typography)`
  display: flex;
  color: #4380fe
  & > svg {
    margin-left: 5px;
    & > path {      
      fill: #bbbbbb
    }
  }
`

const InputTextJob = styled(TextField)`
    margin: 0;
    & > label {
        font-size: 14px;
        z-index: 0
    }
`

const TextInputSelect = styled(InputSelect)`
    & > *:first-child {
        & > *:first-child {
          padding: 6px;
        }
    }
`

const TitleDialog = styled(DialogTitle)`
    display: flex;
    position: sticky;
    top: 0;
    z-index: 999;
    background: #f5f8fc;
    border-bottom: 1px solid #0000001f;
    text-transform: uppercase;
    font-weight: 400
`

let assignList = [
  { id: 0, value: 'Được giao' },
  { id: 1, value: 'Tự đề xuất' },
  { id: 2, value: 'Giao việc cho' },
]
const DEFAULT_ASSIGN = assignList[0].value
const DEFAULT_ASSIGN_ID = assignList[0].id

function CommonControlForm(props) {
  const [value, setValue] = React.useState(props.assign);
  const handleChangeFormAssign = itemValue => {
    console.log('itemValue::::', itemValue);

    setValue(itemValue)
    let clickedItem = props.labels.find(item => item.value === itemValue)
    props.handleChangeAssign(clickedItem)
  }
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={value}
        onChange={event => handleChangeFormAssign(event.target.value)} row>
        {props.labels && props.labels.map((item, key) =>
          <FormControlLabel
            key={key}
            value={item.value}
            control={<Radio color="primary" />}
            label={item.value}
            labelPlacement="end"
          />
        )}
      </RadioGroup>
    </FormControl>
  )
}
// Define variable using in form
let priorityList = [
  { id: 2, value: 'Thấp' },
  { id: 1, value: 'Trung bình' },
  { id: 0, value: 'Cao' },
]
const DEFAULT_PRIORITY = priorityList[0].value
const DEFAULT_PRIORITY_ID = priorityList[0].id

function CommonPriorityForm(props) {
  const [value, setValue] = React.useState(props.priority)

  const handleChangePriority = itemValue => {
    console.log('itemValue::::', itemValue);

    // Set state to change style in component
    setValue(itemValue)
    // Pass clicked item to parent
    let clickedItem = props.labels.find(item => item.value === itemValue)
    props.handleChangeLabel(clickedItem)
  }

  return (
    <PriorityFormControl component="fieldset">
      <PriorityRadioGroup
        aria-label="position" name="position" value={value}
        onChange={event => handleChangePriority(event.target.value)} row>
        {
          props.labels.map((item, idx) =>
            <SpecialControlLabel
              key={idx}
              value={item.value}
              control={<Radio />}
              label={item.value}
              checked={value === item.value}
            />
          )
        }
      </PriorityRadioGroup>
    </PriorityFormControl>
  )
}
const StyleDialog = styled(Dialog)`
  & > div:nth-child(3) > div{
    overflow: hidden;
  }
`
const ButtonImage = styled(Button)`
  transform: scaleX(-1);
  padding: 6px 0;
  min-width: 54px;
  border: 1px solid #abaaa9;
`
const ContentDialog = styled(DialogContent)`
  border: none;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px
  }
  ::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
  &&:hover {
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px; 
    }
  }
`
const DialogFooter = styled(DialogActions)`
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 100;
  border-top: 1px solid rgba(0, 0, 0, 0.12)
`
const DEFAULT_DATA = {
  name: EMPTY_STRING,
  description: EMPTY_STRING,
  start_time: DEFAULT_START_TIME_TEXT,
  start_date: DEFAULT_DATE_TEXT,
  end_time: DEFAULT_END_TIME_TEXT,
  end_date: DEFAULT_DATE_TEXT,
  type_assign: DEFAULT_ASSIGN_ID,
  priority: DEFAULT_PRIORITY_ID,
  group_task: EMPTY_STRING,
  priorityLabel: DEFAULT_PRIORITY,
  assignValue: DEFAULT_ASSIGN,
}

function CreateJobModal(props) {

  const value = React.useContext(WrapperContext)
  const [data, setDataMember] = React.useState(DEFAULT_DATA)
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [listGroupTask, setListGroupTask] = React.useState([])
  const [groupTaskValue, setGroupTaskValue] = React.useState(null)

  React.useEffect(() => {
    if (value.listTaskDetail) {
      // Map task to input
      let listTask = value.listTaskDetail.tasks.map((item) => ({
        label: item.id !== DEFAULT_GROUP_TASK_VALUE ? item.name : "Chưa phân loại",
        value: item.id
      }))
      setListGroupTask(listTask)

      // Set default group for input
      let item = value.listTaskDetail.tasks.find(item => item.id === DEFAULT_GROUP_TASK_VALUE)
      if (item) setGroupTaskValue(DEFAULT_GROUP_TASK_VALUE)
    }
  }, [value.listTaskDetail])

  React.useEffect(() => {
    if (props.data) {
      let tempData = props.data
      if (!tempData.name) tempData.name = ''
      if (!tempData.description) tempData.description = ''
      if (!tempData.start_date) tempData.start_date = ''
      if (!tempData.start_time) tempData.start_time = ''
      if (!tempData.end_date) tempData.end_date = ''
      if (!tempData.end_time) tempData.end_time = ''
      if (!tempData.group_task) tempData.group_task = ''
      // if (!tempData.type_assign) tempData.type_assign = ''
      let priority = priorityList.find(item => item.id === tempData.priority_code)
      tempData.priorityLabel = priority ? priority.value : DEFAULT_PRIORITY
      let assign = assignList.find(item => item.id === tempData.type_assign)
      tempData.assignLabel = assign ? assign.value : DEFAULT_ASSIGN
      setDataMember(tempData)
    }
  }, [props.data])

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }))
  }

  const handleClose = () => {
    props.setOpen(false)
  }

  const dataCreateJob = {
    group_task: data.group_task,
    name: data.name,
    description: data.description,
    type_assign: data.type_assign,
    priority: data.priority,
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time
  }
  const validate = () => !!data.name

  const handlePressConfirm = () => {
    if(validate()) {
      value.createJobByProjectId(dataCreateJob)
      handleClose()
    } else {
      alert("Bạn cần nhập tên công việc")
    }
  }

  return (
    <div>
      <StyleDialog open={props.isOpen} fullWidth onClose={handleClose}>
        {props.isRight
          ?
          <TitleDialog onClose={handleClose}>
            Chỉnh sửa công việc
          </TitleDialog>
          :
          <TitleDialog onClose={handleClose} >
            Tạo công việc
          </TitleDialog>
        }
        <ContentDialog dividers >
          <Typography component={'div'}>
            <TitleText component={'span'}>
              <InputTextJob
                id="outlined-helperText"
                label="Tên công việc"
                helperText="Không được để trống"
                margin="normal"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={e => handleChangeData("name", e.target.value)}
              />
              {/* <Typography component={'span'}>Tên công việc</Typography>
              <Typography component={'span'}>(tối đa 100 ký tự)</Typography> */}
            </TitleText>
            {/* <Input
              fullWidth
            /> */}
          </Typography>
          <ProgressWork component={'span'}>
            <Typotitle component={'span'}>
              Tiến độ công việc
          </Typotitle>
            <DefaultFlex component={'span'}>
              Đặt mặc định <Icon path={mdiHelpCircle} size={1} />
            </DefaultFlex>
          </ProgressWork>
          <CommonControlForm label1='Ngày và giờ (mặc định)' label2='Chỉ nhập ngày' label3='Không yêu cầu' />
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>Bắt đầu</BeginEndTime>
            <DivTime>
              <InputTime
                value={data.start_time}
                onChange={e => handleChangeData("start_time", e.target.value)}
              />
            </DivTime>
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput
              type={'date'}
              value={data.start_date}
              onChange={e => handleChangeData("start_date", e.target.value)}
            />
          </StartEndDay>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>Kết thúc</BeginEndTime>
            <DivTime>
              <InputTime
                value={data.end_time}
                onChange={e => handleChangeData("end_time", e.target.value)}
              />
            </DivTime>
            <StartEndDate component={'div'}>Ngày</StartEndDate>
            <OutlineInput
              type={'date'}
              value={data.end_date}
              inputProps={{ min: data.start_date }}
              onChange={e => handleChangeData("end_date", e.target.value)}
            />
          </StartEndDay>
          <TypoText component={'div'}> Chọn nhóm việc </TypoText>
          <Typography component={'div'} style={{ marginBottom: '20px' }}>
            <TextInputSelect
              commandSelect={listGroupTask}
              selectedIndex={groupTaskValue}
              setOptions={typeId => handleChangeData("group_task", typeId)}
              placeholder={'Nhóm mặc định'}
            />
          </Typography>
          <Typography component={'div'}>
            <TitleText component={'div'}>
              <InputTextJob
                id="outlined-helperText"
                label="Mô tả công việc"
                // helperText=""
                margin="normal"
                fullWidth
                variant="outlined"
                value={data.description}
                onChange={e => handleChangeData("description", e.target.value)}
              />
              {/* <Typography component={'div'}> Mô tả công việc </Typography>
              <Typography component={'div'}>(Tối đa 500 kí tự)</Typography> */}
            </TitleText>
            {/* <Input
              style={{ marginBottom: 10 }}
              fullWidth
            /> */}
          </Typography>
          <Typography component={'span'}>
            <TypoText component={'div'}>Mức độ ưu tiên</TypoText>
            <CommonPriorityForm
              labels={priorityList}
              priority={data.priorityLabel}
              handleChangeLabel={priorityItem => handleChangeData("priority", priorityItem.id)}
            />
          </Typography >
          <Typography component={'span'}>
            <TypoText component={'div'}> Hình thức giao việc </TypoText>
            <CommonControlForm
              labels={assignList}
              assign={data.assignValue}
              handleChangeAssign={assignItem => handleChangeData('type_assign', assignItem.id)}
            />
          </Typography>
        </ContentDialog>
        <DialogFooter>
          {props.isRight ?
            <>
              <span></span>
              <Button onClick={handleClose} color="primary">
                Hoàn Thành
            </Button>
            </>
            :
            <>
              <ButtonImage onClick={() => {
                handleClose()
                setOpenAddModal(true)
              }} >
                <Icon path={mdiAccountPlusOutline} alt='addMemberIcon' size={1} color={'#abaaa9'} />
              </ButtonImage>
              <Button autoFocus onClick={handlePressConfirm} color="primary">
                TẠO VIỆC
          </Button>
            </>
          }
        </DialogFooter>
      </StyleDialog>
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  )
}


export default CreateJobModal;
