import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { actionChangePassword } from '../../../../actions/account';
import { actionToast } from '../../../../actions/system/system';
import './SettingAccountRight.scss';

const ChangePassword = props => {
  const handleChangePassword = async e => {
    e.preventDefault();
    try {
      const { elements } = e.target;
      const result = {
        current_password: elements.current_password.value,
        new_password: elements.new_password.value,
        re_password: elements.re_password.value
      };
      await actionChangePassword(result);
      handleToast('success', 'Thay đổi mật khẩu thành công!');
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  return (
    <div className="change-password">
      <form onSubmit={handleChangePassword}>
        <div className="item-change-password">
          <TextField
            id="current_password"
            type="password"
            label="Mật khẩu cũ"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="item-change-password">
          <TextField
            id="new_password"
            type="password"
            label="Mật khẩu mới"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="item-change-password">
          <TextField
            id="re_password"
            type="password"
            label="Nhập lại mật khẩu mới"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            className="style-input-text"
          />
        </div>
        <div className="text-notification">
          <span className="text-noti title">Chú ý:</span>
          <span className="text-noti">
            &nbsp; Mật khẩu dài từ 8 đến 20 ký tự và không chứ dấu khoảng trắng
          </span>
        </div>
        <div className="block-action">
          <Button
            variant="contained"
            className="btn-action none-boxshadow"
            type="submit"
          >
            Cập nhập
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  state => ({
    toast: state.system.toast
  }),
  { actionToast }
)(withRouter(ChangePassword));
