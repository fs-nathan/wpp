import React from 'react';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import Icon from '@mdi/react';
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import { taskColors } from 'constants/colors';
import { get, isNil } from 'lodash';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteTask } from 'actions/taskDetail/taskDetailActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CustomTextbox from 'components/CustomTextbox';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import { openDocumentDetail } from 'actions/system/system';
import { showImagesList } from 'actions/chat/chat';
import './style.scss'

const Container = ({ className = '', isDragging, statusCode, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanItem___container${isDragging ? '-dragging' : ''} view_KanbanItem___container-code-${statusCode} ${className}`} 
    {...props} 
  />;

const Name = ({ className = '', full, ...props }) =>
  <div className={`view_KanbanItem___name${full ? '-full' : ''} ${className}`} {...props} />;
  
const Body = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___body ${className}`} {...props} />;

const User = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___user ${className}`} {...props} />;

export const StickerContent = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___sticker ${className}`} {...props} />;
 
const Footer = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___footer ${className}`} {...props} />;

const MoreIcon = ({ className = '', ...props }) =>
  <IconButton className={`view_KanbanItem___more-icon ${className}`} {...props} />;

const MiddleSpan = ({ className = '', ...props }) =>
  <span className={`view_KanbanItem___middle-span ${className}`} {...props} />;

const FileGroupBlock =  ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___file-group-block ${className}`} {...props} />;

const FileBlock =  ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___file-block ${className}`} {...props} />;

const ImageGroupBlock =  ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___image-group-block ${className}`} {...props} />;

const ImageBlock =  ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___image-block ${className}`} {...props} />;

const FileBlockMore = styled(FileBlock)`
  position: relative;
  &::after {
    content: "${props => props.more}";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
  }
`;

const ImageBlockMore = styled(ImageBlock)`
  position: relative;
  &::after {
    content: "${props => props.more}";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
  }
`;

export const ChatContent = ({ className = '', ...props }) =>
  <CustomTextbox
    className={`view_KanbanItem___chat ${className}`}
    {...props}
  />;

function _FilesContent({ files, doOpenDocumentDetail }) {
  const hasMore = files.length > 4;
  function handleClick(file) {
    doOpenDocumentDetail({ ...file, type: getFileType(file.name) });
  }
  return (
    <FileGroupBlock>
      {hasMore 
      ? (
        <>
          {files.slice(0, 3).map(file =>
            <FileBlock 
              onClick={evt => handleClick(file)}
              key={get(file, 'id')}
            >
              <img src={get(file, 'file_icon')}/>
              <span>{get(file, 'name')}</span>
            </FileBlock>
          )}
          <FileBlockMore more={`+${files.length - 3}`}>
            <img src={get(files[3], 'file_icon')}/>
            <span>{get(files[3], 'name')}</span>
          </FileBlockMore>
        </>
      )
      : (
        <>
          {files.map(file =>
            <FileBlock onClick={evt => handleClick(file)} key={get(file, 'id')}>
              <img src={get(file, 'file_icon')}/>
              <span>{get(file, 'name')}</span>
            </FileBlock>
          )}
        </>
      )} 
    </FileGroupBlock>
  );
}

const mapDispatchToPropsFilesContent = dispatch => {
  return {
    doOpenDocumentDetail: options => dispatch(openDocumentDetail(options)),
  }
}

export const FilesContent = connect(null, mapDispatchToPropsFilesContent)(_FilesContent);

export function loadImage(url) {
  return new  Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url; 
  });
}

export function _ImagesContent({ images, user, doShowImagesList }) {
  const maxWidth = 370;
  const [maxImg, setMaxImg] = React.useState(0);
  React.useEffect(() => {
    const imgLoaders = images.map(image => loadImage(get(image, 'url')));
    Promise.all(imgLoaders)
      .then(images => {
        let total = 0;
        let count = 0;
        images.forEach(image => {
          total += Math.max(Math.min(Math.round(image.width / image.height * 75), 110), 40);
          if (total > maxWidth) {
            setMaxImg(count);
            return;
          } else {
            count++;
          }
        })
        setMaxImg(count);
      })
      .catch(e => setMaxImg(0));
  }, [images]);
  const handleClickOpen = (index) => {
    doShowImagesList({ 
      isOpen: true, 
      images, 
      index, 
      user,
    });
  };
  const hasMore = images.length > maxImg;
  return maxImg > 0 
    ? <ImageGroupBlock>
      {hasMore 
      ? (
        <>
          {images.slice(0, maxImg - 1).map((image, idx) =>
            <ImageBlock onClick={evt => handleClickOpen(idx)} key={get(image, 'id')}>
              <img src={get(image, 'url')}/>
            </ImageBlock>
          )}
          <ImageBlockMore onClick={evt => handleClickOpen(maxImg - 1)} more={`+${images.length - maxImg + 1}`}>
            <img src={get(images[maxImg - 1], 'url')}/>
          </ImageBlockMore>
        </>
      )
      : (
        <>
          {images.map((image, idx) =>
              <ImageBlock onClick={evt => handleClickOpen(idx)} key={get(image, 'id')}>
                <img src={get(image, 'url')}/>
              </ImageBlock>
          )}
        </>
      )} 
    </ImageGroupBlock>
    : null;
}

const mapDispatchToPropsImagesContent = dispatch => {
  return {
    doShowImagesList: ({ isOpen, images, index, user }) => dispatch(showImagesList(isOpen, images, index, user)),
  }
}

export const ImagesContent = connect(null, mapDispatchToPropsImagesContent)(_ImagesContent);

function Content({ chat, user }) {
  const imagesContent = get(chat, 'images', []).length > 0 
    ? <ImagesContent user={user} images={get(chat, 'images', [])} />
    : null;
  const filesContent = get(chat, 'files', []).length > 0 
    ? <FilesContent files={get(chat, 'files', [])} />
    : null;
  const stickerContent = !isNil(get(chat, 'sticker', null)) 
    ? <StickerContent><img src={get(chat, 'sticker')} alt="sticker" /></StickerContent>
    : null;
  const chatContent = !isNil(get(chat, 'content', null))
    ? <ChatContent
      value={get(chat, 'content', '')}
      isReadOnly={true}
    />
    : null;
  if (!isNil(imagesContent)) return imagesContent;
  if (!isNil(filesContent)) return filesContent;
  if (!isNil(stickerContent)) return stickerContent;
  if (!isNil(chatContent)) return chatContent;
  return null;
}

function KanbanItem({ task, handleOpenModal, projectId, doDeleteTask, canUpdateTask, canDeleteTask }) {

  const statusCode = get(task, 'status_code', 0);
  const [moreAnchor, setMoreAnchor] = React.useState(null);
  const history = useHistory();
  const { t } = useTranslation();

  function handleMoreOpen(evt) {
    setMoreAnchor(evt.currentTarget);
  }

  function handleMoreClick(handler) {
    return (evt) => {
      setMoreAnchor(null);
      handler();
    };
  }

  function handleMoreClose() {
    setMoreAnchor(null);
  }

  return (
    <>
      <Container
        statusCode={statusCode}
      >
        <Name full={canUpdateTask}>
          {canUpdateTask
          && <div data-custom-drag-handle="item-handle">
            <abbr title={t("IDS_WP_MOVE")}>
              <Icon
                path={mdiDragVertical}
                size={1}
                color={"#8b8b8b"}
              />
            </abbr>
          </div> 
          }
          <abbr title={get(task, 'name', '')}>
            <Link to={get(task, 'url_redirect')}>
              <span>{get(task, 'name', '')}</span>
            </Link>
          </abbr>
          <abbr title={t("IDS_WP_MORE")}>
            <MoreIcon
              size='small'
              onClick={handleMoreOpen}
            >
              <Icon
                path={mdiDotsVertical}
                size={1}
                color={statusCode < 2 ? "#8b8b8b" : "#fff"}
              />
            </MoreIcon>
          </abbr>
        </Name>
        <Body>
          {get(task, 'chat.user_create_name', null) && 
            <User>
              <CustomAvatar 
                src={get(task, 'chat.user_create_avatar', '')}
                alt="user's avatar"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <span>{get(task, 'chat.user_create_name')}</span>
            </User>}
          <Content 
            user={{
              user_create_name: get(task, 'chat.user_create_name', ''),
              user_create_avatar: get(task, 'chat.user_create_avatar', '')
            }}
            chat={get(task, 'chat')} 
          />
        </Body>
        <Footer>
          <span>{
            get(task, 'duration.value', 0) && get(task, 'duration.value', 0) !== 'null'
            ? `${get(task, 'duration.value', 0)} ${get(task, 'duration.unit', t("IDS_WP_DAY"))}`
            : ''
          }</span>
          <MiddleSpan>
            <span style={{
              backgroundColor: `${taskColors[get(task, 'status_code', 0)]}`,
              border: '1px solid #fff',
              borderRadius: '99px',
              height: '12px',
              width: '12px',
            }}/>
            <span>{`${get(task, 'status_name', '')} (${get(task, 'complete', 0)}%)`}</span>
          </MiddleSpan>
          <AvatarCircleList 
            users={get(task, 'members', [])}
            display={3}
          />
        </Footer>
      </Container>
      <Menu
        id={`${get(task, 'id', '')}-menu`}
        anchorEl={moreAnchor}
        open={Boolean(moreAnchor)}
        onClose={handleMoreClose}
        transformOrigin={{
          vertical: -30,
          horizontal: "right",
        }}
      >
        {canUpdateTask
        && <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('EDIT_TASK', {
            taskId: get(task, 'id'),
            data: task,
            projectId,
            editMode: 0,
          }))}
        >
          {t("IDS_WP_EDIT_TEXT")}
        </MenuItem>
        }
        <MenuItem
          onClick={handleMoreClick(() => history.push(get(task, 'url_redirect')))}
        >
          {t("LABEL_CHAT_TASK_CHI_TIET")}
        </MenuItem>
        {canDeleteTask
        && <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('DELETE_TASK', {
            content: t('IDS_WP_ALERT_CONTENT'),
            onConfirm: () => doDeleteTask({
              taskId: get(task, 'id'),
              projectId,
            }),
          }))}
        >
          {t("IDS_WP_DELETE")}
        </MenuItem>
        }
      </Menu>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doDeleteTask: ({ taskId, projectId }) => dispatch(deleteTask({ taskId, projectId })),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(KanbanItem);

