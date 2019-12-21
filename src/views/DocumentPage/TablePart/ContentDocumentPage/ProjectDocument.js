import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  // TablePagination,
  TableRow
} from '@material-ui/core';
import { get, sortBy, reverse } from 'lodash';
import Icon from '@mdi/react';
import {
  mdiAccountPlusOutline,
  mdiSwapVertical,
  mdiContentCopy
} from '@mdi/js';
import { withRouter } from 'react-router-dom';

import { Routes } from '../../../../constants/routes';
import ColorTypo from '../../../../components/ColorTypo';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListProject,
  actionSortListProject
} from '../../../../actions/documents';
import { openDocumentDetail } from '../../../../actions/system/system';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';
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
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';

const ProjectDocument = props => {
  const { isLoading } = props;
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);

  useEffect(() => {
    fetDataProjectDocument();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setListData(props.listProject);
    // eslint-disable-next-line
  }, [props.listProject]);
  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);
  useEffect(() => {
    let projects = [];
    projects = sortBy(listData, [o => get(o, sortField)]);
    if (sortType === -1) reverse(projects);
    props.actionSortListProject(projects);
    // eslint-disable-next-line
  }, [sortField, sortType]);

  useEffect(() => {
    const pathname = props.history.location.pathname;
    const isProjectDocument = isEmpty(props.location.search);
    if (pathname === Routes.DOCUMENT_PROJECT && isProjectDocument) {
      const dataUpdate = handleSearchData(props.searchText, props.listProject);
      setListData(dataUpdate);
    }
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
  const fetDataProjectDocument = (params = {}, quite = false) => {
    props.actionFetchListProject(params, quite);
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
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' }
  ];
  const openDetail = item => {
    const isDetail =
      item.type === 'word' || item.type === 'pdf' || item.type === 'excel';
    if (isDetail) {
      props.openDocumentDetail(item);
    } else {
      props.actionSortListProject([]);
      props.history.push({
        pathname: Routes.DOCUMENT_PROJECT,
        search: `?projectId=${item.id}`
      });
    }
  };
  if (isLoading) {
    return <LoadingBox />;
  }
  const hanldeSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };
  return (
    <React.Fragment>
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
            <StyledTableHeadCell align="left" width="65%">
              <div
                className="cursor-pointer"
                onClick={() => hanldeSort('name')}
              >
                Tên
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Sổ tài liệu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((project, index) => {
            const isItemSelected = isSelected(project.id);
            return (
              <TableRow hover={true} key={index} className="table-body-row">
                <StyledTableBodyCell>
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(project)}
                    onClick={e => e.stopPropagation()}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="5%"
                  className="cursor-pointer"
                  onClick={() => openDetail(project)}
                >
                  <FullAvatar src={FileType('folder')} />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  width="60%"
                  className="cursor-pointer"
                  onClick={() => openDetail(project)}
                >
                  <ColorTypo color="black">{project.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{project.number_document}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction actionList={moreAction} item={project} />
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
    listProject: state.documents.listProject,
    searchText: state.documents.searchText
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail,
    actionFetchListProject,
    actionSortListProject
  }
)(withRouter(ProjectDocument));
