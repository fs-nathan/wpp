import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { mdiLogout, mdiSettings } from '@mdi/js';
import avatar from '../../../assets/avatar.jpg';
import bg_avatar from '../../../assets/bg_head_poup_menu.png';
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
import {get} from "lodash";

const DrawerSetting = props => {
  const { t } = useTranslation();
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
      name: t('IDS_WP_ACCOUNT'),
      icon: mdiSettings,
      url: Routes.SETTING_ACCOUNT_INFO
    },
    { name: t('IDS_WP_LOGOUT'), icon: mdiLogout, url: Routes.LOGIN }
  ];
  const handleClick = isFree => {
    if (isFree) {
      props.history.push({
        pathname: Routes.SETTING_GROUP_CREATE_ORDER
      });
    } else {
      props.history.push({
        pathname: Routes.SETTING_GROUP_ORDER,
        search: `?order_id=${props.profile.order_user_id}`
      });
    }
    props.actionVisibleDrawerMessage({
      type: '',
      anchor: props.anchorDrawer
    });
  };
  const isFree = !isEmpty(props.profile) && props.profile.type === 'Free';
  console.log(props.profile)
  return (
    <div className="drawer-content">
      <HeaderDrawer title={null} />
      {!isEmpty(props.profile) && (
        <div className="content-drawer">
          {/* <img alt="" src={avatar} className="profile-avatar" /> */}
          <div className="avatar-block">
            <img alt="" src={bg_avatar} className="background-avatar" />
            <div className="image-avatar">
              <img
                alt=""
                src={props.profile.avatar || avatar}
                className="profile-avatar"
              />
            </div>
          </div>

          {props.profile.type === 'Free' ? (
            <div className="account-status text-center">
              {props.profile.type}
            </div>
          ) : (
            <div className={`account-status text-center ${get(props.profile, "group_active.is_expire", false) ? "expire-color" : "pro-color"}`}>
              {props.profile.type}
            </div>
          )}

          <p className="account-name text-center">{props.profile.name}</p>
          <p className="text-center">{props.profile.email}</p>
          <p
            className="link-text text-center"
            onClick={() => handleClick(isFree)}
          >
            {isFree ? t('IDS_WP_UPGRADE_ORDER') : t('IDS_WP_VIEW_ORDER')}
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
