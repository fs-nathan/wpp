import React from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';

const StyledTypo = styled(({ color, uppercase, bold, ...rest }) => <Typography {...rest} />)`
  color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.bold && css`
    font-weight: 400;
  `}
`;

export default StyledTypo;
