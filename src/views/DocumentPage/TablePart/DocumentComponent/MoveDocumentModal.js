import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  Avatar
} from '@material-ui/core';

import {
  actionMoveFile,
  actionMoveFolder,
  resetListSelectDocument
} from '../../../../actions/documents';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import {
  DialogContent,
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar
} from './TableCommon';
import ColorTypo from '../../../../components/ColorTypo';
import { FileType } from '../../../../components/FileType';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import {
  actionFetchListFolderMoveFile,
  actionFetchListFolderMoveFolder
} from '../ContentDocumentPage/ContentDocumentAction';
let isFetFile = true;
let listFileIdSelect = [];
let listFolderIdSelect = [];
const MoveDocumentModal = props => {
  const [listData, setListData] = useState([]);
  const [folderSelected, setFolderSelected] = useState({});
  useEffect(() => {
    fetListFolder(); // eslint-disable-next-line
  }, []);
  const getIconAvatar = (url, idx = 0) => {
    return (
      <Avatar
        key={idx}
        src={url}
        alt="avatar"
        style={{ width: 35, height: 35, margin: 'auto' }}
      />
    );
  };
  const fetListFolder = async () => {
    try {
      const { selectedDocument } = props;
      if (props.type === 'header') {
        selectedDocument.forEach(el => {
          if (el.type === 'folder') {
            isFetFile = false;
            listFolderIdSelect.push(el.id);
          } else {
            listFileIdSelect.push(el.id);
          }
        });
      } else {
        listFileIdSelect.push(props.item.id);
      }
      if (isFetFile) {
        const { data } = await actionFetchListFolderMoveFile();
        setListData(data.folders || []);
      } else {
        const params = {
          folder_id: listFolderIdSelect[0]
        };
        const { data } = await actionFetchListFolderMoveFolder(params);
        setListData(data.folders || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleMove = async () => {
    try {
      if (isFetFile) {
        await actionMoveFile({
          file_id: listFileIdSelect,
          folder_id: folderSelected.id
        });
      } else {
        let listAction = [];
        if (!isEmpty(listFileIdSelect))
          listAction.push(
            actionMoveFile({
              file_id: listFileIdSelect,
              folder_id: folderSelected.id
            })
          );
        if (!isEmpty(listFolderIdSelect))
          listAction.push(
            actionMoveFolder({
              folder_id: listFolderIdSelect,
              folder_move_to_id: folderSelected.id
            })
          );
        await Promise.all(listAction);
      }
      props.resetListSelectDocument();
      props.onOk();
      props.onClose();
    } catch (error) {
      props.onClose();
    }
  };
  const handleSelectFolder = folder => {
    setFolderSelected(folder);
  };
  return (
    <ModalCommon
      title="Di chuyển tài liệu"
      onClose={props.onClose}
      footerAction={[{ name: 'Di chuyển', action: handleMove }]}
      maxWidth="md"
    >
      <DialogContent dividers className="dialog-content move-content">
        <div className="my-document">
          <div className="left-my-document">
            {props.type !== 'header' && (
              <React.Fragment>
                <div>
                  <img
                    src={FileType(props.item.type)}
                    style={{ width: 24, height: 24 }}
                    alt="icon-type"
                  />
                </div>
                <div className="name-document">
                  <span>{props.item.name}</span>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="right-my-document">
            <span>Chọn thư mục bạn muốn di chuyển đến</span>
          </div>
        </div>
        <div className="table-list-folder">
          <Table>
            <TableHead>
              <TableRow className="table-header-row">
                <StyledTableHeadCell
                  align="center"
                  width="5%"
                ></StyledTableHeadCell>
                <StyledTableHeadCell align="left" width="40%">
                  Tên
                </StyledTableHeadCell>
                <StyledTableHeadCell align="center" width="20%">
                  Chủ sở hữu
                </StyledTableHeadCell>
                <StyledTableHeadCell align="center" width="20%">
                  Chia sẻ
                </StyledTableHeadCell>
                <StyledTableHeadCell align="left" width="15%">
                  Kích cỡ tệp
                </StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.map(folder => {
                return (
                  <TableRow
                    className={`table-body-row ${
                      folderSelected.id === folder.id ? 'selected-row' : ''
                    }`}
                    key={folder.id}
                    onClick={() => handleSelectFolder(folder)}
                  >
                    <StyledTableBodyCell align="center" width="5%">
                      <FullAvatar src={FileType('folder')} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="left" width="40%">
                      <ColorTypo color="black">{folder.name}</ColorTypo>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="center" width="20%">
                      {(folder.owner && getIconAvatar(folder.owner.avatar)) ||
                        ''}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="center" width="20%">
                      {folder.shared_member.map(el => getIconAvatar(el.avatar))}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="left" width="15%">
                      <ColorTypo color="black">-</ColorTypo>
                    </StyledTableBodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </ModalCommon>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    resetListSelectDocument
  }
)(withRouter(MoveDocumentModal));
