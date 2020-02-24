import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export const TooltipWrapper = React.forwardRef((props, ref) => 
  <div 
    ref={ref}
    {...props} 
  />
);