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
import LoadingBox from '../../LoadingBox';

const DrawerMessage = props => {
  const { t } = useTranslation();
  // const { actionVisibleDrawerMessage, typeDrawer } = props;
  const [activeTab, setActiveTab] = useState('recent');
  const [isLoading, setLoading] = useState(false);
  const [numberNotView, setNumberNotView] = useState(0);
  const [listMessage, setListMessage] = useState([]);
  useEffect(() => {
    fetMessage({});
    fetNumberMessageNotViewer({renderInDrawer: true}); // eslint-disable-next-line
  }, []);
  const fetMessage = async params => {
    try {
      setLoading(true);
      const { data } = await getListMessage(params);
      setListMessage(data.data_chats);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetNumberMessageNotViewer = async ({renderInDrawer}) => {
    try {
      const { data } = await getNumberMessageNotViewer();
      if (renderInDrawer) {
        setNumberNotView(data.number_chat);
      }
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
      fetNumberMessageNotViewer({renderInDrawer: true});
    } catch (error) {}
  };
  const handleViewNotification = async message => {
    if (!message.isViewed) {
      await actionViewMessage({
        task_id: message.task_id
      });
      fetNumberMessageNotViewer({renderInDrawer: false});
    }
  };
  const handleCloseDrawer = () => {
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  // if (isLoading) return <LoadingBox />;
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
        {isLoading ? (
          <LoadingBox />
        ) : (
          <Scrollbars autoHide autoHideTimeout={500}>
            {listMessage.map((message, index) => (
              <ItemMessage
                item={message}
                key={index}
                handleViewNotification={() => handleViewNotification(message)}
                handleCloseDrawer={handleCloseDrawer}
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
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage,
    actionChangeNumMessageNotView
  }
)(DrawerMessage);
