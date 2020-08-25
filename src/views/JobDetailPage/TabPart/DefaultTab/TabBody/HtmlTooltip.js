import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fff',
    maxWidth: 210,
    height: 110,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default HtmlTooltip