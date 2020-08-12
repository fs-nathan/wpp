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

import { DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';
import grey from "@material-ui/core/colors/grey";

const NoticeModal = props => {
  const { t } = useTranslation();
  const bgColor = props.colors.find(item => item.selected === true);
  const defaultColor = {
    backgroundColor: bgColor.color,
    color: 'white',
    border: `1px solid ${bgColor.color}`
  };
  const hoverColor = {
    backgroundColor: bgColor.color,
    color: 'white',
    border: `1px solid ${bgColor.color}`
  };
  const [typeHover, setHover] = useState(null);
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
      maxWidth="sm"
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
          <CloseIcon style={{ color: grey[400] }} fontSize={"small"}/>
        </IconButton>
      </div>

      <MuiDialogActions disableSpacing={true}>
        <div className="notice-header">
          <img src={icons.ic_upgrade} alt="icon upgrade" className="icon-upgrade" />
          <div className={"notice-header-logo-wrapper"}>
            <img src={icons.logo_white} alt="logo" className="notice-logo" />
            <div className={"notice-header-pro-label"}><span>PRO</span></div>
          </div>
        </div>
        <div className={"notice-body"}>
          <p className="notice-text header-text">
            {t('IDS_WP_WELCOME')} {props.profile.name}!
          </p>
          <p className="notice-text sub-header-text">
            {t('IDS_WP_LOGIN_SUCCESS_INTRO')}
          </p>
          <div className="notice-btn-container">
            <Button
                variant="contained"
                className="notice-btn"
                onClick={upgradeAccount}
                style={
                  typeHover === 'join' ? { ...hoverColor } : { ...defaultColor }
                }
                onMouseEnter={() => setHover('join')}
                onMouseLeave={() => setHover(null)}
            >
              {t('IDS_WP_UPGRADE_ACC')}
            </Button>
            <Button className={"notice-btn-text"} onClick={demoMode}>
              {t('IDS_WP_SELECT_GROUP_ACC')}
            </Button>
          </div>

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
  }
)(withRouter(NoticeModal));
