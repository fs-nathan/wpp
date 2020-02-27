import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableHead, TableBody } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import {
  mdiAccountPlusOutline,
  mdiDownloadOutline,
  mdiContentCopy,
  mdiGoogleDrive
} from '@mdi/js';
import {
  selectDocumentItem,
  resetListSelectDocument,
  actionFetchListDocumentShare,
  actionSelectedFolder
} from '../../../../actions/documents';
import {
  actionChangeBreadCrumbs,
  openDocumentDetail
} from '../../../../actions/system/system';
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
import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './ContentDocumentPage.scss';
import ShareDocumentModal from '../DocumentComponent/ShareDocumentModal';
import ShareColumnAvatar from '../DocumentComponent/ShareColumnAvatar';

const DocumentShare = props => {
  const { isLoading, breadCrumbs, actionChangeBreadCrumbs, isFetching } = props;
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemActive, setItemActive] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetDataDocumentShareToMe();
    return () => {
      props.resetListSelectDocument();
      props.actionSelectedFolder({});
      actionChangeBreadCrumbs([]);
    }; // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetDataDocumentShareToMe();
    // eslint-disable-next-line
  }, [props.currentFolder]);
  useEffect(() => {
    if (isEmpty(props.selectedDocument)) setSelected([]);
    // eslint-disable-next-line
  }, [props.selectedDocument]);

  useEffect(() => {
    setListData(props.listDocumentShareToMe);
    // eslint-disable-next-line
  }, [props.listDocumentShareToMe]);

  useEffect(() => {
    const dataUpdate = handleSearchData(
      props.searchText,
      props.listDocumentShareToMe
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

  const fetDataDocumentShareToMe = (params = {}, quite = false) => {
    if (!isEmpty(props.currentFolder)) {
      params.folder_id = props.currentFolder.id;
    }
    props.actionFetchListDocumentShare(params, quite);
  };

  const handleClickItem = item => {
    if (isFetching) return;
    if (item.type === 'folder') {
      // fetDataDocumentShareToMe({ folder_id: item.id }, true);
      props.actionSelectedFolder(item);
      // handle bread crumbs
      let newBreadCrumbs = [...breadCrumbs];
      if (breadCrumbs.length === 0) {
        newBreadCrumbs.push({
          id: -1,
          name: 'Home',
          action: () => {
            props.actionSelectedFolder({});
            fetDataDocumentShareToMe({}, true);
          }
        });
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            fetDataDocumentShareToMe({ folder_id: item.id }, true);
          }
        });
      } else {
        newBreadCrumbs.push({
          id: item.id,
          name: item.name,
          action: () => {
            props.actionSelectedFolder(item);
            fetDataDocumentShareToMe({ folder_id: item.id }, true);
          }
        });
      }
      actionChangeBreadCrumbs(newBreadCrumbs);
    } else {
      if (item.document_type !== 2) {
        props.openDocumentDetail(item);
      } else {
        // google drive file
        let transformData = {
          isGoogleDocument: true,
          noConvertFileSize: true,
          id: item.id,
          name: item.name || '',
          webViewLink: item.url,
          webContentLink: item.url_download,
          url: item.url.split('?')[0].replace('view', 'preview'),
          type: item.type,
          size: item.size,
          user_create: {
            name: item.user_create_name || '',
            avatar: item.user_create_avatar || ''
          }
        };
        props.openDocumentDetail(transformData);
      }
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
  const moreActionFile = [
    { icon: mdiAccountPlusOutline, text: t('IDS_WP_SHARE'), type: 'share' },
    { icon: mdiContentCopy, text: t('IDS_WP_COPY_LINK'), type: 'copy' },
    {
      icon: mdiDownloadOutline,
      text: t('IDS_WP_DOWNLOAD_DOWN'),
      type: 'download'
    }
  ];
  const moreActionFolder = moreActionFile.filter(el => el.type !== 'download');
  if (isLoading) return <LoadingBox />;
  return (
    <Fragment>
      <Table stickyHeader>
        <TableHead>
          <TableRow className="table-header-row">
            <StyledTableHeadCell align="center" width="3%">
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
              {t('IDS_WP_TYPE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">Tên tài liệu</StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="20%">
              {t('IDS_WP_SHARE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_DAY_SHARE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="15%">
              {t('IDS_WP_OWNER')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="10%">
              {t('IDS_WP_SIZE')}
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center" width="5%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map(file => {
            const isItemSelected = isSelected(file.id);
            return (
              <TableRow
                className={`table-body-row ${isItemSelected ? 'selected' : ''}`}
                key={file.id}
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
                  className="position-relative"
                  onClick={() => handleClickItem(file)}
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
                  <CustomAvatar
                    src={file.user_create_avatar}
                    title={file.user_create_name}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell align="center" width="10%">
                  <ColorTypo color="black">{file.size}</ColorTypo>
                </StyledTableBodyCell>
                <MoreAction
                  actionList={
                    file.type === 'folder' ? moreActionFolder : moreActionFile
                  }
                  item={file}
                />
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
    listDocumentShareToMe: state.documents.listDocumentShareToMe,
    searchText: state.documents.searchText,
    isLoading: state.documents.isLoading,
    breadCrumbs: state.system.breadCrumbs,
    isFetching: state.documents.isFetching,
    currentFolder: state.documents.currentFolder
  }),
  {
    selectDocumentItem,
    resetListSelectDocument,
    actionFetchListDocumentShare,
    openDocumentDetail,
    actionChangeBreadCrumbs,
    actionSelectedFolder
  }
)(DocumentShare);
