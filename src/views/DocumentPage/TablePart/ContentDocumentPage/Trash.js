import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableSortLabel
} from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import { actionFetchTrash } from './ContentDocumentAction';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
  FullAvatar,
  getIconByType,
  WrapAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';

const Trash = () => {
  const [listData, setListData] = useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    fetchTrash();
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
  };

  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

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

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell>
              {listData.length > 0 && (
                <GreenCheckbox
                  onChange={handleSelectAllClick}
                  checked={selected.length === listData.length}
                  indeterminate={
                    selected.length > 0 && selected.length < listData.length
                  }
                />
              )}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
              <TableSortLabel
                active={true}
                // direction={order}
                // onClick={createSortHandler(headCell.id)}
              >
                Tên tài liệu
              </TableSortLabel>
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
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <StyledTableBodyRow key={item.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(item.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <WrapAvatar>
                    <FullAvatar src={getIconByType(item.type)} />
                  </WrapAvatar>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {(item.user_create_avatar &&
                    getIconAvatar(item.user_create_avatar)) ||
                    ''}
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
              </StyledTableBodyRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Trash;
