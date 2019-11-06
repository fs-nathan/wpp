import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';

const ColorButton = styled(({ variantColor, variant = 'text', ...rest }) => <Button variant={variant} {...rest} />)`
  && {
    box-shadow: none;
  }
  & > span:last-child {
    display: none;
  }
  ${props => props.variant === 'contained' && css`
    background-color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
    color: ${props => props.variantColor ? colorPal[props.variantColor][1] : colorPal['default'][1]};
    &:hover {
      background-color: ${props => props.variantColor ? darken(colorPal[props.variantColor][0], 0.05) : darken(colorPal['default'][0], 0.05)};
    }
    &:active {
      background-color: ${props => props.variantColor ? darken(colorPal[props.variantColor][0], 0.1) : darken(colorPal['default'][0], 0.1)};
    }
  `}
  ${props => props.variant === 'outlined' && css`
    border-color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
    color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
  `}
  ${props => props.variant === 'text' && css`
    color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
  `}
`;

ColorButton.propTypes = {
  variantColor: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
}

export default ColorButton;
