import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';

import './Drawer.css';
import { actionVisibleDrawerMessage } from '../../../actions/topnav';

const DrawerMessage = props => {
  return (
    <Drawer
      anchor="right"
      open={props.visibleDrawersMessage}
      onClose={() => props.actionVisibleDrawerMessage()}
    >
      Drawer Message component
    </Drawer>
  );
};

export default connect(
  state => ({
    visibleDrawersMessage: state.topNavReducer.visibleDrawersMessage
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerMessage);
