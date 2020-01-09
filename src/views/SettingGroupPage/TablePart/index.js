import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import { SETTING_GROUP } from '../../../constants/constants';
import Info from '../TablePart/SettingGroupRight/Info';
import SetUp from '../TablePart/SettingGroupRight/SetUp';
import Order from '../TablePart/SettingGroupRight/Order';
import OrderDetail from '../TablePart/SettingGroupRight/OrderDetail';
import Payment from '../TablePart/SettingGroupRight/Payment';
import TimeAndLanguage from '../TablePart/SettingGroupRight/TimeAndLanguage';
import Notification from '../TablePart/SettingGroupRight/Notification';
import CreateOrder from '../TablePart/SettingGroupRight/CreateOrder';
import { Routes } from '../../../constants/routes';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import {
  RightHeader,
  StyledButton
} from '../../DocumentPage/TablePart/DocumentComponent/TableCommon';

const getHeaderText = (type, search) => {
  const isOder = isEmpty(search);
  switch (type) {
    case SETTING_GROUP.INFO:
      return 'Thiết lập nhóm';
    case SETTING_GROUP.SETTING:
    case SETTING_GROUP.LANGUAGE:
      return 'Cài đặt phần mềm';
    case SETTING_GROUP.NOTIFICATION:
      return 'Cài đặt nhận thông báo';
    case SETTING_GROUP.ORDER: {
      if (isOder) return 'Đơn hàng';
      return 'Chi tiết đơn hàng';
    }
    case SETTING_GROUP.PAYMENT:
      return 'Thanh toán';
    case SETTING_GROUP.CREATE_ORDER:
      return 'Tạo đơn hàng';
    default:
      return null;
  }
};
const TablePart = props => {
  const type = props.match.params.type;
  const isOder = isEmpty(props.location.search);
  const getContentSettingAccount = () => {
    switch (type) {
      case SETTING_GROUP.INFO:
        return <Info />;
      case SETTING_GROUP.SETTING:
        return <SetUp />;
      case SETTING_GROUP.ORDER: {
        if (isOder) return <Order />;
        return <OrderDetail />;
      }
      case SETTING_GROUP.CREATE_ORDER:
        return <CreateOrder />;
      case SETTING_GROUP.LANGUAGE:
        return <TimeAndLanguage />;
      case SETTING_GROUP.NOTIFICATION:
        return <Notification />;
      case SETTING_GROUP.PAYMENT:
        return <Payment />;
      default:
        return null;
    }
  };
  const checkShowBtnCreateOder = () => {
    return (
      type === SETTING_GROUP.PAYMENT || (type === SETTING_GROUP.ORDER && isOder)
    );
  };
  const checkShowBtnCancelOder = () => {
    return type === SETTING_GROUP.CREATE_ORDER;
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">
          {getHeaderText(props.match.params.type, props.location.search)}
        </ColorTypo>
        <RightHeader>
          <div
          // className={`${checkShowBtnCreateOder() ? '' : 'none-create-order'}`}
          >
            <HeaderButtonGroup />
          </div>

          {checkShowBtnCreateOder() && (
            <StyledButton
              size="small"
              onClick={() =>
                props.history.push({
                  pathname: Routes.SETTING_GROUP_CREATE_ORDER
                })
              }
            >
              + TẠO ĐƠN HÀNG
            </StyledButton>
          )}
          {checkShowBtnCancelOder() && (
            <StyledButton
              size="small"
              onClick={() =>
                props.history.push({
                  pathname: Routes.SETTING_GROUP_ORDER
                })
              }
            >
              HỦY
            </StyledButton>
          )}
        </RightHeader>
      </div>
      <div className="setting-right-content">
        <Scrollbars autoHide autoHideTimeout={500}>
          {getContentSettingAccount()}
        </Scrollbars>
      </div>
    </div>
  );
};

export default withRouter(TablePart);
