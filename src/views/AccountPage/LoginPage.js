import React, { useState, useEffect } from 'react';
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
import {
  actionlogin,
  loginSuccess,
  loginFail
} from '../../actions/authentications';
import { apiService } from '../../constants/axiosInstance';
import { Routes } from '../../constants/routes';
import MainAccount from '../../components/MainAccount/MainAccount';
import LoadingContent from '../../components/LoadingContent';
import * as images from '../../assets';
import './AccountPage.scss';
import { TOKEN, REFRESH_TOKEN, GROUP_ACTIVE } from '../../constants/constants';
import { openNoticeModal } from '../../actions/system/system';
import { actionFetchGroupDetail } from '../../actions/setting/setting';

const LoginPage = props => {
  const [isLoginFail, setLoginFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(GROUP_ACTIVE);
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { elements } = e.target;
      const email = elements.email.value;
      const password = elements.password.value;
      setIsLoading(true);
      const { data } = await actionlogin({ email, password });

      localStorage.setItem(TOKEN, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(GROUP_ACTIVE, data.group_active);
      apiService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
      apiService.defaults.headers.common['group-active'] = data.group_active;
      props.actionFetchGroupDetail(true);
      setIsLoading(false);
      props.loginSuccess(data);
      props.history.push(Routes.HOME);
    } catch (error) {
      setLoginFail(true);
      setIsLoading(false);
      props.loginFail(error.message || null);
    }
  };

  return (
    <MainAccount>
      <div className="AccountPage LoginPage">
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        <div className="heading-title">Đăng nhập</div>
        <LoadingContent loading={isLoading || false}>
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

            {isLoginFail && (
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
        </LoadingContent>
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

export default connect(null, {
  loginSuccess,
  loginFail,
  openNoticeModal,
  actionFetchGroupDetail
})(withRouter(LoginPage));
