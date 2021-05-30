import React, { Component } from 'react';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import * as images from '../../assets';
import './ExportPDF.scss';
import { isEmpty } from '../../helpers/utils/isEmpty';

class ExportPDF extends Component {
  // getDateGift = dateUse => {
  //   if (dateUse >= 12 && dateUse < 24) {
  //     return 1;
  //   } else if (dateUse >= 24 && dateUse < 36) {
  //     return 2;
  //   } else if (dateUse >= 36) {
  //     return 3;
  //   } else if (dateUse < 12) {
  //     return 0;
  //   }
  // };
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
      orderItem,
      dataBeforOder,
      dayBonus,
      bonusCode,
      dataNumberOldOder,
      monthBuyPackageUser,
      rateDiscount,
      moneyDiscount,
      t
    } = this.props;
    // console.log('dataNumberOldOder', dataNumberOldOder);
    let pricePacketUser = 50000; //a
    if (!isEmpty(dataBeforOder)) {
      dataBeforOder.price_user_packet.forEach(element => {
        if (element.min <= numAcc && numAcc <= element.max) {
          pricePacketUser = element.value;
          return;
        }
      });
    }

    const moneyPacketUser = isCreate
      ? pricePacketUser * numAcc * dateUse
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.buy_info.price
      : 0; //d, f
    // const dateGift = isCreate
    //   ? this.getDateGift(dateUse)
    //   : !isEmpty(orderItem.packet_user)
    //   ? orderItem.packet_user.day_from_payment_cycle / 30
    //   : 0;
    const datePlusOderBefor = isCreate
      ? isCheckedManagerWork
        ? dataNumberOldOder.packet_user
        : 0
      : !isEmpty(orderItem.packet_user)
      ? (orderItem.packet_user.day_from_old_order / 30).toFixed(1)
      : 0;
    const packetStorageBefor = isCreate
      ? isCheckedBuyData
        ? dataNumberOldOder.packet_storage
        : 0
      : !isEmpty(orderItem.packet_storage)
      ? (orderItem.packet_storage.day_from_old_order / 30).toFixed(1)
      : 0;
    const date3MO = isCreate
      ? isCheckedManagerWork
        ? (dayBonus / 30).toFixed(1)
        : 0
      : !isEmpty(orderItem.packet_user)
      ? orderItem.packet_user.promotion_day === 0
        ? 0
        : (orderItem.packet_user.promotion_day / 30).toFixed(1)
      : 0;
    const totalDataUse = isCreate
      ? dateUse + datePlusOderBefor + parseFloat(date3MO)
      : !isEmpty(orderItem.packet_user)
      ? (orderItem.packet_user.day_use / 30).toFixed(1)
      : 0; //e
    ///////////////////////
    let pricePacketData = 3000; //a
    if (!isEmpty(dataBeforOder)) {
      dataBeforOder.price_storage_packet.forEach(element => {
        if (element.min <= dataBuy && dataBuy <= element.max) {
          pricePacketData = element.value;
          return;
        }
      });
    }

    const moneyPacketData = isCreate
      ? pricePacketData * dataBuy * dateSave
      : !isEmpty(orderItem.packet_storage)
      ? orderItem.packet_storage.buy_info.price
      : 0; //d, f
    const totalDateData = isCreate
      ? dateSave
      : !isEmpty(orderItem.packet_storage)
      ? (orderItem.packet_storage.day_use / 30).toFixed(1)
      : 0; //e
    //////
    const totalPriceBeforVAT = moneyPacketUser + moneyPacketData;
    const discountValue = Math.round(totalPriceBeforVAT * rateDiscount / 100 + moneyDiscount)
    const totalPriceVAT = (totalPriceBeforVAT - discountValue) * 0.1;
    const totalMoney = Math.ceil(totalPriceBeforVAT + totalPriceVAT - discountValue);
    return (
      <div className="order-content k-pdf-export" id="printContent">
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
                    {t('IDS_WP_COMPANY_NAME_REAL')}
                  </div>
                  <div className="infor-address-tel">
                    {t('IDS_WP_COMPANY_ADD_REAL')}
                  </div>
                  <div className="infor-address-tel">
                    {t('IDS_WP_COMPANY_PHONE_REAL')}
                  </div>
                  <div className="infor-email">
                    {t('IDS_WP_COMPANY_WEB_REAL')}
                  </div>
                </div>
                <div className="head-left-right">
                  <div className="infor-right">
                    {t('IDS_WP_ORDER_INFO_WORKPLUS')}
                  </div>
                  <div className="infor-right-oder">
                    {t('IDS_WP_ORDER_CODE')}:{' '}
                    {isCreate ? dataBeforOder.code : orderItem.code}
                  </div>
                  <div className="infor-right-oder">
                    {t('IDS_WP_CREATE_DATE')}:{' '}
                    {isCreate
                      ? moment().format('DD/MM/YYYY')
                      : orderItem.create_at}
                  </div>
                  <div className="infor-right-oder">
                    {t('IDS_WP_VALUE_TOTAL_ORDER')}:&nbsp;
                    {isCreate
                      ? this.showPrice(totalMoney)
                      : this.showPrice(orderItem.price || 0)}
                    {t('IDS_WP_CURRENT_UNIT')}
                  </div>
                  <div className="status-oder">
                    <span
                      className={`text-status-oder ${
                        isCreate
                          ? ''
                          : orderItem.status_payment === 'Paid'
                          ? 'paid-status'
                          : ''
                      }`}
                    >
                      {isCreate
                        ? t('IDS_WP_NOT_PAID')
                        : orderItem.status_payment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="print-body">
                <table className="TableStyled1">
                  <thead>
                    <tr>
                      <th className="ThStyled1">{t('IDS_WP_ORDER_CODE')}</th>
                      <th className="ThStyled1">{t('IDS_WP_CREATE_DATE')}</th>
                      <th className="ThStyled1">
                        {t('IDS_WP_PRODUCT_PACKAGE')}
                      </th>
                      <th className="ThStyled1">{t('IDS_WP_PAYMENT')}</th>
                      <th className="ThStyled1">{t('IDS_WP_INTO_MONEY')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="TdStyled1">
                        {isCreate ? dataBeforOder.code : orderItem.code}
                      </td>
                      <td className="TdStyled1">
                        {isCreate
                          ? moment().format('DD/MM/YYYY')
                          : orderItem.create_at}
                      </td>
                      <td className="TdStyled1">
                        <React.Fragment>
                          {(isCheckedManagerWork || !isEmpty(orderItem)) && (
                            <p>
                              {isCreate
                                ? numAcc
                                : orderItem.packet_user.buy_info
                                    .number_user}{' '}
                              {t('IDS_WP_USER_UNIT')}
                            </p>
                          )}
                          {(isCheckedBuyData || !isEmpty(orderItem)) && (
                            <p>
                              {isCreate
                                ? `CS ${dataBuy}`
                                : !isEmpty(orderItem.packet_storage) &&
                                  orderItem.packet_storage.name
                                    .split('-')
                                    .pop()}
                            </p>
                          )}
                        </React.Fragment>
                      </td>
                      <td className="TdStyled1">{t('IDS_WP_TM_CK')}</td>
                      <td className="TdStyled1">
                        {isCreate
                          ? this.showPrice(totalMoney)
                          : this.showPrice(orderItem.price || 0)}{' '}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="TableStyled2">
                  <thead>
                    <tr>
                      <th className="ThStyled2 number-stt">TT</th>
                      <th className="ThStyled2 detail-order">
                        {t('IDS_WP_SERVICE_DETAIL')}
                      </th>
                      <th className="ThStyled2 value-order">
                        {t('IDS_WP_UNIT_PRICE')} ({t('IDS_WP_CURRENT_UNIT')})
                      </th>
                      <th className="ThStyled2 value-order">
                        {t('IDS_WP_AMOUNT')}
                      </th>
                      <th className="ThStyled2 value-order">
                        {t('IDS_WP_TIME')} ({t('IDS_WP_MONTH')})
                      </th>
                      <th className="ThStyled2 value-order">
                        {t('IDS_WP_INTO_MONEY')} ({t('IDS_WP_CURRENT_UNIT')})
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {(isCheckedManagerWork || !isEmpty(orderItem)) && (
                      <React.Fragment>
                        <tr className="text-color-1">
                          <td className="TdStyled2 number-stt">1</td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div className="text-bold">
                                {t('IDS_WP_PRODUCT_PACKAGE')}:{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info
                                      .number_user}{' '}
                                {t('IDS_WP_USER_UNIT')}
                              </div>
                              <div className="text-color-2">
                                {t('IDS_WP_USE_TIME')}: {totalDataUse}{' '}
                                {t('IDS_WP_MONTH_UNIT')} <br />(
                                {t('IDS_WP_FROM_PAID_DAY')})
                              </div>
                            </div>
                          </td>
                          <td className="TdStyled2 value-order"></td>
                          <td className="TdStyled2 value-order"></td>
                          <td className="TdStyled2 value-order">
                            {totalDataUse}
                          </td>
                          <td className="TdStyled2 value-order">
                            {this.showPrice(moneyPacketUser)}
                          </td>
                        </tr>
                        <tr>
                          <td className="TdStyled2 number-stt"></td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div>
                                {t('IDS_WP_REGISTER_PACKAGE')}{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info.number_user}
                                - {t('IDS_WP_USER_UNIT')}
                              </div>
                              <div>
                                {t('IDS_WP_AMOUNT')} {t('IDS_WP_USER_UNIT')}:{' '}
                                {isCreate
                                  ? numAcc
                                  : orderItem.packet_user.buy_info.number_user}
                              </div>
                              <div>
                                {t('IDS_WP_STORAGE')}:{' '}
                                {isCreate
                                  ? `${numAcc} GB`
                                  : orderItem.packet_user.buy_info.size}
                              </div>
                              <div>
                                {t('IDS_WP_USE_TIME')}:{' '}
                                {isCreate
                                  ? dateUse
                                  : orderItem.packet_user.buy_info.day /
                                    30}{' '}
                                {t('IDS_WP_MONTH_UNIT')}
                              </div>
                            </div>
                          </td>
                          <td className="TdStyled4">
                            {this.showPrice(
                              isCreate
                                ? pricePacketUser
                                : orderItem.packet_user.buy_info.unit_price
                            )}
                          </td>
                          <td className="TdStyled4">
                            {isCreate
                              ? numAcc
                              : orderItem.packet_user.buy_info.number_user}
                          </td>
                          <td className="TdStyled4">
                            {isCreate
                              ? dateUse
                              : orderItem.packet_user.buy_info.day / 30}
                          </td>
                          <td className="TdStyled4">
                            {this.showPrice(moneyPacketUser)}
                          </td>
                        </tr>
                        <tr>
                          <td className="TdStyled2 number-stt"></td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div>{t('IDS_WP_TIME_FROM_OLD_ORDER')}</div>
                            </div>
                          </td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">{datePlusOderBefor}</td>
                          <td className="TdStyled4">-</td>
                        </tr>
                        <tr>
                          <td className="TdStyled2 number-stt"></td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div>
                                {t('IDS_WP_PROMOTION_CODE')}:{' '}
                                {isCreate
                                  ? bonusCode
                                  : orderItem.packet_user.promotion_code}
                              </div>
                            </div>
                          </td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">{date3MO}</td>
                          <td className="TdStyled4">-</td>
                        </tr>
                      </React.Fragment>
                    )}
                    {(isCheckedBuyData ||
                      (!isEmpty(orderItem) &&
                        !isEmpty(orderItem.packet_storage))) && (
                      <React.Fragment>
                        <tr className="text-color-1">
                          <td className="TdStyled2 number-stt">
                            {isCheckedManagerWork ||
                            (!isEmpty(orderItem) &&
                              !isEmpty(orderItem.packet_user))
                              ? 2
                              : 1}
                          </td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div className="text-bold">
                                {t('IDS_WP_PACKAGE')}: CS-
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                              </div>
                              <div className="text-color-2">
                                {t('IDS_WP_TIME')}{' '}
                                {isCreate
                                  ? dateSave
                                  : orderItem.packet_storage.buy_info.day /
                                    30}{' '}
                                {t('IDS_WP_MONTH_UNIT')}
                              </div>
                              <div className="text-color-2">
                                ({t('IDS_WP_FROM_PAID_DAY')})
                              </div>
                            </div>
                          </td>
                          <td className="TdStyled2"></td>
                          <td className="TdStyled2"></td>
                          <td className="TdStyled2">{totalDateData}</td>
                          <td className="TdStyled2">
                            {this.showPrice(moneyPacketData)}
                          </td>
                        </tr>
                        <tr>
                          <td className="TdStyled2"></td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div>
                                {t('IDS_WP_REGISTER_PACKAGE_OPEN')}: Cloud
                                Storage (CS-
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                                )
                              </div>
                              <div>
                                {t('IDS_WP_BUY_STORAGE_OTHER')}:{' '}
                                {isCreate
                                  ? dataBuy
                                  : orderItem.packet_storage.name
                                      .split('-')
                                      .pop()}
                                GB
                              </div>
                            </div>
                          </td>
                          <td className="TdStyled4">
                            {this.showPrice(
                              isCreate
                                ? pricePacketData
                                : orderItem.packet_storage.buy_info
                                    .unit_price || 0
                            )}
                          </td>
                          <td className="TdStyled4">
                            {isCreate
                              ? dataBuy
                              : orderItem.packet_storage.name.split('-').pop()}
                          </td>
                          <td className="TdStyled4">
                            {isCreate
                              ? dateSave
                              : orderItem.packet_storage.buy_info.day / 30}
                          </td>
                          <td className="TdStyled4">
                            {this.showPrice(moneyPacketData)}
                          </td>
                        </tr>
                        <tr>
                          <td className="TdStyled2"></td>
                          <td className="TdStyled3 detail-order">
                            <div className="">
                              <div>{t('IDS_WP_TIME_FROM_OLD_ORDER')}</div>
                            </div>
                          </td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">-</td>
                          <td className="TdStyled4">
                            {isCreate
                              ? packetStorageBefor
                              : (
                                  orderItem.packet_storage.day_from_old_order /
                                  30
                                ).toFixed(1)}
                          </td>
                          <td className="TdStyled4">-</td>
                        </tr>
                      </React.Fragment>
                    )}
                  </tbody>
                </table>

                <div className="total-group">
                  <div className="width-30"></div>
                  <div className="width-70">
                    <div className="item-total-group">
                      <span className="order-value">
                        {t('IDS_WP_VALUE_BEFORE_TAX')} (1+2)
                      </span>
                      <span>
                        {isCreate
                          ? this.showPrice(totalPriceBeforVAT)
                          : orderItem.price_after_vat}
                      </span>
                    </div>
                    <div className="item-total-group">
                      <span className="order-value">
                        {t('IDS_WP_VAT_TAX')} (10%)
                      </span>
                      <span>
                        {isCreate
                          ? this.showPrice(totalPriceVAT)
                          : orderItem.vat}
                      </span>
                    </div>
                    <div className="item-total-group">
                      <span className="order-value">
                        {t('IDS_WP_DISCOUNT')}
                      </span>
                      <span>
                        {isCreate ? this.showPrice(discountValue) : this.showPrice(String(orderItem.discount))}
                      </span>
                    </div>
                    <div className="item-total-group">
                      <span className="order-value">
                        {t('IDS_WP_VALUE_ORDER')}
                      </span>
                      <span className="price-value">
                        {isCreate
                          ? this.showPrice(totalMoney)
                          : orderItem.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="top-margin-30">
                  <p className="text-bold bottom-margin-10">
                    {t('IDS_WP_ORDER_NOTE')}:
                  </p>
                  <p className="bottom-margin-10">{t('IDS_WP_ORDER_NOTE_1')}</p>
                  <p className="bottom-margin-10">{t('IDS_WP_ORDER_NOTE_2')}</p>
                  <p className="bottom-margin-10">{t('IDS_WP_ORDER_NOTE_3')}</p>
                  <p className="bottom-margin-10">{t('IDS_WP_ORDER_NOTE_4')}</p>
                  <p className="bottom-margin-10">{t('IDS_WP_ORDER_NOTE_5')}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withTranslation()(ExportPDF);
