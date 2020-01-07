import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose, mdiMagnify } from '@mdi/js';
import { InputAdornment, InputBase } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import ItemGroupAcount from './ItemGroupAcount';
import '../Drawer.scss';

const listGroupJoined = [
  {
    id: 0,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  },
  {
    id: 1,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  },
  {
    id: 0,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  },
  {
    id: 1,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  },
  {
    id: 0,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  },
  {
    id: 1,
    name: 'Phúc An Techno',
    phone: '09818066181',
    email: 'info@vtask.net',
    status: 'Pro',
    join: true
  }
];
const DrawerNewGroup = props => {
  const { anchorDrawer } = props;
  const handleClose = () => {
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: anchorDrawer
    });
  };
  return (
    <div className="drawer-content-container">
      <div className="header-drawer-content-group-account">
        <span className="text-header">Tham gia nhóm mới</span>
        <span className="btn-close" onClick={handleClose}>
          <Icon path={mdiClose} size={1} color="rgba(0, 0, 0, 0.54)" />
        </span>
      </div>
      <div className="join-group-new join-group-search">
        <p className="search-group-title">
          Nhập tài khoản của nhóm bạn muốn tham gia
        </p>
        <div className="search-group-container">
          <InputBase
            id="searchTextId"
            className="search-group-box"
            placeholder="Nhập email, số điện thoại"
            autoFocus
            startAdornment={
              <InputAdornment position="start">
                <Icon path={mdiMagnify} size={1.3} color="#8e8e8e" />
              </InputAdornment>
            }
          />
          <span className="filter-action">Lọc</span>
        </div>
      </div>
      <div className="content-group-account join-group-container">
        <Scrollbars autoHide autoHideTimeout={500}>
          <div className="item-group">
            <div className="title-item-group">
              <span className="text-item-group">KẾT QUẢ LỌC ĐƯỢC</span>
            </div>
            {listGroupJoined.map((group, idx) => (
              <ItemGroupAcount item={group} key={idx} />
            ))}
          </div>
        </Scrollbars>
      </div>
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
)(DrawerNewGroup);
