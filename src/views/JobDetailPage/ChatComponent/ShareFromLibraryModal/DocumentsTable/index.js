import { Avatar, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { mdiContentCopy, mdiDownloadOutline, mdiSwapVertical, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { actionDeleteFile, actionDeleteFolder, actionFetchListDocumentShare, actionFetchListGoogleDocument, actionFetchListMyDocument, actionSelectedFolder, resetListSelectDocument } from 'actions/documents';
import { actionChangeBreadCrumbs, openDocumentDetail } from 'actions/system/system';
import AlertModal from 'components/AlertModal';
import { FileType } from 'components/FileType';
import MoreAction from 'components/MoreAction/MoreAction';
import { isEmpty } from 'helpers/utils/isEmpty';
import { findIndex, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_ITEM } from '../MenuList';
import './styles.scss';
import { StyledTableBodyCell } from 'views/DocumentPage/TablePart/DocumentComponent/TableCommon';

function DocumentsTable({
  listData, setListData,
  selectedFiles, setSelectedFiles,
  isSharedWithMe
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation()

  const currentFolder = useSelector(state => state.documents.currentFolder);
  const breadCrumbs = useSelector(state => state.system.breadCrumbs);

  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_ITEM);
  const [alert, setAlert] = useState(false);
  const [isSorted, setSorted] = useState(false);
  const [fileSelectAction, setFileSelectAction] = useState(null);

  const fetchDocumentAction = isSharedWithMe ? actionFetchListDocumentShare : actionFetchListMyDocument;
  const getListMyDocument = (params = {}, quite = false) => {
    let temp = {};
    if (!isEmpty(currentFolder)) {
      params.folder_id = currentFolder.id;
    }
    dispatch(fetchDocumentAction({ ...temp, ...params }, quite));
  };

  const handleActionDeleteFile = async () => {
    try {
      if (fileSelectAction.type === 'folder') {
        await actionDeleteFolder({ folder_id: [fileSelectAction.id] });
      } else {
        await actionDeleteFile({ file_id: [fileSelectAction.id] });
      }
      getListMyDocument();
      dispatch(resetListSelectDocument());
    } catch (error) { }
  };

  function selectFile(file) {
    return () => {
      const fileId = findIndex(selectedFiles, ['id', file.id])
      if (fileId === -1)
        selectedFiles.push(file);
      else
        selectedFiles.splice(fileId, 1);
      setSelectedFiles([...selectedFiles])
    }
  }

  function selectAll() {
    const isSelectedAll = listData.every(({ id, type }) => type === 'folder' || findIndex(selectedFiles, ['id', id]) !== -1);
    const allFiles = listData.filter(({ type }) => type !== 'folder')
    if (!isSelectedAll)
      selectedFiles.push(...allFiles);
    else {
      for (let index = 0; index < listData.length; index++) {
        const { id, type } = listData[index];
        if (type !== 'folder') {
          const memberId = findIndex(selectedFiles, ['id', id]);
          selectedFiles.splice(memberId, 1);
        }
      }
    }
    setSelectedFiles(uniq([...selectedFiles]));
  }
  const moreAction = [
    { icon: mdiContentCopy, text: t('IDS_WP_COPY_LINK'), type: 'copy' },
    {
      icon: mdiDownloadOutline,
      text: t('IDS_WP_DOWNLOAD_DOWN'),
      type: 'download'
    },
  ];
  if (selectedMenu.key === 'myDocument') {
    moreAction.push({
      icon: mdiTrashCanOutline,
      text: t('IDS_WP_DELETE'),
      action: item => {
        setAlert(true);
        setFileSelectAction(item);
      }
    })
  }

  const moreActionFolder = moreAction.filter(
    el => el.type !== 'download' && el.type !== 'copy'
  );
  const handleUpdateDataLocal = (itemId, newName) => {
    const index = findIndex(listData, { id: itemId });
    const dataTemp = [...listData];
    const itemUpdate = { ...listData[index], name: newName };
    dataTemp.splice(index, 1, itemUpdate);
    setListData(dataTemp);
  };

  const handleClickItem = item => {
    if (item.type === 'folder') {
      if (item.isGoogleDocument)
        dispatch(actionFetchListGoogleDocument({ folderId: item.id }, true))
      else
        dispatch(fetchDocumentAction({ folder_id: item.id }, true));
      dispatch(actionSelectedFolder(item));
      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => {
            dispatch(actionSelectedFolder({}));
            getListMyDocument({}, true);
          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            dispatch(actionSelectedFolder(item));
            dispatch(fetchDocumentAction({ folder_id: item.id }, true));
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            dispatch(actionSelectedFolder(item));
            dispatch(fetchDocumentAction({ folder_id: item.id }, true));
          }
        });
      }
      dispatch(actionChangeBreadCrumbs(newBreadCrumbs));
    } else {
      dispatch(openDocumentDetail(item));
    }
  };

  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    const isAll = listData.filter(({ type }) => type !== 'folder').length > 0
      && listData.every(({ id, type }) => type === 'folder'
        || findIndex(selectedFiles, ['id', id]) !== -1)
    setIsSelectedAll(isAll);
  }, [listData, selectedFiles, setIsSelectedAll]);

  // console.log('DocumentsTable')

  return (<Table className="ShareFromLibraryModal--table-container" >
    <TableHead className="ShareFromLibraryModal--table-header" >
      <TableRow className="ShareFromLibraryModal--TableRow" >
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" >
          <Checkbox color="primary"
            checked={isSelectedAll}
            onClick={selectAll}
          />
        </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" />
        <TableCell className="ShareFromLibraryModal--TableCell" >
          {t('LABEL_CHAT_TASK_TEN')}
          <IconButton size="small" onClick={() => setSorted(!isSorted)}>
            <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
          </IconButton>
        </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="120px" align="center" >{t('LABEL_CHAT_TASK_CHU_SO_HUU')}</TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="150px" >{t('LABEL_CHAT_TASK_KICH_THUOC_TEP')}</TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" />
      </TableRow>
    </TableHead>
    <TableBody className="ShareFromLibraryModal--table-body" >
      {listData.map(item => (
        <TableRow key={item.id} className="ShareFromLibraryModal--table-item" >
          <StyledTableBodyCell width="50px" align="center">
            {item.type !== 'folder' && <Checkbox color="primary"
              checked={findIndex(selectedFiles, ['id', item.id]) !== -1}
              onClick={selectFile(item)} />}
          </StyledTableBodyCell>
          <StyledTableBodyCell width="50px" align="center" onClick={() => handleClickItem(item)}>
            <Avatar
              src={FileType(item.type)}
              className="full-avatar"
            />
          </StyledTableBodyCell>
          <StyledTableBodyCell className="DocumentsTable--itemName" onClick={() => handleClickItem(item)}>{item.name}</StyledTableBodyCell>
          <StyledTableBodyCell width="120px" align="center">
            {item.owner && item.owner.avatar && (
              <Avatar
                title={item.owner.name}
                src={item.owner.avatar}
                className="owner-avatar"
              />
            )}
          </StyledTableBodyCell>
          <StyledTableBodyCell width="150px">
            {item.size || '-'}
          </StyledTableBodyCell>
          {item.type !== 'folder' ? (
            <MoreAction
              actionList={moreAction}
              item={item}
              handleFetData={() => {
                getListMyDocument({}, true);
              }}
              handleUpdateDataLocal={handleUpdateDataLocal}
            />
          ) : (
              <MoreAction
                actionList={moreActionFolder}
                item={item}
                handleFetData={() => {
                  getListMyDocument({}, true);
                }}
                handleUpdateDataLocal={handleUpdateDataLocal}
              />
            )}
        </TableRow>
      ))}
    </TableBody>
    <AlertModal
      open={alert}
      setOpen={setAlert}
      content={t('IDS_WP_ALERT_CONTENT')}
      onConfirm={() => handleActionDeleteFile()}
    />
  </Table>)
}

export default DocumentsTable