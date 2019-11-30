import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemMessageNotification from './ItemMessageNotification';

import '../Drawer.scss';

const listNotification = [
  {
    id: '0',
    name:
      'Mai Xuân Thuần đã thêm bạn vào dự án Chung cư cao tầng và dịch vụ thương mại ABC',
    description: '4 giờ trước vào lúc 12:00 ngày 28/10/2019',
    read: true
  },
  {
    id: '1',
    name:
      'Mai Xuân Thuần đã thêm bạn vào dự án Chung cư cao tầng và dịch vụ thương mại ABC',
    description: '4 giờ trước vào lúc 12:00 ngày 28/10/2019',
    read: false
  },
  {
    id: '2',
    name:
      'Mai Xuân Thuần đã thêm bạn vào dự án Chung cư cao tầng và dịch vụ thương mại ABC',
    description: '4 giờ trước vào lúc 12:00 ngày 28/10/2019',
    read: true
  }
];
class DrawerNotification extends Component {
  render() {
    // const { actionVisibleDrawerMessage, typeDrawer } = this.props;
    return (
      <div className="drawer-content-container">
        <HeaderDrawer title="Thông báo" subHeader />
        <div className="content-drawer">
          {listNotification.map((message, index) => (
            <ItemMessageNotification item={message} key={index} />
          ))}
        </div>
        <FooterDrawer />
      </div>
    );
  }
}

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerNotification);
