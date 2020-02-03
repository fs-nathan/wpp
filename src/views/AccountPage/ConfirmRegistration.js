import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiLockOutline, mdiCheckCircle } from '@mdi/js';
import {
  TextField,
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
import { actionCompleteRegister, actionCheckCode } from '../../actions/account';
import { loginSuccess, loginFail } from '../../actions/authentications';
import { actionToast } from '../../actions/system/system';
import { apiService } from '../../constants/axiosInstance';
import {
  openNoticeModal,
  actionActiveGroup,
  getProfileService
} from '../../actions/system/system';
import {
  actionFetchGroupDetail,
  actionFetchListColor
} from '../../actions/setting/setting';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';
import { TOKEN, REFRESH_TOKEN, GROUP_ACTIVE } from '../../constants/constants';
import { isEmpty } from '../../helpers/utils/isEmpty';

const ConfirmRegistration = props => {
  const { t } = useTranslation();
  const [checkedCode, setCheckedCode] = useState(false);
  const [emailRegistered, setEmailRegistered] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pwdNotMatch, setPwdNotMatch] = useState(false);

  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleCompleteRegistration = useCallback(async e => {
    e.preventDefault();
    if (pwdNotMatch) return;
    const { elements } = e.target;
    const dataBody = {
      code: elements.code.value,
      name: elements.fullname.value,
      phone: elements.phoneNumber.value,
      company: elements.company.value,
      address: elements.address.value,
      password: elements.password.value
    };
    try {
      const res = await actionCompleteRegister(dataBody);
      localStorage.setItem(TOKEN, res.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
      localStorage.setItem(GROUP_ACTIVE, res.data.group_active);
      apiService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;
      apiService.defaults.headers.common['group-active'] =
        res.data.group_active;
      props.actionFetchGroupDetail(true);
      props.actionFetchListColor();

      const { data } = await getProfileService();
      if (!isEmpty(data.data)) {
        props.actionActiveGroup(data.data.group_active);
      }
      if (data.data.type === 'Free') {
        props.openNoticeModal();
      }
      props.loginSuccess(res.data);
      props.history.push(Routes.HOME);
    } catch (error) {
      handleToast('error', error.message);
    } // eslint-disable-next-line
  }, []);

  const handleCheckCode = async event => {
    const code = event.target.value;
    if (!code) return;
    try {
      const { data } = await actionCheckCode(code);
      setCheckedCode(true);
      setEmailRegistered(data.email || '');
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message || '');
    }
  };

  const handleChangeCode = () => {
    setErrorMsg('');
    setCheckedCode(false);
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
      <div className="AccountPage ConfirmRegistrationPage">
        <div className="header-content">
          <div className="logo-wrapper">
            <img
              className="logo-workplus"
              alt=""
              src={images.logo_workplus_wrap}
            />
          </div>
          <Divider className="divider"></Divider>
        </div>
        <div className="complete-registration-content">
          <form className="form-content" onSubmit={handleCompleteRegistration}>
            <div className="heading">
              <div className="lb-title">{t('IDS_WP_REGISTER_CONFIRM')}</div>
            </div>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">{t('IDS_WP_INPUT_VERIFY_CODE')} *</div>
              <OutlinedInput
                id="code"
                required
                onBlur={handleCheckCode}
                onChange={handleChangeCode}
                placeholder={t('IDS_WP_VERIFY_CODE')}
              />
              <div className="confirm-code-info">
                {checkedCode && (
                  <span className="confirm-success">
                    <Icon path={mdiCheckCircle} size={0.8} color="#48bb78" />
                    <span className="email-registered">{emailRegistered}</span>
                  </span>
                )}
                {errorMsg && <span className="err-msg">{errorMsg}</span>}
              </div>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">{t('IDS_WP_FULL_NAME')} *</div>
              <OutlinedInput
                id="fullname"
                required
                placeholder={t('IDS_WP_YOUR_FULL_NAME')}
              />
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">{t('IDS_WP_PHONE_NUMBER')} *</div>
              <OutlinedInput
                id="phoneNumber"
                required
                placeholder={t('IDS_WP_YOUR_PHONE_NUMBER')}
              />
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">{t('IDS_WP_COMPANY_NAME')} *</div>
              <OutlinedInput
                id="company"
                required
                placeholder={t('IDS_WP_YOUR_COMPANY_NAME')}
              />
            </FormControl>
            <div className="custom-select">
              <div className="lb-input">{t('IDS_WP_ADDRESS')} *</div>
              <TextField
                id="address"
                select
                required
                fullWidth
                SelectProps={{
                  native: true,
                  MenuProps: { className: 'menu' }
                }}
                variant="outlined"
                defaultValue=""
              >
                <option value="" disabled>
                  -- {t('IDS_WP_SELECT_CITY')} --
                </option>
                <option value="Hà Nội">{t('IDS_WP_HA_NOI')}</option>
                <option value="TP Hồ Chí Minh">
                  {t('IDS_WP_HO_CHI_MINH_CITY')}
                </option>
                <option value="Tỉnh/Thành khác">
                  {t('IDS_WP_OTHER_PROVINCE')}
                </option>
              </TextField>
            </div>
            <div className="group-password">
              <FormControl
                margin="normal"
                variant="outlined"
                fullWidth
                className="input-affix-wrapper custom-input item-pwd"
              >
                <div className="lb-input">{t('IDS_WP_LOGIN_PASSWORD')} *</div>
                <OutlinedInput
                  id="password"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder={t('IDS_WP_PASSWORD')}
                  size="small"
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
                margin="normal"
                variant="outlined"
                fullWidth
                className="input-affix-wrapper custom-input"
              >
                <div className="lb-input">
                  {t('IDS_WP_RE_INPUT_PASSWORD')} *
                </div>
                <OutlinedInput
                  id="confirmPassword"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder={t('IDS_WP_RE_INPUT_PASSWORD')}
                  onBlur={handleCheckPwd}
                  inputProps={{
                    maxLength: 20,
                    minLength: 8
                  }}
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
            </div>
            {pwdNotMatch && (
              <span className="err-msg err-check-pwd">
                {t('IDS_WP_PASSWORD_INCORRECT_ERROR')}
              </span>
            )}
            <div className="des-password">{t('IDS_WP_PASSWORD_VALID_DES')}</div>
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label={
                <span>
                  {t('IDS_WP_I_AGREE')}
                  <Link href="/term" className="btn-link">
                    {t('IDS_WP_TERM_OF_USE')}
                  </Link>
                  {t('IDS_WP_WORKPLUS_BASIS')}
                </span>
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!checkedCode}
              className="btn-action green-color"
            >
              {t('IDS_WP_REGISTER_CONFIRM')}
            </Button>
          </form>
        </div>
      </div>
    </MainAccount>
  );
};

export default connect(
  state => ({
    // toast: state.system.toast
  }),
  {
    actionToast,
    loginSuccess,
    loginFail,
    openNoticeModal,
    actionActiveGroup,
    actionFetchListColor,
    actionFetchGroupDetail
  }
)(withRouter(ConfirmRegistration));
