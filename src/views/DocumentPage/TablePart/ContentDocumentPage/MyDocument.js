import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton
} from '@material-ui/core';
import { get, sortBy, reverse } from 'lodash';
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
import { openDocumentDetail } from '../../../../actions/system/system';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListMyDocument,
  actionSelectedFolder,
  actionSortListDocument,
  actionDeleteFolder,
  actionDeleteFile
} from '../../../../actions/documents';
import { actionChangeBreadCrumbs } from '../../../../actions/system/system';
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

const MyDocument = props => {
  const [alert, setAlert] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const {
    isLoading,
    listMyDocument: listData,
    breadCrumbs,
    actionChangeBreadCrumbs
  } = props;
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [fileSelectAction, setFileSelectAction] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getListMyDocument();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
      actionChangeBreadCrumbs([]);
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let listDataTemp = [];
    listDataTemp = sortBy(listData, [o => get(o, sortField)]);
    if (sortType === -1) reverse(listDataTemp);
    props.actionSortListDocument(listDataTemp);
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

  const getListMyDocument = (params = {}, quite = false) => {
    props.actionFetchListMyDocument(params, quite);
  };

  const handleClickItem = item => {
    if (item.type === 'folder') {
      props.actionFetchListMyDocument({ folder_id: item.id }, true);
      props.actionSelectedFolder(item);
      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => getListMyDocument({}, true)
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () =>
            props.actionFetchListMyDocument({ folder_id: item.id }, true)
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () =>
            props.actionFetchListMyDocument({ folder_id: item.id }, true)
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
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' },
    { icon: mdiFolderMove, text: 'Di chuyển tới', type: 'move' },
    { icon: mdiPencilOutline, text: 'Đổi tên', type: 'change' },
    {
      icon: mdiDownloadOutline,
      text: 'Tải xuống',
      type: 'download',
      action: () => {}
    },
    {
      icon: mdiTrashCanOutline,
      text: 'Xóa',
      action: item => {
        setAlert(true);
        setFileSelectAction(item);
      }
    }
  ];
  if (isLoading) {
    return <LoadingBox />;
  }
  const handleActionDeleteFile = async () => {
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
  return (
    <React.Fragment>
      <Table>
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
                Tên
                <IconButton size="small">
                  <Icon path={mdiSwapVertical} size={0.8} color="#8d8d8d" />
                </IconButton>
              </div>
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Sửa đổi lần cuối
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích cỡ tệp
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(item => {
            const isItemSelected = isSelected(item.id);
            return (
              <TableRow className="table-body-row" key={item.id}>
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
                    <CustomAvatar src={item.owner.avatar} />
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  {item.shared_member &&
                    item.shared_member.length > 0 &&
                    item.shared_member.map(
                      (shareMember, idx) =>
                        shareMember.avatar && (
                          <CustomAvatar src={shareMember.avatar} key={idx} />
                        )
                    )}
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
                    handleFetData={() => getListMyDocument({}, true)}
                  />
                ) : (
                  <StyledTableBodyCell align="center" width="5%" />
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => handleActionDeleteFile()}
      />
    </React.Fragment>
  );
};

export default connect(
  state => ({
    selectedDocument: state.documents.selectedDocument,
    isLoading: state.documents.isLoading,
    listMyDocument: state.documents.listMyDocument,
    breadCrumbs: state.system.breadCrumbs
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
