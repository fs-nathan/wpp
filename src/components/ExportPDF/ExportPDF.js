import React, { Component } from 'react';
import styled from 'styled-components';

import * as images from '../../assets';
import './ExportPDF.scss';
import { isEmpty } from '../../helpers/utils/isEmpty';

const TableStyled1 = styled.table`
  display: table;
  margin-bottom: 30px;
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
`;

const ThStyled1 = styled.th`
  -webkit-print-color-adjust: exact !important;
  background: #e2efda;
  text-align: center;
  padding: 10px;
`;

const TdStyled1 = styled.td`
  border-bottom: 2px solid #000;
  color: #f50016;
  text-align: center;
  padding: 10px;
`;

const TableStyled2 = styled.table`
  display: table;
  width: 100%;
  border-spacing: 0;
`;

const ThStyled2 = styled.th`
  border-bottom: 2px solid #9e9e9e;
  -webkit-print-color-adjust: exact !important;
  background: #e2efda;
  text-align: center;
  padding: 10px;
`;

const TdStyled2 = styled.td`
  border-bottom: 1px solid #ddd;
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
`;

const TdStyled3 = styled.td`
  border-bottom: 1px solid #ddd;
  text-align: left;
  padding: 15px 20px;
`;
const TdStyled4 = styled.td`
  border-bottom: 1px solid #ddd;
  text-align: center;
  padding: 15px 0;
`;
class ExportPDF extends Component {
  getDateGift = dateUse => {
    if (dateUse >= 12 && dateUse < 18) {
      return 1;
    } else if (dateUse >= 18 && dateUse < 30) {
      return 2;
    } else if (dateUse >= 30 && dateUse <= 36) {
      return 3;
    } else if (dateUse < 12) {
      return 0;
    }
  };
  showPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  render() {
    const {
      numAcc,
      dateUse,
      dataBuy,
      dateSave,
      isCreate,
      isCheckedManagerWork,
      isCheckedBuyData,
      orderItem
    } = this.props;
    const pricePacketUser = 50000; //a
    const moneyPacketUser = isCreate
      ? pricePacketUser * numAcc * dateUse
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.buy_info.price
      : 0; //d, f
    const dateGift = isCreate
      ? this.getDateGift(dateUse)
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.day_from_payment_cycle / 30
      : 0;
    const datePlusOderBefor = isCreate
      ? isCheckedManagerWork
        ? 1
        : 0
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.day_from_old_order / 30
      : 0;
    const date3MO = isCheckedManagerWork ? 3 : 0;
    const totalDataUse = isCreate
      ? dateUse + dateGift + datePlusOderBefor + date3MO
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.day_use / 30
      : 0; //e
    ///////////////////////
    const pricePacketData = 3000; //a
    const moneyPacketData = isCreate
      ? pricePacketData * dataBuy * dateSave
      : !isEmpty(orderItem.packet_storage)
      ? orderItem.packet_storage.buy_info.price
      : 0; //d, f
    const totalDateData = isCreate
      ? dateSave
      : !isEmpty(orderItem.packet_storage)
      ? orderItem.packet_storage.day_use / 30
      : 0; //e
    //////
    const totalPriceBeforVAT = moneyPacketUser + moneyPacketData;
    const totalPriceVAT = totalPriceBeforVAT * 0.1;
    return (
      <div className="order-content">
        <form>
          <div id="printContent">
            <div className="print-content">
              <div className="print-head">
                <div className="head-left-right">
                  <div>
                    <img
                      src={images.logo_wrokplus}
                      alt=""
                      className="logo-container"
                    />
                  </div>
                  <div className="title-head-left-right">
                    Phúc An Technology and Tradding
                  </div>
                  <div className="infor-address-tel">
                    Add: No. 3/259, Dinh Cong Street, Hoang Mai District, Hanoi
                  </div>
                  <div className="infor-address-tel">
                    Tel: 024.6326.5870 - Hotline: 09.1800.6181
                  </div>
                  <div className="infor-email">
                    Website: workplus.vn - Email: info@workplus.vn
                  </div>
                </div>
                <div className="head-left-right">
                  <div className="infor-right">Thông tin đơn hàng workplus</div>
                  <div className="infor-right-oder">
                    Mã đơn hàng: {isCreate ? 'KH-FREE' : orderItem.code}
                  </div>
                  <div className="infor-right-oder">
                    Ngày tạo: {isCreate ? '20/11/2019' : orderItem.create_at}
                  </div>
                  <div className="infor-right-oder">
                    Tổng giá trị đơn hàng:&nbsp;
                    {isCreate
                      ? this.showPrice(totalPriceBeforVAT + totalPriceVAT)
                      : this.showPrice(orderItem.price || 0)}
                    VND
                  </div>
                  <div className="status-oder">
                    <span className="text-status-oder">
                      {isCreate ? 'CHƯA THANH TOÁN' : orderItem.status_payment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="print-body">
                <TableStyled1>
                  <thead>
                    <tr>
                      <ThStyled1>Mã đơn hàng</ThStyled1>
                      <ThStyled1>Ngày tạo</ThStyled1>
                      <ThStyled1>Gói sản phẩm</ThStyled1>
                      <ThStyled1>Thanh toán</ThStyled1>
                      <ThStyled1>Thành tiền</ThStyled1>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <TdStyled1>
                        {isCreate ? 'KH-FREE' : orderItem.code}
                      </TdStyled1>
                      <TdStyled1>
                        {isCreate ? '2019/09/09' : orderItem.create_at}
                      </TdStyled1>
                      <TdStyled1>
                        <React.Fragment>
                          {(isCheckedManagerWork || !isEmpty(orderItem)) && (
                            <p>
                              {isCreate
                                ? numAcc
                                : orderItem.packet_user.buy_info
                                    .number_user}{' '}
                              USER
                            </p>
                          )}
                          {(isCheckedBuyData || !isEmpty(orderItem)) && (
                            <p>
                              CS{' '}
                              {isCreate
                                ? dataBuy
                                : orderItem.packet_storage.name
                                    .split('-')
                                    .pop()}
                            </p>
                          )}
                        </React.Fragment>
                      </TdStyled1>
                      <TdStyled1>Tiền mặt</TdStyled1>
                      <TdStyled1>
                        {isCreate
                          ? this.showPrice(totalPriceBeforVAT + totalPriceVAT)
                          : this.showPrice(orderItem.price || 0)}{' '}
                      </TdStyled1>
                    </tr>
                  </tbody>
                </TableStyled1>

                <TableStyled2>
                  <thead>
                    <tr>
                      <ThStyled2 style={{ with: 40 }}>TT</ThStyled2>
                      <ThStyled2 style={{ with: 50 }}>
                        Chi tiết dịch vụ
                      </ThStyled2>
                      <ThStyled2 style={{ with: 100 }}>Đơn giá (VNĐ)</ThStyled2>
                      <ThStyled2 style={{ with: 60 }}>Số lượng</ThStyled2>
                      <ThStyled2 style={{ with: 100 }}>
                        Thời gian (Tháng)
                      </ThStyled2>
                      <ThStyled2 style={{ with: 100 }}>
                        Thành tiền (VNĐ)
                      </ThStyled2>
                    </tr>
                  </thead>

                  <tbody>
                    {(isCheckedManagerWork ||
                      !isEmpty(orderItem.packet_user)) && (
                      <React.Fragment>
                        <tr style={{ background: '#f2f2f2' }}>
                          <TdStyled2>1</TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div style={{ fontWeight: 'bold' }}>
                                Gói sản phẩm:{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info
                                      .number_user}{' '}
                                USER
                              </div>
                              <div style={{ color: '#1f9de0' }}>
                                Thời gian sử dụng: {totalDataUse} tháng <br />
                                (Kể từ ngày thanh toán)
                              </div>
                            </div>
                          </TdStyled3>
                          <TdStyled2></TdStyled2>
                          <TdStyled2></TdStyled2>
                          <TdStyled2>{totalDataUse}</TdStyled2>
                          <TdStyled2>
                            {this.showPrice(moneyPacketUser)}
                          </TdStyled2>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>
                                Đăng ký gói sản phầm{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info.number_user}
                                -USER
                              </div>
                              <div>
                                Số lượng USER:{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info.number_user}
                              </div>
                              <div>Dung lượng lưu trữ: 10 GB</div>
                              <div>
                                Thời gian sử dụng:{' '}
                                {isCreate
                                  ? dateUse
                                  : orderItem.packet_user.buy_info.day /
                                    30}{' '}
                                tháng
                              </div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>
                            {this.showPrice(pricePacketUser)}
                          </TdStyled4>
                          <TdStyled4>
                            {isCreate
                              ? numAcc
                              : orderItem.packet_user.buy_info.number_user}
                          </TdStyled4>
                          <TdStyled4>
                            {isCreate
                              ? dateUse
                              : orderItem.packet_user.buy_info.day / 30}
                          </TdStyled4>
                          <TdStyled4>
                            {this.showPrice(moneyPacketUser)}
                          </TdStyled4>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>Thời gian cộng thêm từ đơn hàng cũ</div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>{datePlusOderBefor}</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>
                                Tặng thời gian sử dụng do kỳ thanh toán: <br />{' '}
                                12 tháng
                              </div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>{dateGift}</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>Mã khuyến mại: WPKM-3MO</div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>{date3MO}</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                        </tr>
                      </React.Fragment>
                    )}
                    {(isCheckedBuyData || !isEmpty(orderItem)) && (
                      <React.Fragment>
                        <tr style={{ background: '#f2f2f2' }}>
                          <TdStyled2>{isCheckedManagerWork ? 2 : 1}</TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div style={{ fontWeight: 'bold' }}>
                                Gói sản phầm: CS-
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                              </div>
                              <div style={{ color: '#1f9de0' }}>
                                Thời gian{' '}
                                {isCreate
                                  ? dateSave
                                  : orderItem.packet_storage.buy_info.day /
                                    30}{' '}
                                tháng
                              </div>
                              <div style={{ color: '#1f9de0' }}>
                                (Kể từ ngày thanh toán)
                              </div>
                            </div>
                          </TdStyled3>
                          <TdStyled2></TdStyled2>
                          <TdStyled2></TdStyled2>
                          <TdStyled2>{totalDateData}</TdStyled2>
                          <TdStyled2>
                            {this.showPrice(moneyPacketData)}
                          </TdStyled2>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>
                                Đăng ký gói mở rộng: Cloud Storage (CS-
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                                )
                              </div>
                              <div>
                                Mua thêm dung lượng lưu trữ:{' '}
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                                GB
                              </div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>
                            {this.showPrice(pricePacketData)}
                          </TdStyled4>
                          <TdStyled4>
                            {isCreate
                              ? dataBuy
                              : orderItem.packet_storage.name.split('-').pop()}
                          </TdStyled4>
                          <TdStyled4>
                            {isCreate
                              ? dateSave
                              : orderItem.packet_storage.buy_info.day / 30}
                          </TdStyled4>
                          <TdStyled4>
                            {this.showPrice(moneyPacketData)}
                          </TdStyled4>
                        </tr>
                        <tr>
                          <TdStyled2></TdStyled2>
                          <TdStyled3>
                            <div className="">
                              <div>Thời gian cộng thêm từ đơn hàng cũ</div>
                            </div>
                          </TdStyled3>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>-</TdStyled4>
                          <TdStyled4>
                            {isCreate
                              ? 0
                              : orderItem.packet_storage.day_from_old_order /
                                30}
                          </TdStyled4>
                          <TdStyled4>-</TdStyled4>
                        </tr>
                      </React.Fragment>
                    )}
                  </tbody>
                </TableStyled2>

                <div className="total-group">
                  <div style={{ width: '50%' }}></div>
                  <div style={{ width: '50%' }}>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Tổng giá trị trước thuế (I+II)
                      </span>
                      <span>{this.showPrice(totalPriceBeforVAT)}</span>
                    </div>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Thuế VAT (10%)
                      </span>
                      <span>{this.showPrice(totalPriceVAT)}</span>
                    </div>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Giá trị đơn hàng
                      </span>
                      <span style={{ fontWeight: 'bold', color: '#f50016' }}>
                        {this.showPrice(totalPriceBeforVAT + totalPriceVAT)}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 30 }}>
                  <p style={{ fontWeight: 'bold', marginBottom: 10 }}>
                    *** Lưu ý
                  </p>
                  <p style={{ marginBottom: 10 }}>
                    Đơn hàng được tạo trực tuyến trên phần mềm quản lý công việc
                    Workplus
                  </p>
                  <p style={{ marginBottom: 10 }}>
                    Đơn hàng được tạo trực tuyến trên phần mềm quản lý công việc
                    Workplus
                  </p>
                  <p style={{ marginBottom: 10 }}>
                    Đơn hàng được tạo trực tuyến trên phần mềm quản lý công việc
                    Workplus
                  </p>
                  <p style={{ marginBottom: 10 }}>
                    Đơn hàng được tạo trực tuyến trên phần mềm quản lý công việc
                    Workplus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default ExportPDF;
