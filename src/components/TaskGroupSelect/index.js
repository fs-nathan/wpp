import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './styles.scss';

class CustomScroll extends React.Component {

  render() {
    return <Scrollbars {...this.props}
      renderTrackHorizontal={() => <div />}
      autoHeight autoHeightMax={240} autoHeightMin={24} />
  }
}

function TaskGroupSelect({ className, value, onChange, options }) {
  return (
    <Select
      className={clsx('TaskGroupSelect', className)}
      value={value}
      onChange={onChange}
      variant="outlined"
      MenuProps={{
        className: "TaskGroupSelect--paper",
        MenuListProps: {
          component: CustomScroll,
        }
      }}
    // input={input}
    >
      {
        options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>{label}</MenuItem>
        ))
      }
    </Select >
  )
}

export default TaskGroupSelect
