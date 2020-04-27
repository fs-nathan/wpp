import { Typography } from '@material-ui/core';
import React from 'react';
import CustomSelect from '../CustomSelect';
import './style.scss';

const Title = ({ className = '', ...props }) =>
  <Typography
    className={`comp_MySelect___title ${className}`}
    {...props}
  />

function MySelect({
  label, options, value, onChange
}) {

  return (
    <>
      <Title component={'div'}>{label}</Title>
      <Typography component={'div'}>
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
        />
      </Typography>
    </>
  );
}

export default MySelect;
