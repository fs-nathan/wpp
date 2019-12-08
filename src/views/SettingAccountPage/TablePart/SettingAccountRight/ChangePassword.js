import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SettingAccountRight.scss';

const ChangePassword = () => {
  return (
    <div className="change-password">
      <div className="item-change-password">
        <TextField
          id="standard-full-width"
          label="Mật khẩu cũ"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
      </div>
      <div className="item-change-password">
        <TextField
          id="standard-full-width"
          label="Mật khẩu mới"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
      </div>
      <div className="item-change-password">
        <TextField
          id="standard-full-width"
          label="Nhập lại mật khẩu mới"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
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
        <Button variant="contained" className="btn-action">
          Cập nhập
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
