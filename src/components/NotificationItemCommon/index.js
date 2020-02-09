import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '../../helpers/utils/isEmpty';
import {
  actionVisibleDrawerMessage,
  openDocumentDetail,
  actionActiveGroup
} from '../../actions/system/system';
import { getDocumentDetail } from '../../actions/documents';
import { DRAWER_TYPE } from '../../constants/constants';

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
        console.log('show detail file');
        try {
          const { data } = await getDocumentDetail({
            file_id: data_notification.file_id
          });
          props.openDocumentDetail(data.file);
        } catch (err) {}
        // props.openDocumentDetail({ id: data_notification.file_id });
        break;
      case 2:
        console.log(
          'Redirect to url access folder share, data_notification.folder_id'
        );
        break;
      case 4:
      case 6:
      case 14:
        console.log('Redirect to url BE response');
        if (data_notification.change_group) {
          props.actionActiveGroup(data_notification.group);
        }
        props.history.push({ pathname: data_notification.url_redirect });
        break;
      case 8:
      case 10:
      case 15:
        console.log('Show popup get-list-group');
        props.actionVisibleDrawerMessage({
          type: DRAWER_TYPE.GROUP_ACCOUNT,
          anchor: 'top'
        });
        break;
      case 13:
        console.log('Load url google driver at another tab');
        break;
      case 17:
        console.log('Show popup get-list-requirement');
        props.actionVisibleDrawerMessage({
          type: DRAWER_TYPE.JOIN_NEW_GROUP,
          anchor: 'top'
        });
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
        return;
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
    actionActiveGroup
  }
)(withRouter(NotificationItemCommon));