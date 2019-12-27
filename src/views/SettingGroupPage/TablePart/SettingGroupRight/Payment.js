import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as icons from '../../../../assets';
import LoadingBox from '../../../../components/LoadingBox';
import './SettingGroupRight.scss';
import {
  actionChangeLoading,
  billService,
  actionGetBill,
  updateBillService
} from '../../../../actions/setting/setting';

const Payment = props => {
  const [editMode, setEditMode] = useState(false);
  const handleFetchData = async () => {
    try {
      props.actionChangeLoading(true);
      const { data } = await billService();
      props.actionGetBill(data.bill);
      props.actionChangeLoading(false);
    } catch (err) {
      props.actionChangeLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  const handleEditBill = async e => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      e.target.company.focus();
      return;
    }
    try {
      const { elements } = e.target;
      const result = {
        company: elements.company.value,
        address_export: elements.address_export.value,
        tax_code: elements.tax_code.value,
        manager: elements.manager.value,
        address_import: elements.address_import.value,
        phone: elements.phone.value,
        email: elements.email.value
      };
      await updateBillService(result);
      handleFetchData();
    } catch (err) {}
  };
  if (props.isLoading) return <LoadingBox />;
  return (
    <div className="payment-container">
      <div className="payment-left">
        <p className="top-header">Thông tin xuất hóa đơn</p>
        <p className="text-payment-header">
          Là thông tin xuất hóa đơn của khách hàng để WorkPlus xuất hóa đơn Giá
          trị gia tăng theo quy định hiện hành.
        </p>
        <form onSubmit={handleEditBill}>
          <TextField
            id="company"
            label="Tên công ty (ghi đúng tên trên đăng ký kinh doanh)"
            fullWidth
            margin="normal"
            defaultValue={props.bill.company}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="address_export"
            label="Địa chỉ xuất hóa đơn (ghi đúng địa chỉ trên đăng ký kinh doanh)"
            fullWidth
            margin="normal"
            defaultValue={props.bill.address_export}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="tax_code"
            label="Mã số thuế"
            fullWidth
            margin="normal"
            defaultValue={props.bill.tax_code}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="manager"
            label="Người đại diện pháp luật (Ghi rõ họ tên và chức danh)"
            fullWidth
            margin="normal"
            defaultValue={props.bill.manager}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="address_import"
            label="Địa chỉ nhận hóa đơn"
            fullWidth
            margin="normal"
            defaultValue={props.bill.address_import}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="phone"
            label="Số điện thoại liên hệ"
            fullWidth
            margin="normal"
            defaultValue={props.bill.phone}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <TextField
            id="email"
            label="Email (nhận hóa đơn điện tử)"
            fullWidth
            margin="normal"
            defaultValue={props.bill.email}
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
            className="style-input-text"
          />
          <div className="edit-action">
            <Button variant="contained" className="btn-edit" type="submit">
              {editMode ? 'Lưu' : ' Chỉnh sửa'}
            </Button>
            {editMode && (
              <Button
                variant="contained"
                className="btn-edit btn-cancel"
                onClick={() => {
                  handleFetchData();
                  setEditMode(false);
                }}
              >
                Hủy
              </Button>
            )}
          </div>
        </form>
      </div>
      {/* <Divider orientation="vertical" className="divider-vertical" /> */}
      <div className="payment-right">
        <div className="payment-right-top">
          <p className="top-header">Thông tin thanh toán</p>
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
          <p className="right-bottom-text">
            Khách hàng thanh toán vào tài khoản công ty vui lòng thanh toán giá
            trị sau thuế (VAT) để tránh trường hợp hệ thống không kích hoạt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    bill: state.setting.bill,
    isLoading: state.setting.isLoading
  }),
  {
    actionGetBill,
    actionChangeLoading
  }
)(withRouter(Payment));
