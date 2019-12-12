import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  Avatar,
  TableHead,
  TableBody,
  IconButton,
  TablePagination
} from '@material-ui/core';
import Icon from '@mdi/react';
import { withRouter } from 'react-router-dom';
import { mdiSwapVertical } from '@mdi/js';
import { getDocumentProjectStatic } from './ContentDocumentAction';
import {
  selectDocumentItem,
  resetListSelectDocument
} from '../../../../actions/documents';
import { FileType } from '../../../../components/FileType';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  selectItem,
  selectAll,
  GreenCheckbox,
  selectAllRedux,
  selectItemRedux
} from '../DocumentComponent/TableCommon';
import './ContentDocumentPage.scss';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';

const ProjectDocumentDetail = props => {
  const [listData, setListData] = useState([]);
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    const search = props.location.search.split('projectId=').pop();
    fetDataRecentDocument(search);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    };
    // eslint-disable-next-line
  }, []);
  const fetDataRecentDocument = async projectId => {
    setIsLoading(true);
    const { data } = await getDocumentProjectStatic(projectId);
    setListData(data.documents);
    setIsLoading(false);
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, listData));
    props.selectDocumentItem(selectAllRedux(e, listData));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const handleSelectItem = item => {
    setSelected(selectItem(selected, item.id));
    props.selectDocumentItem(selectItemRedux(props.selectedDocument, item));
  };
  const handleChangePage = () => {};
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
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={selected.length === listData.length}
                indeterminate={
                  selected.length > 0 && selected.length < listData.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell
              align="center"
              width="5%"
            ></StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="25%">
              <div>
                Tên
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={1.2} color="#8d8d8d" />
                </IconButton>
              </div>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow className="table-body-row" key={file.id}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="25%">
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="30%">
                  <ColorTypo color="black">{file.task_name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="15%">
                  {(file.user_create_avatar &&
                    getIconAvatar(
                      `https://storage.googleapis.com${file.user_create_avatar}`
                    )) ||
                    ''}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{file.date_create}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
              </TableRow>
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

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    selectDocumentItem,
    resetListSelectDocument
  }
)(withRouter(ProjectDocumentDetail));
