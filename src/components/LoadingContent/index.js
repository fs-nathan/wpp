import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingContent.scss';

export default function LoadingContent(props) {
  return (
    <div className="loading-content-container">
      {props.loading && <div className="mark-back"></div>}
      {props.loading && <CircularProgress className="progress-turn" />}
      {props.children}
    </div>
  );
}
