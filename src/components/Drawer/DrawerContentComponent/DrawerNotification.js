import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';
import {
  getListNotification,
  getViewAllNotification,
  actionViewNotification
} from '../DrawerService';
import {
  getNumberNotificationNotViewer,
  actionChangeNumNotificationNotView
} from '../../../actions/system/system';

import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemNotification from './ItemNotification';
import LoadingBox from '../../LoadingBox';
import '../Drawer.scss';

const DrawerNotification = props => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('recent');
  const [numberNotView, setNumberNotView] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetNotification({});
    fetNumberNotificationNotViewer(); //eslint-disable-next-line
  }, []);

  const fetNotification = async params => {
    try {
      setLoading(true);
      const { data } = await getListNotification(params);
      setListNotification(data.notifications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetNumberNotificationNotViewer = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      setNumberNotView(data.number_notification);
      props.actionChangeNumNotificationNotView(data.number_notification);
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
  const handleViewNotification = async message => {
    if (!message.isViewed) {
      await actionViewNotification({
        notification_id: message.data_notification.id
      });
      fetNotification({});
      fetNumberNotificationNotViewer();
    }
  };
  // if (isLoading) return <LoadingBox />;
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
        {isLoading ? (
          <LoadingBox />
        ) : (
          <Scrollbars autoHide autoHideTimeout={500}>
            {listNotification.map((message, index) => (
              <ItemNotification
                item={message}
                key={index}
                handleViewNotification={() => handleViewNotification(message)}
              />
            ))}
          </Scrollbars>
        )}
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
    actionVisibleDrawerMessage,
    actionChangeNumNotificationNotView
  }
)(DrawerNotification);
