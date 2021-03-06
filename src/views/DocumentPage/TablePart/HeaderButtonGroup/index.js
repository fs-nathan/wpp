import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mdiMagnify,
  mdiDownload,
  mdiTrashCan,
  // mdiRepeatOff,
  mdiArrowDecision,
  mdiLogout,
  mdiRefresh
} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import { actionSignoutGoogleDrive } from '../ContentDocumentPage/googleDriveApi';
import CustomHeaderButton from '../../../../components/CustomHeaderButton';
import { Routes } from '../../../../constants/routes';
import AlertModal from '../../../../components/AlertModal';
import {
  actionDeletePermantly,
  actionDeleteFolder,
  actionDeleteFile,
  actionFetchListTrash,
  actionFetchListMyDocument,
  resetListSelectDocument,
  actionFetchListRecent,
  actionFetchListProject,
  actionFetchListDocumentShare,
  actionFetchListDocumentFromMe,
  toggleSingoutGoogle,
  actionFetchListGoogleDocument,
  actionDownloadFile
} from '../../../../actions/documents';
import MoveDocumentModal from '../DocumentComponent/MoveDocumentModal';

const HeaderButtonGroup = props => {
  const { pathname } = props.location;
  const {
    selectedDocument,
    isShowBtnSignoutGoogle,
    isFetching,
    currentFolder
  } = props;
  const [alert, setAlert] = useState(false);
  const [move, setMove] = useState(false);
  const { t } = useTranslation();

  const handleDownloadFile = async () => {
    if (isEmpty(selectedDocument)) return;
    try {
      let listAction = [];
      selectedDocument.forEach(item => {
        listAction.push(actionDownloadFile(item));
      });
      await Promise.all(listAction);
      props.resetListSelectDocument();
    } catch (error) {}
  };

  const handleDeleteFile = async () => {
    if (isEmpty(selectedDocument) || isFetching) return;
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
        // if (!isEmpty(listFileId))
        //   listAction.push(actionDeleteFileTrash({ file_id: listFileId }));
        // if (!isEmpty(listFolderId))
        //   listAction.push(actionDeleteFolderTrash({ folder_id: listFolderId }));
        await actionDeletePermantly({
          file_id: !isEmpty(listFileId) ? listFileId : [],
          folder_id: !isEmpty(listFolderId) ? listFolderId : []
        });
        let params = {};
        if (!isEmpty(currentFolder)) {
          params.folder_id = currentFolder.id;
        }
        props.actionFetchListTrash(params, true);
      } else {
        if (!isEmpty(listFileId))
          listAction.push(actionDeleteFile({ file_id: listFileId }));
        if (!isEmpty(listFolderId))
          listAction.push(actionDeleteFolder({ folder_id: listFolderId }));
        await Promise.all(listAction);
        if (pathname === Routes.DOCUMENT_ME) {
          let params = {};
          if (!isEmpty(currentFolder)) {
            params.folder_id = currentFolder.id;
          }
          props.actionFetchListMyDocument(params, true);
        }
      }
      props.resetListSelectDocument();
    } catch (error) {}
  };

  // const isDisableBtnDelete = () => {
  //   let numFolder = 0;
  //   let result = false;
  //   if (isEmpty(selectedDocument)) return true;
  //   if (pathname !== Routes.DOCUMENT_TRASH) {
  //     selectedDocument.forEach(el => {
  //       if (el.type === 'folder') {
  //         numFolder += 1;
  //       }
  //       if (numFolder === 2) {
  //         result = true;
  //         return;
  //       }
  //     });
  //   }
  //   return result;
  // };

  const isDisableBtnDownload = () => {
    let result = false;
    selectedDocument.forEach(el => {
      if (el.type === 'folder') {
        result = true;
        return;
      }
    });
    return result;
  };
  const closeModal = () => setMove(false);
  const handleMoveDoc = () => {
    const { breadCrumbs } = props;
    if (isFetching) return;
    if (isEmpty(breadCrumbs)) {
      props.actionFetchListMyDocument({}, true);
    } else {
      props.actionFetchListMyDocument(
        { folder_id: breadCrumbs[breadCrumbs.length - 1].id },
        true
      );
    }
  };
  const listAction = [
    {
      text: t('IDS_WP_SEARCH'),
      icon: mdiMagnify,
      type: 'search',
      isShow: pathname !== Routes.DOCUMENT_GOOGLE_DRIVE
    },
    // {
    //   text: 'H???y chia s???',
    //   icon: mdiRepeatOff,
    //   action: () => {},
    //   disabled: true,
    //   isShow:
    //     pathname === Routes.DOCUMENT_SHARE ||
    //     pathname === Routes.DOCUMENT_SHARE_ME
    // },
    {
      text: t('IDS_WP_UPDATE'),
      icon: mdiRefresh,
      action: () => {
        if (isFetching) return;
        let params = {};
        if (!isEmpty(currentFolder)) {
          params.folderId = currentFolder.id;
        }
        props.actionFetchListGoogleDocument(params, true);
      },
      isShow:
        pathname === Routes.DOCUMENT_GOOGLE_DRIVE && isShowBtnSignoutGoogle
    },
    {
      text: t('IDS_WP_LOGOUT'),
      icon: mdiLogout,
      action: () => {
        actionSignoutGoogleDrive(() => {
          props.toggleSingoutGoogle(false);
        });
      },
      isShow:
        pathname === Routes.DOCUMENT_GOOGLE_DRIVE && isShowBtnSignoutGoogle
    },
    {
      text: t('IDS_WP_DOWNLOAD_DOWN'),
      icon: mdiDownload,
      action: handleDownloadFile,
      disabled: isEmpty(selectedDocument) || isDisableBtnDownload(),
      isShow:
        pathname !== Routes.DOCUMENT_GOOGLE_DRIVE &&
        pathname !== Routes.DOCUMENT_PROJECT
    },
    {
      text: t('IDS_WP_MOVE'),
      icon: mdiArrowDecision,
      action: () => setMove(true),
      disabled: isEmpty(selectedDocument),
      isShow: pathname === Routes.DOCUMENT_ME
    },
    {
      text:
        pathname === Routes.DOCUMENT_TRASH
          ? t('IDS_WP_DELETE_PERMANENTLY')
          : t('IDS_WP_DELETE'),
      icon: mdiTrashCan,
      action: () => setAlert(true),
      disabled: isEmpty(selectedDocument),
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
        content={t('IDS_WP_ALERT_CONTENT')}
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
    selectedDocument: state.documents.selectedDocument,
    isShowBtnSignoutGoogle: state.documents.isShowBtnSignoutGoogle,
    isFetching: state.documents.isFetching,
    currentFolder: state.documents.currentFolder,
    breadCrumbs: state.system.breadCrumbs
  }),
  {
    actionFetchListTrash,
    actionFetchListMyDocument,
    resetListSelectDocument,
    actionFetchListRecent,
    actionFetchListProject,
    actionFetchListDocumentShare,
    actionFetchListDocumentFromMe,
    toggleSingoutGoogle,
    actionFetchListGoogleDocument
  }
)(withRouter(HeaderButtonGroup));
