import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import Button from '@material-ui/core/Button';

import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import ItemGroupAcount from './ItemGroupAcount';
import '../Drawer.scss';

const listMyGroup = [
  {
    id: 0,
    name: 'Vtask Team Support',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Free'
  }
];
const listGroupJoined = [
  {
    id: 0,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro'
  },
  {
    id: 1,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Chờ duyệt'
  }
];
const listGroupDemo = [
  {
    id: 0,
    name: 'DEMO WORKPLUS',
    phone: '09818066181',
    email: 'demo@workplus.net',
    status: 'Pro'
  }
];
class DrawerGroupAcount extends Component {
  render() {
    const { actionVisibleDrawerMessage, anchorDrawer } = this.props;
    return (
      <div className="drawer-content-container">
        <div className="header-drawer-content-group-account">
          <span className="text-header">Nhóm tài khoản</span>
          <span
            className="btn-close"
            onClick={() =>
              actionVisibleDrawerMessage({
                type: '',
                anchor: anchorDrawer
              })
            }
          >
            <Icon path={mdiClose} size={1.4} />
          </span>
        </div>
        <div className="join-group-new">
          <span className="btn-close">
            <Icon path={mdiPlus} size={2} />
          </span>
          <span className="text-join-group-new">Tham gia nhóm mới</span>
        </div>
        <div className="content-group-account">
          <div className="item-group">
            <div className="title-item-group">
              <span className="text-item-group">NHÓM CỦA TÔI</span>
            </div>
            {listMyGroup.map((group, idx) => (
              <ItemGroupAcount item={group} key={idx} />
            ))}
          </div>
          <div className="item-group">
            <div className="title-item-group">
              <span className="text-item-group">NHÓM ĐÃ THAM GIA</span>
            </div>
            {listGroupJoined.map((group, idx) => (
              <ItemGroupAcount item={group} key={idx} />
            ))}
          </div>
          <div className="item-group">
            <div className="title-item-group">
              <span className="text-item-group">NHÓM DEMO</span>
            </div>
            <div className="title-item-notifi">
              <span className="text-title-item-notifi">
                Tham gia nhóm Demo Workplus để khám phá các tính năng của phần
                mềm
              </span>
            </div>
            {listGroupDemo.map((group, idx) => (
              <ItemGroupAcount item={group} key={idx} />
            ))}
          </div>
        </div>
        <div className="footer-join-group-new">
          <div className="list-invative">
            <span className="text-list-invative">
              huuthanhxd@gmail.com đã mời bạn tham gia nhóm HUUTHANHXD
            </span>
          </div>
          <div className="action-join-group-new">
            <Button variant="contained" className="btn-ok">
              đồng ý
            </Button>
            <Button variant="outlined" className="btn-close">
              từ chối
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerGroupAcount);
