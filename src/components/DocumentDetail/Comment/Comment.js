import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, InputBase } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiChevronRight, mdiPlus } from '@mdi/js';
import { connect } from 'react-redux';
import {
  actionFetchListComment,
  actionCreateComment
} from '../../../actions/documents';
import ColorButton from '../../ColorButton';
import LoadingBox from '../../LoadingBox';
import CommentItem from './CommentItem';
import * as images from '../../../assets';
import '../DocumentDetail.scss';
import AlertModal from '../../AlertModal';

const NoComment = ({ imageUrl, title, subTitle, className }) => {
  return (
    <Scrollbars autoHide autoHideTimeout={500}>
      <div className={'no-comment-container ' + className}>
        <img src={imageUrl} alt="" className="img-content" />
        <div className="title">{title}</div>
        <div className="sub-title">{subTitle}</div>
      </div>
    </Scrollbars>
  );
};

const Comment = ({
  closeComment,
  fileInfo,
  listComment,
  isLoading,
  doListComment
}) => {
  const { t } = useTranslation();
  const [addComment, setAddComment] = useState(false);
  const [blockComment, setBlockComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
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

  const handleClickMoreAction = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOnChange = event => {
    setCommentText(event.target.value);
  };

  const handleSendComment = async () => {
    if (!commentText || !fileInfo.id) return;
    try {
      await actionCreateComment(fileInfo.id, commentText);
      getListComment(fileInfo, true);
      setCommentText('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comment-container">
      <div className="header-box-comment">
        <div className="box-title">Thảo luận</div>
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
                  setAlert(true);
                }}
              >
                Xóa tất cả thảo luận của tôi
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setBlockComment(!blockComment);
                  handleCloseMenu();
                }}
              >
                {blockComment ? 'Cho phép thảo luận' : 'Khóa thảo luận'}
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
        {blockComment && (
          <NoComment
            className="dis-comment"
            imageUrl={images.dis_comment}
            title="Chức năng thảo luận đã bị khóa!"
            subTitle="Rất tiếc! chủ sỡ hữu tài liệu đã khóa chức năng thảo luận."
          />
        )}
        {!blockComment && (
          <Scrollbars autoHide autoHideTimeout={500}>
            <div className="add-comment-content">
              {!addComment && (
                <div className="action-add" onClick={() => setAddComment(true)}>
                  <div className="btn-add">
                    <IconButton size="small">
                      <Icon path={mdiPlus} size={1} color="#007bff" />
                    </IconButton>
                  </div>
                  <div className="lb-add">Thêm mới</div>
                </div>
              )}
              {addComment && (
                <div className="comment-content">
                  <InputBase
                    multiline
                    fullWidth
                    rowsMax="4"
                    value={commentText}
                    onChange={handleOnChange}
                    placeholder="Nhập thảo luận..."
                  />
                  <ColorButton
                    onClick={handleSendComment}
                    variant="text"
                    size="small"
                    className="btn-send"
                  >
                    Gửi
                  </ColorButton>
                </div>
              )}
            </div>
            {isLoading && <LoadingBox />}
            {!isLoading && listComment.length > 0 ? (
              <div className="comment-list-wrapper">
                {listComment.map((item, idx) => (
                  <CommentItem
                    key={idx}
                    comment={item}
                    onRefreshList={() => getListComment(fileInfo, true)}
                  />
                ))}
              </div>
            ) : (
              !isLoading && (
                <NoComment
                  imageUrl={images.no_comment}
                  title="Chưa có thảo luận nào!"
                  subTitle="Tài liệu chưa có thảo luận nào. Bạn có muốn thêm thảo luận cho tài liệu này?"
                />
              )
            )}
            <AlertModal
              open={alert}
              setOpen={setAlert}
              content={t(
                'views.user_page.left_part.department_info.alert_content'
              )}
              onConfirm={() => console.log('ok')}
            />
          </Scrollbars>
        )}
      </div>
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
)(Comment);
