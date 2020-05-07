import { TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../ColorTypo';
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
  maxHeight = 100,
  className = '',
  helperText = '',
  label = undefined,
  placeholder = 'Nội dung...',
  multiline = false,
  required = false,
}) {

  const { t } = useTranslation();
  const [innerHeight, setInnerHeight] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  const innerRef = React.useCallback(node => {
    if (node !== null) {
      setInnerHeight(node.getBoundingClientRect().height);
    }
    //eslint-disable-next-line
  }, [value]);

  if (isReadOnly) {
    return (
      <div
        className={`comp_CustomTextBox___readonly ${className}`}
      >
        <div
          style={{
            maxHeight: !isReadOnly || showMore ? 'initial' : maxHeight,
            overflow: !isReadOnly || showMore ? 'initial' : 'hidden',
          }}
        >
          <div
            ref={innerRef}
            dangerouslySetInnerHTML={{
              __html: value.replace(
                /(https?:\/\/[^\s]+)/g,
                "<a href='$1' target='_blank' >$1</a>"
              )
            }}
          />
        </div>
        {innerHeight > maxHeight && <span onClick={() => setShowMore(old => !old)}>
          {showMore ? t('DMH.COMP.CUSTOM_TEXTBOX.LESS') : t('DMH.COMP.CUSTOM_TEXTBOX.MORE')}
        </span>}
      </div >
    )
  } else {
    return (
      <StyledTextBox>
        <p>{label}{required ? <abbr title="Bắt buộc">*</abbr> : null}</p>
        <StyledTextField
          multiline={multiline}
          fullWidth
          rows={multiline ? 3 : undefined}
          variant="outlined"
          value={value}
          onChange={evt => onChange(evt.target.value)}
          placeholder={placeholder}
          helperText={
            <ColorTypo variant='caption' color='red'>
              {helperText}
            </ColorTypo>
          }
        />
      </StyledTextBox>
    )
  }
}

export default CustomTextbox;