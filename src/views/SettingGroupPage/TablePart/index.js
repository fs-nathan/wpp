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
import CreateOrder from '../TablePart/SettingGroupRight/CreateOrder';
import { Routes } from '../../../constants/routes';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import {
  RightHeader,
  StyledButton
} from '../../DocumentPage/TablePart/DocumentComponent/TableCommon';

const getHeaderText = (type, search) => {
  const isOder = isEmpty(search);
  const isCreateOder = search.split('=').length === 1;
  switch (type) {
    case SETTING_GROUP.INFO:
      return 'Thông tin nhóm';
    case SETTING_GROUP.SETTING:
      return 'Cài đặt';
    case SETTING_GROUP.ORDER: {
      if (isOder) {
        return 'Đơn hàng';
      } else if (isCreateOder) {
        return 'Tạo đơn hàng';
      }
      return 'Chi tiết đơn hàng';
    }
    case SETTING_GROUP.PAYMENT:
      return 'Thanh toán';
    default:
      return null;
  }
};
const TablePart = props => {
  const type = props.match.params.type;
  const isOder = isEmpty(props.location.search);
  const isCreateOder = props.location.search.split('=').length === 1;
  const getContentSettingAccount = () => {
    switch (type) {
      case SETTING_GROUP.INFO:
        return <Info />;
      case SETTING_GROUP.SETTING:
        return <SetUp />;
      case SETTING_GROUP.ORDER: {
        if (isOder) return <Order />;
        else if (isCreateOder) return <CreateOrder />;
        return <OrderDetail />;
      }
      case SETTING_GROUP.PAYMENT:
        return <Payment />;
      default:
        return null;
    }
  };
  const checkShowBtnCreateOder = () => {
    if (
      type === SETTING_GROUP.PAYMENT ||
      (type === SETTING_GROUP.ORDER && (isOder || isCreateOder))
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">
          {getHeaderText(props.match.params.type, props.location.search)}
        </ColorTypo>
        <RightHeader>
          <HeaderButtonGroup />
          {checkShowBtnCreateOder() && (
            <StyledButton
              size="small"
              onClick={() =>
                props.history.push({
                  pathname: Routes.SETTING_GROUP_ORDER,
                  search: `?createOder`
                })
              }
            >
              + TẠO ĐƠN HÀNG
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
