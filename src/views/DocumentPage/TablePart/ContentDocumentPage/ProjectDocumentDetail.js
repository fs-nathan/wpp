import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  Avatar,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import { get, sortBy, reverse } from 'lodash';
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
  actionSortListProject
} from '../../../../actions/documents';
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
import './ContentDocumentPage.scss';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';
import { actionChangeBreadCrumbs } from '../../../../actions/system/system';

const ProjectDocumentDetail = props => {
  const { isLoading, listProject: listData, actionChangeBreadCrumbs } = props;
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortType, setSortType] = useState(1);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});

  useEffect(() => {
    const search = props.location.search.split('projectId=').pop();
    fetDataProjectDocumentOfFolder({ project_id: search });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
      actionChangeBreadCrumbs([]);
    };
    // eslint-disable-next-line
  }, []);
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
  const hanldeSort = field => {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  };

  const fetDataProjectDocumentOfFolder = (params = {}, quite = false) => {
    props.actionFetchListProjectOfFolder(params, quite);
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
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' }
  ];
  if (isLoading) {
    return <LoadingBox />;
  }
  return (
    <Fragment>
      <Table stickyHeader className="doc-table-content">
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
            <StyledTableHeadCell
              align="center"
              width="5%"
            ></StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="20%">
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
            <StyledTableHeadCell align="left" width="20%">
              Công việc
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left" width="10%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Sửa đổi lần cuối
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
            <StyledTableHeadCell
              align="center"
              width="5%"
            ></StyledTableHeadCell>
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
                <StyledTableBodyCell align="center" width="5%">
                  <FullAvatar src={FileType(file.type)} />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="20%">
                  <ColorTypo color="black">{file.task_name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  {file.shared_member &&
                    file.shared_member.length > 0 &&
                    file.shared_member.map(
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
                </StyledTableBodyCell>
                <StyledTableBodyCell align="left" width="10%">
                  {(file.user_create_avatar &&
                    getIconAvatar(
                      `https://storage.googleapis.com${file.user_create_avatar}`
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
    listProject: state.documents.listProject
  }),
  {
    selectDocumentItem,
    actionSortListProject,
    resetListSelectDocument,
    actionChangeBreadCrumbs,
    actionFetchListProjectOfFolder
  }
)(withRouter(ProjectDocumentDetail));
