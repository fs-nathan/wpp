import React from 'react';
import styled, { css } from 'styled-components';
import { Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import colorPal from '../../helpers/colorPalette';
import './style.scss';

const _StyledBadge = styled(({ variantColor, ...rest }) => 
  <Badge {...rest} />
)`
  ${props => props.variantColor && css`
    & > span {
      background-color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
      color: ${props => props.variantColor ? colorPal[props.variantColor][1] : colorPal['default'][1]};
    }
  `}
`;

const StyledBadge = ({ className = '', ...props }) => (
  <_StyledBadge className={`comp_ColorBadge___badge ${className}`} {...props} />
);

StyledBadge.propTypes = {
  variantColor: PropTypes.string,
}

export default StyledBadge;
