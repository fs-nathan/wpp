import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';

const PillButton = styled(({background, text, size = 'medium', ...rest}) => <ButtonBase {...rest} />)`
  & > span:last-child {
    display: none;
  }
  box-shadow: none;
  text-transform: none;
  border-radius: 999px;
  font-weight: 500;
  ${props => props.size === 'small' && css`
    padding: 4px 6px;
    font-size: 10px;
  `}
  ${props => props.size === 'medium' && css`
    padding: 8px 14px;
    font-size: 12px;
  `}
  ${props => props.size === 'large' && css`
    padding: 10px 18px;
    font-size: 13px;
  `}
  background-color: ${props => props.background ? props.background : colorPal['gray'][0]};
  color: ${props => props.text ? props.text : colorPal['gray'][1]};
  &:hover { 
    background-color: ${props => props.background ? darken(props.background, 0.1) : darken(colorPal['gray'][0], 0.1)};
  }
`;

PillButton.propTypes = {
  background: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default PillButton;