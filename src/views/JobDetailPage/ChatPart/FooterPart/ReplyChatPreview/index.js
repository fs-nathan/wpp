import { Avatar } from '@material-ui/core';
import { mdiWindowClose } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import { getFileType, getRichContent } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

const ReplyChatPreview = ({ id,
  user_create_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  images = [],
  files = [],
  content,
  time_create = Date.now(),
  type,
  tags,
  cancelReply,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const file = files[0] || {};
  function getContent() {
    if (type === 1)
      return <div className={clsx("FileMessage--fileName")}>
        {file.name}&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={clsx("FileMessage--fileSize")}>
          {getFileType(file.name)} - {file && file.size}
        </span>
      </div>
    if (type === 2)
      return <div >{t('LABEL_CHAT_TASK_HINH_ANH')}</div>
    return <div className={clsx("ReplyChatPreview--content", {
    })}
      dangerouslySetInnerHTML={{
        __html: getRichContent(content, tags, "#5b5b5b")
      }}
    >
    </div>
  }

  return (
    <div className={clsx("ReplyChatPreview")}
      style={{ borderLeft: `3px solid ${groupActiveColor}` }}
    >
      <div className={clsx("ReplyChatPreview--leftContentWrap")} >
        {(type === CHAT_TYPE.IMAGE) && <>
          <img src={images[0].url} alt="preview" />
          {(images.length > 1) && <div className="ReplyChatPreview--imagesNum"  >
            + {images.length - 1}
          </div>
          }
        </>}
        {(type === CHAT_TYPE.FILE || type === CHAT_TYPE.CHAT_FILE_FROM_GOOGLE_DRIVER || type === CHAT_TYPE.CHAT_FORWARD_FILE) && <>
          <img src={file.file_icon} alt="preview" />
        </>}
      </div>
      <div className={clsx("ReplyChatPreview--rightContentWrap")} >
        <div className="ReplyChatPreview--sender"  >
          <Avatar className="ReplyChatPreview--avatarReply" src={user_create_avatar} />
          <div className="ReplyChatPreview--name"  >
            {user_create_name}
          </div>
          <div className="ReplyChatPreview--position"  >
            {user_create_position}
          </div>
          {user_create_roles[0] &&
            <div className="ReplyChatPreview--room"  >
              {user_create_roles[0]}
            </div>
          }
        </div>
        {getContent()}
        <div className="ReplyChatPreview--cancel"
          onClick={cancelReply}>
          <Icon path={mdiWindowClose} size={1} color="#929496" />
        </div>
      </div>
    </div >
  );
}

ReplyChatPreview.propTypes = {
  user_create_name: PropTypes.string.isRequired,

};

export default ReplyChatPreview;
