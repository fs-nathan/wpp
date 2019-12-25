import React, { useEffect, Fragment } from 'react';
import { mdiSwapVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { connect } from 'react-redux';
import {
  Avatar,
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import { get, sortBy, reverse } from 'lodash';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListRecent,
  actionSortListRecent
} from '../../../../actions/documents';
import { openDocumentDetail } from '../../../../actions/system/system';
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
import { isEmpty } from '../../../../helpers/utils/isEmpty';
const RecentContent = props => {
  const { isLoading, listRecent: listData } = props;
  const [selected, setSelected] = React.useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  useEffect(() => {
    fetDataRecentDocument();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    }; // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let projects = [];
    projects = sortBy(listData, [o => get(o, sortField)]);
    if (sortType === -1) reverse(projects);
    props.actionSortListRecent(projects);
    // eslint-disable-next-line
  }, [sortField, sortType]);
  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);
  const hanldeSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };

  const fetDataRecentDocument = (params = {}, quite = false) => {
    props.actionFetchListRecent(params, quite);
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
  const openDetail = item => {
    const isDetail =
      item.type === 'word' || item.type === 'pdf' || item.type === 'excel';
    if (isDetail) {
      props.openDocumentDetail(item);
    }
    props.openDocumentDetail(item); // test
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
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="30%">
              <div
                className="cursor-pointer"
                onClick={() => hanldeSort('name')}
              >
                Tên tài liệu
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
              Nơi lưu trữ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Ngày tạo
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Người tạo
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Kích thước
            </StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((file, index) => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow className="table-body-row" key={index}>
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="5%"
                  className="cursor-pointer"
                  onClick={() => openDetail(file)}
                >
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  width="30%"
                  className="cursor-pointer"
                  onClick={() => openDetail(file)}
                >
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{file.task_name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{file.date_create}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  {(file.user_create_avatar &&
                    getIconAvatar(
                      `https://storage.googleapis.com${file.user_create_avatar}`
                    )) ||
                    ''}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    isLoading: state.documents.isLoading,
    listRecent: state.documents.listRecent
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail,
    actionFetchListRecent,
    actionSortListRecent
  }
)(RecentContent);
