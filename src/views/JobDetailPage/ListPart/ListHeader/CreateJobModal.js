import React from 'react';
import { Select, IconButton, Typography, Dialog, Button, withStyles, Radio, RadioGroup, Input, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {  mdiHelpCircle ,mdiAccountPlusOutline} from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import addMemberIcon from '../../../../assets/addMemberIcon.png';
import colorPal from '../../../../helpers/colorPalette';
import AddMemberModal from './AddMemberModal';
import TimeField from 'react-simple-timefield';
import InputSelect from '../../TabPart/ProgressTab/OutlinedInputSelect'



const Header = styled.div`
  padding: 0 15px;
  height: 85px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    display: flex; 
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
`;

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
    font-style: italic;
  }
`

const OutlineInput = styled(OutlinedInput)`
& > input {
  padding: 10px 5px;
  margin-left: 10px;
}
`

const HeaderBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  & > div:focus {
    background-color: #fff !important;
  }
  &::before, &:hover::before, &:focus::before {    
    border-bottom: none !important;
  }
  &::after, &:hover::after, &:focus::after {
    border-bottom: none !important;
  }
`;

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

// Define variable using in form
let priorityList = ['Thấp', 'Trung bình', 'Cao']
let priority = priorityList[0]

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
    justifyContent: 'space-between',
    padding: theme.spacing(1),

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
    & > *:last-child {
        color: red;
        margin-left: 10px
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
    background: white;
    border-bottom: 1px solid #0000001f;
`

function CommonControlForm(props) {
  const [value, setValue] = React.useState(props.label1);
  console.log(value)
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={value}
        onChange={event => setValue(event.target.value)} row>
        <FormControlLabel
          value={props.label1}
          control={<Radio color="primary" />}
          label={props.label1}
          labelPlacement="end"
        />
        <FormControlLabel
          value={props.label2}
          control={<Radio color="primary" />}
          label={props.label2}
          labelPlacement="end"
        />
        <FormControlLabel
          value={props.label3}
          control={<Radio color="primary" />}
          label={props.label3}
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  )
}

function CommonPriorityForm(props) {
  const [value, setValue] = React.useState(priority)
  console.log(value)
  return (
    <PriorityFormControl component="fieldset">
      <PriorityRadioGroup
        aria-label="position" name="position" value={value}
        onChange={event => setValue(event.target.value)} row>
        {
          props.labels.map((label, idx) =>
            <SpecialControlLabel
              key={idx}
              value={label}
              control={<Radio />}
              label={label}
              checked={value === label}
            />
          )
        }
      </PriorityRadioGroup>
    </PriorityFormControl>
  )
}

const ButtonImage = styled(Button)`
  transform: scaleX(-1);
  padding: 6px 0;
  min-width: 54px;
  border: 1px solid #abaaa9;
`

function CreateJobModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  }

  const [state, setState] = React.useState('');
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [time, setTime] = React.useState('')

  const handleTime = () => {
    setTime(time);
  }

  return (

    <div>
      <Dialog open={props.isOpen} fullWidth onClose={handleClose}>
        {props.isRight ?
          <TitleDialog onClose={handleClose}>
            Chỉnh sửa công việc
          </TitleDialog>
          :
          <TitleDialog onClose={handleClose} >
            Tạo công việc
          </TitleDialog>
        }
        <DialogContent dividers style={{ overflow: 'hidden', minHeight: 690, borderTop: 'none'}}>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <InputTextJob
                id="outlined-helperText"
                label="Tên công việc"
                helperText="(Tối đa 100 kí tự)"
                margin="normal"
                variant="outlined"
                fullWidth
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
              <InputTime value={time} onChange={handleTime} />
            </DivTime>
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput type={'date'} />
          </StartEndDay>
          <StartEndDay component={'span'}>
            <BeginEndTime component={'span'}>Kết thúc</BeginEndTime>
            <DivTime>
              <InputTime value={time} onChange={handleTime} />
            </DivTime>
            <StartEndDate component={'div'}>Ngày</StartEndDate>
            <OutlineInput type={'date'} />
          </StartEndDay>
          <TypoText component={'div'}> Chọn nhóm việc </TypoText>
          <Typography component={'div'} style={{ marginBottom: '20px' }}>
            <TitleText component={'div'}>
              <Typography component={'div'} style={{ marginBottom: 10}}> Nhóm mặc định </Typography>
              <Typography component={'div'}></Typography>
            </TitleText>
            <TextInputSelect />
          </Typography>
          <Typography component={'div'}>
            <TitleText component={'div'}>
              <InputTextJob
                id="outlined-helperText"
                label="Mô tả công việc"
                helperText="(Tối đa 500 kí tự)"
                margin="normal"
                fullWidth
                variant="outlined"
                
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
            <CommonPriorityForm labels={priorityList} />
          </Typography >
          <Typography component={'span'}>
            <TypoText component={'div'}> Hình thức giao việc </TypoText>
            <CommonControlForm label1='Được giao' label2='Tự đề xuất' label3='Giao việc cho' />
          </Typography>
        </DialogContent>
        <DialogActions>
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
              <Icon path={mdiAccountPlusOutline } alt='addMemberIcon' size={1} color={'#abaaa9'} />
            </ButtonImage>
            <Button autoFocus onClick={handleClose} style={{ color: '#898989' }}>
              TẠO VIỆC
          </Button>
          </>
          }
        </DialogActions>
      </Dialog>
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  )
}


export default CreateJobModal;
