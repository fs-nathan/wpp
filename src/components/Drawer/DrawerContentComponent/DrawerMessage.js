import React from 'react';
import { connect } from 'react-redux';

import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemMessageNotification from './ItemMessageNotification';
import '../Drawer.scss';

const listMessage = [
  {
    id: '0',
    name: 'Công việc số 1',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: true
  },
  {
    id: '1',
    name: 'Công việc số 2',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: false
  },
  {
    id: '2',
    name: 'Công việc số 3',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: true
  }
];
const DrawerMessage = props => {
  // const { actionVisibleDrawerMessage, typeDrawer } = props;
  return (
    <div className="drawer-content-container">
      <HeaderDrawer title="Tin nhắn" subHeader />
      <div className="content-drawer">
        {listMessage.map((message, index) => (
          <ItemMessageNotification item={message} key={index} />
        ))}
      </div>
      <FooterDrawer />
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerMessage);
