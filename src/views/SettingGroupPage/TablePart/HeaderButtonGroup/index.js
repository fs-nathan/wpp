import React from 'react';
import { withRouter } from 'react-router-dom';
import { mdiMagnify, mdiCart } from '@mdi/js';
import { Routes } from '../../../../constants/routes';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { isEmpty } from '../../../../helpers/utils/isEmpty';

const HeaderButtonGroup = props => {
  const isTabOrder = props.match.params.type === 'order';
  const isOder = isEmpty(props.location.search);
  // const isCreateOder = props.location.search.split('=').length === 1;
  const listAction = [
    {
      text: 'Tìm kiếm',
      icon: mdiMagnify,
      type: 'search',
      isShow: isTabOrder && isOder
    },
    {
      text: 'Đơn hàng',
      icon: mdiCart,
      action: () => props.history.push(Routes.SETTING_GROUP_ORDER),
      isShow: isTabOrder && !isOder
    }
    // {
    //   text: null,
    //   icon: mdiClose,
    //   action: () => props.history.push(Routes.SETTING_GROUP_ORDER),
    //   isShow: isTabOrder && !(isOder || isCreateOder)
    // }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default withRouter(HeaderButtonGroup);
