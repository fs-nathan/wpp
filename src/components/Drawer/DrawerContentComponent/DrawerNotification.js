import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';
import {
  getListNotification,
  getViewAllNotification,
  getNumberNotificationNotViewer
} from '../DrawerService';

import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemMessageNotification from './ItemMessageNotification';

import '../Drawer.scss';

const DrawerNotification = props => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('recent');
  const [numberNotView, setNumberNotView] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  useEffect(() => {
    fetNotification({});
    fetNumberNotificationNotViewer();
  }, []);

  const fetNotification = async params => {
    try {
      const { data } = await getListNotification(params);
      setListNotification(data.notifications);
    } catch (error) {}
  };

  const fetNumberNotificationNotViewer = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      setNumberNotView(data.number_notification);
    } catch (error) {}
  };
  const handleChangeTab = type => {
    setActiveTab(type);
    if (type === 'recent') {
      fetNotification({});
    } else {
      fetNotification({
        not_viewed: true
      });
    }
  };
  const handleViewAll = async () => {
    try {
      await getViewAllNotification();
      fetNotification({});
      fetNumberNotificationNotViewer();
    } catch (error) {}
  };
  return (
    <div className="drawer-content">
      <HeaderDrawer
        title={t('IDS_WP_NOTICE')}
        subHeader
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
        numberNotView={numberNotView}
      />
      <div className="content-drawer">
        {listNotification.map((message, index) => (
          <ItemMessageNotification item={message} key={index} />
        ))}
      </div>
      <FooterDrawer handleViewAll={handleViewAll} />
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerNotification);
