import React from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './styles.scss';

const listTimeSelect = [];
for (let index = 0; index < 24; index++) {
  listTimeSelect.push(`${index}:00`, `${index}:30`)
}

function TimeSelect({ className, value, onChange }) {
  return (
    <Select
      autoFocus
      className={clsx('timeSelect', className)}
      value={value}
      onChange={onChange}
      variant="outlined"
    >
      {
        listTimeSelect.map((time) => (
          <MenuItem value={time}>{time}</MenuItem>
        ))
      }
    </Select>
  )
}

export default TimeSelect
export { listTimeSelect }