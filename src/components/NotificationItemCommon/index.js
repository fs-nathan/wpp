import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '../../helpers/utils/isEmpty';
import {actionVisibleDrawerMessage, openDocumentDetail, actionActiveGroup, actionChangeBreadCrumbs, changeVisibleOfferDetailModal, changeVisibleRemindDetailModal} from '../../actions/system/system';
import {getDocumentDetail, actionFetchListMyDocument, actionSelectedFolder} from '../../actions/documents';
import { DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';

const NOTIFICATION_NEW_POST_CREATED = 22;
const NOTIFICATION_COMMENT_IN_POST = 23;
const NOTIFICATION_LEAVE_GROUP = 24;
const NOTIFICATION_ADD_MEMBER_TO_OFFER = 25;
const NOTIFICATION_ADD_MEMBER_TO_MONITOR_OFFER = 26;
const NOTIFICATION_REMOVE_MEMBER_IN_OFFER = 27;
const NOTIFICATION_DELETE_OFFER = 28;
const NOTIFICATION_OFFER_HAS_APPROVED = 29;
const NOTIFICATION_DELETE_APPROVED_OFFER = 30;
const NOTIFICATION_REMIND = 31;
const NOTIFICATION_WEEKLY_CALENDAR = 32;
const NOTIFICATION_LIKE_POST = 33;
const NOTIFICATION_LOVE_POST = 34;
const NOTIFICATION_COMMENT_IN_OFFER = 35;
const NOTIFICATION_TASK_STARTED = 36;
const NOTIFICATION_TASK_ENDED = 37;
const NOTIFICATION_ORDER_APPROVED = 38;
const NOTIFICATION_NEW_SYSTEM_NOTIFICATION = 41;

const NotificationItemCommon = props => {
  const { data_notification } = props.item;
  const handleClick = async () => {
    if (props.handleViewNotification) props.handleViewNotification();
    if (!isEmpty(props.typeDrawer)) {
      props.actionVisibleDrawerMessage({
        type: '',
        anchor: props.anchorDrawer
      });
    }
    switch (data_notification.type) {
      case 1:
      case 3:
        try {
          const { data } = await getDocumentDetail({
            file_id: data_notification.file_id
          });
          props.openDocumentDetail(data.file);
        } catch (err) {}
        break;
      case 2:
        console.log(
          'Redirect to url access folder share, data_notification.folder_id'
        );
        props.actionSelectedFolder({
          id: data_notification.folder_id,
          name: data_notification.folder_name
        });

        let newBreadCrumbs = [
          {
            id: -1,
            name: 'Home',
            action: () => {
              props.actionSelectedFolder({});
              props.actionFetchListMyDocument({}, true);
            }
          },
          {
            id: data_notification.folder_id,
            name: data_notification.folder_name,
            action: () => {
              props.actionSelectedFolder({
                id: data_notification.folder_id,
                name: data_notification.folder_name
              });
              props.actionFetchListMyDocument(
                { folder_id: data_notification.folder_id },
                true
              );
            }
          }
        ];
        props.actionChangeBreadCrumbs(newBreadCrumbs);
        props.history.push({ pathname: Routes.DOCUMENT_SHARE_ME });
        break;
      case 4:
      case 6:
      case 14:
        if (data_notification.change_group) {
          props.actionActiveGroup(data_notification.group);
        }
        props.history.push({ pathname: data_notification.url_redirect });
        break;
      case 8:
      case 10:
      case 15:
        props.actionVisibleDrawerMessage({
          type: DRAWER_TYPE.GROUP_ACCOUNT,
          anchor: 'top'
        });
        break;
      case 13:
        break;
      case 17:
        props.history.push({ pathname: "/users/member-required"});
        break;
      case 5:
      case 7:
      case 9:
      case 11:
      case 12:
      case 16:
      case 18:
      case 19:
      case 20:
      case NOTIFICATION_LEAVE_GROUP:
      case NOTIFICATION_DELETE_OFFER:
        // no action
        return;
      case 21:
        window.location.reload(false);
        break;
      case NOTIFICATION_NEW_POST_CREATED:
      case NOTIFICATION_COMMENT_IN_POST:
      case NOTIFICATION_LOVE_POST:
      case NOTIFICATION_LIKE_POST:
      case NOTIFICATION_TASK_STARTED:
      case NOTIFICATION_TASK_ENDED:
      case NOTIFICATION_ORDER_APPROVED:
        props.history.push({ pathname: data_notification.url_redirect });
        break;
      case NOTIFICATION_REMIND:
        props.changeVisibleRemindDetailModal({remind_id: data_notification.remind_id, visible: true});
        break;
      case NOTIFICATION_WEEKLY_CALENDAR:
        props.history.push({ pathname: Routes.CALENDAR_WEEKLY.replace(":year/:schedule_id/:from?", `${data_notification.year}/${data_notification.week_schedule_id}/notification`)});
        break;
      case NOTIFICATION_ADD_MEMBER_TO_OFFER:
      case NOTIFICATION_ADD_MEMBER_TO_MONITOR_OFFER:
      case NOTIFICATION_REMOVE_MEMBER_IN_OFFER:
      case NOTIFICATION_COMMENT_IN_OFFER:
      case NOTIFICATION_OFFER_HAS_APPROVED:
      case NOTIFICATION_DELETE_APPROVED_OFFER:
        props.changeVisibleOfferDetailModal({offer_id: data_notification.offer_id, visible: true});
        break;
      case NOTIFICATION_NEW_SYSTEM_NOTIFICATION:
        props.history.push({
          pathname: Routes.SETTING_ACCOUNT_NOTIFI,
          search: `?id=${data_notification.system_notification_id}`,
        });
        break;
      default:
        return;
    }
  };

  return <div onClick={handleClick}>{props.children}</div>;
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage,
    openDocumentDetail,
    actionActiveGroup,
    actionFetchListMyDocument,
    actionChangeBreadCrumbs,
    actionSelectedFolder,
    changeVisibleOfferDetailModal,
    changeVisibleRemindDetailModal
  }
)(withRouter(NotificationItemCommon));
