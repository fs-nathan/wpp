import React, { useEffect, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mdiSwapVertical } from '@mdi/js';
import { withRouter } from 'react-router-dom';
import Icon from '@mdi/react';
import { connect } from 'react-redux';
import {
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
  actionSortListRecent,
  actionSelectedFolder,
  actionFetchListMyDocument
} from '../../../../actions/documents';
import {
  openDocumentDetail,
  actionChangeBreadCrumbs
} from '../../../../actions/system/system';
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
import ShareColumnAvatar from '../DocumentComponent/ShareColumnAvatar';

const RecentContent = props => {
  const {
    isLoading,
    actionSelectedFolder,
    actionFetchListMyDocument,
    actionChangeBreadCrumbs
  } = props;
  const { t } = useTranslation();
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
    { icon: mdiAccountPlusOutline, text: t('IDS_WP_SHARE'), type: 'share' },
    { icon: mdiContentCopy, text: t('IDS_WP_COPY_LINK'), type: 'copy' }
  ];
  return (
    <Fragment>
      <Table stickyHeader>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell width="3%">
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
            <StyledTableHeadCell
              align="center"
              width="5%"
            ></StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              <div
                className="cursor-pointer"
                onClick={() => hanldeSort('name')}
              >
                {t('IDS_WP_DOCUMENT_NAME')}
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              {t('IDS_WP_SHARE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="15%">
              {t('IDS_WP_STORAGE_ADDRESS')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_CREATE_DATE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_CREATOR')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_SIZE')}
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
                <StyledTableBodyCell width="3%">
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
                  className="cursor-pointer"
                  width="15%"
                  onClick={() => openDetail(file)}
                >
                  <ColorTypo
                    color="black"
                    className="two-line"
                    title={file.name || ''}
                  >
                    {file.name}
                  </ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center">
                  <ShareColumnAvatar
                    sharedList={[...file.users_shared]}
                    handleClickAvatar={() => {
                      setVisible(true);
                      setItemActive(file);
                    }}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="15%">
                  <ColorTypo
                    color="black"
                    className="two-line"
                    title={file.storage_address || ''}
                  >
                    <span
                      onClick={() => {
                        if (file.is_my_document_file) {
                          if (file.folder_id) {
                            actionSelectedFolder({
                              id: file.folder_id,
                              name: file.folder_name
                            });

                            let newBreadCrumbs = [
                              {
                                id: -1,
                                name: 'Home',
                                action: () => {
                                  actionSelectedFolder({});
                                  actionFetchListMyDocument({}, true);
                                }
                              },
                              {
                                id: file.folder_id,
                                name: file.folder_name,
                                action: () => {
                                  actionSelectedFolder({
                                    id: file.folder_id,
                                    name: file.folder_name
                                  });
                                  actionFetchListMyDocument(
                                    { folder_id: file.folder_id },
                                    true
                                  );
                                }
                              }
                            ];

                            actionChangeBreadCrumbs(newBreadCrumbs);
                          }

                          props.history.push({ pathname: file.redirect_url });
                        } else {
                          props.history.push({ pathname: file.redirect_url });
                        }
                      }}
                      className="address-link"
                    >
                      {file.storage_address}
                    </span>
                  </ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.date_create}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {file.user_create_avatar && (
                    <CustomAvatar src={file.user_create_avatar} title={file.user_create_name} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="10%"
                  style={{ minWidth: 72 }}
                >
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
    actionSelectedFolder,
    actionFetchListMyDocument,
    actionChangeBreadCrumbs,
    resetListSelectDocument,
    openDocumentDetail,
    actionFetchListRecent,
    actionSortListRecent
  }
)(withRouter(RecentContent));
