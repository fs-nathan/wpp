import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiSwapVertical } from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import { actionFetchTrash } from './ContentDocumentAction';
import {
  selectDocumentItem,
  resetListSelectDocument
} from '../../../../actions/documents';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  CustomAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';
import { FileType } from '../../../../components/FileType';

const Trash = props => {
  const [listData, setListData] = useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    fetchTrash();
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    }; // eslint-disable-next-line
  }, []);

  const fetchTrash = async () => {
    try {
      const { data } = await actionFetchTrash();
      setListData(data.documents || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, listData));
    props.selectDocumentItem(selectAll(e, listData));
  };

  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
    props.selectDocumentItem(selectItem(selected, id));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={
                  listData.length > 0 && selected.length === listData.length
                }
                indeterminate={
                  selected.length > 0 && selected.length < listData.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
              <div>
                Tên tài liệu
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={1.2} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Người xóa
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Ngày xóa
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Xóa vĩnh viễn
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <TableRow className="table-body-row" key={item.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(item.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(item.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {item.user_create_avatar && (
                    <CustomAvatar src={item.user_create_avatar} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="15%"
                ></StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{item.deleted_date}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ColorTypo color="red">
                    {item.day_storage > 0 ? `${item.day_storage} ngày` : ''}
                  </ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{item.size || '-'}</ColorTypo>
                </StyledTableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    selectDocumentItem,
    resetListSelectDocument
  }
)(Trash);
