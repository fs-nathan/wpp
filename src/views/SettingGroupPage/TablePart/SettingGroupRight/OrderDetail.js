import React from 'react';
import { Button } from '@material-ui/core';
import Pdf from 'react-to-pdf';
import { mdiFilePdf } from '@mdi/js';
import Icon from '@mdi/react';
import * as icons from '../../../../assets';
import './SettingGroupRight.scss';
import ExportPDF from '../../../../components/ExportPDF/ExportPDF';

const ref = React.createRef();
const OrderDetail = () => {
  const options = {
    orientation: 'p',
    unit: 'px',
    format: [640, 890]
  };
  return (
    <div className="order-detail-container">
      <div className="col-sm-7 has-border-right detail-left" ref={ref}>
        <ExportPDF />
      </div>
      <div className="divider-vertical" />
      <div className="other-info-order-detail">
        <div className="UserInfo_right_header d-flex justify-content-center align-items-center">
          <p className="order-title">THÔNG TIN KHÁC</p>
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
          <Pdf
            targetRef={ref}
            filename="Đơn hàng.pdf"
            options={options}
            x={0.5}
            y={0.5}
          >
            {({ toPdf }) => (
              <Button
                variant="outlined"
                className="download-btn"
                onClick={toPdf}
              >
                <Icon path={mdiFilePdf} size={1.2} color="#f37c00" />
                &nbsp; &nbsp;Tải đơn hàng về máy
              </Button>
            )}
          </Pdf>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
