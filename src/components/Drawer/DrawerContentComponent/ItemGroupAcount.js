import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withRouter } from 'react-router-dom';
import {
  actionToast,
  actionVisibleDrawerMessage,
  actionActiveGroup,
  actionChangeActiveGroup
} from '../../../actions/system/system';
import { COLOR_ACTIVE } from '../../../constants/actions/system/system';
import * as image from '../../../assets/index';
import { Routes } from '../../../constants/routes';
import '../Drawer.scss';
import * as services from '../DrawerService';
import { isEmpty } from '../../../helpers/utils/isEmpty';
// import { isEmpty } from '../../../helpers/utils/isEmpty';

const ItemGroupAcount = props => {
  const { t } = useTranslation();
  const { item, history } = props;

  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const requestJoinGroup = async (e, group_id) => {
    e.stopPropagation();
    if (item.type_group === 'Free') {
      handleToast('error', t('IDS_WP_CANNOT_JOIN_GROUP_FREE'));
    } else {
      try {
        await services.requestJoinGroupService(group_id);
        handleToast('success', t('IDS_WP_SEND_REQUEST_SUCCESS'));
        if (props.handleFetchData) props.handleFetchData();
      } catch (error) {
        handleToast('error', error.message);
      }
    }
  };
  const leaveGroup = async (e, group_id) => {
    e.stopPropagation();
    try {
      await services.leaveGroupService(group_id);
      if (props.handleFetchData) props.handleFetchData();
      if (props.groupMe) {
        await actionChangeActiveGroup(props.groupMe.id);
        props.actionActiveGroup(props.groupMe);
        window.location.reload(false);
      }
      handleToast('success', t('IDS_WP_LEAVE_GROUP_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const acceptInvitation = async (e, invitation_id) => {
    e.stopPropagation();
    try {
      await services.acceptInviteService(invitation_id);
      if (props.handleFetchData) props.handleFetchData();
      handleToast('success', t('IDS_WP_APPROVE_REQUEST_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const rejectInvitation = async (e, invitation_id) => {
    e.stopPropagation();
    try {
      await services.rejectInviteService(invitation_id);
      if (props.handleFetchData) props.handleFetchData();
      handleToast('success', t('IDS_WP_REJECT_REQUEST_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  // const acceptJoinGroup = async requirement_id => {
  //   try {
  //     await services.acceptJoinGroupService(requirement_id);
  //     handleToast('success', 'Phê duyệt yêu cầu thành công!');
  //   } catch (error) {
  //     handleToast('error', error.message);
  //   }
  // };
  const rejectJoinGroup = async (e, requirement_id) => {
    e.stopPropagation();
    try {
      await services.rejectJoinGroupService(requirement_id);
      if (props.handleFetchData) props.handleFetchData();
      handleToast('success', t('IDS_WP_REJECT_REQUEST_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const resendRequireUser = async (e, requirement_id) => {
    e.stopPropagation();
    try {
      await services.resendInviteUserService(requirement_id);
      if (props.handleFetchData) props.handleFetchData();
      handleToast('success', t('IDS_WP_RESEND_REQUEST_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    }
  };
  const handleActiveGroup = async item => {
    if (
      !isEmpty(props.profile.group_active) &&
      props.profile.group_active.id === item.id
    ) {
      return;
    } else {
      try {
        localStorage.setItem(COLOR_ACTIVE, item.color);
        await actionChangeActiveGroup(item.id);
        props.actionActiveGroup(item);
        handleToast('success', t('IDS_WP_CHANGE_ACTIVE_GROUP_SUCCESS'));
        window.location.reload(false);
      } catch (error) {
        handleToast('error', t('IDS_WP_CHANGE_ACTIVE_GROUP_FAIL'));
      }
    }
  };
  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `Đã copy ${text}`);
  };
  const bgColor = props.colors.find(item => item.selected === true);
  const getContent = () => {
    const commonEl = (
      <Fragment>
        <div className="name-item-group-account">
          <span
            className={`text-name-item-group-account ${
              props.type === 'requirements' ? 'requirement-header-text' : ''
            }`}
            title={item.name}
          >
            {item.name}
          </span>
          {item.type_group === 'Free' ? (
            <span className="account-status-text">{item.type_group}</span>
          ) : (
            <Chip
              size="small"
              label={item.type_group}
              className="status-item-group-account pro-color"
            />
          )}
        </div>
        <div className="acc-item-group-account">
          <span className="text-value-email-phone">
            ID: {item.code || item.group_code}&nbsp;
            <Icon
              path={mdiContentCopy}
              size={0.6}
              color="#a5a5a5"
              className="cursor-pointer"
              title={t('IDS_WP_COPY_TEXT_CLIPBOARD')}
              onClick={e => {
                handleCopyText(item.code || item.group_code);
                e.stopPropagation();
              }}
            />
            &nbsp;
            {item.is_expired && (
              <span className="red-color">{t('IDS_WP_EXPIRED')}</span>
            )}
          </span>
        </div>
      </Fragment>
    );
    let newEl = null;
    switch (props.type) {
      case 'group_me':
        return (
          <div
            className="info-item-group-account"
            onClick={() => handleActiveGroup(item)}
          >
            {commonEl}
            {/* <div className="phone-item-group-account">
            <span className="text-value-email-phone">
              {!isEmpty(props.profile) ? props.profile.phone : ''}
            </span>
          </div> */}
          </div>
        );
      case 'join':
        return (
          <div className="info-item-group-account">
            {commonEl}
            <div className="phone-item-group-account">
              {item.status_code === 2 ? (
                <Button className="btn-action joined-group-text" variant="text">
                  {t('IDS_WP_JOINED')}
                </Button>
              ) : (
                <Button
                  className="btn-action"
                  variant="text"
                  onClick={e => requestJoinGroup(e, item.id)}
                  style={{
                    backgroundColor: bgColor.color,
                    border: `1px solid ${bgColor.color}`,
                    color: 'white'
                  }}
                >
                  {t('IDS_WP_JOIN')}
                </Button>
              )}
            </div>
          </div>
        );
      case 'group_joins':
        return (
          <div
            className="info-item-group-account"
            onClick={() => handleActiveGroup(item)}
          >
            {commonEl}
            <div className="phone-item-group-account">
              {/* <span className="text-value-email-phone">{item.phone}</span> */}
              <Button
                className="btn-action leave-group-btn"
                variant="text"
                onClick={e => leaveGroup(e, item.id)}
              >
                {t('IDS_WP_LEAVE_GROUP')}
              </Button>
            </div>
          </div>
        );

      case 'requirements':
        newEl = (
          <div className="action-item-btn-group">
            <Button
              className="btn-ok"
              style={{
                backgroundColor: bgColor.color,
                border: `1px solid ${bgColor.color}`
              }}
              variant="text"
              onClick={e => resendRequireUser(e, item.requirement_id)}
            >
              {t('IDS_WP_RESEND')}
            </Button>
            <Button
              className="btn-action"
              variant="text"
              onClick={e => rejectJoinGroup(e, item.requirement_id)}
            >
              {t('IDS_WP_CANCEL')}
            </Button>
          </div>
        );
        break;
      case 'invitations':
        newEl = (
          <div className="action-item-btn-group">
            <Button
              className="btn-ok"
              style={{
                backgroundColor: bgColor.color,
                border: `1px solid ${bgColor.color}`
              }}
              variant="text"
              onClick={e => acceptInvitation(e, item.invitation_id)}
            >
              {t('IDS_WP_APPROVE')}
            </Button>
            <Button
              className="btn-action"
              variant="text"
              onClick={e => rejectInvitation(e, item.invitation_id)}
            >
              {t('IDS_WP_REJECT')}
            </Button>
          </div>
        );
        break;
      default:
        return null;
    }
    return (
      <div className="info-item-group-account invitation-item">
        <div className="invitation-left">
          <div className="name-item-group-account">
            <span className="text-name-item-group-account" title={item.name}>
              {item.name}
            </span>
          </div>
          <div className="acc-item-group-account">
            <p className="text-value-email-phone">
              ID: {item.code}&nbsp;
              <Icon
                path={mdiContentCopy}
                size={0.6}
                color="#a5a5a5"
                className="cursor-pointer"
                title={t('IDS_WP_COPY_TEXT_CLIPBOARD')}
                onClick={e => {
                  handleCopyText(item.code || item.group_code);
                  e.stopPropagation();
                }}
              />
              &nbsp;
              {item.is_expired && (
                <span className="red-color">{t('IDS_WP_EXPIRED')}</span>
              )}
            </p>
            {newEl}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`item-group-account ${
        props.groupActive.code === item.code ? 'actived' : ''
      } ${
        props.type === 'join' || props.type === 'requirements'
          ? 'normal-pointer'
          : ''
      }`}
      key={item.id}
      onClick={() => {
        if (props.type === 'join' || props.type === 'requirements') return;
        history.push(Routes.HOME);
        props.actionVisibleDrawerMessage({
          type: '',
          anchor: props.anchorDrawer
        });
      }}
    >
      <div className="avatar-item-group-account">
        <Avatar
          alt=""
          src={item.logo || image.avatar_user}
          className="avatar"
        />
        {props.groupActive.code === item.code && (
          <CheckCircleIcon className="check-icon" />
        )}
      </div>
      {getContent()}
    </div>
  );
};

export default connect(
  state => ({
    toast: state.system.toast,
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    profile: state.system.profile,
    groupActive: state.system.groupActive
  }),
  { actionToast, actionVisibleDrawerMessage, actionActiveGroup }
)(withRouter(ItemGroupAcount));
