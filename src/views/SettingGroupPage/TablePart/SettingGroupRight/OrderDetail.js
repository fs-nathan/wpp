import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import { mdiFilePdf } from '@mdi/js';
import Icon from '@mdi/react';
import * as icons from '../../../../assets';
import './SettingGroupRight.scss';
import ExportPDF from '../../../../components/ExportPDF/ExportPDF';

class OrderDetail extends Component {
  render() {
    return (
      <div className="order-detail-container">
        <div className="col-sm-7 has-border-right detail-left">
          <ExportPDF ref={el => (this.componentRef = el)} />
        </div>
        <div className="divider-vertical" />
        <div className="other-info-order-detail">
          <div className="UserInfo_right_header d-flex justify-content-center align-items-center">
            <h1>THÔNG TIN KHÁC</h1>
          </div>
          <div className="detail-right-bottom">
            <p className="title-item">Người tạo</p>
            <div className="creator-item">
              <div className="creator-info">
                <h2>Trần Thị Lan Anh</h2>
                <p>Tạo đơn hàng ngày 01/03/2019</p>
              </div>
              <img src={icons.avatar_user} alt="" />
            </div>
            <p className="title-item">Tình trạng</p>
            <p className="red-text">Hết hạn</p>
            <p className="title-item">Ngày hết hạn</p>
            <p className="red-text">20/12/2019</p>
            <p className="title-item">Thanh toán</p>
            <p>Đã thanh toán</p>
            <p className="title-item">Hóa đơn</p>
            <p>Đã xuất hóa đơn</p>

            <ReactToPrint
              trigger={() => (
                <Button
                  variant="outlined"
                  className="download-btn"
                  onClick={this.demoMode}
                >
                  <Icon path={mdiFilePdf} size={1.2} color="#f37c00" />
                  &nbsp; &nbsp;Tải đơn hàng về máy
                </Button>
              )}
              content={() => this.componentRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
