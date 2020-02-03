import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';

import {
  getListMessage,
  getViewAllMessage,
  actionViewMessage
} from '../DrawerService';
import {
  getNumberMessageNotViewer,
  actionChangeNumMessageNotView
} from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import FooterDrawer from '../FooterDrawer';
import ItemMessage from './ItemMessage';
import '../Drawer.scss';

const DrawerMessage = props => {
  const { t } = useTranslation();
  // const { actionVisibleDrawerMessage, typeDrawer } = props;
  const [activeTab, setActiveTab] = useState('recent');
  const [numberNotView, setNumberNotView] = useState(0);
  const [listMessage, setListMessage] = useState([]);
  useEffect(() => {
    fetMessage({});
    fetNumberMessageNotViewer(); // eslint-disable-next-line
  }, []);
  const fetMessage = async params => {
    try {
      const { data } = await getListMessage(params);
      setListMessage(data.data_chats);
    } catch (error) {}
  };

  const fetNumberMessageNotViewer = async () => {
    try {
      const { data } = await getNumberMessageNotViewer();
      setNumberNotView(data.number_chat);
      props.actionChangeNumMessageNotView(data.number_chat);
    } catch (error) {}
  };
  const handleChangeTab = type => {
    setActiveTab(type);
    if (type === 'recent') {
      fetMessage({});
    } else {
      fetMessage({
        not_viewed: true
      });
    }
  };
  const handleViewAll = async () => {
    try {
      await getViewAllMessage();
      fetMessage({});
      fetNumberMessageNotViewer();
    } catch (error) {}
  };
  const handleViewNotification = async message => {
    if (!message.isViewed) {
      await actionViewMessage({
        task_id: message.task_id
      });
      fetMessage({});
      fetNumberMessageNotViewer();
    }
  };
  return (
    <div className="drawer-content">
      <HeaderDrawer
        title={t('IDS_WP_MESSAGE')}
        subHeader
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
        numberNotView={numberNotView}
      />
      <div className="content-drawer">
        <Scrollbars autoHide autoHideTimeout={500}>
          {listMessage.map((message, index) => (
            <ItemMessage
              item={message}
              key={index}
              handleViewNotification={() => handleViewNotification(message)}
            />
          ))}
        </Scrollbars>
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
    actionChangeNumMessageNotView
  }
)(DrawerMessage);
