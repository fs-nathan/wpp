import React from 'react';
import styled, { css } from 'styled-components';
import { TextField } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';

const StyledTypo = styled(({ color, uppercase, bold, ...rest }) => <TextField multiline disabled {...rest} />)`
  width: 100%;
  && > div {
    &::before {
      border-bottom: none;
    }
    color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
    ${props => props.uppercase && css`
      text-transform: uppercase;
    `}
    ${props => props.bold && css`
      font-weight: bold;
    `}
  }
`;

export default StyledTypo;
