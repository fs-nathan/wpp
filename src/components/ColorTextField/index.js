import React from 'react';
import styled, { css } from 'styled-components';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';

const ColorTextDiv = styled(({ color, uppercase, bold, ...rest }) => <div {...rest} />)`
  width: 100%;
  font-size: 15px;
  text-align: justify;
  padding: 10px 10px 10px 0;
  color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.bold && css`
    font-weight: bold;
  `}
`;

const Expand = styled.div`
  width: 100%;
  margin-top: 8px;
  text-align: center;
  color: #007bff;
  &:hover {
    cursor: pointer;
  }
`;

function ColorTextField({ color, uppercase, bold, value, ...rest }) {

  const [expand, setExpand] = React.useState(false);

  return (
    <div>
      <ColorTextDiv color={color} uppercase={uppercase} bold={bold} {...rest}> 
        {value.length < 100 ? value : expand ? value : value.substr(0, 95) + '...' }
      </ColorTextDiv>
      {value.length >= 100 && (
        <Expand onClick={evt => setExpand(prev => !prev)}>
          {expand ? 'Thu gọn' : 'Xem thêm'}
        </Expand>
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
