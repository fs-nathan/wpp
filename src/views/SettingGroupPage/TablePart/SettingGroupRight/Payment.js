import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as icons from '../../../../assets';
import './SettingGroupRight.scss';

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="col-sm-7 has-border-right payment-left">
        <h2>Thông tin xuất hóa đơn</h2>
        <p>
          Là thông tin xuất hóa đơn của khách hàng để WorkPlus xuất hóa đơn Giá
          trị gia tăng theo quy đinh hiện hành.
        </p>
        <TextField
          id="standard-full-width"
          label="Tên công ty (ghi đúng tên trên đăng ký kinh doanh)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Địa chỉ xuất hóa đơn (ghi đúng địa chỉ trên đăng ký kinh doanh)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Mã số thuế"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Người đại diện pháp luật (Ghi rõ họ tên và chức danh)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Địa chỉ nhận hóa đơn"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Số điện thoại liên hệ"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <TextField
          id="standard-full-width"
          label="Email (nhận hóa đơn điện tử)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="style-input-text"
        />
        <div className="edit-action">
          <Button variant="secondary" className="btn-edit">
            Chỉnh sửa
          </Button>
        </div>
      </div>
      <div className="divider-vertical" />
      <div className="col-sm-5 m-0 p-0 payment-right">
        <div className="payment-right-top">
          <h2>Thông tin thanh toán</h2>
          <p>
            Toàn bộ đơn hàng trên WorkPlus được thanh toán bằng chuyển khoản.
          </p>
          <p>
            Quý khách hàng vui lòng thanh toán chuyển khoản vào các tài khoản
            sau:
          </p>
          <p className="payment-title">TÀI KHOẢN CÔNG TY</p>
          <div className="payment-account">
            <img src={icons.ic_bidv} alt="" />
            <div className="payment-info">
              <h2>BIDV CHI NHÁNH SỞ GIAO DỊCH 1, HÀ NỘI</h2>
              <p>Chủ tài khoản: Công ty TNHH Công nghệ và thương mại Phúc An</p>
              <p>Số tài khoản: 1001.00000.24275</p>
            </div>
          </div>
          <p className="payment-title">TÀI KHOẢN CÁ NHÂN</p>
          <div className="payment-account">
            <img src={icons.ic_vcb} alt="" />
            <div className="payment-info">
              <h2>VIETCOMBANK CHI NHÁNH BA ĐÌNH, HÀ NỘI</h2>
              <p>Chủ tài khoản: Nguyễn Hữu Thành</p>
              <p>Số tài khoản: 0611001920071</p>
            </div>
          </div>
          <div className="payment-account">
            <img src={icons.ic_bidv} alt="" />
            <div className="payment-info">
              <h2>BIDV CHI NHÁNH THANH XUÂN, HÀ NỘI</h2>
              <p>Chủ tài khoản: Nguyễn Hữu Thành</p>
              <p>Số tài khoản: 22210001288967</p>
            </div>
          </div>
        </div>
        <div className="payment-right-bottom">
          <h2>LƯU Ý:</h2>
          <p>
            Khách hàng vui lòng kiểm tra thông tin tài khoản trước khi thực hiện
            thanh toán
          </p>
          <p>
            Khách hàng thanh toán vào tài khoản công ty vui lòng thanh toán giá
            trị sau thuế (VAT) để tránh trường hợp hệ thống không kích hoạt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
