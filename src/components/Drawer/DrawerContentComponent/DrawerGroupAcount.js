import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  actionVisibleDrawerMessage,
  actionToast
} from '../../../actions/system/system';
import ItemGroupAcount from './ItemGroupAcount';
import '../Drawer.scss';
import { DRAWER_TYPE } from '../../../constants/constants';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import select_group_bg from '../../../assets/select_group_bg.png';
import * as services from '../DrawerService';
import * as image from '../../../assets/index';
// import { Routes } from '../../../constants/routes';

const DrawerGroupAcount = props => {
  const { t } = useTranslation();
  const [groupList, setGroup] = useState({});
  const { anchorDrawer } = props;

  const handleJoinNewGroup = () => {
    props.actionVisibleDrawerMessage({
      type: DRAWER_TYPE.JOIN_NEW_GROUP,
      anchor: anchorDrawer
    });
  };
  const handleClose = () => {
    props.actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
  };
  const handleFetchData = async () => {
    try {
      const { data } = await services.listGroupService();
      setGroup(data);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };

  const handleRequestJoinDemo = async group_id => {
    try {
      await services.requestJoinGroupDemoService(group_id);
      handleFetchData();
      handleToast('success', 'Đã gửi yêu cầu thành công!');
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <div className="drawer-content-container">
      <div className="drawer-content-left">
        <div className="header-drawer-content-group-account">
          <span className="text-header">{t('IDS_WP_GROUP_ACCOUNT')}</span>
          <span className="btn-close" onClick={handleClose}>
            <Icon path={mdiClose} size={1} color="rgba(0, 0, 0, 0.54)" />
          </span>
        </div>
        <div className="join-group-new" onClick={handleJoinNewGroup}>
          <span className="btn-close add-header-btn">
            <Icon path={mdiPlus} size={1.2} color="#007bec" />
          </span>
          <span className="text-join-group-new">
            {t('IDS_WP_JOIN_NEW_GROUP')}
          </span>
        </div>
        <div className="content-group-account">
          <Scrollbars autoHide autoHideTimeout={500}>
            <div className="item-group">
              <div className="title-item-group">
                <span className="text-item-group">{t('IDS_WP_MY_GROUP')}</span>
              </div>
              {!isEmpty(groupList.group_me) && (
                <ItemGroupAcount
                  item={groupList.group_me}
                  type="group_me"
                  handleFetchData={handleFetchData}
                />
              )}
            </div>
            {/* nhóm group_joins */}
            {!isEmpty(groupList.group_joins) && (
              <div className="item-group">
                <div className="title-item-group">
                  <span className="text-item-group">
                    {t('IDS_WP_JOINED_GROUP')}
                  </span>
                </div>
                {groupList.group_joins.map((group, idx) => (
                  <ItemGroupAcount
                    item={group}
                    key={idx}
                    type="group_joins"
                    handleFetchData={handleFetchData}
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>

        {(!isEmpty(groupList.group_demo) ||
          !isEmpty(groupList.invitations)) && (
          <div className="footer-join-group-new">
            {/* nhóm invitations */}
            {!isEmpty(groupList.invitations) && (
              <div className="item-group">
                <div className="title-item-group">
                  <span className="text-item-group">
                    {t('IDS_WP_INVITE_JOIN_GROUP')}
                  </span>
                </div>
                {groupList.invitations.map((group, idx) => (
                  <ItemGroupAcount
                    item={group}
                    key={idx}
                    type="invitations"
                    handleFetchData={handleFetchData}
                  />
                ))}
                {/* <ItemGroupAcount item={groupList.group_me} type="invitations" /> */}
              </div>
            )}

            {/* nhóm group_demo */}
            {!isEmpty(groupList.group_demo) && (
              <div className="item-group-account demo-group">
                <div className="avatar-item-group-account">
                  <Avatar
                    alt=""
                    src={groupList.group_demo.logo || image.avatar_user}
                    className="avatar"
                  />
                </div>
                <div className="info-item-group-account">
                  <div className="name-item-group-account">
                    <span className="text-name-item-group-account demo-footer-name">
                      {groupList.group_demo.name}
                    </span>
                    <Button
                      className="btn-ok"
                      style={{
                        backgroundColor: bgColor.color,
                        border: `1px solid ${bgColor.color}`
                      }}
                      variant="contained"
                      onClick={() => handleRequestJoinDemo()}
                    >
                      {t('IDS_WP_JOIN')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="drawer-content-right">
        <div className="right-content-container">
          <p className="right-header-text" style={{ color: bgColor.color }}>
            {t('IDS_WP_CONNECT_DES')}
          </p>
          <p>{t('IDS_WP_CONNECT_SUB_DES')}</p>
          <img src={select_group_bg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    toast: state.system.toast,
    colors: state.setting.colors
  }),
  {
    actionVisibleDrawerMessage,
    actionToast
  }
)(DrawerGroupAcount);
