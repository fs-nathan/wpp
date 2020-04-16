import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, InputBase } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiChevronRight, mdiPlus } from '@mdi/js';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  actionFetchListComment,
  actionCreateComment,
  actionDeleteAllComment,
  actionLockComment,
  actionUnLockComment
} from '../../../actions/documents';
import ColorButton from '../../ColorButton';
import LoadingBox from '../../LoadingBox';
import CommentItem from './CommentItem';
import * as images from '../../../assets';
import { isEmpty } from '../../../helpers/utils/isEmpty';
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
  doListComment,
  pagingComment,
  onRefreshData
}) => {
  const { t } = useTranslation();
  const [addComment, setAddComment] = useState(false);
  const [blockComment, setBlockComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [hasMoreComment, setHasMore] = useState(true);
  const [keyInfinite, setKeyInfinite] = useState(0);
  const openMoreMenu = Boolean(anchorEl);

  useEffect(() => {
    if (fileInfo.id) {
      setBlockComment(!fileInfo.can_discuss);
    }
  }, [fileInfo]);

  useEffect(() => {
    if (pagingComment.total_page && pagingComment.total_page <= 1) {
      setHasMore(false);
    }
  }, [pagingComment.total_page]);

  const getListComment = (fileInfo, quite, page, isLoadMore) => {
    if (fileInfo.id) {
      if (!isLoadMore) {
        setHasMore(true);
        setKeyInfinite(1 - keyInfinite);
      }
      doListComment(fileInfo.id, quite, page, isLoadMore);
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

  const handleDeleteAllMyComment = async () => {
    if (!fileInfo.id) return;
    try {
      await actionDeleteAllComment(fileInfo.id);
      getListComment(fileInfo, true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLockUnlockComment = async () => {
    if (!fileInfo.id) return;
    try {
      if (!blockComment) {
        await actionLockComment(fileInfo.id);
        if (onRefreshData) onRefreshData();
        setBlockComment(true);
      } else {
        await actionUnLockComment(fileInfo.id);
        if (onRefreshData) onRefreshData();
        setBlockComment(false);
      }
    } catch (error) {}
  };

  const handleLoadMore = page => {
    if (page > pagingComment.total_page) {
      setHasMore(false);
      return;
    }
    if (page === pagingComment.total_page) {
      setHasMore(false);
    }
    getListComment(fileInfo, true, page, true);
  };

  return (
    <div className="comment-container">
      <div className="header-box-comment">
        <div className="box-title">{t('IDS_WP_DISCUSS')}</div>
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
                {t('IDS_WP_DELETE_ALL_DISCUSS')}
              </MenuItem>
              {fileInfo.can_modify && (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleLockUnlockComment();
                  }}
                >
                  {blockComment
                    ? t('IDS_WP_ALLOW_DISCUSS')
                    : t('IDS_WP_BLOCK_DISCUSS')}
                </MenuItem>
              )}
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
        {hasMoreComment}
        {!isEmpty(fileInfo) && blockComment && (
          <NoComment
            className="dis-comment"
            imageUrl={images.dis_comment}
            title={t('IDS_WP_BLOCK_COMMENT_TITLE')}
            subTitle={t('IDS_WP_BLOCK_COMMENT_DES')}
          />
        )}
        {!isEmpty(fileInfo) && !blockComment && (
          <Scrollbars autoHide autoHideTimeout={500}>
            <InfiniteScroll
              pageStart={1}
              loadMore={handleLoadMore}
              hasMore={!isLoading && hasMoreComment}
              useWindow={false}
              initialLoad={false}
              key={keyInfinite}
            >
              <div className="add-comment-content">
                {!addComment && (
                  <div
                    className="action-add"
                    onClick={() => setAddComment(true)}
                  >
                    <div className="btn-add">
                      <IconButton size="small">
                        <Icon path={mdiPlus} size={1} color="#007bff" />
                      </IconButton>
                    </div>
                    <div className="lb-add">{t('IDS_WP_ADD')}</div>
                  </div>
                )}
                {addComment && (
                  <div className="comment-content">
                    <InputBase
                      multiline
                      fullWidth
                      rowsMax="7"
                      value={commentText}
                      onChange={handleOnChange}
                      placeholder={t('IDS_WP_INPUT_COMMENT')}
                    />
                    <ColorButton
                      onClick={handleSendComment}
                      variant="text"
                      size="small"
                      className="btn-send"
                    >
                      {t('IDS_WP_SEND')}
                    </ColorButton>
                  </div>
                )}
              </div>
              {isLoading && <LoadingBox />}
              {!isLoading && listComment.length > 0 ? (
                <div
                  className="comment-list-wrapper"
                >
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
                    title={t('IDS_WP_NO_COMMENT_TITLE')}
                    subTitle={t('IDS_WP_NO_COMMENT_TITLE_DES')}
                  />
                )
              )}
            </InfiniteScroll>
            <AlertModal
              open={alert}
              setOpen={setAlert}
              content={t('IDS_WP_ALERT_CONTENT')}
              onConfirm={handleDeleteAllMyComment}
            />
          </Scrollbars>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doListComment: (fileId, quite, page, isLoadMore) =>
      dispatch(actionFetchListComment(fileId, quite, page, isLoadMore))
  };
};

export default connect(
  state => ({
    isLoading: state.documents.isLoading,
    pagingComment: state.documents.pagingComment,
    listComment: state.documents.listComment
  }),
  mapDispatchToProps
)(Comment);
