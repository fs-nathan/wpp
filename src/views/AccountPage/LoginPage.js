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
import { useTranslation } from 'react-i18next';
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
import {
  openNoticeModal,
  getProfileService,
  actionActiveGroup
} from '../../actions/system/system';
import {
  actionFetchGroupDetail,
  actionFetchListColor
} from '../../actions/setting/setting';

const LoginPage = props => {
  const [isLoginFail, setLoginFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
      props.actionFetchListColor();
      setIsLoading(false);
      const res = await getProfileService();
      props.actionActiveGroup(res.data.data.group_active);
      if (
        res.data.data.group_active &&
        res.data.data.group_active.type === 'Free'
      ) {
        props.openNoticeModal();
      }
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
        <div className="heading-title">{t('IDS_WP_LOGIN')}</div>
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
                placeholder={t('IDS_WP_EMAIL_OR_PHONE_NUMBER')}
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
                placeholder={t('IDS_WP_PASSWORD')}
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
                label={t('IDS_WP_I_AM_NOT_ROBOT')}
              />
              <Link href="/forgot-password">
                {t('IDS_WP_FORGOT_PASSWORD_QUESTION')}
              </Link>
            </FormGroup>

            {isLoginFail && (
              <div className="error-msg">
                <div className="lb-text-err">
                  {t('IDS_WP_ACCOUNT_OR_PASSWORD_INCORRECT')}
                </div>
                <div className="lb-text-err">
                  {t('IDS_WP_PLEASE_ENTER_AGAIN')}
                </div>
              </div>
            )}
            <Button
              variant="contained"
              type="submit"
              className="btn-action red-color"
            >
              {t('IDS_WP_LOGIN')}
            </Button>
          </form>
        </LoadingContent>
        <div className="bottom-des">
          {t('IDS_WP_DONT_HAVE_ACCOUNT')}
          <Link href="/register" className="btn-link">
            {t('IDS_WP_SIGN_UP')}
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
  actionFetchGroupDetail,
  actionFetchListColor,
  actionActiveGroup
})(withRouter(LoginPage));
