import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CustomAvatar from 'components/CustomAvatar';
import { ListItemAvatar, ListItemText, CircularProgress } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { mdiContentCopy } from '@mdi/js';
import Icon from '@mdi/react';
import {get} from "lodash"
import AlertModal from 'components/AlertModal';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  actionActiveGroup,
  actionChangeActiveGroup, actionToast,
  actionVisibleDrawerMessage
} from '../../actions/system/system';
import * as image from '../../assets/index';
import { COLOR_ACTIVE } from '../../constants/actions/system/system';
import { Routes } from '../../constants/routes';
import { isEmpty } from '../../helpers/utils/isEmpty';
import './GroupAccountModal.scss'
import * as services from '../../components/Drawer/DrawerService';
import { Primary, Secondary, StyledListItem } from '../../components/CustomList';

const ItemGroupAccount = props => {
  const { t } = useTranslation();
  const [alertModal, showAlertModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [groupID, setGroupID] = React.useState(null);
  const { item, history } = props;

  const StyledSecondary = ({ className = '', ...props }) =>
    <span
      className={`view_ItemGroupAccount___style-secondary ${className}`}
      {...props}
    />;

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

  const leaveGroupConfirm = (el, id) => {
    el.stopPropagation();
    showAlertModal(true);
    setGroupID(id);
  }
  const leaveGroup = async (group_id) => {
    try {
      setLoading(true);
      await services.leaveGroupService(group_id);
      if (props.handleFetchData) props.handleFetchData();
      if (props.groupMe) {
        await actionChangeActiveGroup(props.groupMe.id);
        props.actionActiveGroup(props.groupMe);
        window.location.href = "/home"
      }
      handleToast('success', t('IDS_WP_LEAVE_GROUP_SUCCESS'));
    } catch (error) {
      handleToast('error', error.message);
    } finally {
      showAlertModal(false);
      setLoading(false);
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
        //handleToast('success', t('IDS_WP_CHANGE_ACTIVE_GROUP_SUCCESS'));
        window.location.href = "/home";
      } catch (error) {
        handleToast('error', t('IDS_WP_CHANGE_ACTIVE_GROUP_FAIL'));
      }
    }
  };
  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };

  const bgColor = props.colors.find(item => item.selected === true);
  const getContent = () => {
    const commonEl = (
      <Fragment>
        <div className="name-item-group-account">
          <span
            className={`text-name-item-group-account ${props.type === 'requirements' ? 'requirement-header-text' : ''
              }`}
            title={item.name}
          >
            {item.name}
          </span>
          {(item.type_group === 'Free' || get(item, "type_group", null) === null) ? (
            <span className="account-status-text">{item.type_group}</span>
          ) : (
            <Chip
              size="small"
              label={item.type_group}
              className={`status-item-group-account ${item.is_expired ? "expire-color" : "pro-color"}`}
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
            style={{ display: "inline-block" }}
            onClick={() => handleActiveGroup(item)}
          >
            {commonEl}
          </div>
        );
      case 'join':
        return (
          <div className="info-item-group-account" style={{ display: "inline-block" }}>
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
          <>
            <div
              className="info-item-group-account"
              style={{ display: "inline-block" }}
              onClick={() => handleActiveGroup(item)}
            >
              {commonEl}

            </div>
            <div className="phone-item-group-account" style={{ display: "inline-block", float: "right", transform: 'translate(0px, 15px)' }}>
              {/* <span className="text-value-email-phone">{item.phone}</span> */}
              <Button
                className="btn-action leave-group-btn"
                variant="text"
                //onClick={e => leaveGroup(e, item.id)}
                onClick={e => leaveGroupConfirm(e, item.id)}
              >
                {t('IDS_WP_LEAVE_GROUP')}
              </Button>
            </div>
          </>
        );

      case 'requirements':
        return (
          <>
            <div className="info-item-group-account" style={{ display: "inline-block" }}>
              {commonEl}
            </div>
            <div className="phone-item-group-account" style={{ display: "inline-block", float: "right", transform: 'translate(0px, 15px)' }}>
              <Button
                className="btn-action"
                variant="text"
                onClick={e => rejectJoinGroup(e, item.requirement_id)}
              >
                {t('IDS_WP_CANCEL')}
              </Button>
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
            </div>
          </>
        );
        break;
      case 'invitations':
        return (
          <>
            <div className="info-item-group-account" style={{ display: "inline-block" }}>
              {commonEl}
            </div>
            <div className="phone-item-group-account" style={{ display: "inline-block", float: "right", transform: 'translate(0px, 15px)' }}>
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
          </>
        );
        break;
      default:
        return null;
    }
    return (
      <StyledListItem
        // key={get(user, 'id')}
        style={{ cursor: 'default' }}
      >

        <ListItemText
          style={{ backgroundColor: 'fff' }}
          primary={
            <Primary>title={item.name}</Primary>
          }
          secondary={
            <StyledSecondary>
              <Secondary>ID: {item.code}&nbsp;
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
              </Secondary>

              {/* {newEl} */}
            </StyledSecondary>
          }
        />
      </StyledListItem>
    );
  };
  return (
    <>
      <div
        className={`item-group-account ${props.groupActive.code === item.code ? 'actived' : ''
          } ${props.type === 'join' || props.type === 'requirements'
            ? 'normal-pointer'
            : ''
          }`}
        key={item.id}
        onClick={() => {
          if (props.type === 'join' || props.type === 'requirements') return;
          props.actionVisibleDrawerMessage({
            type: '',
            anchor: props.anchorDrawer
          });
          //if((item.is_expired && item.type_group === "Trial") || item.type_group === "Free") return;
          //history.push(Routes.HOME);
        }}
      >
        <div className="avatar-item-group-account" style={{ display: "inline-block", transform: "translate(0px, 10px)" }}>

          {/* <Avatar
            alt=""
            src={item.logo || image.avatar_user}
            className="avatar"
          /> */}
          <ListItemAvatar style={{ display: "inline-block" }}>
            <CustomAvatar style={{ width: 50, height: 50, }} className="avatar" src={item.logo || image.avatar_user} alt='avatar' />
          </ListItemAvatar>
          {getContent()}
          {props.groupActive.code === item.code && (
            <CheckCircleIcon className="check-icon" />
          )}
        </div>

      </div>
      <AlertModal
        open={alertModal}
        setOpen={showAlertModal}
        content={t("IDS_WP_LEAVE_GROUP_CONFIRM_MSG")}
        onConfirm={() => leaveGroup(groupID)}
        manualClose={true}
        activeLoading={loading}
        onCancle={() => showAlertModal(false)}
      />
    </>
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
)(withRouter(ItemGroupAccount));
