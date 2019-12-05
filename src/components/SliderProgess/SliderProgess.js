import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import './SliderProgess.scss';
const PrettoSlider = withStyles({
  valueLabel: { left: 'calc(-50% + 4px)' }
})(Slider);

const SliderProgess = props => {
  return (
    <>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        className="silder-custom"
        defaultValue={props.defaultValue}
        step={props.step || 1}
        min={props.item.min}
        max={props.item.max}
        onChange={props.handleChangeSilder}
        // marks={props.item.mark}
      />
      <p className="mark-label">
        <span className="left-text">{props.item.mark[0].label}</span>
        <span className="right-text">{props.item.mark[1].label}</span>
      </p>
    </>
  );
};
export default SliderProgess;
