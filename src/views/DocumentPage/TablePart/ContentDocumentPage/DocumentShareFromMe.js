import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody
  // TablePagination
} from '@material-ui/core';
import Icon from '@mdi/react';
// import { useTranslation } from 'react-i18next';
import {
  mdiAccountPlusOutline,
  mdiDownloadOutline,
  mdiContentCopy,
  mdiGoogleDrive
} from '@mdi/js';
import ShareColumnAvatar from '../DocumentComponent/ShareColumnAvatar';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListDocumentFromMe,
  actionSelectedFolder
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
import {
  actionChangeBreadCrumbs,
  openDocumentDetail
} from '../../../../actions/system/system';
import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';

const DocumentShareFromMe = props => {
  const { isLoading, breadCrumbs, actionChangeBreadCrumbs, isFetching } = props;
  const [selected, setSelected] = useState([]);
  const [listData, setListData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});
  // const { t } = useTranslation();

  useEffect(() => {
    fetDataDocumentShareFromMe();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      props.resetListSelectDocument();
      props.actionSelectedFolder({});
      actionChangeBreadCrumbs([]);
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);

  useEffect(() => {
    setListData(props.listDocumentFromMe);
    // eslint-disable-next-line
  }, [props.listDocumentFromMe]);

  useEffect(() => {
    const dataUpdate = handleSearchData(
      props.searchText,
      props.listDocumentFromMe
    );
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

  const fetDataDocumentShareFromMe = (params = {}, quite = false) => {
    props.actionFetchListDocumentFromMe(params, quite);
  };

  const handleClickItem = item => {
    if (isFetching) return;
    if (item.type === 'folder') {
      fetDataDocumentShareFromMe({ folder_id: item.id }, true);
      props.actionSelectedFolder(item);
      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => {
            props.actionSelectedFolder({});
            fetDataDocumentShareFromMe({}, true);
          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            fetDataDocumentShareFromMe({ folder_id: item.id }, true);
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            fetDataDocumentShareFromMe({ folder_id: item.id }, true);
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
  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' },
    {
      icon: mdiDownloadOutline,
      text: 'Tải xuống',
      type: 'download',
      action: () => {}
    }
  ];
  if (isLoading) {
    return <LoadingBox />;
  }
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
            <StyledTableHeadCell align="center" width="5%">
              Loại
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">Tên tài liệu</StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              Chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Ngày chia sẻ
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              Chủ sở hữu
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              Kích thước
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow className="table-body-row" key={file.id}>
                <StyledTableBodyCell width="3%">
                  <GreenCheckbox
                    checked={isItemSelected}
                    onChange={e => handleSelectItem(file)}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="center"
                  width="5%"
                  onClick={() => handleClickItem(file)}
                  className="position-relative"
                >
                  <FullAvatar src={FileType(file.type)} />
                  {file.document_type === 2 && (
                    <div className="block-icon-share-drive">
                      <Icon
                        className="icon-share-drive"
                        path={mdiGoogleDrive}
                        size={1.4}
                        color="#2196f3"
                      />
                    </div>
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  align="left"
                  onClick={() => handleClickItem(file)}
                >
                  <ColorTypo color="black">{file.name}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="20%">
                  <ShareColumnAvatar
                    sharedList={[...file.users_shared]}
                    handleClickAvatar={() => {
                      setVisible(true);
                      setItemActive(file);
                    }}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.date_share}</ColorTypo>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="15%">
                  <ColorTypo color="black">
                    <CustomAvatar
                      src={file.user_create_avatar}
                      title="user create avatar"
                    />
                  </ColorTypo>
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
    listDocumentFromMe: state.documents.listDocumentFromMe,
    searchText: state.documents.searchText,
    isLoading: state.documents.isLoading,
    breadCrumbs: state.system.breadCrumbs,
    isFetching: state.documents.isFetching
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    actionFetchListDocumentFromMe,
    openDocumentDetail,
    actionChangeBreadCrumbs,
    actionSelectedFolder
  }
)(DocumentShareFromMe);
