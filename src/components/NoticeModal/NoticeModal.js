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
import {openNoticeModal, closeNoticeModal, actionVisibleDrawerMessage, actionToast} from '../../actions/system/system';
import {mdiDockWindow} from '@mdi/js';
import Icon from '@mdi/react';
import { DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';
import grey from "@material-ui/core/colors/grey";
import {CircularProgress} from "@material-ui/core";
import { apiService } from '../../constants/axiosInstance';
import {get} from "lodash";

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
  const backgroundHeader = (img, imgSize = "contain") => {
    return {
      backgroundImage: `url(${img})`,
      backgroundPosition: "bottom left",
      backgroundRepeat: "no-repeat",
      backgroundSize: imgSize
    }
  }

  const [typeHover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
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

  const startTrailUsing = async () => {
    try {
      setLoading(true);
      await apiService({
        url: '/use-trial-package',
        method: 'post',
      });
      handleToast('success', t('IDS_WP_START_TRAIL_SUCCESS'));
      window.location.reload(false);
    } catch (error) {
      handleToast('error', error.message);
      setLoading(false);
    }
  }

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
        {
          props.visibleNoticeReason === "ORDER_EXPIRED" && (
              <>
                <div
                    className="notice-header notice-header-blue justify-content-end"
                    style={backgroundHeader(icons.ic_upgrade, "170px")}
                >
                  <div className={"notice-header-logo-wrapper align-items-end mr-50"}>
                    <img src={icons.logo_white} alt="logo" className="notice-logo" />
                    <div className={"notice-header-pro-label"}><span>PRO</span></div>
                  </div>
                </div>
              </>
          )
        }
        {
          props.visibleNoticeReason === "ACCOUNT_FREE" && (
              <>
                <div
                    className="notice-header notice-header-green justify-content-center"
                    style={backgroundHeader(icons.notice_bg_head)}
                >
                  <div className={"notice-header-logo-wrapper"}>
                    <img src={icons.logo_white} alt="logo" className="notice-logo" />
                    <div className={"notice-header-text"}>{t("IDS_WP_WORKPLUS_APPLICATION")}</div>
                  </div>
                </div>
              </>
          )
        }

        <div className={"notice-body"}>
          <p className="notice-text header-text">
            {t('IDS_WP_WELCOME')} {props.profile.name}!
          </p>
          {
            props.visibleNoticeReason === "ACCOUNT_FREE" ? (
                <>
                  <p className="notice-text sub-header-text">
                    {t('IDS_WP_LOGIN_SUCCESS_INTRO')} <strong>{get(props.profile, "group_active.name")}</strong>
                    <br/>
                    {t("IDS_WP_LOGIN_SUCCESS_INTRO_1")}
                    <a href={"#"}>
                      {t("IDS_WP_SEE_MORE_TRAIL_POLICY")}
                      <Icon path={mdiDockWindow} size={0.7} color={"#0000EE"}/>
                    </a>
                  </p>
                </>
            ) : (
                <p className="notice-text sub-header-text">
                  {t('IDS_WP_EXPIRE_ORDER_NOTICE')}
                </p>
            )
          }

          <div className="notice-btn-container">
            {
              props.visibleNoticeReason === "ACCOUNT_FREE" ? (
                  <>
                    <Button
                        variant="contained"
                        className="notice-btn"
                        onClick={startTrailUsing}
                        style={
                          typeHover === 'join' ? { ...hoverColor, opacity: loading ? "0.5" : "1"} : { ...defaultColor, opacity: loading ? "0.5" : "1"}
                        }
                        onMouseEnter={() => setHover('join')}
                        onMouseLeave={() => setHover(null)}
                        disabled={loading}
                    >
                      <CircularProgress
                          size={16}
                          className="margin-circular"
                          color={bgColor.color}
                          style={{
                            display: loading ? 'initial' : 'none'
                          }}
                      />
                      {t('IDS_WP_START_TRAIL_USING')}
                    </Button>
                    <Button className={"notice-btn-text"} onClick={upgradeAccount}>
                      {t('IDS_WP_SELECT_UPGRADE_ACC')}
                    </Button>
                  </>
              ) : (
                  <>
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
                  </>
              )
            }
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
    visibleNoticeReason: state.system.visibleNoticeReason,
    profile: state.system.profile
  }),
  {
    actionToast,
    openNoticeModal,
    closeNoticeModal,
    actionVisibleDrawerMessage
  }
)(withRouter(NoticeModal));
