import React from 'react';
import ReactLoadingOverlay from 'react-loading-overlay';
import './style.scss';

export default function LoadingOverlay({ ...props }) {
  return (
  <ReactLoadingOverlay
    style={{
      wrapper: {},
    }}
    {...props}
    classNamePrefix='comp_LoadingOverlay___'
  />);
}