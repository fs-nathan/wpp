import React, { Component } from 'react';
import styled from 'styled-components';

import * as images from '../../assets';
import './ExportPDF.scss';

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
      isCheckedBuyData
    } = this.props;
    const pricePacketUser = 50000; //a
    const moneyPacketUser = pricePacketUser * numAcc * dateUse; //d, f
    const dateGift = this.getDateGift(dateUse);
    const datePlusOderBefor = isCheckedManagerWork ? 1 : 0;
    const date3MO = isCheckedManagerWork ? 3 : 0;
    const totalDataUse = dateUse + dateGift + datePlusOderBefor + date3MO; //e
    ///////////////////////
    const pricePacketData = 3000; //a
    const moneyPacketData = pricePacketData * dataBuy * dateSave; //d, f
    const totalDateData = dateSave; //e
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
                  <div className="infor-right-oder">Mã đơn hàng: KH-FREE</div>
                  <div className="infor-right-oder">Ngày tạo: 20/11/2019</div>
                  <div className="infor-right-oder">
                    Tổng giá trị đơn hàng:{' '}
                    {this.showPrice(totalPriceBeforVAT + totalPriceVAT)} VND
                  </div>
                  <div className="status-oder">
                    <span className="text-status-oder">CHƯA THANH TOÁN</span>
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
                      <TdStyled1>KH-FREE</TdStyled1>
                      <TdStyled1>2019/09/09</TdStyled1>
                      <TdStyled1>
                        {
                          isCheckedManagerWork &&
                          <p>{isCreate ? numAcc : 10} USER</p>
                        }
                        {
                          isCheckedBuyData &&
                          <p>CS {isCreate ? dataBuy : 10}</p>
                        }
                      </TdStyled1>
                      <TdStyled1>Tiền mặt</TdStyled1>
                      <TdStyled1>
                        {this.showPrice(totalPriceBeforVAT + totalPriceVAT)}
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
                  {
                    isCheckedManagerWork && 
                    <React.Fragment>
                       <tr style={{ background: '#f2f2f2' }}>
                      <TdStyled2>1</TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div style={{ fontWeight: 'bold' }}>
                            Gói sản phẩm: {isCreate ? numAcc : 10} USER
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
                      <TdStyled2>{this.showPrice(moneyPacketUser)}</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>
                            Đăng ký gói sản phầm {isCreate ? numAcc : 10}-USER
                          </div>
                          <div>Số lượng USER: {isCreate ? numAcc : 10}</div>
                          <div>Dung lượng lưu trữ: 10 GB</div>
                          <div>
                            Thời gian sử dụng: {isCreate ? dateUse : 10} tháng
                          </div>
                        </div>
                      </TdStyled3>
                      <TdStyled4>{this.showPrice(pricePacketUser)}</TdStyled4>
                      <TdStyled4>{isCreate ? numAcc : 10}</TdStyled4>
                      <TdStyled4>{isCreate ? dateUse : 10}</TdStyled4>
                      <TdStyled4>{this.showPrice(moneyPacketUser)}</TdStyled4>
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
                            Tặng thời gian sử dụng do kỳ thanh toán: <br /> 12
                            tháng
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
                  }
                  {
                    isCheckedBuyData &&
                    <React.Fragment>
                      <tr style={{ background: '#f2f2f2' }}>
                        <TdStyled2>2</TdStyled2>
                        <TdStyled3>
                          <div className="">
                            <div style={{ fontWeight: 'bold' }}>
                              Gói sản phầm: CS-{isCreate ? dataBuy : 10}
                            </div>
                            <div style={{ color: '#1f9de0' }}>
                              Thời gian {isCreate ? dateSave : 10} tháng
                            </div>
                            <div style={{ color: '#1f9de0' }}>
                              (Kể từ ngày thanh toán)
                            </div>
                          </div>
                        </TdStyled3>
                        <TdStyled2></TdStyled2>
                        <TdStyled2></TdStyled2>
                        <TdStyled2>{totalDateData}</TdStyled2>
                        <TdStyled2>{this.showPrice(moneyPacketData)}</TdStyled2>
                      </tr>
                      <tr>
                        <TdStyled2></TdStyled2>
                        <TdStyled3>
                          <div className="">
                            <div>
                              Đăng ký gói mở rộng: Cloud Storage (CS-
                              {isCreate ? dataBuy : 10})
                            </div>
                            <div>
                              Mua thêm dung lượng lưu trữ:{' '}
                              {isCreate ? dataBuy : 10}GB
                            </div>
                          </div>
                        </TdStyled3>
                        <TdStyled4>{this.showPrice(pricePacketData)}</TdStyled4>
                        <TdStyled4>{isCreate ? dataBuy : 10}</TdStyled4>
                        <TdStyled4>{isCreate ? dateSave : 10}</TdStyled4>
                        <TdStyled4>{this.showPrice(moneyPacketData)}</TdStyled4>
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
                        <TdStyled4>0</TdStyled4>
                        <TdStyled4>-</TdStyled4>
                      </tr>
                    </React.Fragment>
                  }
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
