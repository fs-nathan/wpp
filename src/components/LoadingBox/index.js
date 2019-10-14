import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function LoadingBox({ ...rest }) {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress {...rest} />
    </div>
  );
}