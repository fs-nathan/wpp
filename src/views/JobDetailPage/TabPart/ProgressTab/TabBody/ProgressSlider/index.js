import { Slider } from '@material-ui/core';
import clamp from 'lodash/clamp';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

function ProgressSlider({ value, onChange, expected, isHaveDate }) {
  const {
    update_complete,
  } = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));
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
      disabled={!update_complete}
      valueLabelFormat={x => `${x}%`}
      onChange={(e, val) => { setProgressPercent(val) }}
      onChangeCommitted={(e, val) => {
        onChange(val)
      }}
    />
    {isHaveDate &&
      <div className="progressSlider--expected" style={{ left: `calc(${expectedPercent}% - 3px)` }}>
        {/* <div className="progressSlider--lineConnect"></div>
      <div className="progressSlider--text">Hôm nay</div>
      <div className="progressSlider--expectedLabel">{expectedPercent}%</div> */}
      </div>
    }
  </div>)
}

export default ProgressSlider;