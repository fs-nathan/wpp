import React from 'react';
import { withRouter } from 'react-router-dom';
import { mdiClose } from '@mdi/js';
import { Routes } from '../../../../constants/routes';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';

const HeaderButtonGroup = props => {
  const listAction = [
    {
      text: null,
      icon: mdiClose,
      action: () => props.history.push(Routes.SETTING_ACCOUNT_NOTIFI),
      isShow: true
    }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default withRouter(HeaderButtonGroup);
