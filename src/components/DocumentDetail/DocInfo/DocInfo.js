import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiChevronRight } from '@mdi/js';
import { connect } from 'react-redux';
import { actionFetchListComment } from '../../../actions/documents';
import LoadingBox from '../../LoadingBox';
import ColorTypo from '../../ColorTypo';
import '../DocumentDetail.scss';
import AlertModal from '../../AlertModal';
import EditDocumentInfoModal from '../../../views/DocumentPage/TablePart/DocumentComponent/EditDocumentInfoModal';

const DocInfo = ({ closeComment, fileInfo, isLoading, doListComment }) => {
  const { t } = useTranslation();
  const [blockComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const openMoreMenu = Boolean(anchorEl);

  const getListComment = (fileInfo, quite) => {
    if (fileInfo.id) {
      doListComment(fileInfo.id, quite);
    }
  };

  useEffect(() => {
    if (!blockComment) {
      getListComment(fileInfo);
    }
    // eslint-disable-next-line
  }, [fileInfo, blockComment]);

  const handleClickMoreAction = e => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleUpdate = () => setVisible(false);
  const listInfo = [
    { name: 'Ngày phát hành', value: '20/12/2019' },
    { name: 'Phiên bản', value: 'Chính thức' },
    { name: 'Người soạn', value: 'Nguyễn Văn An' },
    { name: 'Ký phê duyệt', value: 'Trần Quang' },
    { name: 'Nơi lưu trữ', value: 'Phòng TCHC, tủ 01' }
  ];
  return (
    <div className="comment-container">
      <div className="header-box-comment">
        <div className="box-title">Thông tin tài liệu</div>
        <div className="btn-actions-right">
          <div className="btn-action more-action">
            <IconButton
              size="small"
              aria-label="more"
              aria-controls="more-menu"
              aria-haspopup="true"
              onClick={handleClickMoreAction}
            >
              <Icon
                path={mdiDotsVertical}
                size={1}
                color="rgba(0, 0, 0, 0.54)"
              />
            </IconButton>
            <Menu
              id="more-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMoreMenu}
              onClose={handleCloseMenu}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right'
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  setVisible(true);
                }}
              >
                Chỉnh sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  setAlert(true);
                }}
              >
                Xóa toàn bộ thông tin
              </MenuItem>
            </Menu>
          </div>
          <div className="btn-action btn-collapse">
            <IconButton size="small" onClick={closeComment}>
              <Icon
                path={mdiChevronRight}
                size={1}
                color="rgba(0, 0, 0, 0.54)"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="body-box-comment">
        <Scrollbars autoHide autoHideTimeout={500}>
          {isLoading && <LoadingBox />}
          <div className="comment-item info-item">
            <div className="content-item">
              <div className="header-item">
                <div className="sub-title">Tên tài liệu</div>
                <ColorTypo bold>{fileInfo.name || ''}</ColorTypo>
              </div>
            </div>
            <div className="content-item ">
              <div className="header-item">
                <div className="sub-title">Mô tả tài liệu</div>
                <ColorTypo bold>{fileInfo.task_name || ''}</ColorTypo>
              </div>
            </div>
          </div>
          {listInfo.map((el, idx) => (
            <div className="comment-item" key={idx}>
              <div className="content-item info-content">
                <div className="header-item">
                  <div className="sub-title full-width">{el.name}</div>
                  <div className="info-item-right full-width">
                    <ColorTypo bold>{el.value}</ColorTypo>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('views.user_page.left_part.department_info.alert_content')}
        onConfirm={() => console.log('ok')}
      />
      {visible && (
        <EditDocumentInfoModal
          onClose={() => setVisible(null)}
          onOk={handleUpdate}
          item={fileInfo}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doListComment: (fileId, quite) =>
      dispatch(actionFetchListComment(fileId, quite))
  };
};

export default connect(
  state => ({
    isLoading: state.documents.isLoading,
    listComment: state.documents.listComment
  }),
  mapDispatchToProps
)(DocInfo);
