import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router-dom';

import * as image from '../../../assets/index';
import { Routes } from '../../../constants/routes';
import '../Drawer.scss';

class ItemGroupAcount extends Component {
  render() {
    const { item, history } = this.props;
    return (
      <div
        className="item-group-account"
        key={item.id}
        onClick={() => history.push(Routes.TASKS)}
      >
        <div className="avatar-item-group-account">
          <Avatar alt="Remy Sharp" src={image.avatar_user} className="avatar" />
        </div>
        <div className="info-item-group-account">
          <div className="name-item-group-account">
            <span className="text-name-item-group-account">{item.name}</span>
            {item.status === 'Chờ duyệt' ? (
              <span className="account-status-text">{item.status}</span>
            ) : (
              <Chip
                size="small"
                label={item.status}
                className={`status-item-group-account ${
                  item.status === 'Pro' ? 'pro-color' : ''
                }`}
              />
            )}
          </div>
          <div className="acc-item-group-account">
            <span className="text-value-email-phone">{item.email}</span>
          </div>
          <div className="phone-item-group-account">
            <span className="text-value-email-phone">{item.phone}</span>
            {item.join ? (
              <Button className="btn-action" variant="text">
                Tham gia
              </Button>
            ) : (
              item.status !== 'Free' && (
                <Button className="btn-action" variant="text">
                  {item.status === 'Pro' ? 'Rời nhóm' : 'Hủy'}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ItemGroupAcount);
