import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { mdiFileDocumentBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import FooterListDrawer from '../FooterListDrawer';

const listMessage = [
  { name: 'Cài đặt tài khoản', read: true },
  { name: 'Cài đặt nhóm làm việc', read: false },
  { name: 'Thiết lập thông tin thanh toán', read: false },
  { name: 'Đổi mật khẩu', read: false },
  { name: 'Thay đổi ảnh cá nhân', read: false },
  { name: 'Mời thành viên tham gia', read: false },
  { name: 'Đuổi thành viên ra khỏi nhóm', read: false },
  { name: 'Phân quyền thành viên', read: false }
];
const DrawerSupport = props => {
  const { t } = useTranslation();
  // const { actionVisibleDrawerMessage, typeDrawer } = props;
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
        {listMessage.map((message, index) => (
          <div className="item-message support-item" key={index}>
            <div className="avatar-item-message">
              <Icon
                path={mdiFileDocumentBoxOutline}
                size={1.2}
                color={bgColor.color || ''}
              />
            </div>
            <div className="name-support-message">
              <span className="text-support-message">{message.name}</span>
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
    colors: state.setting.colors
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerSupport);
