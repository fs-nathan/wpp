import React from 'react';
import { withRouter } from 'react-router-dom';
import { mdiMagnify, mdiDownload, mdiTrashCan, mdiRepeatOff } from '@mdi/js';
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
      text: 'Tải xuống',
      icon: mdiDownload,
      action: () => {},
      disabled: true,
      isShow: true
    },
    {
      text: 'Xóa',
      icon: mdiTrashCan,
      action: () => {},
      disabled: true,
      isShow: true
    },
    {
      text: 'Tìm kiếm',
      icon: mdiMagnify,
      action: () => {},
      isShow: true
    }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default withRouter(HeaderButtonGroup);
