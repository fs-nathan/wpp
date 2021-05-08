import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CustomAvatar from 'components/CustomAvatar';
import {Box, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {mdiContentCopy} from '@mdi/js';
import Icon from '@mdi/react';
import AlertModal from 'components/AlertModal';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  actionActiveGroup,
  actionChangeActiveGroup,
  actionToast,
  actionVisibleDrawerMessage
} from '../../actions/system/system';
import * as image from '../../assets/index';
import {COLOR_ACTIVE} from '../../constants/actions/system/system';
import './GroupAccountModal.scss'
import * as services from '../../components/Drawer/DrawerService';
import List from "@material-ui/core/List";
import {get} from "lodash";

const ItemGroupAccount = props => {
  const { t } = useTranslation();
  const { item, history } = props;
  const [alertModal, showAlertModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [groupID, setGroupID] = React.useState(null);
  const [isHover, setIsHover] = React.useState(false);

  const leaveGroupConfirm = (el, id) => {
    el.stopPropagation();
    showAlertModal(true);
    setGroupID(id);
  }
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };

  const requestJoinGroup = async (e, group_id) => {
    e.stopPropagation();
    try {
      await services.requestJoinGroupService(group_id);
      handleToast('success', t('IDS_WP_SEND_REQUEST_SUCCESS'));
      if (props.handleFetchData) props.handleFetchData();
      props.setMode("REQUIRE");
    } catch (error) {
      handleToast('error', error.message);
    }
  };

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
      props.setMode("ACTIVE");
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

  const handleActiveGroup = async item => {
    try {
      localStorage.setItem(COLOR_ACTIVE, item.color);
      await actionChangeActiveGroup(item.id);
      props.actionActiveGroup(item);
      window.location.href = "/home";
    } catch (error) {
      handleToast('error', t('IDS_WP_CHANGE_ACTIVE_GROUP_FAIL'));
    }
  };

  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };

  const handleRequestJoinDemo = async group_id => {
    try {
      setLoading(true);
      await services.requestJoinGroupDemoService(group_id);
      handleToast('success', 'Đã gửi yêu cầu thành công!');
      window.location.reload();
    } catch (error) {
      handleToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResentJoinGroup = async group_id => {
    try {
      setLoading(true);
      await services.resendInviteUserService(group_id);
      handleToast('success', 'Đã gửi yêu cầu thành công!');
    } catch (error) {
      handleToast('error', error.message);
    } finally {
      setLoading(false);
    }
  }

  function renderGroupAction(setIsHover, isHover) {
    switch (props.type) {
      case 'group_me':
        return (
          <>
            {isHover && props.groupActive.code !== item.code && (
              <Button
                variant={"contained"} disableElevation color={"primary"}
                onClick={() => {handleActiveGroup(item); setIsHover(true)}}
                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              >
                {t('LABEL_CHAT_TASK_CHON')}
              </Button>
            )}
          </>
        );
      case 'join':
        return (
          <>
            {item.status_code === 2 ? (
              <Button
                variant={"contained"} disableElevation onClick={() => props.setMode("ACTIVE")}
                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} color={"primary"}
              >
                {t('IDS_WP_JOINED')}
              </Button>
            ) : (item.type_group !== "Free" && !get(item, "is_enough_user", false)) ? (
              <Button
                variant={"contained"} disableElevation color={"primary"}
                onClick={e => requestJoinGroup(e, item.id)}
                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              >
                {t('IDS_WP_JOIN')}
              </Button>
            ) : <div/>}
          </>
        );
      case 'group_joins':
        return (
          <>
            {isHover && (
              <>
                <Button
                  className={"bg-orange"} variant={"contained"} disableElevation color={"primary"}
                  onClick={e => {leaveGroupConfirm(e, item.id); setIsHover(true)}}
                  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >
                  {t('IDS_WP_LEAVE_GROUP')}
                </Button>
                {props.groupActive.code !== item.code && !item.is_expired && (
                  <Button
                    variant={"contained"} disableElevation color={"primary"}
                    onClick={() => {handleActiveGroup(item); setIsHover(true)}}
                    onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                  >
                    {t('LABEL_CHAT_TASK_CHON')}
                  </Button>
                )}
              </>
            )}
          </>
        );
      case 'requirements':
        return (
          <>
            {isHover && (
              <>
                <Button
                  color={"primary"} size={"small"} onClick={e => rejectJoinGroup(e, item.requirement_id)}
                  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >
                  {t('IDS_WP_CANCEL')}
                </Button>
                <Button
                  variant={"contained"} disableElevation color={"primary"}
                  onClick={e => handleResentJoinGroup(item.group)}
                  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >
                  {t('IDS_WP_RESEND')}
                </Button>
              </>
            )}
          </>
        );
      case 'invitations':
        return (
          <>
            {!get(item, "is_demo", false) && (
              <>
                <Button
                  color={"primary"} size={"small"} onClick={e => rejectInvitation(e, item.invitation_id)}
                  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >
                  {t('IDS_WP_CANCEL')}
                </Button>
                <Button
                  variant={"contained"} disableElevation color={"primary"}
                  onClick={e => acceptInvitation(e, item.invitation_id)}
                  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >
                  {t('IDS_WP_APPROVE')}
                </Button>
              </>
            )}
            {get(item, "is_demo", false) && (
              <Button
                variant={"contained"} disableElevation color={"primary"}
                onClick={e => handleRequestJoinDemo(item.id)}
                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              >
                {t('IDS_WP_APPROVE')}
              </Button>
            )}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div
        key={item.id}
        onClick={() => {
          if (props.type === 'join' || props.type === 'requirements') return;
          props.actionVisibleDrawerMessage({
            type: '',
            anchor: props.anchorDrawer
          });
        }}
      >
        <List component={"nav"} className="view_GroupAccount_Modal__groupItem">
          <ListItem
            onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
            className={`${props.groupActive.code === item.code && "view_GroupAccount_Modal__groupItem--Active"}`}
          >
            {isHover && (props.groupActive.code !== item.code || props.type !== "group_me") &&
              (item.type_group !== "Free" && !get(item, "is_enough_user", false)) &&
              <Box className={"view_GroupAccount_Modal__actionMask"}/>
            }
            <ListItemAvatar>
              <CustomAvatar style={{ width: 50, height: 50, }} className="avatar" src={item.logo || image.avatar_user} alt='avatar' />
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={<div className={"view_GroupAccount_Modal__groupItem_secondaryInfo"}>
              {(item.type_group === 'Free' || item.type_group === "Trial") ? (
                <span className="account-status-text">{item.type_group}</span>
              ) : (
                <Chip
                  size="small"
                  label={item.type_group}
                  className={`status-item-group-account pro-color`}
                />
              )}
              <div>{`ID: ${item.code || item.group_code}`}</div>
              <Icon
                path={mdiContentCopy} size={0.7} color="#a5a5a5" className="cursor-pointer"
                title={t('IDS_WP_COPY_TEXT_CLIPBOARD')}
                onClick={e => {
                  handleCopyText(item.code || item.group_code);
                  e.stopPropagation();
                }}
              />
              {item.is_expired && (
                <span className="red-color">{t('IDS_WP_EXPIRED')}</span>
              )}
              {props.type === 'join' && (item.type_group === "Free") && (
                <span className="red-color">{t('MESSAGE_CAN_NOT_JOIN_FREE_TRAIL')}</span>
              )}
              {props.type === "join" && get(item, "is_enough_user", false) && (
                <span className="red-color">{t('MESSAGE_CAN_NOT_JOIN_ENOUGH_USERS')}</span>
              )}
            </div>}/>
            <ListItemSecondaryAction>
              {props.groupActive.code === item.code && (!isHover || props.type === "group_me") && (
                <CheckCircleIcon fontSize={"large"} htmlColor={"var(--color-primary)"}/>
              )}
              {renderGroupAction(setIsHover, isHover)}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
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
