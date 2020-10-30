import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';

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
  required = false,
  ampm = false,
  format = "dd/MM/yyyy"
}) {
  const { t } = useTranslation();

  return (
    <StyledDateBox>
      <p>{label}{required ? <abbr style={{textDecoration: "unset"}} title={t("REQUIRED")}>*</abbr> : null}</p>
      <StyledDatePicker
        autoOk
        disableToolbar
        inputVariant="outlined"
        variant="inline"
        ampm={ampm}
        value={value}
        onChange={value => onChange(value)}
        format={format.replace('YYYY', 'yyyy').replace('DD', 'dd')}
        placeholder={t("ENTER_DATE")}
        fullWidth
      />
    </StyledDateBox>
  )
}

export default CustomDatePicker;