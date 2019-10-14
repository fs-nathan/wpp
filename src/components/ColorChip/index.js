import React from 'react';
import styled, { css } from 'styled-components';
import { Chip } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../helpers/colorPalette';

const StyledChip = styled(({ color, badge, size, onClick, ...rest }) => <Chip size={size} onClick={onClick} {...rest} />)`
  background-color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  color: ${props => props.color ? colorPal[props.color][1] : colorPal['default'][1]};
  ${props => props.badge && css`
    height: auto;
    padding: 2px 1px;
    ${props => props.size === 'small' && css`
      & > span {
        font-size: 0.75rem;
      }
    `}
  `};
  ${props => props.onClick && css`
    &:hover, &:focus {
      background-color: ${props => props.color ? darken(colorPal[props.color][0], 0.1) : darken(colorPal['default'][0], 0.1)};
    }
  `}
`;

export default StyledChip;
