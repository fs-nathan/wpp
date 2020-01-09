import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { IconButton, Avatar } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDownloadOutline, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
// import DownloadItem from './DownloadItem';
import '../DocumentDetail.scss';
import AlertModal from '../../AlertModal';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import { actionDownloadFile } from '../../../actions/documents';

const Download = ({ closeComment, fileInfo, listComment }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState(false);
  const [isAvatarView, setAvatarView] = useState(false);
  const [avatarTotal, setAvatarTotal] = useState(
    (window.innerWidth * 0.25 - 50 - ((window.innerWidth * 0.25 - 50) % 25)) /
      25
  );
  const onResize = () => {
    const totalWidth = window.innerWidth * 0.25 - 50;
    setAvatarTotal((totalWidth - (totalWidth % 25)) / 25);
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  const handleDownload = () => {
    actionDownloadFile(fileInfo);
  };

  return (
    <div className="comment-container">
      <div className="header-box-comment">
        <div className="box-title">Tải tài liệu</div>
        <div className="btn-actions-right">
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
          <div className="add-comment-content">
            <div className="action-add" onClick={handleDownload}>
              <div className="btn-add">
                <IconButton size="small">
                  <Icon path={mdiDownloadOutline} size={1} color="#007bff" />
                </IconButton>
              </div>
              <div className="lb-add">Tải về máy</div>
            </div>
          </div>
          <div className="comment-item info-item">
            <div className="content-item">
              <div className="header-item">
                <div>
                  <div className="sub-title">Số lượt xem</div>
                  <div className="sub-title">
                    <span>
                      <b>{fileInfo.number_of_view} lượt xem</b>
                    </span>
                    &nbsp;
                    <span>(dung lượng xem {fileInfo.size || ''})</span>
                  </div>
                  {!isEmpty(fileInfo.user_views) && (
                    <div className="avatar-list">
                      {fileInfo.user_views.map((el, idx) => {
                        if (
                          fileInfo.user_views.length <= avatarTotal ||
                          idx < avatarTotal - 2 ||
                          isAvatarView
                        ) {
                          return (
                            <span key={idx}>
                              <Avatar src={el.avatar} alt="avatar" />
                            </span>
                          );
                        }
                        return null;
                      })}
                      {fileInfo.user_views.length > avatarTotal &&
                        !isAvatarView && (
                          <Avatar>{`+${fileInfo.user_views.length -
                            avatarTotal +
                            2}`}</Avatar>
                        )}
                      {fileInfo.user_views.length > avatarTotal && (
                        <div className="btn-action btn-collapse action-avatar-list">
                          <IconButton
                            size="small"
                            onClick={() => setAvatarView(!isAvatarView)}
                          >
                            <Icon
                              path={
                                isAvatarView ? mdiChevronLeft : mdiChevronRight
                              }
                              size={1}
                              color="rgba(0, 0, 0, 0.54)"
                            />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="comment-item info-item">
            <div className="content-item no-border">
              <div className="header-item">
                <div>
                  <div className="sub-title">Số lượt download</div>
                  <div className="sub-title">
                    <span>
                      <b>{fileInfo.number_of_download || 0} lượt tải</b>
                    </span>
                    &nbsp;
                    <span>{`(dung lượng tải xuống ${fileInfo.size ||
                      ''})`}</span>
                  </div>
                  {!isEmpty(fileInfo.user_downloads) && (
                    <div className="avatar-list">
                      {fileInfo.user_downloads.map((el, idx) => {
                        if (
                          fileInfo.user_downloads.length <= avatarTotal ||
                          idx < avatarTotal - 2 ||
                          isAvatarView
                        ) {
                          return (
                            <span key={idx}>
                              <Avatar src={el.avatar} alt="avatar" />
                            </span>
                          );
                        }
                        return null;
                      })}
                      {fileInfo.user_downloads.length > avatarTotal &&
                        !isAvatarView && (
                          <Avatar>{`+${fileInfo.user_downloads.length -
                            avatarTotal +
                            2}`}</Avatar>
                        )}
                      {fileInfo.user_downloads.length > avatarTotal && (
                        <div className="btn-action btn-collapse action-avatar-list">
                          <IconButton
                            size="small"
                            onClick={() => setAvatarView(!isAvatarView)}
                          >
                            <Icon
                              path={
                                isAvatarView ? mdiChevronLeft : mdiChevronRight
                              }
                              size={1}
                              color="rgba(0, 0, 0, 0.54)"
                            />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  )}{' '}
                </div>
              </div>
            </div>
          </div>
          {/* {listComment.length > 0 ? (
            <div className="comment-list-wrapper">
              {listComment.map((item, idx) => (
                <DownloadItem
                  key={idx}
                  comment={item}
                  onRefreshList={() => getListComment(fileInfo, true)}
                />
              ))}
            </div>
          ) : null} */}
          <AlertModal
            open={alert}
            setOpen={setAlert}
            content={t('IDS_WP_ALERT_CONTENT')}
            onConfirm={() => console.log('ok')}
          />
        </Scrollbars>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isLoading: state.documents.isLoading
  }),
  {}
)(Download);
