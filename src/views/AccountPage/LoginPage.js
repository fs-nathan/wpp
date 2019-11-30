import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiAccountOutline, mdiLockOutline } from '@mdi/js';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Link
} from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/authentications';
import { Routes } from '../../constants/routes';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';
import { TOKEN, REFRESH_TOKEN } from '../../constants/constants';
import { openNoticeModal } from '../../actions/system/system';

const LoginPage = props => {
  const handleLogin = e => {
    e.preventDefault();
    // login with api
    // const { elements } = e.target;
    // const email = elements.email.value;
    // const password = elements.password.value;
    // props.login({email, password});

    // fake login
    localStorage.setItem(TOKEN, 'token');
    localStorage.setItem(REFRESH_TOKEN, 'refreshToken');
    localStorage.setItem('group-active', 'groupActive');
    props.history.push(Routes.HOME);
    props.openNoticeModal();
  };

  const { isAuthFail, token } = props;
  if (token) {
    props.history.push(Routes.HOME);
    props.openNoticeModal();
  }

  return (
    <MainAccount>
      <div className="AccountPage LoginPage">
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        <div className="heading-title">Đăng nhập</div>
        <form className="form-content" onSubmit={handleLogin}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            className="input-affix-wrapper"
          >
            <OutlinedInput
              id="email"
              required
              type="text"
              defaultValue="ducpminh668@gmail.com"
              placeholder="Email hoặc Số điện thoại"
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
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            className="input-affix-wrapper"
          >
            <OutlinedInput
              id="password"
              required
              type="password"
              defaultValue="12345678"
              placeholder="Mật khẩu"
              startAdornment={
                <InputAdornment position="start">
                  <Icon
                    className="icon-prefix"
                    path={mdiLockOutline}
                    size={1}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormGroup row className="checkbox-item">
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label="Tôi không phải robot"
            />
            <Link href="/forgot-password">Quên mật khẩu?</Link>
          </FormGroup>

          {isAuthFail && (
            <div className="error-msg">
              <div className="lb-text-err">
                Tài khoản không tồn tại hoặc mật khẩu không đúng.
              </div>
              <div className="lb-text-err">Vui lòng nhập lại!</div>
            </div>
          )}
          <Button
            variant="contained"
            type="submit"
            className="btn-action red-color"
          >
            Đăng nhập
          </Button>
        </form>
        <div className="bottom-des">
          Bạn chưa có tài khoản?
          <Link href="/register" className="btn-link">
            Đăng ký
          </Link>
        </div>
      </div>
    </MainAccount>
  );
};

export default connect(
  state => ({
    isAuthFail: state.authentications.error,
    token: state.authentications.data.token
  }),
  {
    login,
    openNoticeModal
  }
)(withRouter(LoginPage));
