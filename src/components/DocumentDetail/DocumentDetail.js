import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  Button,
  MenuItem
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiClose,
  mdiDotsVertical,
  mdiDownload,
  mdiInformationOutline,
  mdiMessageProcessingOutline
} from '@mdi/js';
import {
  closeDocumentDetail,
  canViewFile,
  isImageFile,
  formatBytes
} from '../../actions/system/system';
import ColorTypo from '../ColorTypo';
import Comment from './Comment/Comment';
import DocInfo from './DocInfo/DocInfo';
import Download from './Download/Download';
import './DocumentDetail.scss';
import AlertModal from '../AlertModal';
import ShareDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal';
import {
  getDocumentDetail,
  actionDeleteFile,
  actionFetchListMyDocument,
  actionViewFile,
  actionDownloadFile
} from '../../actions/documents';
import { FileType } from '../FileType';
import { isEmpty } from '../../helpers/utils/isEmpty';

const DocumentDetail = props => {
  const { t } = useTranslation();
  const { currentFolder, colors } = props;
  const fileInfo = props.documentFile || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(
    fileInfo.isGoogleDocument ? null : 'comment'
  );
  const [fileDetail, setFileDetail] = useState({});
  const bgColor = colors.find(item => item.selected === true);

  useEffect(() => {
    if (!fileInfo.isGoogleDocument) handleFetchData();
    // eslint-disable-next-line
  }, [fileInfo]);
  useEffect(() => {
    if (!isEmpty(fileInfo)) handleViewFile();
    // eslint-disable-next-line
  }, []);
  const handleViewFile = async () => {
    console.log('fileInfo', fileInfo);
    try {
      await actionViewFile(fileInfo.id);
    } catch (error) {}
  };

  const handleFetchData = async () => {
    try {
      const { data } = await getDocumentDetail({ file_id: fileInfo.id });
      setFileDetail(data.file);
    } catch (err) {}
  };
  const handleOpenMoreAction = evt => {
    setAnchorEl(evt.currentTarget);
  };
  const handleCloseMoreAction = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    props.closeDocumentDetail();
    setType('comment');
  };

  const getSubtitle = file => {
    if (!file) return '';
    let subtitle = (file.user_create && file.user_create.name) || '';
    if (file.date_create) {
      subtitle = subtitle + ' - ' + file.date_create;
    }
    if (file.size) {
      subtitle =
        subtitle +
        ' - ' +
        (file.isGoogleDocument ? formatBytes(file.size) : file.size);
    }
    return subtitle;
  };

  const handleDeleteFile = async () => {
    if (!fileDetail.id) return;
    try {
      await actionDeleteFile({ file_id: [fileDetail.id] });
      let params = {};
      if (!isEmpty(currentFolder)) {
        params.folder_id = currentFolder.id;
      }
      props.actionFetchListMyDocument(params, true);
      handleCloseDialog();
    } catch (error) {}
  };

  const handleZoomImage = evt => {
    let currentTaget = evt.target;
    if (evt.deltaY > 0) {
      if (currentTaget.width < 100 || currentTaget.height < 100) return;
      let newWidth = currentTaget.width - currentTaget.width * 0.1;
      let newHeight = currentTaget.height - currentTaget.height * 0.1;
      evt.target.width = newWidth;
      evt.target.height = newHeight;
      evt.target.style.cursor = 'zoom-out';
      evt.target.style.maxWidth = 'initial';
      evt.target.style.maxHeight = 'initial';
    } else if (evt.deltaY < 0) {
      let newWidth = currentTaget.width + currentTaget.width * 0.1;
      let newHeight = currentTaget.height + currentTaget.height * 0.1;
      evt.target.width = newWidth;
      evt.target.height = newHeight;
      evt.target.style.cursor = 'zoom-in';
      evt.target.style.maxWidth = 'initial';
      evt.target.style.maxHeight = 'initial';
    }
  };

  return (
    <Dialog
      fullScreen
      open={props.isDocumentDetail}
      onClose={handleCloseDialog}
      className="dialog-document-detail"
    >
      <AppBar className="app-bar-document">
        <Toolbar className="header-dialog">
          <div className="document-info">
            {!fileInfo.isGoogleDocument &&
              fileDetail.user_create &&
              fileDetail.user_create.avatar && (
                <Avatar src={fileDetail.user_create.avatar} alt="avatar" />
              )}
            {fileInfo.isGoogleDocument &&
              fileInfo.user_create &&
              fileInfo.user_create.avatar && (
                <Avatar src={fileInfo.user_create.avatar} alt="avatar" />
              )}
            <div className="owner-info">
              <ColorTypo bold color="orange" className="file-name">
                {fileInfo.isGoogleDocument ? fileInfo.name : fileDetail.name}
              </ColorTypo>
              <div className="sub-title">
                {getSubtitle(fileInfo.isGoogleDocument ? fileInfo : fileDetail)}
              </div>
            </div>
          </div>
          <div className="document-actions">
            {!fileInfo.isGoogleDocument && (
              <React.Fragment>
                <IconButton
                  color="inherit"
                  className="btn-action"
                  onClick={() => setType('comment')}
                >
                  <Badge
                    badgeContent={'N'}
                    invisible={false}
                    className="badge-new"
                  >
                    <Icon
                      path={mdiMessageProcessingOutline}
                      size={1}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  className="btn-action"
                  onClick={() => setType('info')}
                >
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  className="btn-action"
                  onClick={() => setType('download')}
                >
                  <Icon
                    path={mdiDownload}
                    size={1}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  className="btn-action"
                  aria-controls="more-action"
                  aria-haspopup="true"
                  onClick={handleOpenMoreAction}
                >
                  <Icon
                    path={mdiDotsVertical}
                    size={1}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </IconButton>
              </React.Fragment>
            )}
            <IconButton
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              className="btn-action"
            >
              <Icon path={mdiClose} size={1} />
            </IconButton>
          </div>
          {!fileInfo.isGoogleDocument && (
            <Menu
              id="more-action"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMoreAction}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right'
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMoreAction();
                  setVisible(true);
                }}
              >
                {t('IDS_WP_SHARE')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMoreAction();
                  setAlert(true);
                }}
                disabled={!fileDetail.can_modify}
              >
                {t('IDS_WP_DELETE_DOCUMENT')}
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <div className={`document-detail-container ${!type ? 'full-page' : ''}`}>
        <div className="view-file-wrapper" id="viewerId">
          {canViewFile(fileInfo.type) && !fileInfo.isGoogleDocument && (
            <React.Fragment>
              {!isImageFile(fileInfo.type) && (
                <iframe
                  src={`https://drive.google.com/viewerng/viewer?url=${fileInfo.url}&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                  frameBorder="0"
                  className="google-view-file"
                  title="read-file"
                  id="file_view"
                ></iframe>
              )}
              {isImageFile(fileInfo.type) && (
                <div className="img-wrapper">
                  <div className="img-inner">
                    <img
                      src={fileDetail.url}
                      alt=""
                      className="img-file"
                      onWheel={handleZoomImage}
                      onLoad={evt => {
                        const viewerElm = document.getElementById('viewerId');
                        const vH = viewerElm.offsetHeight || 0;
                        const vW = viewerElm.offsetWidth || 0;
                        let elmH = evt.target.height || 0;
                        let elmW = evt.target.width || 0;
                        while (elmH >= vH || elmW >= vW) {
                          elmH *= 0.9;
                          elmW *= 0.9;
                        }
                        evt.target.height = elmH;
                        evt.target.width = elmW;
                      }}
                    />
                  </div>
                </div>
              )}
              {/* <iframe
                className="google-view-file"
                title="read-file"
                src={`https://docs.google.com/a/viewer?url=${fileInfo.url}&embedded=true`}
                // src={fileInfo.url}
                id="file_view"
              /> */}
              {/* <iframe
                src={`https://drive.google.com/viewerng/viewer?url=${fileInfo.url}&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                frameborder="0"
                className="google-view-file"
                title="read-file"
                id="file_view"
              ></iframe> */}
            </React.Fragment>
          )}
          {canViewFile(fileInfo.type) && fileInfo.isGoogleDocument && (
            <React.Fragment>
              <iframe
                className="google-view-file"
                title="read-file"
                src={fileInfo.url}
                id="file_view"
              />
            </React.Fragment>
          )}
          {!canViewFile(fileInfo.type) && (
            <div className="download-box-wrapper">
              <div className="download-box">
                <div className="right-icon">
                  <img
                    src={FileType(fileInfo.type)}
                    alt=""
                    className="icon-file"
                  />
                </div>
                <div className="box-content">
                  <div className="box-title">
                    {t('IDS_WP_OPPS_NOT_PREVIEW_FILE')}
                  </div>
                  <div className="open-origin-file">
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn-open-file"
                      style={{ backgroundColor: bgColor.color }}
                      onClick={() => {
                        window.open(fileInfo.url, '_blank');
                      }}
                    >
                      {t('IDS_WP_VIEW_ORIGIN_FILE')}
                    </Button>
                  </div>
                  <div>
                    <Button
                      size="small"
                      className="btn-download"
                      startIcon={
                        <Icon path={mdiDownload} size={1} color="#007bff" />
                      }
                      onClick={() => {
                        if (fileInfo.url && !fileInfo.isGoogleDocument) {
                          actionDownloadFile(fileDetail);
                        }
                        if (
                          fileInfo.webContentLink &&
                          fileInfo.isGoogleDocument
                        ) {
                          window.open(fileInfo.webContentLink, '_blank');
                        }
                      }}
                    >
                      {t('IDS_WP_DOWNLOAD')}
                    </Button>
                    {fileInfo.size && (
                      <span className="file-size">
                        (
                        {fileInfo.isGoogleDocument
                          ? formatBytes(fileInfo.size)
                          : fileInfo.size}
                        )
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {type === 'comment' && (
          <div className="right-wrapper">
            <Comment
              fileInfo={fileDetail}
              closeComment={() => setType(null)}
              onRefreshData={handleFetchData}
            />
          </div>
        )}
        {type === 'info' && (
          <div className="right-wrapper">
            <DocInfo
              fileInfo={fileDetail}
              closeComment={() => setType(null)}
              handleFetchData={handleFetchData}
            />
          </div>
        )}
        {type === 'download' && (
          <div className="right-wrapper">
            <Download
              fileInfo={fileDetail}
              closeComment={() => setType(null)}
            />
          </div>
        )}
      </div>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('viIDS_WP_ALERT_CONTENT')}
        onConfirm={handleDeleteFile}
      />
      {visible && (
        <ShareDocumentModal
          onClose={() => setVisible(false)}
          item={props.item}
        />
      )}
    </Dialog>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors,
    isDocumentDetail: state.system.isDocumentDetail,
    documentFile: state.system.documentFile,
    currentFolder: state.documents.currentFolder
  }),
  {
    closeDocumentDetail,
    actionFetchListMyDocument
  }
)(withRouter(DocumentDetail));
