import React from 'react';
import styled from 'styled-components';
import { lighten } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const CustomBadge = styled(({color, backgroundColor = null, ...rest}) => <div {...rest} />)`
  padding: 0.25rem 0.5rem;
  background: ${props => props.backgroundColor ? props.backgroundColor : lighten(props.color, 0.75)};
  color: ${props => props.color};
  border-radius: 2px;
  font-weight: 600;
  min-width: 65px;
  font-size: 11px;
  text-align: center;
`;

CustomBadge.propTypes = {
  color: PropTypes.string,
}

export default CustomBadge;
