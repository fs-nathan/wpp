import React, { useState, useCallback, useEffect } from 'react';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  mdiUpload,
  mdiPlus,
  mdiFileUploadOutline,
  mdiFolderPlusOutline,
  mdiChevronRight,
  mdiCloudUploadOutline
} from '@mdi/js';
import {
  Menu,
  MenuItem,
  Breadcrumbs,
  TextField,
  CircularProgress
} from '@material-ui/core';
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
import './DocumentPage.scss';
import ModalCommon from './DocumentComponent/ModalCommon';
import RedirectModal from './DocumentComponent/RedirectModal';
import {
  actionCreateFolder,
  actionFetchListMyDocument
} from '../../../actions/documents';
import UploadModal from '../../../components/UploadModal';
import { actionChangeBreadCrumbs } from '../../../actions/system/system';
import {
  mdiClockOutline,
  mdiFileDocumentBoxOutline,
  mdiFolderOpenOutline,
  mdiFileMoveOutline,
  mdiFileUndoOutline,
  mdiGoogleDrive,
  mdiTrashCanOutline
} from '@mdi/js';
import { useDropzone } from 'react-dropzone';

const HeaderTitle = props => {
  return <ColorTypo className="title">{props.title || ''}</ColorTypo>;
};

const HeaderBreadCrumbs = ({
  breadCrumbs = [],
  onUpdateBreadCrumbs,
  title = 'Title',
  srcImg,
  colorIcon = 'rgba(0, 0, 0, 0.54)',
  isTrash = false
}) => {
  const { t } = useTranslation();
  const [currentBreadCrumbs, setCurrentBeadCrumbs] = useState([]);

  useEffect(() => {
    if (breadCrumbs.length > 3) {
      let len = breadCrumbs.length;
      let breadTemp = [
        { ...breadCrumbs[len - 3] },
        { ...breadCrumbs[len - 2] },
        { ...breadCrumbs[len - 1] }
      ];

      breadTemp[0].title = breadTemp[0].name;
      breadTemp[0].name = '...';
      setCurrentBeadCrumbs([...breadTemp]);
    } else {
      setCurrentBeadCrumbs(breadCrumbs);
    }
  }, [breadCrumbs]);

  return (
    <div className="header-wrapper">
      {srcImg && (
        <Icon
          className="header-icon"
          path={srcImg}
          size={1.3}
          color={colorIcon}
        />
      )}
      <div className="title-wrapper">
        <HeaderTitle title={title} />
        {currentBreadCrumbs.length > 0 && (
          <Breadcrumbs
            className="bread-crumb"
            aria-label="breadcrumb"
            separator={<Icon path={mdiChevronRight} size={1} color={'#777'} />}
          >
            {currentBreadCrumbs.map((item, idx) => (
              <span
                className="bread-crumb-item"
                key={idx}
                title={item.title || ''}
                onClick={() => {
                  // do not anything if click ending item
                  if (idx === currentBreadCrumbs.length - 1) return false;

                  // call action
                  item.action();

                  //update list bread crumbs
                  if (onUpdateBreadCrumbs) {
                    if (currentBreadCrumbs.length === breadCrumbs.length) {
                      if (idx === 0) {
                        onUpdateBreadCrumbs([]);
                      } else {
                        let newList = [...breadCrumbs];
                        newList.length = idx + 1;
                        onUpdateBreadCrumbs(newList);
                      }
                    } else {
                      if (idx === 0) {
                        let newList = [...breadCrumbs];
                        newList.length = breadCrumbs.length - 2;
                        onUpdateBreadCrumbs(newList);
                      } else if (idx === 1) {
                        let newList = [...breadCrumbs];
                        newList.length = breadCrumbs.length - 1;
                        onUpdateBreadCrumbs(newList);
                      }
                    }
                  }
                }}
              >
                {item.name || ''}
              </span>
            ))}
          </Breadcrumbs>
        )}
        {isTrash && currentBreadCrumbs.length === 0 && (
          <span className="sub-title">{t('IDS_WP_TRASH_DES')}</span>
        )}
      </div>
    </div>
  );
};

const getHeaderContent = (
  type,
  search,
  breadCrumbs,
  onUpdateBreadCrumbs,
  t
) => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
      return (
        <div className="header-wrapper">
          <Icon
            className="header-icon"
            path={mdiClockOutline}
            size={1.3}
            color={'#ffc107'}
          />
          <div className="title-wrapper">
            <HeaderTitle title={t('IDS_WP_RECENT')} />
          </div>
        </div>
      );
    case Routes.DOCUMENT_PROJECT: {
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_PROJECT_DOCUMENT')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          srcImg={mdiFileDocumentBoxOutline}
          colorIcon={'#4caf50'}
        />
      );
    }
    case Routes.DOCUMENT_SHARE:
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_SHARED')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          srcImg={mdiFileMoveOutline}
          colorIcon={'#f44336'}
        />
      );
    case Routes.DOCUMENT_SHARE_ME:
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_SHARE_WITH_ME')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          srcImg={mdiFileUndoOutline}
          colorIcon={'#607d8b'}
        />
      );
    case Routes.DOCUMENT_ME:
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_MY_DOCUMENT')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          srcImg={mdiFolderOpenOutline}
          colorIcon={'#ff9800'}
        />
      );
    case Routes.DOCUMENT_GOOGLE_DRIVE:
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_GOOGLE_DRIVE')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          colorIcon={'#2196f3'}
          srcImg={mdiGoogleDrive}
        />
      );
    case Routes.DOCUMENT_TRASH:
      return (
        <HeaderBreadCrumbs
          title={t('IDS_WP_TRASH')}
          breadCrumbs={breadCrumbs}
          onUpdateBreadCrumbs={onUpdateBreadCrumbs}
          srcImg={mdiTrashCanOutline}
          colorIcon={'#777'}
          isTrash
        />
      );
    default:
      return null;
  }
};

const TablePart = props => {
  const { t } = useTranslation();
  const pathname = props.history.location.pathname;
  const search = props.location.search;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateFolder, setCreateFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [showInputFile, setShowInputFile] = useState(true);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [isRedirect, setRedirect] = useState(false);
  const {
    breadCrumbs,
    actionChangeBreadCrumbs,
    currentFolder,
    isFetching: showLoadingTable
  } = props;

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles) {
      setFileUpload(acceptedFiles);
      setVisibleUploadModal(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

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
      text: t('IDS_WP_CREATE_FOLDER'),
      icon: mdiFolderPlusOutline,
      action: () => setCreateFolder(true)
    },
    {
      text: t('IDS_WP_UPLOAD_FILE'),
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
            actionChangeBreadCrumbs,
            t
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
              className="right-header-button"
            >
              <Icon path={mdiPlus} size={1} color="#fff" />
              {t('IDS_WP_ADD_NEW')}
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
                className="right-header-button"
              >
                <Icon path={mdiUpload} size={1} color="#fff" />
                {t('IDS_WP_UPLOAD_UPPERCASE')}
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
        {showLoadingTable && (
          <div className="loading-table">
            <div className="mark-back"></div>
            <CircularProgress className="progress-turn" />
          </div>
        )}
        {pathname === Routes.DOCUMENT_ME && (
          <div
            {...getRootProps({
              onClick: event => event.stopPropagation()
            })}
            className={'drag-over-overlay'}
          >
            <input {...getInputProps()} />
            {isDragActive && (
              <div className="drop-area">
                <div className="dashed-box">
                  <Icon
                    className="drop-ic-clould"
                    path={mdiCloudUploadOutline}
                    size={5}
                    color={'#c3c3c3'}
                  />
                  <div className="des-drop">{t('IDS_WP_DRAG_FILE')}</div>
                </div>
              </div>
            )}
            <Scrollbars autoHide autoHideTimeout={500}>
              <MyDocument {...props} />
            </Scrollbars>
          </div>
        )}
        {pathname !== Routes.DOCUMENT_ME && (
          <Scrollbars autoHide autoHideTimeout={500}>
            {getContentDocument()}
          </Scrollbars>
        )}
      </div>
      {isCreateFolder && (
        <ModalCommon
          title={t('IDS_WP_CREATE_FOLDER')}
          onClose={() => {
            setCreateFolder(false);
            setNameFolder('');
          }}
          footerAction={[
            { name: t('IDS_WP_CREATE_NEW'), action: () => handleCreateFolder() }
          ]}
        >
          <DialogContent dividers className="dialog-content">
            <TextField
              value={nameFolder}
              id="standard-full-width"
              variant="outlined"
              label={t('IDS_WP_INPUT_NEW_FOLDER_NAME')}
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
          title={t('IDS_WP_UPLOAD_DOCUMENT')}
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
    currentFolder: state.documents.currentFolder,
    isFetching: state.documents.isFetching
  }),
  { actionChangeBreadCrumbs, actionFetchListMyDocument }
)(withRouter(TablePart));
