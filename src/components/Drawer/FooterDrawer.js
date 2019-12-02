import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { Routes } from '../../constants/routes';
import { DRAWER_TYPE } from '../../constants/constants';
import './Drawer.scss';

const FooterDrawer = props => {
  const closeDrawer = () => {
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  // const { actionVisibleDrawerMessage, typeDrawer } = this.props;
  return (
    <div className="footer-drawer">
      <Link
        to={
          props.typeDrawer === DRAWER_TYPE.MESSAGE
            ? Routes.MESSAGE_ALL
            : Routes.NOTICE_ALL
        }
        onClick={closeDrawer}
      >
        Xem tất cả
      </Link>
      <Link to={Routes.HOME} onClick={closeDrawer} className="link-home">
        Đánh dấu tất cả đã đọc
      </Link>
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
)(FooterDrawer);
