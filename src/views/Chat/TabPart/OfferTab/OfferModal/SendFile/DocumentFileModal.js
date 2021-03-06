// import { Scrollbars } from 'react-custom-scrollbars';
import { Avatar, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { mdiFileDocumentBoxOutline, mdiFileUndoOutline, mdiFolderOpenOutline, mdiGoogleDrive } from '@mdi/js';
import Icon from '@mdi/react';
import { getDocumentSharedToMe, getListMyDocument, getListProject } from 'actions/documents';
import CustomModal from 'components/CustomModal';
import { FileType } from 'components/FileType';
import SearchInput from 'components/SearchInput';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './SendFileModal.scss';





const DocumentFileModal = ({ open, setOpen, offer_id }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [files, setFiles] = useState([])
  const [listData, setListData] = useState([]);
  const [selectedFilesIds, setSelectedFilesIds] = useState([]);

  const fetchListMyDocument = async params => {
    try {
      const { data } = await getListMyDocument(params);
      let transformData = [];
      if (data.folders.length > 0) {
        transformData = data.folders.map(item => ({ ...item, type: 'folder' }));
      }
      if (data.documents.length > 0) {
        transformData = transformData.concat(data.documents);
      }
      setListData(transformData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocumentSharedToMe = async params => {
    try {
      const { data } = await getDocumentSharedToMe(params);
      setListData(data.documents || []);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchListProject = async params => {
    try {
      const { data } = await getListProject(params);
      setListData(data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListMyDocument();
  }, []);

  const handleOnChangeMenu = keyMenu => {
    if (keyMenu === 'projectDocument') {
      fetchListProject();
    } else if (keyMenu === 'sharedWithMe') {
      fetchDocumentSharedToMe();
    } else if (keyMenu === 'myDocument') {
      fetchListMyDocument();
    } else if (keyMenu === 'googleDrive') {
      console.log('gg drive');
    }
  };

  function onClickConfirm() {
    setOpen({ files })
    setSelectedFilesIds([])
  }

  function selectFile(id, item) {
    return () => {
      setFiles([...files, item])
      const memberId = selectedFilesIds.indexOf(id)
      if (memberId === -1)
        selectedFilesIds.push(id);
      else
        selectedFilesIds.splice(memberId, 1);
      setSelectedFilesIds([...selectedFilesIds])
    }
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      fullWidth
      canConfirm={selectedFilesIds.length > 0}
      title="Qu???n l?? t??i li???u"
      className="document-file-modal"
      cancleRender={() => t('LABEL_CHAT_TASK_THOAT')}
      onConfirm={onClickConfirm}
    >
      <div className="document-file-container">
        <div className="left-container">
          <MenuList onChangeMenu={handleOnChangeMenu} />
        </div>
        <div className="right-container">
          <div className="right-header-content">
            <div className="content-title">
              <div className="lb-title">T??i li???u c???a t??i</div>
              <div className="bread-crumbs-list">Home -> My</div>
            </div>
            <div className="search-box">
              <SearchInput placeholder="T??m t??i li???u" />
            </div>
          </div>
          <div className="right-table-content">
            {/* <Scrollbars autoHide autoHideTimeout={500}> */}
            <Table className="table-container">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell width="50px" align="center"></TableCell>
                  <TableCell width="50px" align="center"></TableCell>
                  <TableCell>T??n</TableCell>
                  <TableCell width="120px" align="center">
                    Ch??? s??? h???u
                  </TableCell>
                  <TableCell width="150px">K??ch th?????c t???p</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {listData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell width="50px" align="center">
                      {item.type !== 'folder' && <Checkbox color="primary"
                        checked={selectedFilesIds.indexOf(item.id) !== -1}
                        onClick={selectFile(item.id, item)} />}
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
    </CustomModal>
  );
};

export default DocumentFileModal;

const MenuList = ({ onChangeMenu }) => {
  const menuList = [
    {
      key: 'projectDocument',
      title: 'T??i li???u d??? ??n',
      icon: mdiFileDocumentBoxOutline,
      color: '#4caf50',
      action: () => {
        setSelected('projectDocument');
        onChangeMenu('projectDocument');
      }
    },
    {
      key: 'sharedWithMe',
      title: '???????c chia s??? v???i t??i',
      icon: mdiFileUndoOutline,
      color: '#607d8b',
      action: () => {
        setSelected('sharedWithMe');
        onChangeMenu('sharedWithMe');
      }
    },
    {
      key: 'myDocument',
      title: 'T??i li???u c???a t??i',
      icon: mdiFolderOpenOutline,
      color: '#ff9800',
      action: () => {
        setSelected('myDocument');
        onChangeMenu('myDocument');
      }
    },
    {
      key: 'googleDrive',
      title: 'Google Drive',
      icon: mdiGoogleDrive,
      color: '#2196f3',
      action: () => {
        setSelected('googleDrive');
        onChangeMenu('googleDrive');
      }
    }
  ];

  const [selectedItem, setSelected] = useState(menuList[2].key);

  return (
    <div className="menu-list">
      {menuList.map(menu => (
        <div
          key={menu.key}
          className={`menu-item ${selectedItem === menu.key ? 'selected' : ''}`}
          onClick={menu.action}
        >
          <Icon
            className="menu-icon"
            path={menu.icon}
            size={1.4}
            color={menu.color}
          />
          <span className="menu-text">{menu.title}</span>
        </div>
      ))}
    </div>
  );
};
