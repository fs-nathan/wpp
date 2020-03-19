import React from 'react';
import './styles.scss';

function NoDataPlaceHolder({ src, title }) {
  return (<div className="placeholder--noData">
    <img src={src} alt="no data"></img>
    <div>
      {title}
    </div>
  </div>)
}

export default NoDataPlaceHolder