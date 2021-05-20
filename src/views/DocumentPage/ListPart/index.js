import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const listMenu = [
    {
      title: t('IDS_WP_RECENT'),
      url: Routes.DOCUMENT_RECENT,
      icon: mdiClockOutline,
      color: '#ffc107'
    },
    {
      title: t('IDS_WP_PROJECT_DOCUMENT'),
      url: Routes.DOCUMENT_PROJECT,
      icon: mdiFileDocumentBoxOutline,
      color: '#4caf50',
      extract: true
    },
    {
      title: t('IDS_WP_SHARED'),
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
      title: t('IDS_WP_SHARE_WITH_ME'),
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
      title: t('IDS_WP_MY_DOCUMENT'),
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
      title: t('IDS_WP_GOOGLE_DRIVE'),
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
      title: t('IDS_WP_TRASH'),
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
  return (
    <LeftSetting isMemory={true} colors={props.colors} profile={props?.profile?.group_active} title={t('IDS_WP_DOCUMENT_MANAGE')} listMenu={listMenu} />
  );
};

export default connect(
  state => ({
    breadCrumbs: state.system.breadCrumbs,
    profile: state.system.profile,
    colors: state.setting.colors
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
