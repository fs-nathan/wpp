import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Routes } from '../../../../constants/routes';
import {
  orderCreateService,
  checkPromotionCode,
  getInfoBeforeCreateOrder,
  getNumberDayFromOldOrder
} from '../../../../actions/setting/setting';
import SnackbarComponent from '../../../../components/Snackbars';
import './SettingGroupRight.scss';
import ExportPDF from '../../../../components/ExportPDF/ExportPDF';
import OrderInit from '../../../../components/ExportPDF/OrderInit';
import SliderProgess from '../../../../components/SliderProgess/SliderProgess';

const marks = {
  accountNum: {
    mark: [
      { value: 5, label: '5 user' },
      { value: 1000, label: '1000 user' }
    ],
    min: 5,
    max: 1000
  },
  storage: {
    mark: [
      { value: 100, label: '100 GB' },
      { value: 10000, label: '10.000 GB' }
    ],
    min: 100,
    max: 10000
  },
  time: {
    mark: [
      { value: 1, label: '1 tháng' },
      { value: 36, label: '36 tháng' }
    ],
    min: 1,
    max: 36
  }
};

const CreateOrder = props => {
  const [isCheckedManagerWork, setIsCheckedManagerWork] = useState(false);
  const [isCheckedBuyData, setIsCheckedBuyData] = useState(false);
  const [numAcc, SetnumAcc] = useState(0);
  const [dateUse, SetdateUse] = useState(0);
  const [dataBuy, SetdataBuy] = useState(0);
  const [dateSave, SetdateSave] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [mesToast, setMesToast] = useState('');
  const [inputPromotionCode, SetInputPromotionCode] = useState('');
  const [isErrorCode, SetIsErrorCode] = useState(0);
  const [dayBonus, SetDayBonus] = useState(0);
  const [dataBeforOder, setDataBeforOder] = useState({});
  const [bonusCode, setBonusCode] = useState('');
  const [dataNumberOldOder, setDataNumberOldOder] = useState({});
  useEffect(() => {
    fetInfoBeforeCreateOrder();
    fetNumberDayFromOldOrder();
  }, []);

  const fetInfoBeforeCreateOrder = async () => {
    try {
      const { data } = await getInfoBeforeCreateOrder();
      setDataBeforOder(data);
    } catch (error) {}
  };
  const fetNumberDayFromOldOrder = async () => {
    try {
      const { data } = await getNumberDayFromOldOrder();
      setDataNumberOldOder(data.data);
    } catch (error) {}
  };
  const handleChangeCheck = (type, value) => {
    if (type === 'work') {
      setIsCheckedManagerWork(value);
      if (value) {
        SetnumAcc(5);
        SetdateUse(12);
      } else {
        SetnumAcc(0);
        SetdateUse(0);
      }
    } else {
      setIsCheckedBuyData(value);
      if (value) {
        SetdataBuy(1000);
        SetdateSave(3);
      } else {
        SetdataBuy(0);
        SetdateSave(0);
      }
    }
  };
  const handleChangeSilder = (type, value) => {
    switch (type) {
      case 'numAcc':
        SetnumAcc(value);
        break;
      case 'dateUse':
        SetdateUse(value);
        break;
      case 'dataBuy':
        SetdataBuy(value);
        break;
      default:
        SetdateSave(value);
    }
  };
  const handleCreateOder = async () => {
    try {
      let dataBody = {
        code: dataBeforOder.code
      };
      if (isCheckedManagerWork) {
        dataBody = {
          ...dataBody,
          packet_user: 1,
          number_user: numAcc,
          time_use: dateUse
        };
      }
      if (isCheckedBuyData) {
        dataBody = {
          ...dataBody,
          packet_storage: 1,
          storage_size: dataBuy,
          storage_time_use: dateSave
        };
      }
      if (isErrorCode === 2) {
        dataBody = {
          ...dataBody,
          bonus_code: bonusCode
        };
      }
      const { data } = await orderCreateService(dataBody);
      props.history.push({
        pathname: Routes.SETTING_GROUP_ORDER,
        search: `?order_id=${data.order_id}`
      });
      setOpenToast(true);
      setMesToast('Tạo đơn hàng thành công!');
      setTimeout(() => {
        setOpenToast(false);
      }, 2000);
    } catch (error) {}
  };
  const handleCloseToast = () => {
    setOpenToast(false);
  };
  const handleCheckPromotionCode = async () => {
    try {
      const { data } = await checkPromotionCode({ code: inputPromotionCode });
      SetIsErrorCode(2);
      setBonusCode(inputPromotionCode);
      SetDayBonus(data.day_bonus);
    } catch (error) {
      SetIsErrorCode(1);
      SetInputPromotionCode();
    }
  };
  const handleChangePromotion = e => {
    SetInputPromotionCode(e.target.value);
  };
  return (
    <div className="order-detail-container create-order">
      <div className="has-border-right detail-left">
        {isCheckedManagerWork || isCheckedBuyData ? (
          <ExportPDF
            numAcc={numAcc}
            dateUse={dateUse}
            dataBuy={dataBuy}
            dateSave={dateSave}
            isCreate={true}
            isCheckedManagerWork={isCheckedManagerWork}
            isCheckedBuyData={isCheckedBuyData}
            dataBeforOder={dataBeforOder}
            dayBonus={dayBonus}
            bonusCode={bonusCode}
            dataNumberOldOder={dataNumberOldOder}
          />
        ) : (
          <OrderInit />
        )}
      </div>
      {/* <div className="divider-vertical" /> */}
      <div className="content-create-order">
        <div className="UserInfo_right_header d-flex justify-content-center align-items-center">
          <p className="order-title">THIẾT LẬP ĐƠN HÀNG</p>
        </div>
        <div className="detail-right-bottom">
          <p className="title-item">Bước 1: Chọn dịch vụ muốn mua</p>
          <FormControlLabel
            className="cb-item"
            control={
              <Checkbox
                onChange={event =>
                  handleChangeCheck('work', event.target.checked)
                }
                color="default"
                checked={isCheckedManagerWork}
                className="cb-success"
              />
            }
            label="Nền tảng quản lý công việc WorkPlus"
          />
          <FormControlLabel
            className="cb-item"
            control={
              <Checkbox
                onChange={event =>
                  handleChangeCheck('data', event.target.checked)
                }
                checked={isCheckedBuyData}
                color="default"
                className="cb-success"
              />
            }
            label="Dung lượng lưu trữ (mua thêm)"
          />
          <p className="title-item">Bước 2: Thiết lập thông số</p>
          {isCheckedManagerWork && (
            <React.Fragment>
              <p className="sub-title-item">Chọn số lượng tài khoản:</p>
              <SliderProgess
                item={marks.accountNum}
                value={numAcc}
                defaultValue={5}
                step={5}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('numAcc', value)
                }
              />
              <p>số tài khoản sử dụng (từ 5 - 1000)</p>
              <p>Trên 1000 user vui lòng liên hệ để được hỗ trợ</p>
              <p>
                Đơn giá phụ thuộc vào số lượng user bạn đăng ký (
                <a href="/">Xem bảng giá</a>)
              </p>
              <p className="sub-title-item">Thời gian sử dụng/thanh toán</p>
              <SliderProgess
                item={marks.time}
                value={dateUse}
                defaultValue={12}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('dateUse', value)
                }
              />
              <p>Thanh toán 12-18 tháng: Tặng thêm 01 tháng sử dụng</p>
              <p>Thanh toán 18-30 tháng: Tặng thêm 02 tháng sử dụng</p>
              <p>Thanh toán 30-36 tháng: Tặng thêm 03 tháng sử dụng</p>
              <div className="border create-order-border" />
            </React.Fragment>
          )}
          {isCheckedBuyData && (
            <React.Fragment>
              <p className="sub-title-item">Dung lượng lưu trữ (mua thêm)</p>
              <SliderProgess
                item={marks.storage}
                value={dataBuy}
                defaultValue={1000}
                step={100}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('dataBuy', value)
                }
              />
              <p className="sub-title-item">
                Thời gian lưu trữ (mua thêm)/thanh toán
              </p>
              <SliderProgess
                item={marks.time}
                value={dateSave}
                defaultValue={3}
                step={3}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('dateSave', value)
                }
              />
              <div className="border create-order-border" />
            </React.Fragment>
          )}
          <p className="sub-title-item">Mã khuyến mại</p>
          <p className="error-text">
            Bạn chỉ được áp dụng duy nhất 01 mã khuyến mại cho một đơn hàng tại
            một thời điểm
          </p>
          <div className="create-order-action">
            {/* <Form.Control
                type="text"
                required
                className="evoucher-input"
                placeholder="Nhập mã khuyến mại"
              /> */}
            <OutlinedInput
              type="text"
              placeholder="Nhập mã khuyến mãi"
              className="input-voucher"
              value={inputPromotionCode}
              onChange={handleChangePromotion}
            />
            <Button
              variant="contained"
              color="secondary"
              className="btn btn-warning mr-3 input-btn"
              onClick={handleCheckPromotionCode}
            >
              Nhập
            </Button>

            {/* show message lỗi khi nhập sai mã khuyến mại */}
          </div>
          {isErrorCode === 1 ? (
            <div className="error-code">Mã không tồn tại</div>
          ) : isErrorCode === 2 ? (
            <div className="success-code">
              Cộng thêm {dayBonus} ngày sử dụng
            </div>
          ) : (
            ''
          )}
          <Button
            className="create-order-btn"
            onClick={handleCreateOder}
            variant="contained"
            disabled={!(isCheckedManagerWork || isCheckedBuyData)}
          >
            Hoàn thành đơn hàng
          </Button>
        </div>
      </div>
      <SnackbarComponent
        open={openToast}
        handleClose={handleCloseToast}
        vertical="top"
        horizontal="center"
        variant="success"
        message={mesToast}
      />
    </div>
  );
};

export default withRouter(CreateOrder);
