import React, { useState } from 'react';
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
import { closeDocumentDetail } from '../../actions/system/system';
import ColorTypo from '../ColorTypo';
import Comment from './Comment/Comment';
import DocInfo from './DocInfo/DocInfo';
import Download from './Download/Download';
import './DocumentDetail.scss';
import AlertModal from '../AlertModal';
import ShareDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal';

// const fileUrl =
//   'https://storage.googleapis.com/storage_vtask_net/1570269502161-%5B19_12_2018%5D.cv_en.docx';

const DocumentDetail = props => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('comment');
  const fileInfo = props.documentFile || {};
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
    let subtitle = file.user_create_name;
    if (file.date_create) {
      subtitle = subtitle + ' - ' + file.date_create;
    }
    if (file.size) {
      subtitle = subtitle + ' - ' + file.size;
    }
    return subtitle;
  };
  const handleShareDoc = () => {
    console.log('handle share document', fileInfo);
    setVisible(false);
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
            {fileInfo.user_create_avatar && (
              <Avatar
                src={`https://storage.googleapis.com${fileInfo.user_create_avatar}`}
                alt="avatar"
              />
            )}
            <div className="owner-info">
              <ColorTypo bold color="orange" className="file-name">
                {fileInfo.name}
              </ColorTypo>
              <div className="sub-title">{getSubtitle(fileInfo)}</div>
            </div>
          </div>
          <div className="document-actions">
            <IconButton color="inherit" className="btn-action">
              <Badge
                badgeContent={'N'}
                invisible={false}
                className="badge-new"
                onClick={() => setType('comment')}
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
              {/* <a
                href={fileInfo.url}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  onClick={() => setType('download')}
                  path={mdiDownload}
                  size={1}
                  color="rgba(0, 0, 0, 0.54)"
                />
              </a> */}
              <Icon path={mdiDownload} size={1} color="rgba(0, 0, 0, 0.54)" />
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
            <IconButton
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              className="btn-action"
            >
              <Icon path={mdiClose} size={1} />
            </IconButton>
          </div>
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
              Chia sẻ
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMoreAction();
                setAlert(true);
              }}
            >
              Xóa tài liệu
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className={`document-detail-container ${!type ? 'full-page' : ''}`}>
        <div className="view-file-wrapper">
          <iframe
            className="google-view-file"
            title="read-file"
            // src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
            src={`${fileInfo.url}`}
            id="file_view"
          />
        </div>
        {type === 'comment' && (
          <div className="right-wrapper">
            <Comment fileInfo={fileInfo} closeComment={() => setType(null)} />
          </div>
        )}
        {type === 'info' && (
          <div className="right-wrapper">
            <DocInfo fileInfo={fileInfo} closeComment={() => setType(null)} />
          </div>
        )}
        {type === 'download' && (
          <div className="right-wrapper">
            <Download fileInfo={fileInfo} closeComment={() => setType(null)} />
          </div>
        )}
      </div>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => console.log('ok')}
      />
      {visible && (
        <ShareDocumentModal
          onClose={() => setVisible(false)}
          onOk={handleShareDoc}
          item={props.item}
        />
      )}
    </Dialog>
  );
};

export default connect(
  state => ({
    isDocumentDetail: state.system.isDocumentDetail,
    documentFile: state.system.documentFile
  }),
  {
    closeDocumentDetail
  }
)(withRouter(DocumentDetail));
