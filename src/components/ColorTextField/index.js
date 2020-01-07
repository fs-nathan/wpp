import React from 'react';
import styled, { css } from 'styled-components';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';
import './style.scss';

const ColorTextDiv = styled(({ color, uppercase, bold, ...rest }) => 
  <div {...rest} />
)`
  color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.bold && css`
    font-weight: bold;
  `}
`;

function ColorTextField({ color, uppercase, bold, value, className = '', ...rest }) {

  const [expand, setExpand] = React.useState(false);

  return (
    <div className={className}>
      <ColorTextDiv className='comp_ColorTextField___text' color={color} uppercase={uppercase} bold={bold} {...rest}> 
        {value.length < 150 ? value : expand ? value : value.substr(0, 145) + '...' }
      </ColorTextDiv>
      {value.length >= 150 && (
        <div className='comp_ColorTextField___expand-text' onClick={evt => setExpand(prev => !prev)}>
          {expand ? 'Thu gọn' : 'Xem thêm'}
        </div>
      )}
    </div>
  )
}

ColorTextField.propTypes = {
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  bold: PropTypes.bool,
}

export default ColorTextField;
