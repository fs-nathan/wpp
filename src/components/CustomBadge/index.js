import React from 'react';
import styled from 'styled-components';
import { lighten } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './style.scss';

const XCustomBadge = styled(({color, backgroundColor = null, ...rest}) => <div {...rest} />)`
  background: ${props => props.backgroundColor ? props.backgroundColor : lighten(props.color, 0.75)};
  color: ${props => props.color};
`;

const CustomBadge = ({ className = '', ...props }) => (
  <XCustomBadge className={`comp_CustomBadge___badge ${className}`} {...props} />
)

CustomBadge.propTypes = {
  color: PropTypes.string,
}

export default CustomBadge;
