import React, { useState } from 'react';
import { Icon } from '@mdi/react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mdiLockOutline } from '@mdi/js';
import { connect } from 'react-redux';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@material-ui/core';
import { withRouter } from 'react-router';
import { actionResetPassword } from '../../actions/account';
import { actionToast } from '../../actions/system/system';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';
import { Routes } from '../../constants/routes';

const ResetPassword = props => {
  const { t } = useTranslation();
  const [resetOk, setResetOk] = useState(false);
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const parseQueryString = query => {
    const vars = query.split('&');
    let query_string = {};
    for (var i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      let key = decodeURIComponent(pair[0]);
      let value = decodeURIComponent(pair[1]);
      if (typeof query_string[key] === 'undefined') {
        query_string[key] = decodeURIComponent(value);
      } else if (typeof query_string[key] === 'string') {
        let arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  };

  const handleResetPassword = async e => {
    e.preventDefault();
    if (pwdNotMatch) return;
    try {
      setLoading(true);
      let token = '';
      if (props.location.search) {
        const query = props.location.search.substring(1);
        const queryString = parseQueryString(query);
        token = queryString.token || '';
      }
      await actionResetPassword(token, e.target.elements.password.value);
      setResetOk(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message) {
        props.actionToast('error', error.message);
        setTimeout(() => props.actionToast(null, ''), 3000);
      }
    }
  };

  const handleCheckPwd = () => {
    let pwd = document.getElementById('password').value;
    let confirmPwd = document.getElementById('confirmPassword').value;
    if (pwd && confirmPwd && pwd !== confirmPwd) {
      setPwdNotMatch(true);
    } else {
      setPwdNotMatch(false);
    }
  };

  return (
    <MainAccount>
      <div className="AccountPage ResetPasswordPage">
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        <div className="heading-title">{t('IDS_WP_CREATE_NEW_PWD')}</div>
        {!resetOk && (
          <React.Fragment>
            <form className="form-content" onSubmit={handleResetPassword}>
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
                  autoComplete="new-password"
                  placeholder={t('IDS_WP_PASSWORD')}
                  onBlur={handleCheckPwd}
                  inputProps={{ maxLength: 20, minLength: 8 }}
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
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                className="input-affix-wrapper"
              >
                <OutlinedInput
                  id="confirmPassword"
                  required
                  type="password"
                  autoComplete="new-password"
                  onBlur={handleCheckPwd}
                  inputProps={{ maxLength: 20, minLength: 8 }}
                  placeholder={t('IDS_WP_RE_INPUT_PASSWORD')}
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
              {pwdNotMatch && (
                <span className="err-check-pwd">
                  {t('IDS_WP_PASSWORD_INCORRECT_ERROR')}
                </span>
              )}
              <FormGroup row className="checkbox-item">
                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label={t('IDS_WP_I_AM_NOT_ROBOT')}
                />
              </FormGroup>
              <Button
                variant="contained"
                type="submit"
                className="btn-action red-color"
                disabled={loading}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    className="margin-circular"
                    color="white"
                  />
                )}
                {t('IDS_WP_DONE')}
              </Button>
            </form>
            <div className="bottom-des">
              {t('IDS_WP_YOU_WANT')}
              <Link href={Routes.LOGIN} className="btn-link">
                {t('IDS_WP_LOGIN')}
              </Link>
              {t('IDS_WP_OR')}
              <Link href={Routes.REGISTER} className="btn-link">
                {t('IDS_WP_SIGN_UP')}
              </Link>
            </div>
          </React.Fragment>
        )}
        {resetOk && (
          <div className="reset-pwd-success">
            <p className="msg-reset-success">{t('IDS_WP_RESET_PWD_SUCCESS')}</p>
            <Button
              variant="contained"
              type="submit"
              className="btn-action red-color"
              onClick={() => (window.location.href = Routes.LOGIN)}
            >
              {t('IDS_WP_LOGIN')}
            </Button>
          </div>
        )}
      </div>
    </MainAccount>
  );
};

export default connect(
  state => ({
    toast: state.system.toast
  }),
  { actionToast }
)(withRouter(ResetPassword));
