import React from 'react';
import { Select, MenuItem, IconButton, Typography, Dialog, Button, withStyles, Radio, RadioGroup, Input } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus, mdiApps, mdiHelpCircle } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import addMemberIcon from '../../../../assets/addMemberIcon.png'
import colorPal from '../../../../helpers/colorPalette'
import AddMemberModal from './AddMemberModal'

import { func } from 'prop-types';


const Header = styled.div`
  padding: 0;
  height: 92px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    margin-bottom: 5px;
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
  margin-top: 25px;
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

const BeginTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`
const EndTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`
const TypoText = styled(Typography)`
  font-size: 15px;
  color: #505050;
  margin: 20px 0;
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
  width: 30%;
  border-radius: 4px;
  margin: 0;
  justify-content: center;
  padding: 10px 0;
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


function ListHeaderSelect({ setShow }) {

  const [value] = React.useState(0);

  return (
    <CustomSelect value={value} >
      <Icon path={mdiApps} size={1.5} />
      <MenuItem value={0}>Job-1</MenuItem>
      <MenuItem value={1}>Job-2</MenuItem>
      <MenuItem value={2}>Job-3</MenuItem>
    </CustomSelect>
  )
}

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

function ListHeader() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const [state, setState] = React.useState('');
  const [openAddModal, setOpenAddModal] = React.useState(false);

  const handleChangeGroup = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <Header>
        <ListHeaderSelect />
        <HeaderBottomBox>
          <SearchInput placeholder='Tìm công việc trong dự án...' />
          <IconButton
            style={{
              marginLeft: "10px",
              padding: "7px"
            }}
            onClick={handleClickOpen}
          >
            <Icon path={mdiPlus} size={1.2} />
          </IconButton>
        </HeaderBottomBox>
      </Header>
      {/* mo modal tao cong viec moi */}
      <Dialog open={open} fullWidth>
        <DialogTitle onClose={handleClose}>
          Tạo công việc
        </DialogTitle>
        <DialogContent dividers>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}>Tên công việc</Typography>
              <Typography component={'span'}>(tối đa 100 ký tự)</Typography>
            </TitleText>
            <Input
              fullWidth
            />
          </Typography>
          <ProgressWork component={'span'}>
            <Typotitle component={'span'}>
              Tiến độ công việc
          </Typotitle>
            <Typography component={'span'}>
              Đặt mặc định <Icon path={mdiHelpCircle} color={"black"} size={1} />
            </Typography>
          </ProgressWork>
          <CommonControlForm label1='Ngày và giờ (mặc định)' label2='Chỉ nhập ngày' label3='Không yêu cầu' />
          <StartEndDay component={'span'}>
            <BeginTime component={'span'}>Bắt đầu</BeginTime>
            <OutlineInput />
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput />
          </StartEndDay>
          <StartEndDay component={'span'}>
            <EndTime component={'span'}>Kết thúc</EndTime>
            <OutlineInput />
            <StartEndDate component={'span'}>Ngày</StartEndDate>
            <OutlineInput />
          </StartEndDay>
          <TypoText component={'div'}> Chọn nhóm việc </TypoText>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}> Nhóm mặc định </Typography>
              <Typography component={'span'}></Typography>
            </TitleText>
            <FormControl fullWidth style={{ marginBottom: 50 }}>
              <Select
                onChange={handleChangeGroup('')}
                native
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Typography>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}> Mô tả công việc </Typography>
              <Typography component={'span'}>(Tối đa 500 kí tự)</Typography>
            </TitleText>
            <Input
              style={{ marginBottom: 10 }}
              fullWidth
            />
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
         
            <Button onClick={() => {
              handleClose()
              setOpenAddModal(true)
            }} >
              <img src={addMemberIcon} alt='addMemberIcon' />
            </Button>
            
            
          <Button autoFocus onClick={handleClose} style={{ color: '#898989' }}>
            TẠO VIỆC
          </Button>
        </DialogActions>
      </Dialog>
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal}/>
    </div>
  )
}


export default ListHeader;
