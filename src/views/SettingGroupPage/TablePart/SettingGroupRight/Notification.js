import React from 'react';
import { connect } from 'react-redux';
import './SettingGroupRight.scss';
import noti_setting from '../../../../assets/noti_setting.png';

const Notification = props => {
  return (
    <div className="payment-container">
      <div className="payment-left notification-content">
        <p className="top-header">Cài đặt nhận thông báo</p>
        <p className="text-payment-header">
          Bật/ Tắt nhận thông báo trên trình duyệt khi sử dụng phần mềm.
        </p>
        <img src={noti_setting} alt="" />
        <p className="text-payment-header boild-text">
          Để Bật/ Tắt nhận thông báo trên trình duyệt, thực hiện các bước sau:
        </p>
        <p className="text-payment-header">
          Bước 1: Click chuột vào biểu tượng hình ổ khóa trên đường dẫn trình
          duyệt.
        </p>
        <p className="text-payment-header">
          Bước 2: Tại tab Thông báo lựa chọn mục Cho phép.
        </p>
        <p className="text-payment-header">
          (Đối với trình duyệt sử dụng ngôn ngữ khác Tiếng Việt cũng tiến hành
          tương tự)
        </p>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    // state
  }),
  {}
)(Notification);
