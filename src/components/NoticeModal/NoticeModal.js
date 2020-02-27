import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NoticeModal.scss';
import * as icons from '../../assets';
import {
  openNoticeModal,
  closeNoticeModal,
  actionVisibleDrawerMessage
} from '../../actions/system/system';
// import { actionSettingGroup } from '../../../actions/setting';
import { DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';
import { isEmpty } from '../../helpers/utils/isEmpty';

const NoticeModal = props => {
  const { t } = useTranslation();
  // const [type, setType] = useState('intro'); // intro or expire (check follow account status)
  const bgColor = props.colors.find(item => item.selected === true);
  const defaultColor = {
    color: bgColor.color,
    border: `1px solid ${bgColor.color}`
  };
  const hoverColor = {
    backgroundColor: bgColor.color,
    color: 'white',
    border: `1px solid ${bgColor.color}`
  };
  const [typeHover, setHover] = useState(null);

  const type = 'intro';
  const closeNoticeModal = () => {
    props.closeNoticeModal();
  };
  const demoMode = () => {
    closeNoticeModal();
    props.history.push(Routes.HOME);
    props.actionVisibleDrawerMessage({
      type: DRAWER_TYPE.GROUP_ACCOUNT,
      anchor: 'top'
    });
  };
  const upgradeAccount = () => {
    closeNoticeModal();
    props.history.push({
      pathname: Routes.SETTING_GROUP_CREATE_ORDER
    });
  };
  const joinGroup = () => {
    closeNoticeModal();
  };
  const extendOrder = () => {
    closeNoticeModal();
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      className="notice-modal-container"
      onClose={closeNoticeModal}
      aria-labelledby="customized-dialog-title"
      open={props.visibleNoticeModal}
      disableBackdropClick
    >
      <div className="header-icon-modal">
        <IconButton
          aria-label="close"
          onClick={closeNoticeModal}
          className="close-icon"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <MuiDialogActions>
        <div className="notice-header">
          <img src={icons.logo} alt="logo" className="notice-logo" />
        </div>
        {type === 'intro' ? (
          <h2 className="notice-header-text" style={{ color: bgColor.color }}>
            {t('IDS_WP_WORKPLUS_APPLICATION')}
          </h2>
        ) : (
          <h2
            className="notice-header-text expire-text"
            style={{ color: bgColor.color }}
          >
            {t('IDS_WP_EXPIRE_ORDER_NOTICE')}
          </h2>
        )}
        <p className="notice-text header-text">
          {t('IDS_WP_WELCOME')} {props.profile.name}!
        </p>
        {type === 'intro' ? (
          <p className="notice-text sub-header-text">
            {t('IDS_WP_LOGIN_SUCCESS_INTRO')}&nbsp;
            <b>
              {!isEmpty(props.profile.group_active)
                ? props.profile.group_active.name
                : ''}
            </b>
          </p>
        ) : (
          <p className="notice-text">
            Nhóm làm việc TDGroup tạm thời bị khóa do đơn hàng đã hết thời hạn
            sử dụng vào ngày 20/11/2019
            <p>
              Vui lòng gia hạn đơn hàng để tiếp tục sử dụng hệ thống Workplus.
            </p>
          </p>
        )}
        <p className="notice-text sub-header-text">
          {t('IDS_WP_LOGIN_SUCCESS_INTRO_1')}
        </p>
        {type === 'intro' ? (
          <div className="notice-btn-container">
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={demoMode}
              style={
                typeHover === 'join' ? { ...hoverColor } : { ...defaultColor }
              }
              onMouseEnter={() => setHover('join')}
              onMouseLeave={() => setHover(null)}
            >
              {t('IDS_WP_SELECT_GROUP_ACC')}
            </Button>
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={upgradeAccount}
              style={
                typeHover === 'upgrade'
                  ? { ...hoverColor }
                  : { ...defaultColor }
              }
              onMouseEnter={() => setHover('upgrade')}
              onMouseLeave={() => setHover(null)}
            >
              {t('IDS_WP_UPGRADE_ACC')}
            </Button>
          </div>
        ) : (
          <div className="notice-btn-container">
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={joinGroup}
            >
              {t('IDS_WP_JOIN_OTHER_GROUP')}
            </Button>
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={extendOrder}
            >
              {t('IDS_WP_EXTEND_ORDER')}
            </Button>
          </div>
        )}

        <p className="notice-text-info">{t('IDS_WP_CONTACT_WORKPLUS_ENTER')}</p>
        <p className="notice-text-info">
          Hotline: 09.1800.6181 - Email: support@workplus.vn
        </p>
        <div className="notice-icon-container">
          <span className="notice-icon">
            <img src={icons.ic_zalo} alt="" />
            &nbsp; {t('IDS_WP_ZALO_SUPPORT')}
          </span>
          <span className="notice-icon">
            <img src={icons.ic_messeger} alt="" />
            &nbsp; {t('IDS_WP_FACEBOOK_SUPPORT')}
          </span>
        </div>
      </MuiDialogActions>
    </Dialog>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors,
    visibleNoticeModal: state.system.visibleNoticeModal,
    profile: state.system.profile
  }),
  {
    openNoticeModal,
    closeNoticeModal,
    actionVisibleDrawerMessage
    // actionSettingGroup
  }
)(withRouter(NoticeModal));
