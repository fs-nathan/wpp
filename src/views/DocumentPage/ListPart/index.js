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
import { Routes } from '../../../constants/routes';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

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
    color: '#f44336'
  },
  {
    title: 'Được chia sẻ với tôi',
    url: Routes.DOCUMENT_SHARE_ME,
    icon: mdiFileUndoOutline,
    color: '#607d8b'
  },
  {
    title: 'Tài liệu của tôi',
    url: Routes.DOCUMENT_ME,
    icon: mdiFolderOpenOutline,
    color: '#ff9800'
  },
  {
    title: 'Google Drive',
    url: Routes.DOCUMENT_GOOGLE_DRIVE,
    icon: mdiGoogleDrive,
    color: '#2196f3'
  },
  {
    title: 'Thùng rác',
    url: Routes.DOCUMENT_TRASH,
    icon: mdiTrashCanOutline,
    color: '#777'
  }
];

const ListPart = () => {
  return <LeftSetting title="Quản lý tài liệu" listMenu={listMenu} />;
};

export default ListPart;
