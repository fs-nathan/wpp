import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { mdiAccountPlusOutline } from '@mdi/js';
import { withRouter } from 'react-router-dom';

import { Routes } from '../../../../constants/routes';
import folderIcon from '../../../../assets/folder.png';

import ColorTypo from '../../../../components/ColorTypo';
import { getProjectStatic } from './ContentDocumentAction';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  WrapAvatar,
  selectItem,
  selectAll,
  GreenCheckbox
} from '../DocumentComponent/TableCommon';

const ProjectDocument = props => {
  const [data, setData] = useState([]);
  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetDataRecentDocument();
  }, []);
  const fetDataRecentDocument = async () => {
    const { data } = await getProjectStatic({
      pageSize: 10,
      pageNum: 0
    });
    setData(data.projects);
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, data));
  };
  const handleSelectItem = id => {
    setSelected(selectItem(selected, id));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const moreAction = [
    {
      icon: mdiAccountPlusOutline,
      text: 'Chia sẻ',
      type: 'share'
    }
  ];
  const handleClick = (event, project) => {
    props.history.push({
      pathname: Routes.DOCUMENT_PROJECT,
      search: `?projectId=${project.id}`
    });
  };
  const handleChangePage = () => {};
  return (
    <React.Fragment>
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
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="65%">
              <TableSortLabel
                active={true}
                // direction={order}
                // onClick={createSortHandler(headCell.id)}
              >
                Tên
              </TableSortLabel>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Sổ tài liệu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {data.map(project => {
            const isItemSelected = isSelected(project.id);
            return (
              <TableRow
                hover={true}
                onClick={event => handleClick(event, project)}
                key={project.id}
              >
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(project.id)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <WrapAvatar>
                    <FullAvatar src={folderIcon} />
                  </WrapAvatar>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="60%">
                  <ColorTypo color="black">{project.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{project.number_document}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction actionList={moreAction} item={project}/>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={28}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default withRouter(ProjectDocument);
