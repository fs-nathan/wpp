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
import { useTranslation } from 'react-i18next';
import { actionRegister } from '../../actions/account';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { t } = useTranslation();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await actionRegister(e.target.elements.email.value);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
      setErrMsg(error.message || '');
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
        <div className="heading-title">{t('IDS_WP_SIGN_UP')}</div>
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
                  placeholder={t('IDS_WP_ENTER_REGISTER_EMAIL')}
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
                label={t('IDS_WP_I_AM_NOT_ROBOT')}
              />
              <Button
                variant="contained"
                type="submit"
                className="btn-action red-color"
              >
                {t('IDS_WP_SIGN_UP')}
              </Button>
            </form>
            <div className="bottom-des">
              {t('IDS_WP_HAVE_ACCOUNT')}
              <Link href={Routes.LOGIN} className="btn-link">
                {t('IDS_WP_LOGIN')}
              </Link>
            </div>
            <Divider className="divider" />
            <div className="notice-content">
              <div className="lb-text title">{t('IDS_WP_NOTE')}:</div>
              <div className="lb-text">
                {t('IDS_WP_REGISTER_EMAIL_DESCRIPTION')}
              </div>
            </div>
          </React.Fragment>
        )}
        {isRegistered && (
          <div className="register-success">
            <Divider className="divider" />
            <p className="title">{t('IDS_WP_THANK_YOU_USED_WORK_PLUS')}</p>
            <p className="description">
              {t('IDS_WP_CONFIRM_CODE_DESCRIPTION')}
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: t('IDS_WP_CONTACT_TO_SUPPORT')
              }}
            ></p>
            <Divider className="divider" />
            <Button
              variant="contained"
              className="btn-confirm-register"
              onClick={() => {
                window.location.href = Routes.CONFIRM_REGISTRATION;
              }}
            >
              {t('IDS_WP_CONFIRM_ACCOUNT')}
            </Button>
            <div className="bottom-des">
              {t('IDS_WP_BACK_PAGE')}
              <Link href={Routes.LOGIN} className="btn-link">
                {t('IDS_WP_LOGIN')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainAccount>
  );
};

export default RegisterPage;
