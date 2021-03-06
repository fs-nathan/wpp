import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { mdiFileDocumentBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  actionVisibleDrawerMessage,
  actionGetSupport
} from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import FooterListDrawer from '../FooterListDrawer';
// import { Routes } from '../../../constants/routes';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import LoadingBox from '../../LoadingBox';

const DrawerSupport = props => {
  const { t } = useTranslation();
  const [listSupport, setListSupport] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupport({}); // eslint-disable-next-line
  }, []);
  const fetchSupport = async () => {
    try {
      setLoading(true);
      const { data } = await actionGetSupport();
      setListSupport(data.urls);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const actionList = [
    {
      name: t('IDS_WP_VIEW_ALL_SUPPORT'),
      classname: 'primary-color',
      url: 'https://support.workplus.vn/'
    },
    { name: t('IDS_WP_SEND_RESPONSE'), classname: 'primary-color', url: 'https://workplus.vn/yeu-cau-gop-y/' }
  ];
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <div className="drawer-content">
      <HeaderDrawer title={t('IDS_WP_SUPPORT')} />
      <div className="content-drawer">
        {isLoading && <LoadingBox />}
        {!isEmpty(listSupport) &&
          listSupport.map((el, index) => (
            <div
              className="item-message support-item"
              key={index}
              onClick={() => {
                window.open(el.url, '_blank');
                props.actionVisibleDrawerMessage({
                  type: '',
                  anchor: props.anchorDrawer
                });
              }}
            >
              <div className="avatar-item-message">
                <Icon
                  path={mdiFileDocumentBoxOutline}
                  size={1.2}
                  color={bgColor.color || ''}
                />
              </div>
              <div className="name-support-message">
                <span className="text-support-message">{el.name}</span>
              </div>
            </div>
          ))}
      </div>
      <FooterListDrawer actionList={actionList} openInNewTab={true} />
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    colors: state.setting.colors
  }),
  {
    actionVisibleDrawerMessage
  }
)(withRouter(DrawerSupport));
