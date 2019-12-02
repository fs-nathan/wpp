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
  padding: 10px 0;
`;

const TdStyled1 = styled.td`
  border-bottom: 2px solid #000;
  color: #f50016;
  text-align: center;
  padding: 10px 0;
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
  padding: 10px 0;
`;

const TdStyled2 = styled.td`
  border-bottom: 1px dashed #000;
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
`;

const TdStyled3 = styled.td`
  border-bottom: 1px dashed #000;
  text-align: left;
  padding: 15px 20px;
`;

class ExportPDF extends Component {
  render() {
    return (
      <div className="order-content">
        <form>
          <div id="printContent">
            <div className="print-content">
              <div className="print-head">
                <div className="head-left-right">
                  <div>
                    <img src={images.logo_wrokplus} alt="" />{' '}
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
                    Tổng giá trị đơn hàng: 6.270.000 VND
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
                        <p>10 USER</p>
                        <p>CS 100</p>
                      </TdStyled1>
                      <TdStyled1>Tiền mặt</TdStyled1>
                      <TdStyled1>10.000.000</TdStyled1>
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
                    <tr style={{ background: '#f2f2f2' }}>
                      <TdStyled2>1</TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div style={{ fontweight: 'bold' }}>
                            Gói sản phẩm: 10 USER
                          </div>
                          <div style={{ color: '#1f9de0' }}>
                            Thời gian sử dụng: 12 tháng <br />
                            (Kể từ ngày thanh toán)
                          </div>
                        </div>
                      </TdStyled3>
                      <TdStyled2></TdStyled2>
                      <TdStyled2></TdStyled2>
                      <TdStyled2>12</TdStyled2>
                      <TdStyled2>3.000.000</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Đăng ký gói sản phầm 10-USER</div>
                          <div>Số lượng USER: 10</div>
                          <div>Dung lượng lưu trữ: 10 GB</div>
                          <div>Thời gian sử dụng: 6 tháng</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>50000</TdStyled2>
                      <TdStyled2>10</TdStyled2>
                      <TdStyled2>6</TdStyled2>
                      <TdStyled2>3.000.000</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Thời gian cộng thêm từ đơn hàng cũ</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>1</TdStyled2>
                      <TdStyled2>-</TdStyled2>
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
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>2</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Mã khuyến mại: WPKM-3MO</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>3</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Đăng ký gói sản phầm CS-10</div>
                          <div>Số lượng USER: 10</div>
                          <div>Dung lượng lưu trữ: 10 GB</div>
                          <div>Thời gian sử dụng: 6 tháng</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>50000</TdStyled2>
                      <TdStyled2>10</TdStyled2>
                      <TdStyled2>6</TdStyled2>
                      <TdStyled2>3.000.000</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Thời gian cộng thêm từ đơn hàng cũ</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>1</TdStyled2>
                      <TdStyled2>-</TdStyled2>
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
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>2</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                    </tr>
                    <tr>
                      <TdStyled2></TdStyled2>
                      <TdStyled3>
                        <div className="">
                          <div>Mã khuyến mại: WPKM-3MO</div>
                        </div>
                      </TdStyled3>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                      <TdStyled2>3</TdStyled2>
                      <TdStyled2>-</TdStyled2>
                    </tr>
                  </tbody>
                </TableStyled2>
                <div className="total-group">
                  <div style={{ width: '50%' }}></div>
                  <div style={{ width: '50%' }}>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Tổng giá trị trước thuế (I+II)
                      </span>
                      <span>5.700.000</span>
                    </div>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Thuế VAT (10%)
                      </span>
                      <span>570.000</span>
                    </div>
                    <div className="item-total-group">
                      <span style={{ width: '40%', textAlign: 'right' }}>
                        Giá trị đơn hàng
                      </span>
                      <span style={{ fontWeight: 'bold', color: '#f50016' }}>
                        6.270.000
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
