import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

const MyButton = ({ className = '', ...props }) =>
  <Button
    className={`comp_UploadButton___button ${className}`}
    disableRipple
    disableFocusRipple
    disableTouchRipple
    {...props}
  />;

function UploadButton({ label, onClick }) {

  const colors = useSelector(state => state.setting.colors)
  const bgColor = colors.find(item => item.selected === true);

  return (
    <MyButton
      color='primary'
      onClick={onClick}
    >
      <span
        style={{
          backgroundColor: bgColor.color,
        }}
      >+</span>
      <span>{label}</span>
    </MyButton>
  );
}

export default UploadButton;