import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  TablePagination,
  TableRow
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountPlusOutline, mdiSwapVertical } from '@mdi/js';
import { withRouter } from 'react-router-dom';

import { Routes } from '../../../../constants/routes';
import ColorTypo from '../../../../components/ColorTypo';
import { getProjectStatic } from './ContentDocumentAction';
import {
  selectDocumentItem,
  resetListSelectDocument
} from '../../../../actions/documents';
import { openDocumentDetail } from '../../../../actions/system/system';
import MoreAction from '../../../../components/MoreAction/MoreAction';
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
  const [data, setData] = useState([]);
  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    fetDataRecentDocument();
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
    };
    // eslint-disable-next-line
  }, []);
  const fetDataRecentDocument = async () => {
    setIsLoading(true);
    const { data } = await getProjectStatic({
      pageSize: 10,
      pageNum: 0
    });
    setData(data.projects);
    setIsLoading(false);
  };
  const handleSelectAllClick = e => {
    setSelected(selectAll(e, data));
    props.selectDocumentItem(selectAllRedux(e, data));
  };
  const handleSelectItem = item => {
    setSelected(selectItem(selected, item.id));
    props.selectDocumentItem(selectItemRedux(props.selectedDocument, item));
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const moreAction = [
    {
      icon: mdiAccountPlusOutline,
      text: 'Chia sẻ',
      type: 'share'
    }
  ];
  const handleChangePage = () => {};
  const openDetail = item => {
    const isDetail =
      item.type === 'word' || item.type === 'pdf' || item.type === 'excel';
    if (isDetail) {
      props.openDocumentDetail(item);
    } else {
      props.history.push({
        pathname: Routes.DOCUMENT_PROJECT,
        search: `?projectId=${item.id}`
      });
    }
  };
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell>
              <GreenCheckbox
                onChange={handleSelectAllClick}
                checked={selected.length === data.length}
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
              />
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="65%">
              <div>
                Tên
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={1} color="#8d8d8d" />
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
          {data.map(project => {
            const isItemSelected = isSelected(project.id);
            return (
              <TableRow
                hover={true}
                key={project.id}
                className="table-body-row"
              >
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={28}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    openDocumentDetail
  }
)(withRouter(ProjectDocument));
