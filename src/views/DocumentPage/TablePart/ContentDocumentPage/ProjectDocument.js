import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Table, TableHead, TableBody, IconButton, TableRow} from '@material-ui/core';
import {reverse} from 'lodash';
import Icon from '@mdi/react';
import {mdiSwapVertical, mdiFolderTextOutline} from '@mdi/js';
import {withRouter} from 'react-router-dom';
import {Routes} from '../../../../constants/routes';
import ColorTypo from '../../../../components/ColorTypo';
import {resetListSelectDocument, actionFetchListProject, actionSortListProject} from '../../../../actions/documents';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import {isEmpty} from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';
import {StyledTableHeadCell, StyledTableBodyCell, FullAvatar} from '../DocumentComponent/TableCommon';
import {actionChangeBreadCrumbs} from '../../../../actions/system/system';
import {FileType} from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';

const ProjectDocument = props => {
  const { t } = useTranslation();
  const { isLoading, breadCrumbs, actionChangeBreadCrumbs } = props;
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});

  useEffect(() => {
    fetDataProjectDocument();
  }, []);

  useEffect(() => {
    return () => {props.resetListSelectDocument();}
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
    const pathname = props.history.location.pathname;
    const isProjectDocument = isEmpty(props.location.search);
    if (pathname === Routes.DOCUMENT_PROJECT && isProjectDocument) {
      const dataUpdate = handleSearchData(props.searchText, props.listProject);
      setListData(dataUpdate);
    }
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

  const isSelected = id => selected.indexOf(id) !== -1;
  const moreAction = [
    { icon: mdiFolderTextOutline, text: t('IDS_WP_JOIN_PROJECT'), type: 'link' }
  ];

  const openDetail = item => {
    props.actionSortListProject([]);
    props.history.push({
      pathname: Routes.DOCUMENT_PROJECT,
      search: `?projectId=${item.id}`
    });
    // handle bread crumbs
    let newBreadCrumbs = [...breadCrumbs];
    if (breadCrumbs.length === 0) {
      newBreadCrumbs.push({
        id: -1,
        name: 'Home',
        action: () => {
          props.history.push({
            pathname: Routes.DOCUMENT_PROJECT
          });
        }
      });
      newBreadCrumbs.push({
        id: item.id,
        name: item.name,
        action: () => {
          props.history.push({
            pathname: Routes.DOCUMENT_PROJECT,
            search: `?projectId=${item.id}`
          });
        }
      });
    } else {
      newBreadCrumbs.push({
        id: item.id,
        name: item.name,
        action: () => {
          props.history.push({
            pathname: Routes.DOCUMENT_PROJECT,
            search: `?projectId=${item.id}`
          });
        }
      });
    }
    actionChangeBreadCrumbs(newBreadCrumbs);
  };
  const hanldeSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };
  if (isLoading) return <LoadingBox />;
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell
              align="left"
              width="5%"
              className="first-column"
            />
            <StyledTableHeadCell align="left" width="50%">
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
            <StyledTableHeadCell align="center" width="30%">
              {t('IDS_WP_DOCUMENT_NOTE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((project, index) => {
            const isItemSelected = isSelected(project.id);
            return (
              <TableRow
                hover={true}
                key={index}
                className={`table-body-row ${isItemSelected ? 'selected' : ''}`}
              >
                <StyledTableBodyCell
                  align="left"
                  width="5%"
                  className="cursor-pointer first-column"
                  onClick={() => openDetail(project)}
                >
                  <FullAvatar src={FileType('folder')} />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  width="50%"
                  className="cursor-pointer"
                  onClick={() => openDetail(project)}
                >
                  <ColorTypo color="black">{project.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="30%">
                  <ColorTypo color="black">{project.number_document}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction actionList={moreAction} item={project} />
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
    </>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    listProject: state.documents.listProject,
    breadCrumbs: state.system.breadCrumbs,
    searchText: state.documents.searchText,
    isLoading: state.documents.isLoading,
  }),
  {
    resetListSelectDocument,
    actionFetchListProject,
    actionChangeBreadCrumbs,
    actionSortListProject
  }
)(withRouter(ProjectDocument));
