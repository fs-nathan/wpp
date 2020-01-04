import React from 'react';
import { Avatar } from '@material-ui/core';
import ColorTypo from '../../ColorTypo';
import '../DocumentDetail.scss';

const DownloadItem = props => {
  return (
    <React.Fragment>
      <div className="comment-item">
        <Avatar src={props.comment.user_create.avatar} alt="avatar" />
        <div className="content-item no-border">
          <div className="header-item">
            <div>
              <ColorTypo bold>{props.comment.user_create.name || ''}</ColorTypo>
              <div className="sub-title">
                {`Tải về lúc ${props.comment.time_create} ngày ${props.comment.date_create}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DownloadItem;
