import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import { reverse, findIndex } from 'lodash';
import Icon from '@mdi/react';
import { mdiSwapVertical } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import {
  mdiAccountPlusOutline,
  mdiFolderMove,
  mdiPencilOutline,
  mdiDownloadOutline,
  mdiTrashCanOutline,
  mdiContentCopy
} from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import {
  openDocumentDetail,
  actionChangeBreadCrumbs
} from '../../../../actions/system/system';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListMyDocument,
  actionSelectedFolder,
  actionSortListDocument,
  actionDeleteFolder,
  actionDeleteFile
} from '../../../../actions/documents';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import AlertModal from '../../../../components/AlertModal';
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
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';
import ShareColumnAvatar from '../DocumentComponent/ShareColumnAvatar';

const MyDocument = props => {
  const [alert, setAlert] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const {
    isLoading,
    breadCrumbs,
    actionChangeBreadCrumbs,
    isFetching,
    currentFolder
  } = props;
  const [listData, setListData] = useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [fileSelectAction, setFileSelectAction] = useState(null);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    getListMyDocument();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
      props.actionSelectedFolder({});
      actionChangeBreadCrumbs([]);
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let listDataTemp = [];
    // listDataTemp = sortBy(listData, [o => get(o, sortField)]);
    listDataTemp = listData.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === -1) reverse(listDataTemp);
    props.actionSortListDocument(listDataTemp);
    // eslint-disable-next-line
  }, [sortField, sortType]);

  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);

  useEffect(() => {
    setListData(props.listMyDocument);
    // eslint-disable-next-line
  }, [props.listMyDocument]);

  useEffect(() => {
    const dataUpdate = handleSearchData(props.searchText, props.listMyDocument);
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

  const getListMyDocument = (params = {}, quite = false) => {
    let temp = {};
    if (!isEmpty(currentFolder)) {
      params.folder_id = currentFolder.id;
    }
    props.actionFetchListMyDocument({ ...temp, ...params }, quite);
  };

  const handleClickItem = item => {
    if (isFetching) return;
    if (item.type === 'folder') {
      props.actionFetchListMyDocument({ folder_id: item.id }, true);
      props.actionSelectedFolder(item);
      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => {
            props.actionSelectedFolder({});
            getListMyDocument({}, true);
          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            props.actionFetchListMyDocument({ folder_id: item.id }, true);
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            props.actionFetchListMyDocument({ folder_id: item.id }, true);
          }
        });
      }
      actionChangeBreadCrumbs(newBreadCrumbs);
    } else {
      props.openDocumentDetail(item);
    }
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

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: t('IDS_WP_SHARE'), type: 'share' },
    { icon: mdiContentCopy, text: t('IDS_WP_COPY_LINK'), type: 'copy' },
    { icon: mdiFolderMove, text: t('IDS_WP_MOVE_TO'), type: 'move' },
    { icon: mdiPencilOutline, text: t('IDS_WP_RENAME'), type: 'change' },
    {
      icon: mdiDownloadOutline,
      text: t('IDS_WP_DOWNLOAD_DOWN'),
      type: 'download'
    },
    {
      icon: mdiTrashCanOutline,
      text: t('IDS_WP_DELETE'),
      action: item => {
        setAlert(true);
        setFileSelectAction(item);
      }
    }
  ];
  const moreActionFolder = moreAction.filter(
    el => el.type !== 'download' && el.type !== 'copy'
  );
  if (isLoading) {
    return <LoadingBox />;
  }
  const handleActionDeleteFile = async () => {
    if (isFetching) return;
    try {
      if (fileSelectAction.type === 'folder') {
        await actionDeleteFolder({
          folder_id: fileSelectAction.id
        });
      } else {
        await actionDeleteFile({
          file_id: [fileSelectAction.id]
        });
      }
      getListMyDocument();
      props.resetListSelectDocument();
    } catch (error) {}
  };
  const handleUpdateDataLocal = (itemId, newName) => {
    const index = findIndex(listData, { id: itemId });
    const dataTemp = [...listData];
    const itemUpdate = { ...listData[index], name: newName };
    dataTemp.splice(index, 1, itemUpdate);
    setListData(dataTemp);
  };
  return (
    <React.Fragment>
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
            <StyledTableHeadCell align="center" width="5%" />
            <StyledTableHeadCell align="left" width="30%">
              <div
                className="cursor-pointer"
                onClick={() => hanldeSort('name')}
              >
                {t('IDS_WP_NAME')}
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_OWNER')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              {t('IDS_WP_SHARE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              {t('IDS_WP_LAST_EDIT')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_FILE_SIZE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
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
                <StyledTableBodyCell
                  align="center"
                  width="5%"
                  className="cursor-pointer"
                  onClick={() => handleClickItem(item)}
                >
                  <FullAvatar src={FileType(item.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  width="30%"
                  className="cursor-pointer"
                  onClick={() => handleClickItem(item)}
                >
                  <ColorTypo color="black">{item.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  {item.owner && item.owner.avatar && (
                    <CustomAvatar
                      src={item.owner.avatar}
                      title={item.owner.name || ''}
                    />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ShareColumnAvatar
                    sharedList={[...item.users_shared]}
                    handleClickAvatar={() => {
                      setVisible(true);
                      setItemActive(item);
                    }}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ColorTypo color="black">{item.updated_at || ''}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{item.size || '-'}</ColorTypo>
                </StyledTableBodyCell>
                {item.type !== 'folder' ? (
                  <MoreAction
                    actionList={moreAction}
                    item={item}
                    handleFetData={() => {
                      getListMyDocument({}, true);
                    }}
                    handleUpdateDataLocal={handleUpdateDataLocal}
                  />
                ) : (
                  <MoreAction
                    actionList={moreActionFolder}
                    item={item}
                    handleFetData={() => {
                      getListMyDocument({}, true);
                    }}
                    handleUpdateDataLocal={handleUpdateDataLocal}
                  />
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={() => handleActionDeleteFile()}
      />
      {visible && (
        <ShareDocumentModal
          onClose={() => {
            setVisible(false);
            setItemActive({});
          }}
          item={itemActive}
        />
      )}
    </React.Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    isLoading: state.documents.isLoading,
    listMyDocument: state.documents.listMyDocument,
    breadCrumbs: state.system.breadCrumbs,
    searchText: state.documents.searchText,
    isFetching: state.documents.isFetching,
    currentFolder: state.documents.currentFolder
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail,
    actionFetchListMyDocument,
    actionChangeBreadCrumbs,
    actionSelectedFolder,
    actionSortListDocument
  }
)(MyDocument);
