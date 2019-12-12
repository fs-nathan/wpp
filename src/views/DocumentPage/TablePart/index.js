import React, { useState } from 'react';
import Icon from '@mdi/react';
import styled from 'styled-components';
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
import GoogleDriver from './ContentDocumentPage/GoogleDriver';
import Trash from './ContentDocumentPage/Trash';
import DocumentShareFromMe from './ContentDocumentPage/DocumentShareFromMe';
import DocumentShare from './ContentDocumentPage/DocumentShare';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import folderIcon from '../../../assets/folder.png';
import './DocumentPage.scss';
import ModalCommon from './DocumentComponent/ModalCommon';
import { actionCreateFolder } from '../../../actions/documents';
import { actionChangeBreadCrumbs } from '../../../actions/setting/setting';

const StyledMenuItem = styled(MenuItem)`
  border-bottom: ${props => (props.border ? '1px solid #ddd' : 'none')};
`;

const HeaderTitle = props => {
  return <ColorTypo className="title">{props.title || ''}</ColorTypo>;
};

const getHeaderContent = (type, search, breadCrumbs, onUpdateBreadCrumbs) => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
      return <HeaderTitle title="Gần đây" />;
    case Routes.DOCUMENT_PROJECT: {
      if (isEmpty(search)) {
        return <HeaderTitle title="Tài liệu dự án" />;
      }
      return (
        <div className="header-wrapper">
          <img className="header-icon" src={folderIcon} alt="" />
          <div className="title-wrapper">
            <HeaderTitle title="Tài liệu dự án" />
            <Breadcrumbs
              className="bread-crumb"
              aria-label="breadcrumb"
              separator={
                <Icon path={mdiChevronRight} size={1} color={'#777'} />
              }
            >
              <span>Tài liệu dự án</span>
              <span>Dự án sản xuất phần mềm</span>
            </Breadcrumbs>
          </div>
        </div>
      );
    }
    case Routes.DOCUMENT_SHARE:
      return <HeaderTitle title="Đã chia sẻ" />;
    case Routes.DOCUMENT_SHARE_ME:
      return <HeaderTitle title="Được chia sẻ với tôi" />;
    case Routes.DOCUMENT_ME:
      return (
        <div className="header-wrapper">
          <img className="header-icon" src={folderIcon} alt="" />
          <div className="title-wrapper">
            <HeaderTitle title="Tài liệu của tôi" />
            {breadCrumbs.length > 0 && (
              <Breadcrumbs
                className="bread-crumb"
                aria-label="breadcrumb"
                separator={
                  <Icon path={mdiChevronRight} size={1} color={'#777'} />
                }
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
    case Routes.DOCUMENT_GOOGLE_DRIVE:
      return <HeaderTitle title="Google Drive" />;
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
  const [isFetDataMy, setIsFetDataMy] = useState(false);
  const { breadCrumbs, actionChangeBreadCrumbs } = props;

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
        return <MyDocument {...props} isFetDataMy={isFetDataMy} />;
      case Routes.DOCUMENT_GOOGLE_DRIVE:
        return <GoogleDriver {...props} />;
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
    { text: 'Tải tệp lên', icon: mdiFileUploadOutline, action: () => {} }
  ];
  const handleCreateFolder = async () => {
    try {
      await actionCreateFolder({
        name: nameFolder
      });
      setIsFetDataMy(!isFetDataMy);
      setCreateFolder(false);
      setNameFolder('');
    } catch (error) {
      setCreateFolder(false);
      setNameFolder('');
    }
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
            >
              <Icon path={mdiPlus} size={1} color="#fff" />
              THÊM MỚI
            </StyledButton>
          ) : (
            pathname !== Routes.DOCUMENT_GOOGLE_DRIVE &&
            pathname !== Routes.DOCUMENT_TRASH && (
              <StyledButton
                size="small"
                onClick={() =>
                  props.history.push({
                    pathname: Routes.SETTING_GROUP_ORDER,
                    search: `?createOder`
                  })
                }
              >
                <Icon path={mdiUpload} size={1} color="#fff" />
                TẢI LÊN
              </StyledButton>
            )
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ vertical: -50 }}
          >
            {listAction.map((el, idx) => (
              <StyledMenuItem
                key={idx}
                onClick={() => {
                  handleClose();
                  el.action(el);
                }}
                border={
                  idx % 2 === 0 && idx < listAction.length - 1 ? 'true' : null
                }
              >
                <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
                &nbsp;&nbsp;&nbsp;{el.text}
              </StyledMenuItem>
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
    </div>
  );
};

export default connect(
  state => ({
    breadCrumbs: state.setting.breadCrumbs
  }),
  { actionChangeBreadCrumbs }
)(withRouter(TablePart));
