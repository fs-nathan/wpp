import { Button, CircularProgress } from '@material-ui/core';
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

function UploadButton({ label, onClick, loading = false, ...props }) {

  const colors = useSelector(state => state.setting.colors)
  const bgColor = colors.find(item => item.selected === true);

  return (
    <MyButton
      color='primary'
      onClick={onClick}
      {...props}
    >
      {loading
        ? (
          <CircularProgress
            size={15}
            className="margin-circular"
            color={bgColor.color}
          />)
        : (
          <span
            style={{
              backgroundColor: bgColor.color,
            }}
          >+</span>
        )}
      <span>{label}</span>
    </MyButton>
  );
}

export default UploadButton;