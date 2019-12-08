import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, TableRow, TableHead, TableBody } from '@material-ui/core';

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
import { actionFetchListFolder } from '../ContentDocumentPage/ContentDocumentAction';

const MoveDocumentModal = props => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    fetListFolder();
  }, []);

  const fetListFolder = async () => {
    try {
      const { data } = await actionFetchListFolder();
      setListData(data.folders || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMove = () => {
    props.onOk();
  };
  console.log(listData);
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
                  <TableRow className="table-body-row" key={folder.id}>
                    <StyledTableBodyCell align="center" width="5%">
                    <FullAvatar src={FileType('folder')} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="left" width="40%">
                      <ColorTypo color="black">{folder.name}</ColorTypo>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="center" width="20%">
                      <ColorTypo color="black">{folder.owner.name}</ColorTypo>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align="center" width="20%">
                      <ColorTypo color="black">
                        {folder.shared_member[0].name}
                      </ColorTypo>
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

export default withRouter(MoveDocumentModal);
