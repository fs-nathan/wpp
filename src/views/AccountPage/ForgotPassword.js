import React, { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Link
} from '@material-ui/core';
import { actionForgotPassword } from '../../actions/account';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';
import { Routes } from '../../constants/routes';

const ForgotPasswordPage = props => {
  const [errorMsg, setErrorMsg] = useState('');
  const handleForgotPassword = async e => {
    e.preventDefault();
    try {
      await actionForgotPassword(e.target.elements.email.value);
    } catch (error) {
      console.log(error && error.message);
      setErrorMsg(error.message);
    }
  };

  const handleOnchange = () => {
    setErrorMsg('');
  };

  return (
    <MainAccount>
      <div className="AccountPage ForgotPasswordPage">
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        <div className="heading-title">Quên mật khẩu</div>
        <form className="form-content" onSubmit={handleForgotPassword}>
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
              placeholder="Email"
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
            {errorMsg && <span className="err-msg">{errorMsg}</span>}
          </FormControl>
          <div className="helper-text">
            Sau khi click đổi mật khẩu, vui lòng kiểm tra email (inbox hoặc
            spam) để nhận đường link tạo mật khẩu mới!
          </div>

          <Button
            variant="contained"
            type="submit"
            className="btn-action red-color"
          >
            Đổi mật khẩu
          </Button>
        </form>
        <div className="bottom-des">
          Hay bạn muốn
          <Link href={Routes.LOGIN} className="btn-link">
            Đăng nhập
          </Link>
          hoặc
          <Link href={Routes.REGISTER} className="btn-link">
            Đăng ký
          </Link>
        </div>
      </div>
    </MainAccount>
  );
};

export default ForgotPasswordPage;
