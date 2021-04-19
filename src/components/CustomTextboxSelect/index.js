import { TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const StyledTextField = ({ className = '', ...rest }) =>
  <TextField
    className={`comp_CustomTextbox___text-field ${className}`}
    {...rest}
  />

const StyledTextBox = ({ className = '', ...rest }) =>
  <div
    className={`comp_CustomTextbox___text-box ${className}`}
    {...rest}
  />

function CustomTextboxSelect({
  value,
  onClick,
  className = '',
  label = undefined,
  placeholder = null,
  multiline = false,
  required = false,
}) {
  const { t } = useTranslation();
  return (
    <StyledTextBox className={className}>
      <p>{label}{required ? <abbr title={t("IDS_WP_REQUIRED_LABEL")}>*</abbr> : null}</p>
      <StyledTextField
        multiline={multiline}
        fullWidth
        rows={multiline ? 3 : undefined}
        variant="outlined"
        value={value}
        onClick={onClick}
        placeholder={placeholder ?? t("CUSTOM_TEXTBOX_CONTENT_LABEL")}
        inputProps={{
          readOnly: true
        }}
      />
    </StyledTextBox>
  )
}

export default CustomTextboxSelect;