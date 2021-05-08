import { lighten } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import "./style.scss";

const XCustomBadge = styled(({ weightBold = null,color, backgroundColor = null, ...rest }) => (
  <div {...rest} />
))`
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : lighten(props.color, 0.75)};
  color: ${props => props.color};
  font-weight: ${props => props.weightBold ? 'normal !important' : '600'}
`;

const CustomBadge = ({ className = "", inline, ...props }) => (
  <XCustomBadge
    className={`comp_CustomBadge___badge ${className}`}
    {...props}
  />
);

CustomBadge.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  weightBold: PropTypes.string
};

export default CustomBadge;
