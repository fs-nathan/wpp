import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Icon } from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../ColorTypo';
import AlertModal from '../../AlertModal';
import CustomModal from '../../CustomModal';
import {
  actionDeleteComment,
  actionUpdateComment
} from '../../../actions/documents';
import '../DocumentDetail.scss';

const CommentItem = ({ comment, onRefreshList }) => {
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [newContent, setNewContent] = useState(comment.content || '');
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const { t } = useTranslation();

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleDeleteComment = async () => {
    try {
      await actionDeleteComment(comment.id);
      if (onRefreshList) {
        onRefreshList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await actionUpdateComment(comment.id, newContent);
      if (onRefreshList) {
        onRefreshList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="comment-item">
        <Avatar src={comment.user_create.avatar} alt="avatar" />
        <div className="content-item">
          <div className="header-item">
            <div>
              <ColorTypo bold>{comment.user_create.name || ''}</ColorTypo>
              <div className="sub-title">
                {`Thêm lúc ${comment.time_create} ngày ${comment.date_create}`}
              </div>
            </div>
            {comment.can_modify && (
              <IconButton
                className="btn-more"
                size="small"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Icon
                  path={mdiDotsVertical}
                  size={1}
                  color="rgba(0, 0, 0, 0.54)"
                />
              </IconButton>
            )}
          </div>
          <div className="body-item">{comment.content || ''}</div>
        </div>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            setVisibleEditModal(true);
            handleClose();
          }}
        >
          {t('IDS_WP_EDIT')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAlert(true);
            handleClose();
          }}
        >
          {t('IDS_WP_DELETE')}
        </MenuItem>
      </Menu>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={handleDeleteComment}
      />
      <CustomModal
        open={visibleEditModal}
        setOpen={() => setVisibleEditModal(false)}
        title="Chỉnh sửa thảo luận"
        className="edit-comment-modal"
        onConfirm={handleUpdateComment}
      >
        <TextField
          multiline
          fullWidth
          autoFocus
          rows={7}
          variant="outlined"
          value={newContent}
          onChange={e => {
            setNewContent(e.target.value);
          }}
          placeholder={t('IDS_WP_INPUT_COMMENT')}
        />
      </CustomModal>
    </React.Fragment>
  );
};

export default CommentItem;
