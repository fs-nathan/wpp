import React from 'react';
import styled, { css } from 'styled-components';
import { Badge } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';

const StyledBadge = styled(({ variantColor, ...rest }) => <Badge {...rest} />)`
  & > span {
    padding: 0 4px;
    height: 16px;
    min-width: 16px; 
    font-size: 8px;
  }
  ${props => props.variantColor && css`
    & > span {
      background-color: ${props => props.variantColor ? colorPal[props.variantColor][0] : colorPal['default'][0]};
      color: ${props => props.variantColor ? colorPal[props.variantColor][1] : colorPal['default'][1]};
    }
  `}
`;

export default StyledBadge;
