import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileDocumentBoxOutline,
  mdiFolderOpenOutline,
  mdiFileUndoOutline,
  mdiGoogleDrive
} from '@mdi/js';
// import { Scrollbars } from 'react-custom-scrollbars';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Avatar,
  Checkbox
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import SearchInput from '../../../../components/SearchInput';
import { FileType } from '../../../../components/FileType';
import {
  getListMyDocument,
  getDocumentSharedToMe,
  getListProject
} from '../../../../actions/documents';
import './SendFileModal.scss';

const DocumentFileModal = ({ open, setOpen }) => {
  const [listData, setListData] = useState([]);

  const fetchListMyDocument = async params => {
    try {
      const { data } = await getListMyDocument(params);
      let tranformData = [];
      if (data.folders.length > 0) {
        tranformData = data.folders.map(item => ({ ...item, type: 'folder' }));
      }
      if (data.documents.length > 0) {
        tranformData = tranformData.concat(data.documents);
      }
      setListData(tranformData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchtDocumentSharedToMe = async params => {
    try {
      const { data } = await getDocumentSharedToMe(params);
      setListData(data.documents || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchtListProject = async params => {
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
      fetchtListProject();
    } else if (keyMenu === 'sharedWithMe') {
      fetchtDocumentSharedToMe();
    } else if (keyMenu === 'myDocument') {
      fetchListMyDocument();
    } else if (keyMenu === 'googleDrive') {
      console.log('gg drive');
    }
  };

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      fullWidth
      title="Quản lý tài liệu"
      className="document-file-modal"
      cancleRender={null}
    >
      <div className="document-file-container">
        <div className="left-container">
          <MenuList onChangeMenu={handleOnChangeMenu} />
        </div>
        <div className="right-container">
          <div className="right-header-content">
            <div className="content-title">
              <div className="lb-title">Tài liệu của tôi</div>
              <div className="bread-crumbs-list">Home -> My</div>
            </div>
            <div className="search-box">
              <SearchInput placeholder="Tìm tài liệu" />
            </div>
          </div>
          <div className="right-table-content">
            {/* <Scrollbars autoHide autoHideTimeout={500}> */}
            <Table className="table-container">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell width="50px" align="center"></TableCell>
                  <TableCell width="50px" align="center"></TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell width="120px" align="center">
                    Chủ sở hữu
                  </TableCell>
                  <TableCell width="150px">Kích thước tệp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {listData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell width="50px" align="center">
                      {item.type !== 'folder' && <Checkbox color="primary" />}
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
      title: 'Tài liệu dự án',
      icon: mdiFileDocumentBoxOutline,
      color: '#4caf50',
      action: () => {
        setSelected('projectDocument');
        onChangeMenu('projectDocument');
      }
    },
    {
      key: 'sharedWithMe',
      title: 'Được chia sẻ với tôi',
      icon: mdiFileUndoOutline,
      color: '#607d8b',
      action: () => {
        setSelected('sharedWithMe');
        onChangeMenu('sharedWithMe');
      }
    },
    {
      key: 'myDocument',
      title: 'Tài liệu của tôi',
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
