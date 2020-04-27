// import { Scrollbars } from 'react-custom-scrollbars';
import { Avatar, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { mdiChevronRight, mdiClose, mdiContentCopy, mdiDownloadOutline, mdiMagnify, mdiSwapVertical, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { chatForwardFile } from 'actions/chat/chat';
import { actionDeleteFile, actionDeleteFolder, actionFetchListDocumentFromMe, actionFetchListDocumentShare, actionFetchListGoogleDocument, actionFetchListMyDocument, actionFetchListProject, actionSelectedFolder, resetListSelectDocument } from 'actions/documents';
import { actionChangeBreadCrumbs, openDocumentDetail } from 'actions/system/system';
import AlertModal from 'components/AlertModal';
import { FileType } from 'components/FileType';
import MoreAction from 'components/MoreAction/MoreAction';
import SearchInput from 'components/SearchInput';
import { isEmpty } from 'helpers/utils/isEmpty';
import { findIndex, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import AddNewButton from './AddNewButton';
import MenuList, { DEFAULT_ITEM } from './MenuList';
import './styles.scss';

const ShareFromLibraryModal = ({ open, setOpen }) => {
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

  const [listData, setListData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_ITEM);
  const [selectedFilesIds, setSelectedFilesIds] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [isSorted, setSorted] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [fileSelectAction, setFileSelectAction] = useState(null);

  useEffect(() => {
    dispatch(actionFetchListMyDocument());
  }, [dispatch]);

  useEffect(() => {
    if (searchKey) {
      const filtered = listData.filter(({ name }) => name.indexOf(searchKey) !== -1)
      setListData(filtered)
    }
    // eslint-disable-next-line
  }, [searchKey]);

  useEffect(() => {
    const sorted = listData.reverse()
    setListData(sorted)
    // eslint-disable-next-line
  }, [isSorted]);

  useEffect(() => {
    const key = selectedMenu.key;
    if (key === 'projectDocument') {
      setListData(listProject);
    } else if (key === 'sharedWithMe') {
      setListData(listDocumentShareToMe);
    } else if (key === 'sharedFromMe') {
      setListData(listDocumentFromMe);
    } else if (key === 'myDocument') {
      setListData(listMyDocument);
    } else if (key === 'googleDrive') {
      setListData(listGoogleDocument);
    }
  }, [listDocumentFromMe, listDocumentShareToMe, listGoogleDocument, listMyDocument, listProject, selectedMenu]);

  const handleOnChangeMenu = menu => {
    setSelectedMenu(menu);
    const key = menu.key;
    if (key === 'projectDocument') {
      dispatch(actionFetchListProject());
    } else if (key === 'sharedWithMe') {
      dispatch(actionFetchListDocumentShare());
    } else if (key === 'sharedFromMe') {
      dispatch(actionFetchListDocumentFromMe());
    } else if (key === 'myDocument') {
      dispatch(actionFetchListMyDocument());
    } else if (key === 'googleDrive') {
      dispatch(actionFetchListGoogleDocument());
    }
  };

  function onClickConfirm() {
    setOpen(false)
    dispatch(chatForwardFile(taskId, selectedFilesIds))
    setSelectedFilesIds([])
  }

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

  function handleClickLink(idx, id) {
    return function onClickBreadCrumb() {
      // do not anything if click ending item
      if (idx >= breadCrumbs.length - 1) return false;
      if (idx === 0) {
        dispatch(actionChangeBreadCrumbs([]));
        dispatch(actionFetchListMyDocument());
      } else {
        let newList = [...breadCrumbs];
        newList.length = idx + 1;
        dispatch(actionChangeBreadCrumbs(newList));
        dispatch(actionFetchListMyDocument({ folder_id: id }, true));
      }
    }
  }

  return (
    <JobDetailModalWrap
      open={open}
      setOpen={setOpen}
      fullWidth
      title="Lưu trữ tài liệu"
      className="ShareFromLibraryModal"
      cancleRender={() => "Thoát"}
      onConfirm={onClickConfirm}
    >
      <div className="ShareFromLibraryModal--container" >
        <div className="ShareFromLibraryModal--left" >
          <div className="ShareFromLibraryModal--titleLeft">
            Quản lý tài liệu
          </div>
          <MenuList className="ShareFromLibraryModal--MenuList" onChangeMenu={handleOnChangeMenu} />
        </div>
        <div className="ShareFromLibraryModal--right" >
          {
            !isSearching ?
              <div className="ShareFromLibraryModal--right-header-content" >
                <div className="ShareFromLibraryModal--content-title" >
                  <div className="ShareFromLibraryModal--lb-title" >
                    <Icon
                      className="ShareFromLibraryModal--iconTitle"
                      path={selectedMenu.icon}
                      size={1.4}
                      color={selectedMenu.color}
                    />
                    {selectedMenu.title}
                  </div>
                  <div className="ShareFromLibraryModal--bread-crumbs-list" >
                    <Breadcrumbs separator={<Icon path={mdiChevronRight} size={1} color={'#777'} />} aria-label="breadcrumb">
                      {(selectedMenu.key === 'myDocument') && breadCrumbs.map(({ name, id }, index) =>
                        <div
                          className="ShareFromLibraryModal--bread-crumbs-item"
                          key={id}
                          onClick={handleClickLink(index, id)}>
                          {name}
                        </div>
                      )}
                    </Breadcrumbs>
                  </div>
                </div>
                <div className="ShareFromLibraryModal--search-box" onClick={() => setSearching(!isSearching)} >
                  <Icon path={mdiMagnify} size={1} color='rgba(0,0,0,.3)' />
                </div>
                <AddNewButton selectedMenu={selectedMenu} />
              </div>
              :
              <div className="ShareFromLibraryModal--searching" >
                <SearchInput
                  value={searchKey}
                  onChange={evt => setSearchKey(evt.target.value)}
                  className="ShareFromLibraryModal--SearchInput"
                  placeholder="Nhập tên tài liệu và ấn Enter để xem kết quả tìm kiếm" />
                <IconButton className="ShareFromLibraryModal--iconButton" onClick={() => setSearching(false)}>
                  <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                </IconButton>
              </div>
          }
          <div className="ShareFromLibraryModal--right-table-content" >
            {/* <Scrollbars autoHide autoHideTimeout={500}> */}
            <Table className="ShareFromLibraryModal--table-container" >
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
            </Table>
            {
              (listData.length === 0 && searchKey) &&
              <div className="ShareFromLibraryModal--notFound">
                Không tìm thấy "<b>{searchKey}</b>" trong danh sách tài liệu của bạn
                  <div>
                  Đề xuất:
                  </div>
                <ul>
                  <li>
                    Kiểm tra lại chính tả từ khoá đã nhập
                    </li>
                  <li>
                    Hãy thử những từ khoá khác
                    </li>
                  <li>
                    Hãy bớt từ khoá
                    </li>
                </ul>
              </div>
            }
            {/* </Scrollbars> */}
            <AlertModal
              open={alert}
              setOpen={setAlert}
              content={t('IDS_WP_ALERT_CONTENT')}
              onConfirm={() => handleActionDeleteFile()}
            />
          </div>
        </div>
      </div>
    </JobDetailModalWrap>
  );
};

export default ShareFromLibraryModal;
