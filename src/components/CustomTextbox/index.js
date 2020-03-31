import { TextField } from '@material-ui/core';
import React from 'react';
import ColorTypo from '../ColorTypo';
import './style.scss';

const StyledTextField = ({ className = '', ...rest }) =>
  <TextField
    className={`comp_CustomTextbox___text-field ${className}`}
    {...rest}
  />

function CustomTextbox({
  value,
  onChange,
  isReadOnly = false,
  maxHeight = 100,
  className = '',
  helperText = ''
}) {

  const [innerHeight, setInnerHeight] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  const innerRef = React.useCallback(node => {
    if (node !== null) {
      setInnerHeight(node.getBoundingClientRect().height);
    }
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
        {innerHeight > maxHeight && <span onClick={() => setShowMore(old => !old)}>{showMore ? 'Thu gọn' : 'Mở rộng'}</span>}
      </div >
    )
  } else {
    return (
      <StyledTextField
        multiline
        fullWidth
        autoFocus
        rows={3}
        variant="outlined"
        value={value}
        onChange={evt => onChange(evt.target.value)}
        helperText={
          <ColorTypo variant='caption' color='red'>
            {helperText}
          </ColorTypo>
        }
      />
    )
  }
}

export default CustomTextbox;