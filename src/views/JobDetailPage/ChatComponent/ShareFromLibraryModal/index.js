import { Button, IconButton } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { mdiChevronRight, mdiClose, mdiLogout, mdiMagnify, mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import { chatForwardFile } from 'actions/chat/chat';
import { actionFetchListDocumentFromMe, actionFetchListDocumentShare, actionFetchListGoogleDocument, actionFetchListMyDocument, actionFetchListProject, toggleSingoutGoogle } from 'actions/documents';
import { actionChangeBreadCrumbs } from 'actions/system/system';
import SearchInput from 'components/SearchInput';
import { transformGoogleDriverData } from 'helpers/jobDetail/stringHelper';
import { isEmpty } from 'helpers/utils/isEmpty';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actionSignoutGoogleDrive } from 'views/DocumentPage/TablePart/ContentDocumentPage/googleDriveApi';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import AddNewButton from './AddNewButton';
import DocumentsTable from './DocumentsTable';
import GoogleDriverDocuments from './GoogleDriverDocuments';
import MenuList, { DEFAULT_ITEM } from './MenuList';
import NotFoundDocument from './NotFoundDocument';
import ProjectDocumentsTable from './ProjectDocumentsTable';
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
  const [listDataFiltered, setListDataFiltered] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_ITEM);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isInsideProject, setInsideProject] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isSorted, setSorted] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    dispatch(actionFetchListMyDocument());
  }, [dispatch]);

  useEffect(() => {
    const filtered = listData.filter(({ name }) => !isSearching || !searchKey || name.indexOf(searchKey) !== -1)
    setListDataFiltered(filtered)
  }, [isSearching, listData, searchKey]);

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
      setListData(listGoogleDocument.map(transformGoogleDriverData));
    }
  }, [listDocumentFromMe, listDocumentShareToMe, listGoogleDocument, listMyDocument, listProject, selectedMenu]);

  const handleOnChangeMenu = menu => {
    setSelectedMenu(menu);
    const key = menu.key;
    if (key === 'projectDocument') {
      dispatch(actionFetchListProject());
      setInsideProject(true)
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
    dispatch(chatForwardFile(taskId, selectedFiles))
    setSelectedFiles([])
  }

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
                      {breadCrumbs.length && breadCrumbs.map(({ name, id }, index) =>
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
                {
                  (selectedMenu.key === 'googleDrive') &&
                  <>
                    <Button
                      disableRipple
                      disableTouchRipple
                      onClick={() => {
                        let params = {};
                        if (!isEmpty(currentFolder)) {
                          params.folderId = currentFolder.id;
                        }
                        dispatch(actionFetchListGoogleDocument(params, true));
                      }}
                      className="header-button-custom"
                    >
                      <div>
                        <Icon path={mdiRefresh} size={1} color="rgba(0, 0, 0, 0.54)" />
                      </div>
                      <span>{t('IDS_WP_UPDATE')}</span>
                    </Button>
                    <Button
                      disableRipple
                      disableTouchRipple
                      onClick={() => {
                        actionSignoutGoogleDrive(() => {
                          dispatch(toggleSingoutGoogle(false));
                        });
                      }}
                      className="header-button-custom"
                    >
                      <div>
                        <Icon path={mdiLogout} size={1} color="rgba(0, 0, 0, 0.54)" />
                      </div>
                      <span>{t('IDS_WP_LOGOUT')}</span>
                    </Button>
                  </>
                }
                {
                  (selectedMenu.key === 'myDocument') &&
                  <AddNewButton selectedMenu={selectedMenu} />
                }
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
            <Scrollbars autoHide autoHideTimeout={500}>
              {(selectedMenu.key === 'projectDocument' && isInsideProject) ?
                <ProjectDocumentsTable
                  listData={listDataFiltered}
                  setInsideProject={setInsideProject}
                />
                :
                (selectedMenu.key === 'googleDrive' && isInsideProject) ?
                  <GoogleDriverDocuments
                    setInsideProject={setInsideProject}
                  />
                  :
                  <DocumentsTable
                    listData={listDataFiltered}
                    setListData={setListData}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                  />
              }
              {
                (listDataFiltered.length === 0 && searchKey) ?
                  <NotFoundDocument searchKey={searchKey} />
                  : null
              }
            </Scrollbars>
          </div>
        </div>
      </div>
    </JobDetailModalWrap>
  );
};

export default ShareFromLibraryModal;
