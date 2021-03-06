import { Avatar } from '@material-ui/core';
import { mdiWindowClose } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import { CHAT_TYPE, isOneOf } from 'helpers/jobDetail/arrayHelper';
import { getFileType, getRichContent } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';
import ReactPlayer from 'react-player';
import { FileType } from 'components/FileType';
import * as fileType from 'assets/fileType';

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
    if (isOneOf(type, [CHAT_TYPE.CHAT_FILE_FROM_GOOGLE_DRIVER, CHAT_TYPE.CHAT_FORWARD_FILE, CHAT_TYPE.FILE]))
      return <div className={clsx("ReplyChatPreview--file")}>
        <div className={clsx("ReplyChatPreview--fileName")}>
          {file.name}
        </div>
        <div className={clsx("ReplyChatPreview--fileSize")}>
          - {file && file.size}
        </div>
      </div>
    if (type === CHAT_TYPE.IMAGE)
      return <div className={clsx("ReplyChatPreview--imgDes")}>
        {
          images[0].media_type === 1 ? 'Video' : t('LABEL_CHAT_TASK_HINH_ANH')
        }
      </div>
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
          {images[0].media_type === 1 ?
            <ReactPlayer
              className="FileMessage--videoPlayer"
              url={images[0].url}
              height="auto" width="40px"
            />
            :
            <>
              <img src={images[0].url} alt="preview" />
              {(images.length > 1) && <div className="ReplyChatPreview--imagesNum"  >
                + {images.length - 1}
              </div>
              }
            </>
          }
        </>}
        {(type === CHAT_TYPE.FILE || type === CHAT_TYPE.CHAT_FILE_FROM_GOOGLE_DRIVER || type === CHAT_TYPE.CHAT_FORWARD_FILE) && <>
          {file.media_type === 1 ?
            <ReactPlayer
              className="FileMessage--videoPlayer"
              url={file.url}
              height="auto" width="100%"
            />
            :
            <img src={file.file_icon} alt="preview" />
          }
        </>}
      </div>
      <div className={clsx("ReplyChatPreview--rightContentWrap", {
        'ReplyChatPreview--rightContentWrap__image': type === 2
      })} >
        <div className="ReplyChatPreview--sender"  >
          <img src={user_create_avatar} />
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
