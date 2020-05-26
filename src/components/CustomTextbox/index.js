import { TextField } from '@material-ui/core';
import React from 'react';
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

function CustomTextbox({
  value,
  onChange,
  isReadOnly = false,
  className = '',
  label = undefined,
  placeholder = 'Nội dung...',
  multiline = false,
  required = false,
}) {

  if (isReadOnly) {
    return (
      <div
        className={`comp_CustomTextBox___readonly ${className}`}
      >
        <div
          style={{
            maxHeight: 'initial', //!isReadOnly || showMore ? 'initial' : maxHeight,
            overflow: 'initial', //!isReadOnly || showMore ? 'initial' : 'hidden',
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: value.replace(
                /(https?:\/\/[^\s]+)/g,
                "<a href='$1' target='_blank' >$1</a>"
              )
            }}
          />
        </div>
        {/*
        innerHeight > maxHeight && <span onClick={() => setShowMore(old => !old)}>
          {showMore ? t('DMH.COMP.CUSTOM_TEXTBOX.LESS') : t('DMH.COMP.CUSTOM_TEXTBOX.MORE')}
        </span>
        */}
      </div >
    )
  } else {
    return (
      <StyledTextBox className={className}>
        <p>{label}{required ? <abbr title="Bắt buộc">*</abbr> : null}</p>
        <StyledTextField
          multiline={multiline}
          fullWidth
          rows={multiline ? 3 : undefined}
          variant="outlined"
          value={value}
          onChange={evt => onChange(evt.target.value)}
          placeholder={placeholder}
        />
      </StyledTextBox>
    )
  }
}

export default CustomTextbox;