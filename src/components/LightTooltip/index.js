import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

export const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    border: '1px solid #dadde9',
    height: '50px',
  },
}))(Tooltip);

export const TooltipWrapper = React.forwardRef((props, ref) =>
  <div
    ref={ref}
    {...props}
  />
);