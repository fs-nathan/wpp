import React from 'react';
import {
  mdiClockOutline,
  mdiFileDocumentBoxOutline,
  mdiFolderOpenOutline,
  mdiFileMoveOutline,
  mdiFileUndoOutline,
  mdiGoogleDrive,
  mdiTrashCanOutline
} from '@mdi/js';
import { connect } from 'react-redux';
import { actionChangeBreadCrumbs } from '../../../actions/system/system';
import {
  actionFetchListMyDocument,
  actionSelectedFolder,
  actionFetchListGoogleDocument,
  actionFetchListDocumentShare,
  actionFetchListDocumentFromMe,
  actionFetchListTrash
} from '../../../actions/documents';
import { Routes } from '../../../constants/routes';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const ListPart = props => {
  const listMenu = [
    {
      title: 'Gần đây',
      url: Routes.DOCUMENT_RECENT,
      icon: mdiClockOutline,
      color: '#ffc107'
    },
    {
      title: 'Tài liệu dự án',
      url: Routes.DOCUMENT_PROJECT,
      icon: mdiFileDocumentBoxOutline,
      color: '#4caf50'
    },
    {
      title: 'Đã chia sẻ',
      url: Routes.DOCUMENT_SHARE,
      icon: mdiFileMoveOutline,
      color: '#f44336',
      action: () => {
        if (props.breadCrumbs.length > 0) {
          props.actionFetchListDocumentFromMe({}, true);
          props.actionChangeBreadCrumbs([]);
          props.actionSelectedFolder({});
        }
      }
    },
    {
      title: 'Được chia sẻ với tôi',
      url: Routes.DOCUMENT_SHARE_ME,
      icon: mdiFileUndoOutline,
      color: '#607d8b',
      action: () => {
        if (props.breadCrumbs.length > 0) {
          props.actionFetchListDocumentShare({}, true);
          props.actionChangeBreadCrumbs([]);
          props.actionSelectedFolder({});
        }
      }
    },
    {
      title: 'Tài liệu của tôi',
      url: Routes.DOCUMENT_ME,
      icon: mdiFolderOpenOutline,
      color: '#ff9800',
      action: () => {
        if (props.breadCrumbs.length > 0) {
          props.actionFetchListMyDocument({}, true);
          props.actionChangeBreadCrumbs([]);
          props.actionSelectedFolder({});
        }
      }
    },
    {
      title: 'Google Drive',
      url: Routes.DOCUMENT_GOOGLE_DRIVE,
      icon: mdiGoogleDrive,
      color: '#2196f3',
      action: () => {
        if (props.breadCrumbs.length > 0) {
          props.actionFetchListGoogleDocument({}, true);
          props.actionChangeBreadCrumbs([]);
          props.actionSelectedFolder({});
        }
      }
    },
    {
      title: 'Thùng rác',
      url: Routes.DOCUMENT_TRASH,
      icon: mdiTrashCanOutline,
      color: '#777',
      action: () => {
        if (props.breadCrumbs.length > 0) {
          props.actionFetchListTrash({}, true);
          props.actionChangeBreadCrumbs([]);
          props.actionSelectedFolder({});
        }
      }
    }
  ];
  return <LeftSetting title="Quản lý tài liệu" listMenu={listMenu} />;
};

export default connect(
  state => ({
    breadCrumbs: state.system.breadCrumbs
  }),
  {
    actionChangeBreadCrumbs,
    actionFetchListMyDocument,
    actionSelectedFolder,
    actionFetchListDocumentShare,
    actionFetchListDocumentFromMe,
    actionFetchListTrash,
    actionFetchListGoogleDocument
  }
)(ListPart);
