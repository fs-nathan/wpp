import React from 'react';
import ReactLoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bgColorSelector } from './selectors';

const CustomLoadingOverlay = styled(({ bgColor, ...props }) => <ReactLoadingOverlay {...props} />)`
  .comp_LoadingOverlay___overlay {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .comp_LoadingOverlay___content {
    color: ${props => props.bgColor} !important;
    & svg circle {
      stroke: ${props => props.bgColor} !important;
    }
  }
  &.comp_LoadingOverlay___wrapper {
    min-height: 100%;
  }
`;

function LoadingOverlay({ bgColor, active, spinner, delay = 800, ...props }) {

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      const handler = setTimeout(() => {
        setShow(true);
      }, delay);
      return () => {
        clearTimeout(handler);
      }
    } else {
      setShow(false);
    }
  }, [active, delay])

  return (
    <CustomLoadingOverlay
      {...props}
      active={active}
      spinner={spinner && show}
      bgColor={bgColor.color}
      classNamePrefix='comp_LoadingOverlay___'
    />);
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  }
}

export default connect(
  mapStateToProps,
  null,
)(LoadingOverlay);