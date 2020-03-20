import React, { useState, useEffect } from 'react';
import { Slider } from '@material-ui/core';
import clamp from 'lodash/clamp';

import './styles.scss';

function ProgressSlider({ value, onChange, expected }) {
  const [progressPercent, setProgressPercent] = useState(value);
  useEffect(() => {
    setProgressPercent(value)
  }, [value]);
  const expectedPercent = clamp(expected, 0, 100);
  return (<div className="progressSlider">
    <Slider
      valueLabelDisplay="on"
      aria-label="pretty slider"
      value={progressPercent}
      valueLabelFormat={x => `${x}%`}
      onChange={(e, val) => { setProgressPercent(val) }}
      onChangeCommitted={(e, val) => {
        onChange(val)
      }}
    />
    <div className="progressSlider--expected" style={{ left: `calc(${expectedPercent}% - 3px)` }}>
      <div className="progressSlider--lineConnect"></div>
      <div className="progressSlider--text">Hôm nay</div>
      <div className="progressSlider--expectedLabel">{expectedPercent}%</div>
    </div>
  </div>)
}

export default ProgressSlider;