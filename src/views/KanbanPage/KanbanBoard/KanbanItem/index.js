import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import Icon from '@mdi/react';
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import { taskColors } from 'constants/colors';
import { get, isNil } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteTask } from 'actions/taskDetail/taskDetailActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CustomTextbox from 'components/CustomTextbox';
import './style.scss'

const Container = ({ className = '', isDragging, statusCode, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanItem___container${isDragging ? '-dragging' : ''} view_KanbanItem___container-code-${statusCode} ${className}`} 
    {...props} 
  />;

const Name = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___name ${className}`} {...props} />;
  
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

const ImageMore = styled.div`
  background-image: ${props => props.src};
`;

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

export function FilesContent({ files }) {
  const hasMore = files.length > 4;
  return (
    <FileGroupBlock>
      {hasMore 
      ? (
        <>
          {files.slice(0, 3).map(file =>
            <FileBlock key={get(file, 'id')}>
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
            <FileBlock key={get(file, 'id')}>
              <img src={get(file, 'file_icon')}/>
              <span>{get(file, 'name')}</span>
            </FileBlock>
          )}
        </>
      )} 
    </FileGroupBlock>
  );
}

export function loadImage(url) {
  return new  Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url; 
  });
}

export function ImagesContent({ images }) {
  const maxWidth = 370;
  const [maxImg, setMaxImg] = React.useState(0);
  React.useEffect(() => {
    const imgLoaders = images.map(image => loadImage(get(image, 'url')));
    Promise.all(imgLoaders)
      .then(images => {
        console.log(images);
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

  const hasMore = images.length > maxImg;
  return maxImg > 0 
    ? <ImageGroupBlock>
      {hasMore 
      ? (
        <>
          {images.slice(0, maxImg - 1).map(image =>
            <ImageBlock key={get(image, 'id')}>
              <img src={get(image, 'url')}/>
            </ImageBlock>
          )}
          <ImageBlockMore more={`+${images.length - maxImg + 1}`}>
            <img src={get(images[maxImg - 1], 'url')}/>
          </ImageBlockMore>
        </>
      )
      : (
        <>
          {images.map(image =>
              <ImageBlock key={get(image, 'id')}>
                <img src={get(image, 'url')}/>
              </ImageBlock>
          )}
        </>
      )} 
    </ImageGroupBlock>
    : null;
}

function Content({ chat }) {
  const imagesContent = get(chat, 'images', []).length > 0 
    ? <ImagesContent images={get(chat, 'images', [])} />
    : null;
  const filesContent = get(chat, 'files', []).length > 0 
    ? <FilesContent files={get(chat, 'files', [])} />
    : null;
  const stickerContent = !isNil(get(chat, 'sticker', null)) 
    ? <StickerContent><img src={get(chat, 'sticker')} alt="sticker" /></StickerContent>
    : null;
  const chatContent = !isNil(get(chat, 'content', null))
    ? <ChatContent
      value={get(chat, 'content')}
      isReadOnly={true}
    />
    : null;
  if (!isNil(imagesContent)) return imagesContent;
  if (!isNil(filesContent)) return filesContent;
  if (!isNil(stickerContent)) return stickerContent;
  if (!isNil(chatContent)) return chatContent;
  return null;
}

function KanbanItem({ task, index, handleOpenModal, projectId, doDeleteTask }) {

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
      <Draggable draggableId={get(task, 'id', '')} index={index} key={get(task, 'id', '')} >
        {(dragProvided, dragSnapshot) => (
          <Container
            innerRef={dragProvided.innerRef}
            isDragging={dragSnapshot.isDragging}
            {...dragProvided.draggableProps}
            statusCode={statusCode}
            style={{
              ...dragProvided.draggableProps.style,
              transform: dragProvided.draggableProps.style.transform
                ? dragSnapshot.isDragging 
                  ? `${dragProvided.draggableProps.style.transform} rotate(15deg)`
                  : dragProvided.draggableProps.style.transform
                : null,
            }}
          >
            <Name>
              <div {...dragProvided.dragHandleProps}>
                <Icon
                  path={mdiDragVertical}
                  size={1}
                  color={statusCode < 2 ? "#8b8b8b" : "#fff"}
                />
              </div>
              <span>{get(task, 'name', '')}</span>
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
            </Name>
            <Body>
              <User>
                <CustomAvatar 
                  src={get(task, 'chat.user_create_avatar', '')}
                  alt="user's avatar"
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <span>{get(task, 'chat.user_create_name', '')}</span>
              </User>
              <Content chat={get(task, 'chat')} />
            </Body>
            <Footer>
              <span>{`${get(task, 'duration.value', 0)} ${get(task, 'duration.unit', 'Ngày')}`}</span>
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
        )}
      </Draggable>
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
        <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('EDIT_TASK', {
            taskId: get(task, 'id'),
            projectId,
          }))}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={handleMoreClick(() => history.push(get(task, 'url_redirect')))}
        >
          Chi tiết
        </MenuItem>
        <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('DELETE_TASK', {
            content: t('IDS_WP_ALERT_CONTENT'),
            onConfirm: () => doDeleteTask({
              taskId: get(task, 'id'),
              projectId,
            }),
          }))}
        >
          Xóa
        </MenuItem>
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

