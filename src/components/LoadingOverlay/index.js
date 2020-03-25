import React from 'react';
import ReactLoadingOverlay from 'react-loading-overlay';
import styled from 'styled-components';

const CustomLoadingOverlay = styled(ReactLoadingOverlay)`
  .comp_LoadingOverlay___overlay {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
  .comp_LoadingOverlay___content {
    color: #05b50c !important;
    & svg circle {
      stroke: #05b50c !important;
    }
  }
  .comp_LoadingOverlay___wrapper {
    height: 100%;
  }
`;

export default function LoadingOverlay({ ...props }) {
  return (
    <CustomLoadingOverlay
      {...props}
      classNamePrefix='comp_LoadingOverlay___'
    />);
}