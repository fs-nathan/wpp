import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './NoticeModal.scss';
import * as icons from '../../assets';
import {actionToast, actionVisibleDrawerMessage, closeNoticeModal, openNoticeModal} from '../../actions/system/system';
import {mdiDockWindow} from '@mdi/js';
import Icon from '@mdi/react';
import {DRAWER_TYPE} from '../../constants/constants';
import {Routes} from '../../constants/routes';
import {CircularProgress} from "@material-ui/core";
import {apiService} from '../../constants/axiosInstance';
import {get} from "lodash";
import { Scrollbars } from 'react-custom-scrollbars';

const NoticeModal = props => {
  const { t } = useTranslation();
  const bgColor = props.colors.find(item => item.selected === true);
  const backgroundHeader = (img, imgSize = "contain") => {
    return {
      backgroundImage: `url(${img})`,
      backgroundPosition: "bottom left",
      backgroundRepeat: "no-repeat",
      backgroundSize: imgSize
    }
  }
  const [loading, setLoading] = useState(false);
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const closeNoticeModal = () => {
    props.closeNoticeModal();
  };
  const demoMode = (e) => {
    e.preventDefault();
    closeNoticeModal();
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

  const startTrialUsing = async () => {
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
      <Scrollbars autoHeight autoHeightMin={"calc(100vh - 150px)"}>
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
            {
              props.visibleNoticeReason === "ACCOUNT_FREE" || props.visibleNoticeReason === "ORDER_EXPIRED" &&
              <p className="notice-text header-text">
                {t('IDS_WP_WELCOME')} {props.profile.name}!
              </p>
            }
            {
              props.visibleNoticeReason === "ACCOUNT_FREE" ? (
                <>
                  <p className="notice-text sub-header-text">
                    {t('IDS_WP_LOGIN_SUCCESS_INTRO')} <strong>{get(props.profile, "group_active.name")}</strong>
                    <br/>
                    {t("IDS_WP_LOGIN_SUCCESS_INTRO_1")}
                    <a href={"https://support.workplus.vn/hoi-dap/don-hang-dung-thu-la-gi/"} target={"_blank"}>
                      {t("IDS_WP_SEE_MORE_TRAIL_POLICY")}
                      <Icon path={mdiDockWindow} size={0.7} color={"#0076f3"}/>
                    </a>
                    {t("IDS_WP_LOGIN_SUCCESS_INTRO_2")}
                  </p>
                </>
              ) : props.visibleNoticeReason === "ACCOUNT_LOCKED" ?(
                <div className="content_notify-lock-user">
                  <img src={icons.icon_block_user} alt="" />
                  <h5>{t('IDS_WP_NOTIFY_BLOCK_USER_GROUP_TITLE', {group_name: props?.profile?.group_active.name})}</h5>
                  <div>{t('IDS_WP_NOTIFY_BLOCK_USER_GROUP_TEXT')}</div>
                </div>
              ) :(
                <p className="notice-text sub-header-text">
                  <span className={"text-bold"}>{t('IDS_WP_EXPIRE_ORDER_NOTICE')}</span>
                  <br/>
                  <span>{t("IDS_WP_EXPIRE_ORDER_NOTICE_2")}</span>
                </p>
              )
            }

            <div className="notice-btn-container">
              {props.visibleNoticeReason === "ACCOUNT_FREE" && (
                <Button
                  variant="contained"
                  className="notice-btn notice-btn-orange"
                  onClick={startTrialUsing}
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
              )
              }
              {props.visibleNoticeReason === "ACCOUNT_FREE" | props.visibleNoticeReason === "ORDER_EXPIRED" ?
                <Button
                  variant="contained"
                  className="notice-btn notice-btn-green"
                  onClick={upgradeAccount}
                >
                  {t('IDS_WP_UPGRADE_ACC')}
                </Button>:null
              }
              {props.visibleNoticeReason === "ACCOUNT_LOCKED" ? <Button variant="contained" color="primary" className="btn-select-group" onClick={evt => demoMode(evt)}>
                  {t('IDS_WP_SELECT_GROUP_ACC')}
                </Button>:
                <Button className="notice-btn-text" onClick={evt => demoMode(evt)}>
                  {t('IDS_WP_SELECT_GROUP_ACC')}
                </Button>}
            </div>

            <p className="notice-text-info">{t('IDS_WP_CONTACT_WORKPLUS_ENTER')}</p>
            <p className="notice-text-info">
              Hotline: 09.1800.6181 - Email: support@workplus.vn
            </p>
            <div className="notice-icon-container">
              <a href={"https://zalo.me/3224858190179871108"} target={"_blank"}>
              <span className="notice-icon">
                <img src={icons.ic_zalo} alt="" />
                &nbsp; {t('IDS_WP_ZALO_SUPPORT')}
              </span>
              </a>
              <a href={"https://m.me/workplus.vn"} target={"_blank"}>
              <span className="notice-icon">
                <img src={icons.ic_messeger} alt="" />
                &nbsp; {t('IDS_WP_FACEBOOK_SUPPORT')}
              </span>
              </a>
            </div>
          </div>
        </MuiDialogActions>
      </Scrollbars>
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
