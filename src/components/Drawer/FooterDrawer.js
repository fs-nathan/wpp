import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { Routes } from '../../constants/routes';
import { DRAWER_TYPE } from '../../constants/constants';
import './Drawer.scss';

const FooterDrawer = props => {
  const closeDrawer = () => {
    if (props.typeDrawer === DRAWER_TYPE.MESSAGE) {
      props.history.push({
        pathname: Routes.MESSAGE_ALL
      });
    } else {
      props.history.push({
        pathname: Routes.NOTICE_ALL
      });
    }
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  // const { actionVisibleDrawerMessage, typeDrawer } = this.props;
  return (
    <div className="footer-drawer">
      <Button
        className="footer-btn cus-btn"
        color="primary"
        variant="text"
        disableTouchRipple
        onClick={closeDrawer}
      >
        Xem tất cả
      </Button>
      <Button
        className="footer-btn cus-btn"
        color="primary"
        variant="text"
        disableTouchRipple
        onClick={props.handleViewAll}
      >
        Đánh dấu tất cả đã đọc
      </Button>
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(withRouter(FooterDrawer));
