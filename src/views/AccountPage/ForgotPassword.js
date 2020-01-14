import React, { useState } from 'react';
import { Icon } from '@mdi/react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const handleForgotPassword = async e => {
    e.preventDefault();
    try {
      await actionForgotPassword(e.target.elements.email.value);
    } catch (error) {
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
        <div className="heading-title">{t('IDS_WP_FORGOT_PASSWORD')}</div>
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
          <div className="helper-text">{t('IDS_WP_FORGOT_PASSWORD_DES')}</div>

          <Button
            variant="contained"
            type="submit"
            className="btn-action red-color"
          >
            {t('IDS_WP_CHANGE_PASSWORD')}
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
      </div>
    </MainAccount>
  );
};

export default ForgotPasswordPage;
