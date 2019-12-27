import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, TableRow, TableHead, TableBody } from '@material-ui/core';
import { mdiArrowLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import {
  actionMoveFile,
  actionMoveFolder,
  actionMoveFolderToRoot,
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
  const [listData, setListData] = useState([
    {
      name: 'Tài liệu của tôi',
      id: 'root',
      sub_folder: true
    }
  ]);
  const [folderSelected, setFolderSelected] = useState({});
  const [listFolderBr, setListFolderBr] = useState([]);
  useEffect(() => {
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
      if (props.item.type === 'folder') {
        listFolderIdSelect.push(props.item.id);
      } else {
        listFileIdSelect.push(props.item.id);
      }
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // fetListFodlerChild(); // eslint-disable-next-line
    if (!isEmpty(listFolderBr)) {
      if (listFolderBr[listFolderBr.length - 1].id === 'root') {
        fetListFolder();
      } else {
        fetListFodlerChild();
      }
    }
    // eslint-disable-next-line
  }, [listFolderBr]);

  const fetListFolder = async () => {
    try {
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
    } catch (error) {}
  };

  const fetListFodlerChild = async () => {
    try {
      if (!isEmpty(listFolderBr)) {
        const { data } = await actionFetchListFolderMoveFile({
          folder_parent_id: listFolderBr[listFolderBr.length - 1].id
        });
        setListData(data.folders || []);
      } else {
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
      }
    } catch (error) {}
  };
  const handleMove = async () => {
    try {
      if (props.type !== 'header') {
        if (props.item.type !== 'folder') {
          await actionMoveFile({
            file_id: listFileIdSelect,
            folder_id: folderSelected.id
          });
        } else {
          await actionMoveFolder({
            folder_id: listFolderIdSelect,
            folder_move_to_id: folderSelected.id
          });
        }
      } else {
        let listAction = [];
        if (!isEmpty(listFileIdSelect))
          listAction.push(
            actionMoveFile({
              file_id: listFileIdSelect,
              folder_id: isEmpty(listFolderBr) ? null : folderSelected.id
            })
          );
        if (!isEmpty(listFolderIdSelect))
          if (!isEmpty(listFolderBr)) {
            listAction.push(
              actionMoveFolder({
                folder_id: listFolderIdSelect,
                folder_move_to_id: folderSelected.id
              })
            );
          } else {
            listAction.push(
              actionMoveFolderToRoot({
                folder_id: listFolderIdSelect
              })
            );
          }
        await Promise.all(listAction);
      }
      props.resetListSelectDocument();
      props.onOk();
      props.onClose();
      isFetFile = true;
      listFileIdSelect = [];
      listFolderIdSelect = [];
    } catch (error) {
      props.onClose();
    }
  };
  const handleSelectFolder = folder => {
    setFolderSelected(folder);
  };
  const handleGetChild = (e, folder) => {
    e.stopPropagation();
    const dataTemp = [...listFolderBr, folder];
    setListFolderBr(dataTemp);
    setFolderSelected({});
  };
  const handleBackParent = () => {
    const tempData = [...listFolderBr];
    tempData.splice(-1, 1);
    setListFolderBr(tempData);
    setFolderSelected({});
  };
  return (
    <ModalCommon
      title="Di chuyển tài liệu"
      onClose={props.onClose}
      footerAction={[
        {
          name: `Di chuyển đến đây`,
          action: handleMove,
          disabled: isEmpty(folderSelected)
        }
      ]}
    >
      <DialogContent dividers className="dialog-content move-content">
        <div className="my-document">
          <div className="left-my-document">
            {/* {props.type !== 'header' && (
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
            )} */}
            {!isEmpty(listFolderBr) ? (
              <React.Fragment>
                <div className="back-to-parent">
                  <Icon
                    path={mdiArrowLeft}
                    size={1}
                    color="rgba(0, 0, 0, 0.54)"
                    onClick={() => handleBackParent()}
                    title="Ra ngoài"
                  />
                </div>
                <div className="name-document">
                  <span>{listFolderBr[listFolderBr.length - 1].name}</span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="name-document">
                  <span>Tài liệu</span>
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
                <StyledTableHeadCell
                  align="left"
                  width="5%"
                ></StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.map(folder => {
                return (
                  <TableRow
                    className={`table-body-row move-row ${
                      folderSelected.id === folder.id ? 'selected-row' : ''
                    }`}
                    title="Click để chọn mục này"
                    key={folder.id}
                    onClick={() => handleSelectFolder(folder)}
                  >
                    <StyledTableBodyCell align="center" width="5%">
                      <FullAvatar src={FileType('folder')} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="left" width="40%">
                      <ColorTypo color="black">{folder.name}</ColorTypo>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="left" width="5%">
                      {folder.sub_folder && (
                        <Icon
                          path={mdiChevronRight}
                          size={1}
                          color={
                            folderSelected.id === folder.id
                              ? '#fff'
                              : 'rgba(0, 0, 0, 0.54)'
                          }
                          title="Vào thư mục con"
                          onClick={e => handleGetChild(e, folder)}
                        />
                      )}
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
