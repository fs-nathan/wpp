import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mdiLogout, mdiSettings } from '@mdi/js';
import avatar from '../../../assets/avatar.jpg';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import FooterListDrawer from '../FooterListDrawer';
import { Routes } from '../../../constants/routes';
import {
  getProfileService,
  actionGetProfile
} from '../../../actions/system/system';
import { isEmpty } from '../../../helpers/utils/isEmpty';

const DrawerSetting = props => {
  const handleFetchProfile = async () => {
    try {
      const { data } = await getProfileService();
      if (data.data) props.actionGetProfile(data.data);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchProfile(); // eslint-disable-next-line
  }, []);

  const actionList = [
    {
      name: 'Tài khoản',
      icon: mdiSettings,
      url: Routes.SETTING_ACCOUNT_INFO
    },
    { name: 'Đăng xuất', icon: mdiLogout, url: Routes.LOGIN }
  ];
  const handleClick = isFree => {
    if (isFree) {
      props.history.push({
        pathname: Routes.SETTING_GROUP_CREATE_ORDER
      });
    } else {
      props.history.push({
        pathname: Routes.SETTING_GROUP_ORDER,
        search: `?order_id=${props.profile.order_id}`
      });
    }
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  const isFree = !isEmpty(props.profile) && props.profile.type === 'Free';

  return (
    <div className="drawer-content-container">
      <HeaderDrawer title={null} />
      {!isEmpty(props.profile) && (
        <div className="content-drawer">
          <img alt="" src={avatar} className="profile-avatar" />
          {/* <img alt="" src={props.profile.avatar || avatar} /> */}
          <div className="account-status text-center">{props.profile.type}</div>
          <p className="account-name text-center">{props.profile.name}</p>
          <p className="text-center">{props.profile.email}</p>
          <p
            className="link-text text-center"
            onClick={() => handleClick(isFree)}
          >
            {isFree ? 'Nâng cấp tài khoản' : 'Xem đơn hàng'}
          </p>
        </div>
      )}

      <FooterListDrawer actionList={actionList} />
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    profile: state.system.profile,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage,
    actionGetProfile
  }
)(withRouter(DrawerSetting));
