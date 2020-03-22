import React from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Scrollbars } from 'react-custom-scrollbars'

import './styles.scss';

const listTimeSelect = [];
for (let index = 0; index < 24; index++) {
  if (index < 10)
    listTimeSelect.push(`0${index}:00`, `0${index}:30`)
  else
    listTimeSelect.push(`${index}:00`, `${index}:30`)
}

function TimeSelect({ className, value, onChange }) {
  return (
    <Select
      className={clsx('timeSelect', className)}
      value={value}
      onChange={onChange}
      variant="outlined"
      MenuProps={{
        className: "timeSelect--paper",
        MenuListProps: {
          component: Scrollbars,
        }
      }}
    >

      {
        listTimeSelect.map((time) => (
          <MenuItem key={time} value={time}>{time}</MenuItem>
        ))
      }
    </Select >
  )
}

export default TimeSelect
export { listTimeSelect }