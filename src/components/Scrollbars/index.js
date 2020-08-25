import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './index.scss';

const CSSScrollbars = ({ className = '', ...props }) =>
  <Scrollbars
    className={`comp_Scrollbars___main ${className}`}
    {...props}
  />

function MyScrollbars(props) {
  return <CSSScrollbars {...props} />
}

export default MyScrollbars;
