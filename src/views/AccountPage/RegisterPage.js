import React, { Component } from 'react';
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
import { actionRegister } from '../../actions/account';
import MainAccount from '../../components/MainAccount/MainAccount';
import * as images from '../../assets';
import './AccountPage.scss';

class RegisterPage extends Component {
  handleRegister = async e => {
    e.preventDefault();
    try {
      await actionRegister(e.target.elements.email.value);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <MainAccount>
        <div className="AccountPage RegisterPage">
          <div className="logo-content">
            <img className="logo-workplus" alt="" src={images.logo} />
          </div>
          <div className="heading-title">Đăng ký</div>

          <form className="form-content" onSubmit={this.handleRegister}>
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
                placeholder="Nhập Email đăng ký"
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
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label="Tôi không phải robot"
            />
            <Button
              variant="contained"
              type="submit"
              className="btn-action red-color"
            >
              Đăng ký
            </Button>
          </form>

          <div className="bottom-des">
            Bạn đã có tài khoản?
            <Link href="/login" className="btn-link">
              Đăng nhập
            </Link>
          </div>
          <Divider className="divider" />
          <div className="notice-content">
            <div className="lb-text title">Lưu ý:</div>
            <div className="lb-text">
              Email đăng ký phải đang hoạt động. Chúng tôi sẽ gửi email tới
              email bạn đã đăng ký để xác thực.
            </div>
          </div>
        </div>
      </MainAccount>
    );
  }
}

export default RegisterPage;
