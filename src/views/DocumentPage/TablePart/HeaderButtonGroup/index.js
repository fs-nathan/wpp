import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mdiMagnify,
  mdiDownload,
  mdiTrashCan,
  mdiRepeatOff,
  mdiBackupRestore
} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { Routes } from '../../../../constants/routes';
import AlertModal from '../../../../components/AlertModal';
import {
  actionDownloadDocument,
  actionDeleteForever,
  actionFetchListTrash
} from '../../../../actions/documents';

const HeaderButtonGroup = props => {
  const { pathname } = props.location;
  const { selectedDocument } = props;
  const [alert, setAlert] = useState(false);
  const { t } = useTranslation();

  const handleDownloadFile = async () => {
    if (isEmpty(selectedDocument)) return;
    try {
      const selectedItem = selectedDocument[0] || {};
      if (selectedItem.url) {
        window.open(selectedItem.url, '_blank');
        await actionDownloadDocument(selectedItem.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = async () => {
    if (isEmpty(selectedDocument)) return;
    try {
      if (pathname === Routes.DOCUMENT_TRASH) {
        let selectedIds = selectedDocument.map(item => item.id);
        await actionDeleteForever(selectedIds);
        props.actionFetchListTrash({}, true);
      } else {
        // call api delete document
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      disabled: isEmpty(selectedDocument),
      isShow: pathname === Routes.DOCUMENT_TRASH
    },
    {
      text: 'Tải xuống',
      icon: mdiDownload,
      action: handleDownloadFile,
      disabled:
        isEmpty(selectedDocument) ||
        selectedDocument.length !== 1 ||
        selectedDocument[0].type === 'folder',
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    {
      text: pathname === Routes.DOCUMENT_TRASH ? 'Xóa vĩnh viễn' : 'Xóa',
      icon: mdiTrashCan,
      action: () => setAlert(true),
      disabled: isEmpty(selectedDocument),
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    }
  ];
  console.log(selectedDocument);
  return (
    <Fragment>
      <CustomHeaderButton listAction={listAction} />
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={handleDeleteFile}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  { actionFetchListTrash }
)(withRouter(HeaderButtonGroup));
