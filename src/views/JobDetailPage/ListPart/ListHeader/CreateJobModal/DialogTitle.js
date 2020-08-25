import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  withStyles,
  DialogTitle as MuiDialogTitle,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default styled(DialogTitle)`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 999;
  background: #f5f8fc;
  border-bottom: 1px solid #0000001f;
  text-transform: uppercase;
  font-weight: 400;
`;