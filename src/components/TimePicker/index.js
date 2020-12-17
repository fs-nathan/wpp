import { InputAdornment, Menu, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { mdiMenuDown } from "@mdi/js";
import Icon from '@mdi/react';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import InputMask from 'react-input-mask';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: props => ({
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: `${props.width}ch`,
  }),
}));

const listTimeSelect = [];
for (let index = 0; index < 24; index++) {
  if (index < 10)
    listTimeSelect.push(`0${index}:00`, `0${index}:30`)
  else
    listTimeSelect.push(`${index}:00`, `${index}:30`)
}

function TimePicker({ value, onChange, width = 20 }) {
  const classes = useStyles({width: width});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const anchorRef = React.useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;
    let selection = newState.selection;

    let timeArr = value.split(":");
    let hour = parseInt(timeArr[0]);
    let minutes = parseInt(timeArr[1]);

    if (isNaN(hour)) hour = 8;
    if (isNaN(minutes)) minutes = 0;

    if (hour === 24 && minutes > 0) minutes = 0;
    else if (hour < 23 && minutes > 59) minutes = 59;
    else if (hour > 23 || minutes > 59) { hour = 23; minutes = 0 }

    let time = "hh:mm";
    if (hour <= 9) time = time.replace('hh', `0${hour}`);
    else time = time.replace('hh', `${hour}`);
    if (minutes <= 9) time = time.replace('mm', `0${minutes}`);
    else time = time.replace('mm', `${minutes}`);

    return {
      value: time,
      selection
    };
  }

  return (
    <>
      <InputMask
        mask="99:99"
        value={value}
        disabled={false}
        maskChar=" "
        onChange={({ target }) => onChange(target.value)}
        beforeMaskedValueChange={beforeMaskedValueChange}
        children={() => (
          <TextField
            ref={anchorRef}
            className={classes.textField}
            variant="outlined"
            size={'small'}
            value={value}
            type="text"
            InputProps={{
              endAdornment:
                <InputAdornment
                  position="end" className="comp_TimePicker__dropdownButton"
                >
                  <Icon path={mdiMenuDown} color="rgb(155,155,155)" size={1} onClick={handleClick} />
                </InputAdornment>
            }}
          />
        )}
      >
      </InputMask>
      <Menu
        className="comp_TimePicker__dropdownList"
        open={open}
        onClose={handleClose}
        keepMounted
        anchorEl={anchorRef.current}
        PaperProps={{
          className: "comp_TimePicker__dropdownList",
          style: {
            maxHeight: 120,
            width: `${width}ch`
          },
          component: Scrollbars
        }}
        transformOrigin={{
          vertical: -42,
          horizontal: 'center'
        }}
        variant={'menu'}
      >
        {
          listTimeSelect.map((time) => (
            <MenuItem
              key={time} value={time}
              selected={time === value}
              onClick={() => {
                handleClose();
                onChange(time);
              }}
            >
              {time}
            </MenuItem>
          ))
        }
      </Menu>
    </>
  )
}

export default TimePicker;