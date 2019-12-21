import React, { useCallback, useState } from 'react';
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
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

function ConfirmRegistration() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [emailRegistered, setEmailRegistered] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCompleteRegistration = useCallback(async e => {
    e.preventDefault();
    console.log('handleCompleteRegistration');
    const { elements } = e.target;
    const data = {
      code: elements.code.value,
      name: elements.fullname.value,
      phone: elements.phoneNumber.value,
      company: elements.company.value,
      address: elements.address.value,
      password: elements.password.value
    };
    console.log(data);
    try {
      await actionCompleteRegister(data);
      window.location.href = Routes.LOGIN;
    } catch (error) {
      console.log(error);
    }
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
              <div className="lb-title">Hoàn thành đăng ký</div>
            </div>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">Nhập mã xác thực *</div>
              <OutlinedInput
                id="code"
                required
                onBlur={handleCheckCode}
                onChange={handleChangeCode}
                placeholder="Verification code"
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
              <div className="lb-input">Họ và tên *</div>
              <OutlinedInput
                id="fullname"
                required
                placeholder="Your full name"
              />
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">Số điện thoại (di động) *</div>
              <OutlinedInput
                id="phoneNumber"
                required
                placeholder="Your phone number"
              />
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              className="custom-input"
            >
              <div className="lb-input">Tên công ty *</div>
              <OutlinedInput
                id="company"
                required
                placeholder="Your Company name"
              />
            </FormControl>
            <div className="custom-select">
              <div className="lb-input">Địa chỉ *</div>
              <TextField
                id="address"
                select
                required
                fullWidth
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: 'menu'
                  }
                }}
                variant="outlined"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Chọn Tỉnh/Thành phố --
                </option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                <option value="Tỉnh/Thành khác">Tỉnh/Thành khác</option>
              </TextField>
            </div>
            <div className="group-password">
              <FormControl
                margin="normal"
                variant="outlined"
                fullWidth
                className="input-affix-wrapper custom-input item-pwd"
              >
                <div className="lb-input">Mật khẩu đăng nhập *</div>
                <OutlinedInput
                  id="password"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mật khẩu"
                  size="small"
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
              <FormControl
                margin="normal"
                variant="outlined"
                fullWidth
                className="input-affix-wrapper custom-input"
              >
                <div className="lb-input">Nhập lại mật khẩu *</div>
                <OutlinedInput
                  id="confirmPassword"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu"
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
            <div className="des-password">
              Mật khẩu đăng nhập phải có ít nhất 8 ký tự, nhiều nhất 20 ký tự
            </div>
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label={
                <span>
                  Tôi đồng ý
                  <Link href="/term" className="btn-link">
                    Thỏa thuận sử dụng
                  </Link>
                  nền tảng Workplus.
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
              Hoàn thành đăng ký
            </Button>
          </form>
        </div>
      </div>
    </MainAccount>
  );
}

export default ConfirmRegistration;
