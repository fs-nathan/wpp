import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { mdiMagnify, mdiCart } from '@mdi/js';
import { Routes } from '../../../../constants/routes';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { isEmpty } from '../../../../helpers/utils/isEmpty';

const HeaderButtonGroup = props => {
  const { t } = useTranslation();
  const isTabOrder = props.match.params.type === 'order';
  const isOder = isEmpty(props.location.search);
  // const isCreateOder = props.location.search.split('=').length === 1;
  const listAction = [
    {
      text: t('IDS_WP_SEARCH'),
      icon: mdiMagnify,
      type: 'search',
      isShow: isTabOrder && isOder
    },
    {
      text: t('IDS_WP_ORDER'),
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
