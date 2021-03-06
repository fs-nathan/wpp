import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Routes } from '../../../../constants/routes';
import {
  orderCreateService,
  checkPromotionCode,
  getInfoBeforeCreateOrder,
  getNumberDayFromOldOrder,
  getInfoPromotionCreateOrder
} from '../../../../actions/setting/setting';
import { actionToast } from '../../../../actions/system/system';
import './SettingGroupRight.scss';
import ExportPDF from '../../../../components/ExportPDF/ExportPDF';
import OrderInit from '../../../../components/ExportPDF/OrderInit';
import SliderProgess from '../../../../components/SliderProgess/SliderProgess';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
let timeout1 = null;
let timeout2 = null;

const StyledRadio = styled.div`
  .Mui-checked {
    color: ${props => props.selectedColor} !important;
  }
`

const CreateOrder = props => {
  const { t } = useTranslation();
  const [isCheckedManagerWork, setIsCheckedManagerWork] = useState(false);
  const [isCheckedBuyData, setIsCheckedBuyData] = useState(false);
  const [numAcc, SetnumAcc] = useState(0);
  const [dateUse, SetdateUse] = useState(0);
  const [monthBuyPackageUser, setMonthBuyPackageUser] = useState(12);
  const [dataBuy, SetdataBuy] = useState(0);
  const [dateSave, SetdateSave] = useState(0);
  const [errorCodePromotion, setErrorCodePromotion] = useState(null);
  const [dayBonus, SetDayBonus] = useState(0);
  const [moneyDiscount, setMoneyDiscount] = useState(0);
  const [rateDiscount, setRateDiscount] = useState(0);
  const [dataBeforOder, setDataBeforOder] = useState({});
  const [bonusCode, setBonusCode] = useState(false);
  const [dataNumberOldOder, setDataNumberOldOder] = useState({});
  const [promotionCodes, setPromotionCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const appColor = useSelector(currentColorSelector)
  const marks = {
    accountNum: {
      mark: [
        { value: 5, label: `5 ${t('IDS_WP_USER')}` },
        { value: 1000, label: `1000 ${t('IDS_WP_USER')}` }
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
        { value: 6, label: `6 ${t('IDS_WP_MONTH')}` },
        { value: 36, label: `36 ${t('IDS_WP_MONTH')}` }
      ],
      min: 6,
      max: 36
    }
  };
  useEffect(() => {
    fetInfoBeforeCreateOrder(); // eslint-disable-next-line
  }, []);

  const fetInfoBeforeCreateOrder = async () => {
    try {
      const { data } = await getInfoBeforeCreateOrder();
      setDataBeforOder(data);
      let pricePacketUser = 0;
      data.price_user_packet.forEach(element => {
        if (element.min <= 5 && 5 <= element.max) {
          pricePacketUser = element.value;
          return;
        }
      });
      let pricePacketData = 0;
      data.price_storage_packet.forEach(element => {
        if (element.min <= 1000 && 1000 <= element.max) {
          pricePacketData = element.value;
          return;
        }
      });
      fetNumberDayFromOldOrder({
        unit_price_packet_user: pricePacketUser,
        unit_price_packet_storage: pricePacketData
      });
      fetPromotionCode()
    } catch (error) {}
  };
  const fetNumberDayFromOldOrder = async params => {
    try {
      const { data } = await getNumberDayFromOldOrder(params);
      setDataNumberOldOder(data.data);
    } catch (error) {}
  };
  const fetPromotionCode = async params => {
    try {
      const { data } = await getInfoPromotionCreateOrder(params);
      setPromotionCodes(data.data);
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
      case 'numAcc': {
        if (timeout1) {
          clearTimeout(timeout1);
        }
        timeout1 = setTimeout(async () => {
          let pricePacketUser = 0;
          dataBeforOder.price_user_packet.forEach(element => {
            if (element.min <= value && value <= element.max) {
              pricePacketUser = element.value;
              return;
            }
          });
          let pricePacketData = 0;
          dataBeforOder.price_storage_packet.forEach(element => {
            if (element.min <= dataBuy && dataBuy <= element.max) {
              pricePacketData = element.value;
              return;
            }
          });
          fetNumberDayFromOldOrder({
            unit_price_packet_user: pricePacketUser,
            unit_price_packet_storage: pricePacketData
          });
        }, 1000);
        SetnumAcc(value);
        break;
      }
      case 'dateUse':
        SetdateUse(value);
        setMonthBuyPackageUser(value)
        break;
      case 'dataBuy': {
        if (timeout2) {
          clearTimeout(timeout2);
        }
        timeout2 = setTimeout(async () => {
          let pricePacketUser = 0;
          dataBeforOder.price_user_packet.forEach(element => {
            if (element.min <= numAcc && numAcc <= element.max) {
              pricePacketUser = element.value;
              return;
            }
          });
          let pricePacketData = 0;
          dataBeforOder.price_storage_packet.forEach(element => {
            if (element.min <= value && value <= element.max) {
              pricePacketData = element.value;
              return;
            }
          });
          fetNumberDayFromOldOrder({
            unit_price_packet_user: pricePacketUser,
            unit_price_packet_storage: pricePacketData
          });
        }, 1000);
        SetdataBuy(value);
        break;
      }
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
      if (bonusCode && !errorCodePromotion) {
        dataBody = {
          ...dataBody,
          bonus_code: bonusCode
        };
      }
      setLoading(true);
      const { data } = await orderCreateService(dataBody);
      props.history.push({
        pathname: Routes.SETTING_GROUP_ORDER,
        search: `?order_id=${data.order_id}`
      });
      setLoading(false);
      handleToast('success', t('IDS_WP_CREATE_ORDER_SUCCESS'));
    } catch (error) {
      setLoading(false);
      handleToast('error', error.message);
    }
  };
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleChangePromoCode = async (code) => {
    if (!bonusCode || bonusCode !== code) {
      try {
        const { data } = await checkPromotionCode({ code, month_buy: monthBuyPackageUser });
        setErrorCodePromotion(null);
        setBonusCode(code);
        SetDayBonus(data.day_bonus);
        setMoneyDiscount(data.value_discount)
        setRateDiscount(data.rate_discount)
      } catch (error) {
        setErrorCodePromotion(code);
        setBonusCode(false);
        SetDayBonus(0);
        setMoneyDiscount(0)
        setRateDiscount(0)
      }
    } else {
      setErrorCodePromotion(null);
      setBonusCode(false);
      SetDayBonus(0);
      setMoneyDiscount(0)
      setRateDiscount(0)
    }
  };

  return (
    <div className="order-detail-container create-order">
      <div className="has-border-right detail-left">
        {isCheckedManagerWork || isCheckedBuyData ? (
          <ExportPDF
            numAcc={numAcc}
            dateUse={dateUse}
            monthBuyPackageUser={monthBuyPackageUser}
            dataBuy={dataBuy}
            dateSave={dateSave}
            isCreate={true}
            isCheckedManagerWork={isCheckedManagerWork}
            isCheckedBuyData={isCheckedBuyData}
            dataBeforOder={dataBeforOder}
            dayBonus={dayBonus}
            moneyDiscount={moneyDiscount}
            rateDiscount={rateDiscount}
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
          <p className="order-title">{t('IDS_WP_SETUP_ORDER')}</p>
        </div>
        <div className="detail-right-bottom">
          <p className="title-item">{t('IDS_WP_SELECT_SERVICE_STEP_1')}</p>
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
            label={t('IDS_WP_WORKPLUS_JOB_LABEL')}
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
            label={t('IDS_WP_STORAGE_BUY_LABEL')}
          />
          <p className="title-item">{t('IDS_WP_SETUP_CONFIG')}</p>
          {isCheckedManagerWork && (
            <React.Fragment>
              <p className="sub-title-item">
                {t('IDS_WP_SELECT_ACCOUNT_NUMBER')}:
              </p>
              <SliderProgess
                item={marks.accountNum}
                value={numAcc}
                defaultValue={5}
                step={5}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('numAcc', value)
                }
              />
              <p>{t('IDS_WP_ACCOUNT_NUMBER_RANGE')}</p>
              <p>{t('IDS_WP_ACCOUNT_NUMBER_RANGE_DES')}</p>
              <p>
                {t('IDS_WP_PRICE_DEPEND_USER')} (
                <a href="https://workplus.vn/bang-gia/bang-gia/" target="_blank">{t('IDS_WP_VIEW_PRICE')}</a>)
              </p>
              <p className="sub-title-item">{t('IDS_WP_USED_TIME_PAYMENT')}</p>
              <SliderProgess
                item={marks.time}
                value={dateUse}
                defaultValue={12}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('dateUse', value)
                }
              />
              <p>{t('IDS_WP_USED_TIME_PAYMENT_DES_1')}</p>
              <p>{t('IDS_WP_USED_TIME_PAYMENT_DES_2')}</p>
              <p>{t('IDS_WP_USED_TIME_PAYMENT_DES_3')}</p>
              <div className="border create-order-border" />
            </React.Fragment>
          )}
          {isCheckedBuyData && (
            <React.Fragment>
              <p className="sub-title-item">{t('IDS_WP_STORAGE_BUY_LABEL')}</p>
              <SliderProgess
                item={marks.storage}
                value={dataBuy}
                defaultValue={1000}
                step={100}
                handleChangeSilder={(event, value) =>
                  handleChangeSilder('dataBuy', value)
                }
              />
              <p className="sub-title-item">{t('IDS_WP_BUY_TIME_PAYMENT')}</p>
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
          <p className="sub-title-item">{t('IDS_WP_PROMOTION_CODE')}</p>
          <p className="error-text">{t('IDS_WP_PROMOTION_CODE_DES')}</p>
          <div className="promotion-code-order">
            <table>
              {
                promotionCodes.map(e => 
                  <>
                    <tr onClick={() => handleChangePromoCode(e.code)}>
                      <td>
                        <StyledRadio selectedColor={appColor}>
                          <Radio checked={bonusCode == e.code ? true : false} classes={{root: "per-promotion"}} />
                        </StyledRadio>
                      </td>
                      <td><span className="name-promotion">{e.code}</span></td>
                      <td className="des-promotion">
                        {e.description}
                      </td>
                    </tr>
                    {errorCodePromotion === e.code && (
                      <tr className="tr-error-code">
                        <td></td>
                        <td></td>
                        <td><div className="error-code">{t('IDS_WP_CAN_NOT_USE')}</div></td>
                      </tr>
                    )}
                  </>
                )
              }
            </table>          
          </div>
          <Button
            className="create-order-btn"
            onClick={handleCreateOder}
            variant="contained"
            disabled={!(isCheckedManagerWork || isCheckedBuyData) || loading}
            style={{background: appColor}}
          >
            {loading && (
              <CircularProgress
                size={20}
                className="margin-circular"
                color="white"
              />
            )}

            {t('IDS_WP_FINISH_ORDER')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    toast: state.system.toast
  }),
  { actionToast }
)(withRouter(CreateOrder));
