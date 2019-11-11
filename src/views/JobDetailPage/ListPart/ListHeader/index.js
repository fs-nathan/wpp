import React from 'react';
import { Select, MenuItem, IconButton, Typography, Dialog, Button, withStyles, Radio, RadioGroup, Input, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus, mdiApps, mdiHelpCircle, mdiChevronDown } from '@mdi/js';
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
import InputSelect from '../../TabPart/DefaultTab/InputSelect';
import CreateJobModal from './CreateJobModal';

import { func } from 'prop-types';


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

const BeginEndTime = styled(Typography)`
  width: 50px;
  margin-right: 20px;
`
const TypoText = styled(Typography)`
  font-size: 15px;
  color: #505050;
  margin: 20px 0;
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
const HeaderText = styled(Typography)`
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const InputTextJob = styled(TextField)`
    & > label {
        font-size: 14px
    }
    & > *:last-child {
        color: red;
        margin-left: 10px
    }
`
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function ListHeaderSelect({ setShow }) {

  const openListProject = () => {
    setShow(true)
  }

  return (
    <div onClick={openListProject} style={{ marginTop: 8}}>
      <HeaderText component={'div'} >Phát triển ứng dụng Mytour Việt Nam...</HeaderText>
      <ButtonIcon

        style={{
          marginLeft: "10px",
          padding: "7px"
        }}
      >
        <Icon path={mdiChevronDown} size={1.2}/>
      </ButtonIcon>
    </div>
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

function ListHeader(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const [state, setState] = React.useState('');

  const handleChangeGroup = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const [time, setTime] = React.useState('')

  const handleTime = () => {
    setTime(time);
  }
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);

  return (
      <div >
      <Header>
        <ListHeaderSelect {...props} />
        <HeaderBottomBox>
          <SearchInput placeholder='Tìm công việc trong dự án...' style={{ height: 'auto'}}/>
          <ButtonIcon
            style={{
              marginLeft: "10px",
              padding: "7px"
            }}
            onClick={() => {
            handleClose()
            setOpenCreateJobModal(true)
          }} >
            <Icon path={mdiPlus} size={1.2}/>
          </ButtonIcon>
        </HeaderBottomBox>
      </Header>
      <CreateJobModal isOpen={openCreateJobModal} setOpen={setOpenCreateJobModal} />
    </div>
  )
}


export default ListHeader;
