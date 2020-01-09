import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemMessageNotification from './ItemMessageNotification';
import '../Drawer.scss';

const listMessage = [];
const DrawerMessage = props => {
  const { t } = useTranslation();
  // const { actionVisibleDrawerMessage, typeDrawer } = props;
  const [activeTab, setActiveTab] = useState('recent');
  const handleChangeTab = type => {
    setActiveTab(type);
  };
  const handleViewAll = () => {};
  return (
    <div className="drawer-content">
      <HeaderDrawer
        title={t('IDS_WP_MESSAGE')}
        subHeader
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
      />
      <div className="content-drawer">
        {listMessage.map((message, index) => (
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
)(DrawerMessage);
