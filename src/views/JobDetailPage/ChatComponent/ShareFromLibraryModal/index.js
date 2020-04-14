// import { Scrollbars } from 'react-custom-scrollbars';
import { Avatar, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { mdiChevronRight, mdiSwapVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { chatForwardFile } from 'actions/chat/chat';
import { actionFetchListDocumentFromMe, actionFetchListDocumentShare, actionFetchListGoogleDocument, actionFetchListMyDocument, actionFetchListProject } from 'actions/documents';
import { FileType } from 'components/FileType';
import SearchInput from 'components/SearchInput';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
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

  const [listData, setListData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_ITEM);
  const [selectedFilesIds, setSelectedFilesIds] = useState([]);

  useEffect(() => {
    dispatch(actionFetchListMyDocument());
  }, [dispatch]);

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

  function handleClickLink() {

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
                  <div href="/" onClick={handleClickLink}>
                    Home
        </div>
                  <div href="/getting-started/installation/" onClick={handleClickLink}>
                    Tài liệu của tôi
        </div>
                </Breadcrumbs>
              </div>
            </div>
            <div className="ShareFromLibraryModal--search-box" >
              <SearchInput className="ShareFromLibraryModal--SearchInput" placeholder="Tìm tài liệu" />
            </div>
          </div>
          <div className="ShareFromLibraryModal--right-table-content" >
            {/* <Scrollbars autoHide autoHideTimeout={500}> */}
            <Table className="ShareFromLibraryModal--table-container" >
              <TableHead className="ShareFromLibraryModal--table-header" >
                <TableRow className="ShareFromLibraryModal--TableRow" >
                  <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" >
                    <Checkbox color="primary"
                    // checked={selectedFilesIds.indexOf(item.id) !== -1}
                    // onClick={selectAll()}
                    />
                  </TableCell>
                  <TableCell className="ShareFromLibraryModal--TableCell" width="50px" align="center" />
                  <TableCell className="ShareFromLibraryModal--TableCell" >
                    {t('Tên')}
                    <IconButton size="small">
                      <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                    </IconButton>
                  </TableCell>
                  <TableCell className="ShareFromLibraryModal--TableCell" width="120px" align="center" >
                    Chủ sở hữu
                  </TableCell>
                  <TableCell className="ShareFromLibraryModal--TableCell" width="150px" >
                    Kích thước tệp
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="ShareFromLibraryModal--table-body" >
                {listData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell width="50px" align="center">
                      {item.type !== 'folder' && <Checkbox color="primary"
                        checked={selectedFilesIds.indexOf(item.id) !== -1}
                        onClick={selectFile(item.id)} />}
                    </TableCell>
                    <TableCell width="50px" align="center">
                      <Avatar
                        src={FileType(item.type)}
                        className="full-avatar"
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell width="120px" align="center">
                      {item.owner && item.owner.avatar && (
                        <Avatar
                          title={item.owner.name}
                          src={item.owner.avatar}
                          className="owner-avatar"
                        />
                      )}
                    </TableCell>
                    <TableCell width="150px">{item.size || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </Scrollbars> */}
          </div>
        </div>
      </div>
    </JobDetailModalWrap>
  );
};

export default ShareFromLibraryModal;
