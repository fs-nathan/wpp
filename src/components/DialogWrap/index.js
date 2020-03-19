import React from 'react';
import { IconButton, Typography, Dialog, Button, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.scss';

function DialogWrap({
  title,
  isOpen,
  isLoading,
  handleClickClose,
  onClickSuccess,
  successLabel = 'Hoàn Thành',
  children,
}) {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  return (
    <Dialog className="dialogWrap" aria-labelledby="customized-dialog-title" open={isOpen} >
      <DialogTitle disableTypography >
        <Typography className="dialogWrap--title" variant="h6">{title}</Typography>
        <IconButton aria-label="close" className="dialogWrap--closeButton" onClick={handleClickClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialogWrap--content" dividers >
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClickClose} style={{ color: '#222222' }} >
          Hủy
        </Button>
        <Button onClick={onClickSuccess}
          style={{ color: groupActiveColor }}>
          {isLoading && (
            <CircularProgress size={20} className="margin-circular" />
          )}
          {successLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogWrap;