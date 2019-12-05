import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  mdiMagnify,
  mdiDownload,
  mdiTrashCan,
  mdiRepeatOff,
  mdiBackupRestore
} from '@mdi/js';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { Routes } from '../../../../constants/routes';

const HeaderButtonGroup = props => {
  const { pathname } = props.location;
  const listAction = [
    {
      text: 'Hủy chia sẻ',
      icon: mdiRepeatOff,
      action: () => {},
      disabled: true,
      isShow:
        pathname === Routes.DOCUMENT_SHARE ||
        pathname === Routes.DOCUMENT_SHARE_ME
    },
    {
      text: 'Khôi phục',
      icon: mdiBackupRestore,
      action: () => {},
      disabled: true,
      isShow: pathname === Routes.DOCUMENT_TRASH
    },
    {
      text: 'Tải xuống',
      icon: mdiDownload,
      action: () => {},
      disabled: true,
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    {
      text: pathname === Routes.DOCUMENT_TRASH ? 'Xóa vĩnh viễn' : 'Xóa',
      icon: mdiTrashCan,
      action: () => {},
      disabled: true,
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    {
      text: 'Tìm kiếm',
      icon: mdiMagnify,
      action: () => {},
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default withRouter(HeaderButtonGroup);
