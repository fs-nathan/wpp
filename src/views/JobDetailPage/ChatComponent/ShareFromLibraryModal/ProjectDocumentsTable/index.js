import { IconButton, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { mdiFolderTextOutline, mdiSwapVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { actionFetchListProjectOfFolder, actionSortListProject } from 'actions/documents';
import { actionChangeBreadCrumbs, openDocumentDetail } from 'actions/system/system';
import ColorTypo from 'components/ColorTypo';
import { FileType } from 'components/FileType';
import LoadingBox from 'components/LoadingBox';
import MoreAction from 'components/MoreAction/MoreAction';
import { reverse } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FullAvatar, StyledTableBodyCell, StyledTableHeadCell } from 'views/DocumentPage/TablePart/DocumentComponent/TableCommon';
import './styles.scss';

function ProjectDocumentsTable({ isLoading, listData, setInsideProject }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const breadCrumbs = useSelector(state => state.system.breadCrumbs);

  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);

  useEffect(() => {
    let projects = [];
    // projects = sortBy(listData, [o => get(o, sortField)]);
    projects = listData.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === -1) reverse(projects);
    actionSortListProject(projects);
    // eslint-disable-next-line
  }, [sortField, sortType]);

  const isSelected = id => selected.indexOf(id) !== -1;
  const moreAction = [
    { icon: mdiFolderTextOutline, text: t('IDS_WP_JOIN_PROJECT'), type: 'link' }
  ];
  const openDetail = item => {
    const isDetail =
      item.type === 'word' || item.type === 'pdf' || item.type === 'excel';
    if (isDetail) {
      dispatch(openDocumentDetail(item));
    } else {
      dispatch(actionSortListProject([]));

      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => {

          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {

          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {

          }
        });
      }
      dispatch(actionChangeBreadCrumbs(newBreadCrumbs));
      dispatch(actionFetchListProjectOfFolder({ project_id: item.id }));
      setInsideProject(false);
    }
  };
  if (isLoading) {
    return <LoadingBox />;
  }
  const handleSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };
  return <Table stickyHeader>
    <TableHead>
      <TableRow className="table-header-row">
        <StyledTableHeadCell
          align="left"
          width="5%"
          className="first-column"
        ></StyledTableHeadCell>
        <StyledTableHeadCell align="left" width="50%">
          <div
            className="cursor-pointer"
            onClick={() => handleSort('name')}
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
}

export default ProjectDocumentsTable;