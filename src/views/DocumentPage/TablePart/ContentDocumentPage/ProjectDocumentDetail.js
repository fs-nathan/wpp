import React, { useEffect, useState, Fragment } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';

// import { getDocumentShareFromMe } from './ContentDocumentAction';
import { FileType } from '../../../../components/FileType';
import {
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
  FullAvatar,
  WrapAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';
import './ContentDocumentPage.scss';
import ColorTypo from '../../../../components/ColorTypo';
const ProjectDocumentDetail = () => {
  const [data] = useState([
    {
      id: 'task-1',
      content: 20,
      name: 'Dự án thiết kế website Phúc An',
      type: 'folder',
      location: 'Văn Thư',
      size: '10.3 Kb',
      date: '02/02/2019',
      userCreate: 'Cao Văn Hưng',
      work: 'Thiết kế giao diện'
    }
  ]);
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  useEffect(() => {
    fetDataRecentDocument();
  }, []);
  const fetDataRecentDocument = async () => {
    // const { data } = await getDocumentShareFromMe();
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, data));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
  };
  const handleChangePage = () => {};
  return (
    <Fragment>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={selected.length === data.length}
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell
              align="center"
              width="5%"
            ></StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="25%">
              <TableSortLabel
                active={true}
                // direction={order}
                // onClick={createSortHandler(headCell.id)}
              >
                Tên
              </TableSortLabel>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="30%">
              Công việc
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="15%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Sửa đổi lần cuối
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {data.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <StyledTableBodyRow key={file.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <WrapAvatar>
                    <FullAvatar src={FileType(file.type)} />
                  </WrapAvatar>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="25%">
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="30%">
                  <ColorTypo color="black">{file.work}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="15%">
                  <ColorTypo color="black">{file.userCreate}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{file.date}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
              </StyledTableBodyRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={1}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default ProjectDocumentDetail;
