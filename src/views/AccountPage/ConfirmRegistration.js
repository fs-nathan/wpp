import React, { useCallback } from 'react';
import { Icon } from '@mdi/react';
import { mdiLockOutline } from '@mdi/js';
import {
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from '@material-ui/core';
// import { actionCompleteRegister } from "../../actions/account";
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

function ConfirmRegistration() {
  const handleCompleteRegistration = useCallback(async e => {
    e.preventDefault();
    console.log('handleCompleteRegistration');
    const { elements } = e.target;
    const data = {
      fullname: elements.fullname.value,
      phoneNumber: elements.phoneNumber.value,
      title: elements.title.value,
      company: elements.company.value,
      address: elements.address.value,
      password: elements.password.value,
      confirmPassword: elements.confirmPassword.value
    };
    console.log(data);
    // try {
    //   await actionCompleteRegister(data);
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return (
    <MainAccount>
      <div className="AccountPage ConfirmRegistrationPage">
        <div className="header-content">
          <img
            className="logo-workplus"
            alt=""
            src={images.logo_workplus_wrap}
          />
          <div className="divider"></div>
        </div>
        <div className="complete-registration-content">
          <form className="form-content" onSubmit={handleCompleteRegistration}>
            <div className="heading">
              <div className="lb-text">Hoàn thành đăng ký tài khoản</div>
              <div className="lb-text registered-email">
                huuthanhxd@gmail.com
              </div>
            </div>
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
            <div className="custom-select">
              <div className="lb-input">Chức danh *</div>
              <TextField
                id="title"
                select
                fullWidth
                required
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
                  -- Chọn vị trí --
                </option>
                <option value="1">Kỹ sư</option>
                <option value="2">Chuyên viên</option>
                <option value="3">Kế toán</option>
              </TextField>
            </div>
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
                <option value="1">Hà Nội</option>
                <option value="2">TP Hồ Chí Minh</option>
                <option value="3">Hải Phòng</option>
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
                  maxLength="20"
                  minLength="8"
                  autoComplete="new-password"
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
                  maxLength="20"
                  minLength="8"
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu"
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
