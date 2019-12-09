import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mdiMagnify,
  mdiDownload,
  mdiTrashCan,
  mdiRepeatOff,
  mdiBackupRestore
} from '@mdi/js';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { Routes } from '../../../../constants/routes';

const HeaderButtonGroup = props => {
  const { pathname } = props.location;
  const { selectedDocument } = props;
  const listAction = [
    {
      text: 'Tìm kiếm',
      icon: mdiMagnify,
      type: 'search',
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
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
      disabled: isEmpty(selectedDocument),
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    {
      text: pathname === Routes.DOCUMENT_TRASH ? 'Xóa vĩnh viễn' : 'Xóa',
      icon: mdiTrashCan,
      action: () => {},
      disabled: isEmpty(selectedDocument),
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    }
  ];
  return <CustomHeaderButton listAction={listAction} />;
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {}
)(withRouter(HeaderButtonGroup));
