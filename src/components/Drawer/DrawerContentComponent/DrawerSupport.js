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

// const listMessage = [
//   { name: 'Cài đặt tài khoản', route: Routes.SETTING_ACCOUNT_INFO },
//   { name: 'Cài đặt nhóm làm việc', route: Routes.SETTING_GROUP_INFO },
//   {
//     name: 'Thiết lập thông tin thanh toán',
//     route: Routes.SETTING_GROUP_PAYMENT
//   },
//   { name: 'Đổi mật khẩu', route: Routes.SETTING_ACCOUNT_PASSWORD },
//   { name: 'Thay đổi ảnh cá nhân', route: Routes.SETTING_ACCOUNT_INFO },
//   { name: 'Mời thành viên tham gia', route: Routes.MEMBERS },
//   { name: 'Đuổi thành viên ra khỏi nhóm', route: Routes.HOME },
//   { name: 'Phân quyền thành viên', route: Routes.HOME }
// ];
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
      url: '/'
    },
    { name: t('IDS_WP_SEND_RESPONSE'), classname: 'primary-color', url: '/' }
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
                props.history.push({ pathname: el.url });
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
      <FooterListDrawer actionList={actionList} />
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
