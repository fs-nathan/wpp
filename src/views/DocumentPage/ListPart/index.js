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
  { title: 'Gần đây', url: Routes.DOCUMENT_RECENT, icon: mdiClockOutline },
  {
    title: 'Tài liệu dự án',
    url: Routes.DOCUMENT_PROJECT,
    icon: mdiFileDocumentBoxOutline
  },
  {
    title: 'Đã chia sẻ',
    url: Routes.DOCUMENT_SHARE,
    icon: mdiFileMoveOutline
  },
  {
    title: 'Được chia sẻ với tôi',
    url: Routes.DOCUMENT_SHARE_ME,
    icon: mdiFileUndoOutline
  },
  {
    title: 'Tài liệu của tôi',
    url: Routes.DOCUMENT_ME,
    icon: mdiFolderOpenOutline
  },
  {
    title: 'Google Drive',
    url: Routes.DOCUMENT_GOOGLE_DRIVE,
    icon: mdiGoogleDrive
  },
  {
    title: 'Thùng rác',
    url: Routes.DOCUMENT_TRASH,
    icon: mdiTrashCanOutline
  }
];

const ListPart = () => {
  return <LeftSetting title="Quản lý tài liệu" listMenu={listMenu} />;
};

export default ListPart;
