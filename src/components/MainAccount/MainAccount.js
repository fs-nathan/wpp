import React, { Component } from 'react';
import * as images from '../../assets';
import './MainAccount.scss';

class MainAccount extends Component {
  render() {
    return (
      <div className="MainAccount">
        <div className="left-content">
          <img className="bg-login" alt="" src={images.bg_login} />
        </div>
        <div className="right-content">
          <div className="main-account-container">{this.props.children}</div>
          <div className="bottom-content">
            <a href="/" className="link-item">
              Trang chủ
            </a>
            <a href="/term" className="link-item">
              Điều khoản
            </a>
            <a href="/document" className="link-item">
              Tài liệu
            </a>
            <a href="/contact" className="link-item">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainAccount;
