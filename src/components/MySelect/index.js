import { Typography } from '@material-ui/core';
import React from 'react';
import CustomSelect from '../CustomSelect';
import './style.scss';

const Title = ({ className = '', ...props }) =>
  <Typography
    className={`comp_MySelect___title ${className}`}
    {...props}
  />

const Select = ({ className = '', ...props }) =>
  <Typography
    className={`comp_MySelect___select ${className}`}
    component={'div'}
    {...props}
  />

function MySelect({
  label, options, value, onChange
}) {

  return (
    <>
      <Title component={'div'}>{label}</Title>
      <Select>
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
        />
      </Select>
    </>
  );
}

export default MySelect;
