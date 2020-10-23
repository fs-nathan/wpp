import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import Icon from '@mdi/react';
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import { taskColors } from 'constants/colors';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteTask } from 'actions/taskDetail/taskDetailActions';
import { connect } from 'react-redux';
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

const Chat = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___chat ${className}`} {...props} />;
 
const Footer = ({ className = '', ...props }) =>
  <div className={`view_KanbanItem___footer ${className}`} {...props} />;

const MoreIcon = ({ className = '', ...props }) =>
  <IconButton className={`view_KanbanItem___more-icon ${className}`} {...props} />;

const MiddleSpan = ({ className = '', ...props }) =>
  <span className={`view_KanbanItem___middle-span ${className}`} {...props} />;

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
                    height: 30,
                    width: 30,
                  }}
                />
                <span>{get(task, 'chat.user_create_name', '')}</span>
              </User>
              <Chat>{get(task, 'chat.content', '')}</Chat>
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
            data: task,
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

