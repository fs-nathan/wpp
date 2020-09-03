import React, { useEffect, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  Avatar,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import { reverse } from 'lodash';
import Icon from '@mdi/react';
import { withRouter } from 'react-router-dom';
import {
  mdiAccountPlusOutline,
  mdiSwapVertical,
  mdiContentCopy
} from '@mdi/js';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListProjectOfFolder,
  actionSortListProject,
  actionSelectedFolder
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
import MoreAction from '../../../../components/MoreAction/MoreAction';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';
import { actionChangeBreadCrumbs } from '../../../../actions/system/system';
import ShareColumnAvatar from '../DocumentComponent/ShareColumnAvatar';

const ProjectDocumentDetail = props => {
  const { t } = useTranslation();
  const { isLoading, actionChangeBreadCrumbs, isFetching, breadCrumbs } = props;
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortType, setSortType] = useState(1);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});

  useEffect(() => {
    fetchDataProjectDocumentOfFolder({});
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
      props.actionSelectedFolder({});
    };
  }, []);

  useEffect(() => {
    setListData(props.listProject);
  }, [props.listProject]);

  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
  }, [props.selectedDocument]);

  useEffect(() => {
    let projects = [];
    projects = listData.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === -1) reverse(projects);
    props.actionSortListProject(projects);
  }, [sortField, sortType]);

  useEffect(() => {
    const dataUpdate = handleSearchData(props.searchText, props.listProject);
    setListData(dataUpdate);
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

  const fetchDataProjectDocumentOfFolder = (params = {}, quite = false) => {
    const search = props.location.search.split('taskId=').pop();
    props.actionFetchListProjectOfFolder(
      { task_id: search, ...params },
      quite
    );
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
            fetchDataProjectDocumentOfFolder({}, true);
          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            props.fetchDataProjectDocumentOfFolder(
              { folder_id: item.id },
              true
            );
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            props.fetchDataProjectDocumentOfFolder(
              { folder_id: item.id },
              true
            );
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
  const isSelected = id => selected.indexOf(id) !== -1;
  const handleSelectItem = item => {
    setSelected(selectItem(selected, item.id));
    props.selectDocumentItem(selectItemRedux(props.selectedDocument, item));
  };
  const getIconAvatar = (url, idx = 0, title) => {
    return (
      <Avatar
        key={idx}
        src={url}
        alt="avatar"
        title={title}
        style={{ width: 25, height: 25, margin: 'auto' }}
      />
    );
  };
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: t('IDS_WP_SHARE'), type: 'share' },
    { icon: mdiContentCopy, text: t('IDS_WP_COPY_LINK'), type: 'copy' }
  ];
  if (isLoading) return <LoadingBox />;
  return (
    <Fragment>
      <Table stickyHeader className="doc-table-content">
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
            <StyledTableHeadCell
              align="center"
              width="5%"
            />
            <StyledTableHeadCell align="left" width="40%">
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
            <StyledTableHeadCell align="center" width="15%">
              {t('IDS_WP_SHARE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_OWNER')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_LAST_EDIT')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_SIZE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell
              align="center"
              width="5%"
            />
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
                  onClick={() => handleClickItem(file)}
                >
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  width="20%"
                  onClick={() => handleClickItem(file)}
                >
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ShareColumnAvatar
                    sharedList={[...file.users_shared]}
                    handleClickAvatar={() => {
                      setVisible(true);
                      setItemActive(file);
                    }}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="10%">
                  {(file.user_create_avatar &&
                    getIconAvatar(
                      file.user_create_avatar.indexOf('https:') !== -1 ?
                        file.user_create_avatar :
                        `https://storage.googleapis.com${file.user_create_avatar}`,
                      0,
                      file.user_create_name
                    )) ||
                    ''}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.date_create}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction actionList={moreAction} item={file} />
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
    listProject: state.documents.listProject,
    breadCrumbs: state.system.breadCrumbs,
    isFetching: state.documents.isFetching,
    searchText: state.documents.searchText,
    isLoading: state.documents.isLoading
  }),
  {
    selectDocumentItem,
    actionSortListProject,
    resetListSelectDocument,
    actionChangeBreadCrumbs,
    openDocumentDetail,
    actionSelectedFolder,
    actionFetchListProjectOfFolder
  }
)(withRouter(ProjectDocumentDetail));
