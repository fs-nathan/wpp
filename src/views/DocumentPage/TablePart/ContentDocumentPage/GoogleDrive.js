import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
  Button
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiContentCopy,
  mdiShieldAccount,
  mdiSwapVertical,
  mdiAccountPlusOutline
} from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import MoreAction from '../../../../components/MoreAction/MoreAction';
import './ContentDocumentPage.scss';
import {
  StyledTableHeadCell,
  StyledTableBodyCell,
  FullAvatar,
  CustomAvatar
} from '../DocumentComponent/TableCommon';
import {
  initGoogleDrive,
  checkSignInStatus,
  actionAuthGoogleDrive
} from './googleDriveApi';
import {
  toggleSingoutGoogle,
  actionFetchListGoogleDocument,
  actionSelectedFolder
} from '../../../../actions/documents';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import {
  actionChangeBreadCrumbs,
  openDocumentDetail
} from '../../../../actions/system/system';
import { FileType } from '../../../../components/FileType';
import LoadingBox from '../../../../components/LoadingBox';

const LoginGoogleDrive = props => {
  return (
    <div className="google-driver-container">
      <Icon path={mdiShieldAccount} size={10} color={'#5695e9'} />
      <div className="description">
        Chia sẻ file từ Google Driver của bạn với các thành viên một cách nhanh
        chóng và an toàn.
      </div>
      <div className="btn-action">
        <Button
          variant="contained"
          className="btn-signin"
          onClick={props.onLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

const GoogleDrive = props => {
  const {
    isLoading,
    isFetching,
    breadCrumbs,
    currentFolder,
    listGoogleDocument: listData
  } = props;
  const [isLogged, setLogged] = useState(false);
  const [isCheckingService, setCheckingService] = useState(true);
  const [sortType, setSortType] = useState('desc');

  useEffect(() => {
    return () => {
      props.actionSelectedFolder({});
      props.actionChangeBreadCrumbs([]);
    };
    // eslint-disable-next-line
  }, []);

  const updateSigninStatus = isSignedIn => {
    if (isSignedIn) {
      props.toggleSingoutGoogle(true);
      setLogged(true);
      props.actionFetchListGoogleDocument();
    } else {
      setLogged(false);
      props.toggleSingoutGoogle(false);
    }
  };

  useEffect(() => {
    const driveScript = document.getElementById('google-drive-script');
    if (!driveScript) {
      initGoogleDrive(
        isChecking => {
          setCheckingService(isChecking);
        },
        () => {
          updateSigninStatus(checkSignInStatus());
        },
        err => {
          console.log('LOAD GOOGLE DRIVE FAIL=', err);
        }
      );
    } else {
      setCheckingService(false);
      updateSigninStatus(checkSignInStatus());
    }
    // eslint-disable-next-line
  }, []);

  const handleBreadCrumbs = (item = {}) => {
    let newBreadCrumbs = [...breadCrumbs];
    if (breadCrumbs.length === 0) {
      newBreadCrumbs.push({
        id: -1,
        name: 'Home',
        action: () => props.actionFetchListGoogleDocument({}, true)
      });
      newBreadCrumbs.push({
        id: item.id,
        name: item.name,
        action: () =>
          props.actionFetchListGoogleDocument({ folderId: item.id }, true)
      });
    } else {
      newBreadCrumbs.push({
        id: item.id,
        name: item.name,
        action: () =>
          props.actionFetchListGoogleDocument({ folderId: item.id }, true)
      });
    }
    props.actionChangeBreadCrumbs(newBreadCrumbs);
  };

  const handleClickItem = item => {
    if (isFetching) return;
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      props.actionFetchListGoogleDocument({ folderId: item.id }, true);
      props.actionSelectedFolder(item);
      handleBreadCrumbs(item);
    } else {
      let transformData = {
        isGoogleDocument: true,
        id: item.id,
        name: item.name || '',
        webViewLink: item.webViewLink,
        webContentLink: item.webContentLink,
        url: item.webViewLink.split('?')[0].replace('view', 'preview'),
        type: item.fileExtension,
        size: item.size,
        updated_at: item.modifiedTime
          ? moment(item.modifiedTime).format('YYYY-MM-DD')
          : '',
        date_create: item.createdTime
          ? moment(item.createdTime).format('YYYY-MM-DD')
          : '',
        user_create: {
          name: item.owners[0].displayName || '',
          avatar: item.owners[0].photoLink || ''
        }
      };
      props.openDocumentDetail(transformData);
    }
  };

  const formatBytes = useCallback((bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }, []);

  const moreAction = [
    { icon: mdiAccountPlusOutline, text: 'Chia sẻ', type: 'share' },
    { icon: mdiContentCopy, text: 'Copy Link', type: 'copy' }
  ];

  const hanldeSort = field => {
    let params = {};
    if (sortType === 'asc') {
      setSortType('desc');
      params.orderBy = `${field} desc`;
    } else {
      setSortType('asc');
      params.orderBy = `${field} asc`;
    }
    if (!isEmpty(currentFolder)) {
      params.folderId = currentFolder.id;
    }

    props.actionFetchListGoogleDocument(params, true);
  };

  if (isCheckingService || isLoading) {
    return <LoadingBox />;
  }
  return (
    <React.Fragment>
      {(!isLogged || !props.isShowBtnSignoutGoogle) && !isCheckingService && (
        <LoginGoogleDrive
          onLogin={() =>
            actionAuthGoogleDrive(() => {
              updateSigninStatus(checkSignInStatus());
            })
          }
        />
      )}
      {isLogged && props.isShowBtnSignoutGoogle && (
        <Table stickyHeader>
          <TableHead>
            <TableRow className="table-header-row">
              <StyledTableHeadCell
                className="first-column"
                align="left"
                width="5%"
              >
                Loại
              </StyledTableHeadCell>
              <StyledTableHeadCell align="left">
                <div
                  className="cursor-pointer"
                  onClick={() => hanldeSort('name_natural')}
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
              return (
                <TableRow className="table-body-row" key={item.id}>
                  <StyledTableBodyCell
                    align="left"
                    width="5%"
                    className={`first-column 
                      ${
                        item.mimeType === 'application/vnd.google-apps.folder'
                          ? 'cursor-pointer'
                          : ''
                      }`}
                    onClick={() => handleClickItem(item)}
                  >
                    <FullAvatar
                      src={FileType(item.fileExtension || item.mimeType)}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align="left"
                    className={
                      item.mimeType === 'application/vnd.google-apps.folder'
                        ? 'cursor-pointer'
                        : ''
                    }
                    onClick={() => handleClickItem(item)}
                  >
                    <ColorTypo color="black">{item.name}</ColorTypo>
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="center" width="10%">
                    {item.owners &&
                      item.owners.length > 0 &&
                      item.owners[0].photoLink && (
                        <CustomAvatar
                          title={item.owners[0].displayName}
                          src={item.owners[0].photoLink}
                        />
                      )}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="center" width="20%">
                    <ColorTypo color="black">
                      {item.modifiedTime
                        ? moment(item.modifiedTime).format('YYYY-MM-DD')
                        : ''}
                    </ColorTypo>
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align="center" width="10%">
                    <ColorTypo color="black">
                      {item.size ? formatBytes(item.size) : '-'}
                    </ColorTypo>
                  </StyledTableBodyCell>
                  {item.mimeType === 'application/vnd.google-apps.folder' && (
                    <StyledTableBodyCell />
                  )}
                  {item.mimeType !== 'application/vnd.google-apps.folder' && (
                    <MoreAction
                      actionList={moreAction}
                      item={{ ...item, isGoogleDocument: true }}
                    />
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default connect(
  state => ({
    isShowBtnSignoutGoogle: state.documents.isShowBtnSignoutGoogle,
    listGoogleDocument: state.documents.listGoogleDocument,
    isLoading: state.documents.isLoading,
    isFetching: state.documents.isFetching,
    breadCrumbs: state.system.breadCrumbs,
    currentFolder: state.documents.currentFolder
  }),
  {
    toggleSingoutGoogle,
    actionFetchListGoogleDocument,
    actionSelectedFolder,
    actionChangeBreadCrumbs,
    openDocumentDetail
  }
)(GoogleDrive);
