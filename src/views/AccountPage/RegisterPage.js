import React, { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider
} from '@material-ui/core';
import { Routes } from '../../constants/routes';
import { actionRegister } from '../../actions/account';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await actionRegister(e.target.elements.email.value);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
      setErrMsg(error.message || 'Lỗi server!');
    }
  };

  const handleOnchange = () => {
    setErrMsg('');
  };

  return (
    <MainAccount>
      <div className="AccountPage RegisterPage">
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        <div className="heading-title">Đăng ký</div>
        {!isRegistered && (
          <React.Fragment>
            <form className="form-content" onSubmit={handleRegister}>
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                className="input-affix-wrapper"
              >
                <OutlinedInput
                  id="email"
                  required
                  type="email"
                  placeholder="Nhập Email đăng ký"
                  onChange={handleOnchange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon
                        className="icon-prefix"
                        path={mdiAccountOutline}
                        size={1}
                      />
                    </InputAdornment>
                  }
                />
                {errMsg && <div className="error-msg">{errMsg}</div>}
              </FormControl>
              <FormControlLabel
                control={<Checkbox color="primary" required />}
                label="Tôi không phải robot"
              />
              <Button
                variant="contained"
                type="submit"
                className="btn-action red-color"
              >
                Đăng ký
              </Button>
            </form>
            <div className="bottom-des">
              Bạn đã có tài khoản?
              <Link href={Routes.LOGIN} className="btn-link">
                Đăng nhập
              </Link>
            </div>
            <Divider className="divider" />
            <div className="notice-content">
              <div className="lb-text title">Lưu ý:</div>
              <div className="lb-text">
                Email đăng ký phải đang hoạt động. Chúng tôi sẽ gửi email tới
                email bạn đã đăng ký để xác thực.
              </div>
            </div>
          </React.Fragment>
        )}
        {isRegistered && (
          <div className="register-success">
            <Divider className="divider" />
            <p className="title">Cảm ơn bạn đã đăng ký sử dụng Workplus!</p>
            <p className="description">
              Một mã xác thực đã được gửi tới email của bạn. Vui lòng kiểm tra
              hộp thư đến (hoặc hòm thư Spam) để hoàn tất đăng ký.
            </p>
            <p>
              Liên hệ <strong>09.1800.6181</strong> để được hỗ trợ!
            </p>
            <Divider className="divider" />
            <Button
              variant="contained"
              className="btn-confirm-register"
              onClick={() => {
                window.location.href = Routes.CONFIRM_REGISTRATION;
              }}
            >
              Xác thực tài khoản
            </Button>
            <div className="bottom-des">
              Quay lại trang
              <Link href={Routes.LOGIN} className="btn-link">
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainAccount>
  );
};

export default RegisterPage;
