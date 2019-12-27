import React, { useState } from 'react';
import Icon from '@mdi/react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  mdiUpload,
  mdiPlus,
  mdiFileUploadOutline,
  mdiFolderPlusOutline,
  mdiChevronRight
} from '@mdi/js';
import { Menu, MenuItem, Breadcrumbs, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import { Routes } from '../../../constants/routes';
import RecentContent from './ContentDocumentPage/RecentContent';
import ProjectDocument from './ContentDocumentPage/ProjectDocument';
import ProjectDocumentDetail from './ContentDocumentPage/ProjectDocumentDetail';
import MyDocument from './ContentDocumentPage/MyDocument';
import {
  RightHeader,
  StyledButton,
  DialogContent
} from './DocumentComponent/TableCommon';
import GoogleDrive from './ContentDocumentPage/GoogleDrive';
import Trash from './ContentDocumentPage/Trash';
import DocumentShareFromMe from './ContentDocumentPage/DocumentShareFromMe';
import DocumentShare from './ContentDocumentPage/DocumentShare';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import folderIcon from '../../../assets/folder.png';
import './DocumentPage.scss';
import ModalCommon from './DocumentComponent/ModalCommon';
import RedirectModal from './DocumentComponent/RedirectModal';
import {
  actionCreateFolder,
  actionFetchListMyDocument
} from '../../../actions/documents';
import UploadModal from '../../../components/UploadModal';
import { actionChangeBreadCrumbs } from '../../../actions/system/system';

const HeaderTitle = props => {
  return <ColorTypo className="title">{props.title || ''}</ColorTypo>;
};

const HeaderBreadCrumbs = ({
  breadCrumbs = [],
  onUpdateBreadCrumbs,
  isShowIcon = true,
  title = 'Title'
}) => {
  return (
    <div className="header-wrapper">
      {isShowIcon && <img className="header-icon" src={folderIcon} alt="" />}
      <div className="title-wrapper">
        <HeaderTitle title={title} />
        {breadCrumbs.length > 0 && (
          <Breadcrumbs
            className="bread-crumb"
            aria-label="breadcrumb"
            separator={<Icon path={mdiChevronRight} size={1} color={'#777'} />}
          >
            {breadCrumbs.map((item, idx) => (
              <span
                className="bread-crumb-item"
                key={idx}
                onClick={() => {
                  // do not anything if click ending item
                  if (idx === breadCrumbs.length - 1) return false;

                  // call action
                  item.action();

                  //update list bread crumbs
                  if (onUpdateBreadCrumbs) {
                    if (idx === 0) {
                      onUpdateBreadCrumbs([]);
                    } else {
                      let newList = [...breadCrumbs];
                      newList.length = idx + 1;
                      onUpdateBreadCrumbs(newList);
                    }
                  }
                }}
              >
                {item.name || ''}
              </span>
            ))}
          </Breadcrumbs>
        )}
      </div>
    </div>
  );
};

const getHeaderContent = (type, search, breadCrumbs, onUpdateBreadCrumbs) => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
      return <HeaderTitle title="Gần đây" />;
    case Routes.DOCUMENT_PROJECT: {
      return (
        <HeaderBreadCrumbs
          title="Tài liệu dự án"
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
        />
      );
    }
    case Routes.DOCUMENT_SHARE:
      return <HeaderTitle title="Đã chia sẻ" />;
    case Routes.DOCUMENT_SHARE_ME:
      return <HeaderTitle title="Được chia sẻ với tôi" />;
    case Routes.DOCUMENT_ME:
      return (
        <HeaderBreadCrumbs
          title="Tài liệu của tôi"
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
        />
      );
    case Routes.DOCUMENT_GOOGLE_DRIVE:
      return (
        <HeaderBreadCrumbs
          title="Google Drive"
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          isShowIcon={false}
        />
      );
    case Routes.DOCUMENT_TRASH:
      return (
        <div className="header-wrapper">
          <img className="header-icon" src={folderIcon} alt="" />
          <div className="title-wrapper">
            <HeaderTitle title="Thùng rác" />
            <span className="sub-title">
              Thùng rác sẽ tự động xóa vĩnh viễn sau 30 ngày!
            </span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const TablePart = props => {
  const pathname = props.history.location.pathname;
  const search = props.location.search;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateFolder, setCreateFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [showInputFile, setShowInputFile] = useState(true);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [isRedirect, setRedirect] = useState(false);
  const { breadCrumbs, actionChangeBreadCrumbs, currentFolder } = props;

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const getContentDocument = () => {
    const isProjectDocument = isEmpty(props.location.search);
    switch (pathname) {
      case Routes.DOCUMENT_RECENT:
        return <RecentContent {...props} />;
      case Routes.DOCUMENT_PROJECT: {
        if (isProjectDocument) {
          return <ProjectDocument {...props} />;
        }
        return <ProjectDocumentDetail {...props} />;
      }
      case Routes.DOCUMENT_SHARE:
        return <DocumentShareFromMe {...props} />;
      case Routes.DOCUMENT_SHARE_ME:
        return <DocumentShare {...props} />;
      case Routes.DOCUMENT_ME:
        return <MyDocument {...props} />;
      case Routes.DOCUMENT_GOOGLE_DRIVE:
        return <GoogleDrive {...props} />;
      case Routes.DOCUMENT_TRASH:
        return <Trash {...props} />;
      default:
        return null;
    }
  };
  const listAction = [
    {
      text: 'Tạo thư mục',
      icon: mdiFolderPlusOutline,
      action: () => setCreateFolder(true)
    },
    {
      text: 'Tải tệp lên',
      icon: mdiFileUploadOutline,
      action: () => {
        document.getElementById('raised-button-file').click();
      }
    }
  ];
  const handleCreateFolder = async () => {
    try {
      await actionCreateFolder({
        name: nameFolder,
        parent_id: props.currentFolder.id
      });
      console.log(breadCrumbs);
      if (isEmpty(breadCrumbs)) {
        props.actionFetchListMyDocument({}, true);
      } else {
        props.actionFetchListMyDocument(
          { folder_id: breadCrumbs[breadCrumbs.length - 1].id },
          true
        );
      }
      setCreateFolder(false);
      setNameFolder('');
    } catch (error) {
      setCreateFolder(false);
      setNameFolder('');
    }
  };

  const handleUploadFile = e => {
    const { files } = e.target;
    if (files) {
      setFileUpload(files);
      setVisibleUploadModal(true);
    }

    // reset input file
    setShowInputFile(false);
    setTimeout(() => {
      setShowInputFile(true);
    }, 0);
  };

  return (
    <div className="header-setting-container header-document">
      <div className="header-setting">
        <div className="header-left-content">
          {getHeaderContent(
            pathname,
            search,
            breadCrumbs,
            actionChangeBreadCrumbs
          )}
        </div>
        <RightHeader>
          <HeaderButtonGroup />
          {pathname === Routes.DOCUMENT_ME ? (
            <StyledButton
              size="small"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="btn-top-action right-header-button"
            >
              <Icon path={mdiPlus} size={1} color="#fff" />
              THÊM MỚI
            </StyledButton>
          ) : (
            pathname !== Routes.DOCUMENT_GOOGLE_DRIVE &&
            pathname !== Routes.DOCUMENT_TRASH && (
              <StyledButton
                size="small"
                onClick={() => {
                  if (pathname === Routes.DOCUMENT_ME) {
                    document.getElementById('raised-button-file').click();
                  } else {
                    setRedirect(true);
                  }
                }}
                className="btn-top-action right-header-button"
              >
                <Icon path={mdiUpload} size={1} color="#fff" />
                TẢI LÊN
              </StyledButton>
            )
          )}
          {showInputFile && (
            <input
              className="input-file"
              id="raised-button-file"
              type="file"
              multiple="multiple"
              onChange={handleUploadFile}
            />
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ vertical: -50, horizontal: 0 }}
          >
            {listAction.map((el, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  handleClose();
                  el.action(el);
                }}
                className={`${
                  idx % 2 === 0 && idx < listAction.length - 1
                    ? 'border-item'
                    : ''
                }`}
              >
                <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
                &nbsp;&nbsp;&nbsp;{el.text}
              </MenuItem>
            ))}
          </Menu>
        </RightHeader>
      </div>
      <div className="setting-right-content">
        <Scrollbars autoHide autoHideTimeout={500}>
          {getContentDocument()}
        </Scrollbars>
      </div>
      {isCreateFolder && (
        <ModalCommon
          title="Tạo thư mục"
          onClose={() => setCreateFolder(false)}
          footerAction={[
            {
              name: 'Hủy',
              action: () => {
                setCreateFolder(false);
                setNameFolder('');
              }
            },
            { name: 'Tạo mới', action: () => handleCreateFolder() }
          ]}
        >
          <DialogContent dividers className="dialog-content">
            <TextField
              value={nameFolder}
              id="standard-full-width"
              variant="outlined"
              label="Nhập tên thư mục mới"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              className="create-order-title"
              onChange={event => setNameFolder(event.target.value)}
            />
          </DialogContent>
        </ModalCommon>
      )}
      {visibleUploadModal && (
        <UploadModal
          title="Tải tài liệu lên"
          open={visibleUploadModal}
          setOpen={val => setVisibleUploadModal(val)}
          fileUpload={fileUpload}
          onCompleted={() => {
            let params = {};
            if (!isEmpty(currentFolder)) {
              params.folder_id = currentFolder.id;
            }
            props.actionFetchListMyDocument(params, true);
          }}
        />
      )}
      {isRedirect && <RedirectModal onClose={() => setRedirect(false)} />}
    </div>
  );
};

export default connect(
  state => ({
    breadCrumbs: state.system.breadCrumbs,
    currentFolder: state.documents.currentFolder
  }),
  { actionChangeBreadCrumbs, actionFetchListMyDocument }
)(withRouter(TablePart));
