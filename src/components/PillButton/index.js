import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../helpers/colorPalette';

const PillButton = styled(({background, text, size, ...rest}) => <ButtonBase {...rest} />)`
  & > span:last-child {
    display: none;
  }
  box-shadow: none;
  text-transform: none;
  border-radius: 999px;
  ${props => props.size === 'small' && css`
    padding: 2px 4px;
    font-size: 10px;
  `}
  ${props => props.size === 'medium' && css`
    padding: 8px 16px;
    font-size: 14px;
  `}
  background-color: ${props => props.background ? props.background : colorPal['gray'][0]};
  color: ${props => props.text ? props.text : colorPal['gray'][1]};
  &:hover { 
    background-color: ${props => props.background ? darken(props.background, 0.1) : darken(colorPal['gray'][0], 0.1)};
  }
`;

export default PillButton;