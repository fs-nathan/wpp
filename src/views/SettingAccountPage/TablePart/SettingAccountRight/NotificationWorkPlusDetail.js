import React from 'react';
import { connect } from 'react-redux';

import './SettingAccountRight.scss';

const NotificationWorkPlusDetail = props => {
  const { notificationSelected } = props;
  return (
    <div className="work-plus-detail">
      <div className="header-work-plus-detail">
        <span className="text-header">{notificationSelected.description}</span>
      </div>
      <div className="status-date-work-plus-detail">
        <span className="status-text">{notificationSelected.btnText}</span>
        <span className="date-text">{notificationSelected.date}</span>
        <span className="devider"></span>
        <span className="view-text">1.245 lượt xem</span>
      </div>
      <div className="content-work-plus-detail">
        <span className="des-text">{notificationSelected.description}</span>
      </div>
    </div>
  );
};

export default connect(state => ({
  notificationSelected: {
    date: '08/10/2019',
    description: 'Cập nhật module Đề xuất - Phê duyệt trên hệ thống WorkPlus',
    type: 'success',
    btnText: 'Bình thường',
    id: '0012'
  }
}))(NotificationWorkPlusDetail);
