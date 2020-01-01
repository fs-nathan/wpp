import React, { useEffect, Fragment, useState } from 'react';
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
import { mdiAccountPlusOutline, mdiContentCopy } from '@mdi/js';
import { reverse } from 'lodash';
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
  CustomAvatar,
  selectItem,
  selectAll,
  GreenCheckbox,
  selectAllRedux,
  selectItemRedux
} from '../DocumentComponent/TableCommon';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import './ContentDocumentPage.scss';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';

const RecentContent = props => {
  const { isLoading } = props;
  const [listData, setListData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});

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
    // projects = sortBy(listData, [o => get(o, sortField)]);
    projects = listData.sort((a, b) => a.name.localeCompare(b.name));
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

  useEffect(() => {
    setListData(props.listRecent);
    // eslint-disable-next-line
  }, [props.listRecent]);

  useEffect(() => {
    const dataUpdate = handleSearchData(props.searchText, props.listRecent);
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
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' }
  ];
  return (
    <Fragment>
      <Table stickyHeader>
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
            <StyledTableHeadCell align="center" width="15%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="10%">
              Nơi lưu trữ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Ngày tạo
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Người tạo
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((file, index) => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow
                className={`table-body-row ${isItemSelected ? 'selected' : ''}`}
                key={index}
              >
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
                <StyledTableBodyCell align="center" width="15%">
                  {!isEmpty(file.users_shared) &&
                    file.users_shared.length > 0 &&
                    file.users_shared.map(
                      (shareMember, idx) =>
                        shareMember.avatar && (
                          <CustomAvatar
                            src={shareMember.avatar}
                            key={idx}
                            onClick={() => {
                              setVisible(true);
                              setItemActive(file);
                            }}
                          />
                        )
                    )}
                  {/* {file.users_shared && (
                    <CustomAvatar
                      src={file.users_shared.avatar}
                      onClick={() => {
                        setVisible(true);
                        setItemActive(file);
                      }}
                    />
                  )} */}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="10%">
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
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
                {file.type !== 'folder' ? (
                  <MoreAction
                    actionList={moreAction}
                    item={file}
                    handleFetData={() => fetDataRecentDocument({}, true)}
                  />
                ) : (
                  <StyledTableBodyCell align="center" width="5%" />
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {visible && (
        <ShareDocumentModal
          onClose={() => {
            setVisible(false);
            setItemActive({});
          }}
          item={itemActive}
        />
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    isLoading: state.documents.isLoading,
    listRecent: state.documents.listRecent,
    searchText: state.documents.searchText
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail,
    actionFetchListRecent,
    actionSortListRecent
  }
)(RecentContent);
