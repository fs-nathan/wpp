import React, { useEffect } from 'react';
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
import { reverse } from 'lodash';
import ColorTypo from '../../../../components/ColorTypo';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListTrash,
  actionSortListTrash
} from '../../../../actions/documents';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  CustomAvatar,
  selectItem,
  selectAll,
  GreenCheckbox,
  selectAllRedux,
  selectItemRedux
} from '../DocumentComponent/TableCommon';
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';

const Trash = props => {
  const [selected, setSelected] = React.useState([]);
  const { isLoading } = props;
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [listData, setListData] = React.useState([]);
  useEffect(() => {
    getListTrash();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let listDataTemp = [];
    // listDataTemp = sortBy(listData, [o => get(o, sortField)]);
    listDataTemp = listData.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === -1) reverse(listDataTemp);
    props.actionSortListTrash(listDataTemp);
    // eslint-disable-next-line
  }, [sortField, sortType]);

  useEffect(() => {
    setListData(props.listTrash);
    // eslint-disable-next-line
  }, [props.listTrash]);

  useEffect(() => {
    const dataUpdate = handleSearchData(props.searchText, props.listTrash);
    setListData(dataUpdate);
    // eslint-disable-next-line
  }, [props.searchText]);

  const handleSearchData = (valueSearch, listData) => {
    let listResult = [];
    if (!isEmpty(valueSearch)) {
      listResult = listData.filter(
        el => el.name.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
      );
    } else {
      listResult = listData;
    }
    return listResult;
  };

  const hanldeSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };

  const getListTrash = (params = {}) => {
    props.actionFetchListTrash(params);
  };

  const handleSelectAllClick = e => {
    setSelected(selectAll(e, listData));
    props.selectDocumentItem(selectAllRedux(e, listData));
  };

  const handleSelectItem = item => {
    setSelected(selectItem(selected, item.id));
    props.selectDocumentItem(selectItemRedux(props.selectedDocument, item));
  };

  const isSelected = id => selected.indexOf(id) !== -1;
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <React.Fragment>
      <Table className="doc-table-content" stickyHeader>
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
            <StyledTableHeadCell
              align="center"
              width="10%"
              className="last-cell"
            >
              Kích thước
            </StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <TableRow
                className={`table-body-row ${isItemSelected ? 'selected' : ''}`}
                key={item.id}
              >
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(item)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(item.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {item.user_create && item.user_create.avatar && (
                    <CustomAvatar src={item.user_create.avatar} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  {item.user_delete && item.user_delete.avatar && (
                    <CustomAvatar src={item.user_delete.avatar} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">{item.deleted_at}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ColorTypo color="red">
                    {item.day_storage > 0 ? `${item.day_storage} ngày` : ''}
                  </ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="10%"
                  className="last-cell"
                >
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
    selectedDocument: state.documents.selectedDocument,
    isLoading: state.documents.isLoading,
    listTrash: state.documents.listTrash,
    searchText: state.documents.searchText
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    actionFetchListTrash,
    actionSortListTrash
  }
)(Trash);
