import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import './style.scss';

const StyledDatePicker = ({ className = '', ...rest }) =>
  <KeyboardDatePicker
    className={`comp_CustomDatePicker___date-field ${className}`}
    {...rest}
  />

const StyledDateBox = ({ className = '', ...rest }) =>
  <div
    className={`comp_CustomDatePicker___date-box ${className}`}
    {...rest}
  />

function CustomDatePicker({
  value,
  onChange,
  label = undefined,
  placeholder = 'Nội dung...',
  required = false,
  ampm = false,
  format = "dd/MM/yyyy"
}) {

  return (
    <StyledDateBox>
      <p>{label}{required ? <abbr title="Bắt buộc">*</abbr> : null}</p>
      <StyledDatePicker
        disableToolbar
        inputVariant="outlined"
        variant="inline"
        ampm={ampm}
        value={value}
        onChange={value => onChange(value)}
        format={format}
        placeholder={placeholder}
        fullWidth
      />
    </StyledDateBox>
  )
}

export default CustomDatePicker;