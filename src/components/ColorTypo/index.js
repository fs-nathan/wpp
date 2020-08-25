import React from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';
//định dạng text
const StyledTypo = styled(({ color, uppercase, bold, fontSize, ...rest }) => <Typography {...rest} />)`
  color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.bold && css`
    font-weight: 500;
  `}
  ${props => props.fontSize && css`
    font-size: 16px;  
  `}
`;

StyledTypo.propTypes = {
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  bold: PropTypes.bool,
  fontSize: PropTypes.bool,
}

export default StyledTypo;
