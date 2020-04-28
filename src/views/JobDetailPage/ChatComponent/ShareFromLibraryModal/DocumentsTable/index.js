import { Avatar, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { mdiContentCopy, mdiDownloadOutline, mdiSwapVertical, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { actionDeleteFile, actionDeleteFolder, actionFetchListMyDocument, actionSelectedFolder, resetListSelectDocument } from 'actions/documents';
import { actionChangeBreadCrumbs, openDocumentDetail } from 'actions/system/system';
import AlertModal from 'components/AlertModal';
import { FileType } from 'components/FileType';
import MoreAction from 'components/MoreAction/MoreAction';
import { isEmpty } from 'helpers/utils/isEmpty';
import { findIndex, uniq } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_ITEM } from '../MenuList';
import './styles.scss';

function DocumentsTable({ listData, setListData, selectedFilesIds, setSelectedFilesIds }) {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const listProject = useSelector(state => state.documents.listProject);
  const listDocumentFromMe = useSelector(state => state.documents.listDocumentFromMe);
  const listDocumentShareToMe = useSelector(state => state.documents.listDocumentShareToMe);
  const listMyDocument = useSelector(state => state.documents.listMyDocument);
  const listGoogleDocument = useSelector(state => state.documents.listGoogleDocument);
  const currentFolder = useSelector(state => state.documents.currentFolder);
  const breadCrumbs = useSelector(state => state.system.breadCrumbs);

  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_ITEM);
  const [alert, setAlert] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [isSorted, setSorted] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [fileSelectAction, setFileSelectAction] = useState(null);

  const getListMyDocument = (params = {}, quite = false) => {
    let temp = {};
    if (!isEmpty(currentFolder)) {
      params.folder_id = currentFolder.id;
    }
    dispatch(actionFetchListMyDocument({ ...temp, ...params }, quite));
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

  function selectFile(id) {
    return () => {
      const memberId = selectedFilesIds.indexOf(id)
      if (memberId === -1)
        selectedFilesIds.push(id);
      else
        selectedFilesIds.splice(memberId, 1);
      setSelectedFilesIds([...selectedFilesIds])
    }
  }

  function selectAll() {
    const isSelectedAll = listData.every(({ id }) => selectedFilesIds.indexOf(id) !== -1);
    const allIds = listData.map(({ id, type }) => id && type !== 'folder')
    if (!isSelectedAll)
      selectedFilesIds.push(...allIds);
    else {
      for (let index = 0; index < listData.length; index++) {
        const { id, type } = listData[index];
        if (type !== 'folder') {
          const memberId = selectedFilesIds.indexOf(id);
          selectedFilesIds.splice(memberId, 1);
        }
      }
    }
    setSelectedFilesIds(uniq([...selectedFilesIds]));
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
      dispatch(actionFetchListMyDocument({ folder_id: item.id }, true));
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
            dispatch(actionFetchListMyDocument({ folder_id: item.id }, true));
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            dispatch(actionSelectedFolder(item));
            dispatch(actionFetchListMyDocument({ folder_id: item.id }, true));
          }
        });
      }
      dispatch(actionChangeBreadCrumbs(newBreadCrumbs));
    } else {
      dispatch(openDocumentDetail(item));
    }
  };

  return (<Table className="ShareFromLibraryModal--table-container" >
    <TableHead className="ShareFromLibraryModal--table-header" >
      <TableRow className="ShareFromLibraryModal--TableRow" >
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" >
          <Checkbox color="primary"
            checked={listData.length > 0 && listData.every(({ id, type }) => type === 'folder' || selectedFilesIds.indexOf(id) !== -1)}
            onClick={selectAll}
          />
        </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" />
        <TableCell className="ShareFromLibraryModal--TableCell" >
          {t('Tên')}
          <IconButton size="small" onClick={() => setSorted(!isSorted)}>
            <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
          </IconButton>
        </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="120px" align="center" >
          Chủ sở hữu
    </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="150px" >
          Kích thước tệp
    </TableCell>
        <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" />
      </TableRow>
    </TableHead>
    <TableBody className="ShareFromLibraryModal--table-body" >
      {listData.map(item => (
        <TableRow key={item.id} className="ShareFromLibraryModal--table-item" >
          <TableCell width="50px" align="center">
            {item.type !== 'folder' && <Checkbox color="primary"
              checked={selectedFilesIds.indexOf(item.id) !== -1}
              onClick={selectFile(item.id)} />}
          </TableCell>
          <TableCell width="50px" align="center" onClick={() => handleClickItem(item)}>
            <Avatar
              src={FileType(item.type)}
              className="full-avatar"
            />
          </TableCell>
          <TableCell onClick={() => handleClickItem(item)}>{item.name}</TableCell>
          <TableCell width="120px" align="center">
            {item.owner && item.owner.avatar && (
              <Avatar
                title={item.owner.name}
                src={item.owner.avatar}
                className="owner-avatar"
              />
            )}
          </TableCell>
          <TableCell width="150px">
            {item.size || '-'}
          </TableCell>
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