import React, { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiEmailOutline, mdiAccountOutline, mdiLockOutline, mdiCellphoneDock} from '@mdi/js';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { useTranslation } from 'react-i18next';
import { actionRegister } from '../../actions/account';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [dataRegister, setDataRegister] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const { t } = useTranslation();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await actionRegister(dataRegister);
      setIsRegistered(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrMsg(error.message || '');
    }
  };

  const handleOnchange = (key) => e => {
    setErrMsg('');
    setDataRegister({...dataRegister, [key]: e.target.value})
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
      <div className="AccountPage RegisterPage">
        {!isRegistered &&
        <div className="logo-content">
          <img className="logo-workplus" alt="" src={images.logo} />
        </div>
        }
        {!isRegistered &&<div className="heading-title">{t('IDS_WP_SIGN_UP')}</div>}
        {!isRegistered && (
          <React.Fragment>
            <form className="form-content" onSubmit={handleRegister}>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input input-affix-wrapper"
            >
              <OutlinedInput
                id="fullname"
                required
                onChange={handleOnchange("name")}
                placeholder={t('IDS_WP_YOUR_FULL_NAME')}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      className="icon-prefix"
                      path={mdiAccountOutline }
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
                  id="email"
                  required
                  type="email"
                  placeholder={t('DMH.VIEW.DP.RIGHT.UT.LABEL.EMAIL')}
                  onChange={handleOnchange("email")}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon
                        className="icon-prefix"
                        path={mdiEmailOutline }
                        size={1}
                      />
                    </InputAdornment>
                  }
                />
                {errMsg && <div className="error-msg">{errMsg}</div>}
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                className="input-affix-wrapper"
              >
                <OutlinedInput
                  id="phone"
                  required
                  type="text"
                  placeholder={t('DMH.VIEW.DP.RIGHT.UT.LABEL.PHONE')}
                  onChange={handleOnchange("phone")}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon
                        className="icon-prefix"
                        path={mdiCellphoneDock}
                        size={1}
                      />
                    </InputAdornment>
                  }
                />
                {errMsg && <div className="error-msg">{errMsg}</div>}
              </FormControl>
              <FormControl
                margin="normal"
                variant="outlined"
                fullWidth
                className="input-affix-wrapper custom-input item-pwd"
              >
                <OutlinedInput
                  id="password"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder={t('IDS_WP_PASSWORD')}
                  onBlur={handleCheckPwd}
                  size="small"
                  onChange={handleOnchange("password")}
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
              margin="normal"
              variant="outlined"
              fullWidth
              className="input-affix-wrapper custom-input"
            >
              <OutlinedInput
                id="confirmPassword"
                required
                type="password"
                autoComplete="new-password"
                placeholder={t('IDS_WP_RE_INPUT_CONFIRM_PASSWORD')}
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
              {pwdNotMatch && <div style={{color: 'red', marginTop: '15px'}}>{t('IDS_WP_CHECK_PASSWORD')}</div>}
            </FormControl>
            <div className="suggest-password">{t('IDS_WP_ENTER_REGISTER_PASSWORD_SUGGESTED')}</div>
              <FormControlLabel
                control={<Checkbox color="primary" required />}
                label={<><span>{t('IDS_WP_I_AM_ACCEPT_TERM')}</span> <Link href={Routes.ACCEPT_TERM} target="blank" className="btn-link">
                {t('IDS_WP_I_AM_ACCEPT_TERM_OF_USE')}
              </Link> {t('IDS_WP_I_AM_ACCEPT_TERM_WORK_PLUS')}</>}
              />
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
                {t('IDS_WP_SIGN_UP')}
              </Button>
            </form>
            <div className="bottom-des">
              {t('IDS_WP_HAVE_ACCOUNT')}
              <Link href={Routes.LOGIN} className="btn-link">
                {t('IDS_WP_LOGIN')}
              </Link>
            </div>
            
          </React.Fragment>
        )}
        {isRegistered && (
          <div className="register-success">
           
            <img alt="" src={images.ic_register_complete} />
            <div>
              <h5 className="register-notify_title">{t('IDS_WP_REGISTER_SUCCESS_TITLE')}</h5>
              <div className="register-notify_content">{t('IDS_WP_REGISTER_SUCCESS_TEXT')}</div>
            </div>
            <div className="bottom-des">
              <Button variant="outlined" onClick={()=>window.location.href = `${Routes.LOGIN}`}>
                {t('IDS_WP_LOGIN_NOW')}
              </Button>
            </div>
          </div>
        )}
      </div>
      </MainAccount>
  );
};

export default RegisterPage;
