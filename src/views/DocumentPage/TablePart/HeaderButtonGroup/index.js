import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mdiMagnify,
  mdiDownload,
  mdiTrashCan,
  mdiRepeatOff,
  mdiArrowDecision
} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { Routes } from '../../../../constants/routes';
import AlertModal from '../../../../components/AlertModal';
import {
  actionDownloadDocument,
  actionDeleteFileTrash,
  actionDeleteFolderTrash,
  actionDeleteFolder,
  actionDeleteFile,
  actionFetchListTrash,
  actionFetchListMyDocument,
  resetListSelectDocument,
  actionFetchListRecent,
  actionFetchListProject,
  actionFetchListDocumentShare,
  actionFetchListDocumentFromMe
} from '../../../../actions/documents';
import MoveDocumentModal from '../DocumentComponent/MoveDocumentModal';

const HeaderButtonGroup = props => {
  const { pathname } = props.location;
  const { selectedDocument } = props;
  const [alert, setAlert] = useState(false);
  const [move, setMove] = useState(false);
  const { t } = useTranslation();

  const handleDownloadFile = async () => {
    if (isEmpty(selectedDocument)) return;
    try {
      const selectedItem = selectedDocument[0] || {};
      if (selectedItem.url) {
        actionDownloadDocument(selectedItem.url);
      }
    } catch (error) {}
  };

  const handleDeleteFile = async () => {
    if (isEmpty(selectedDocument)) return;
    let listFileId = [];
    let listFolderId = [];
    let listAction = [];
    selectedDocument.forEach(element => {
      if (element.type === 'folder' || pathname === Routes.DOCUMENT_PROJECT) {
        listFolderId.push(element.id);
      } else {
        listFileId.push(element.id);
      }
    });

    try {
      if (pathname === Routes.DOCUMENT_TRASH) {
        if (!isEmpty(listFileId))
          listAction.push(actionDeleteFileTrash({ file_id: listFileId }));
        if (!isEmpty(listFolderId))
          listAction.push(actionDeleteFolderTrash({ folder_id: listFolderId }));
        await Promise.all(listAction);
        props.actionFetchListTrash({}, true);
      } else {
        if (!isEmpty(listFileId))
          listAction.push(actionDeleteFile({ file_id: listFileId }));
        if (!isEmpty(listFolderId))
          listAction.push(actionDeleteFolder({ folder_id: listFolderId[0] }));
        await Promise.all(listAction);
        if (pathname === Routes.DOCUMENT_ME) {
          props.actionFetchListMyDocument({}, true);
        }
      }
      props.resetListSelectDocument();
    } catch (error) {}
  };

  const isDisableBtnDelete = () => {
    let numFolder = 0;
    let result = false;
    if (isEmpty(selectedDocument)) return true;
    if (pathname !== Routes.DOCUMENT_TRASH) {
      selectedDocument.forEach(el => {
        if (el.type === 'folder') {
          numFolder += 1;
        }
        if (numFolder === 2) {
          result = true;
          return;
        }
      });
    }
    return result;
  };
  const closeModal = () => setMove(false);
  const handleMoveDoc = () => {
    if (pathname === Routes.DOCUMENT_RECENT) {
      props.actionFetchListRecent({}, true);
    } else if (pathname === Routes.DOCUMENT_PROJECT) {
      props.actionFetchListProject({}, true);
    } else if (pathname === Routes.DOCUMENT_SHARE) {
      props.actionFetchListDocumentShare({}, true);
    } else if (pathname === Routes.DOCUMENT_SHARE_ME) {
      props.actionFetchListDocumentFromMe({}, true);
    } else if (pathname === Routes.DOCUMENT_ME) {
      props.actionFetchListMyDocument({}, true);
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
      text: 'Di chuyển',
      icon: mdiArrowDecision,
      action: () => setMove(true),
      disabled: isEmpty(selectedDocument),
      isShow:
        pathname !== Routes.DOCUMENT_TRASH &&
        pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    {
      text: pathname === Routes.DOCUMENT_TRASH ? 'Xóa vĩnh viễn' : 'Xóa',
      icon: mdiTrashCan,
      action: () => setAlert(true),
      disabled: isDisableBtnDelete(),
      isShow:
        pathname === Routes.DOCUMENT_ME || pathname === Routes.DOCUMENT_TRASH
    }
  ];
  return (
    <Fragment>
      <CustomHeaderButton listAction={listAction} />
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={handleDeleteFile}
      />
      {move && (
        <MoveDocumentModal
          onClose={closeModal}
          type="header"
          onOk={handleMoveDoc}
        />
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    actionFetchListTrash,
    actionFetchListMyDocument,
    resetListSelectDocument,
    actionFetchListRecent,
    actionFetchListProject,
    actionFetchListDocumentShare,
    actionFetchListDocumentFromMe
  }
)(withRouter(HeaderButtonGroup));
