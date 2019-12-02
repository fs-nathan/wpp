import React from 'react';
import { withRouter } from 'react-router-dom';
import { mdiMagnify, mdiCart, mdiClose } from '@mdi/js';
import { Routes } from '../../../../constants/routes';
import { SETTING_GROUP } from '../../../../constants/constants';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';

const HeaderButtonGroup = props => {
  const isActived = value => props.match.params.type === value;
  const listAction = [
    {
      text: 'Tìm kiếm',
      icon: mdiMagnify,
      action: () => {},
      isShow: isActived(SETTING_GROUP.ORDER)
    },
    {
      text: 'Đơn hàng',
      icon: mdiCart,
      action: () => props.history.push(Routes.SETTING_GROUP_ORDER),
      isShow:
        isActived(SETTING_GROUP.ORDER) ||
        isActived(SETTING_GROUP.CREATE_ORDER) ||
        isActived(SETTING_GROUP.PAYMENT)
    },
    {
      text: 'Đóng',
      icon: mdiClose,
      action: () => props.history.push(Routes.SETTING_GROUP_ORDER),
      isShow: isActived(SETTING_GROUP.ORDER_DETAIL)
    }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default withRouter(HeaderButtonGroup);
