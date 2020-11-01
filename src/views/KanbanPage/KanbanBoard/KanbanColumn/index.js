import React from 'react';
import { Container as DragContainer, Draggable } from "react-smooth-dnd";
import { CircularProgress, Menu, MenuItem } from '@material-ui/core';
import { get, includes, isNil } from 'lodash';
import KanbanItem from '../KanbanItem';
import Scrollbars from 'components/Scrollbars';
import { IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { taskColors } from 'constants/colors';
import { mdiDotsVertical, mdiDragVertical, mdiPlus, mdiClockOutline } from '@mdi/js';
import { connect } from 'react-redux';
import { statusSelector, prioritySelector, memberSelector } from './selectors';
import styled from 'styled-components';
import './style.scss';
import '../style.scss';

export const Container = ({ className = '', isDragging, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanColumn___container ${className}`} 
    {...props} 
  />;

const ItemList = ({ className = '', isDraggingOver, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanColumn___item-list ${className}`}
    {...props} 
  />;
 
const GroupName = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___group-name ${className}`}
    {...props} 
  />;

const Indicator = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___indicator ${className}`}
    {...props} 
  />;

const Title = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___title ${className}`}
    {...props} 
  />;

const ProgressBar = styled.abbr`
  display: block;
  border-bottom: none !important;
  text-decoration: none !important;
  height: 5px;
  width: calc(100% - 20px);
  background-color: rgb(242, 242, 242);
  margin: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  &::after {
    display: block;
    content: "";
    height: 5px;
    width: ${props => props.percent}%;
    background-color: ${props => props.isExpired ? taskColors[3] : taskColors[2]};
  }
`;

const Status = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___status ${className}`}
    {...props} 
  />;

const CodeBox = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___code-box ${className}`}
    {...props}
  />

const Code = ({ className = '', ...props }) =>
  <abbr
    className={`view_KanbanColumn___code ${className}`}
    {...props}
  />

const Duration = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___duration ${className}`}
    {...props}
  />

const ListScroll = ({ className = '', ...props }) =>
  <Scrollbars 
    className={`view_KanbanColumn___list-scroll ${className}`}
    {...props}
  />

export function ColumnHeader({ groupTask, index, iconButtons = null }) {
  return (
    <Title>
      <Indicator>
        <div data-custom-drag-handle="column-handle">
          <Icon
            path={mdiDragVertical}
            size={1}
            color={"#8b8b8b"}
          />
        </div>
        <div>{`Giai đoạn ${index + 1}`}</div>
        {!isNil(iconButtons) && 
          <IconButton
            size="small"
            aria-controls={`${get(groupTask, 'id', '')}-menu`}
            aria-haspopup="true"
            onClick={iconButtons.moreClick}
          >
            <Icon
              path={mdiDotsVertical}
              size={1}
              color={"#8b8b8b"}
            />
          </IconButton>
        }
      </Indicator>
      <GroupName>
        <span>{`${get(groupTask, 'name', '')}`}</span>
        {!isNil(iconButtons) && 
          <IconButton
            size="small"
            onClick={iconButtons.plusClick}
          >
            <Icon
              path={mdiPlus}
              size={1}
              color={"#8b8b8b"}
            />
          </IconButton>
        }
      </GroupName>
      <ProgressBar 
        title={`Hoàn thành: ${get(groupTask, 'complete', 0)}%`}
        percent={get(groupTask, 'complete', 0)}
        isExpired={get(groupTask, 'task_expired', 0) > 0}
      />
      <Status>
        <CodeBox>
          <Code title='Công việc đang chờ'>
            <span style={{
              color: taskColors[0],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_waiting', 0)}`}</span>
          </Code>
          <Code title='Công việc đang làm'>
            <span style={{
              color: taskColors[1],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_doing', 0)}`}</span>
          </Code>
          <Code title='Công việc hoàn thành'>
            <span style={{
              color: taskColors[2],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_complete', 0)}`}</span>
          </Code>
          <Code title='Công việc quá hạn'>
            <span style={{
              color: taskColors[3],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_expired', 0)}`}</span>
          </Code>
          <Code title='Công việc dừng'>
            <span style={{
              color: taskColors[4],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_stopped', 0)}`}</span>
          </Code>
        </CodeBox>
        <Duration>
          <Icon
            path={mdiClockOutline}
            size={0.8}
            color={"#8b8b8b"}
          />
          <span>{`${get(groupTask, 'duration.value', 0)} ${get(groupTask, 'duration.unit', 'Ngày')}`}</span>
        </Duration>
      </Status>
    </Title>
  )
}

function KanbanColumn({ 
  groupTask, index, handleOpenModal,
  status, priority, memberFilter,
  projectId, handleItemDrop,
}) { 

  const tasks = get(groupTask, 'tasks', [])
    .filter(task => includes(status, get(task, 'status_code', -1)))
    .filter(task => includes(priority, get(task, 'priority_code', -1)))
    .filter(task => get(task, 'members', [])
      .map(member => get(member, 'id', ''))
      .reduce((result, member) => result || includes(memberFilter, member), false)
    );
  const [moreAnchor, setMoreAnchor] = React.useState(null);

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
      <Container>
        <ColumnHeader 
          groupTask={groupTask}
          index={index}
          iconButtons={{
            moreClick: handleMoreOpen,
            plusClick: handleMoreClick(() => handleOpenModal('CREATE_TASK', {
              projectId,
              curGroupTask: groupTask,
            })),
          }}
        />
        <ListScroll
          autoHide
          autoHideTimeout={500}
        >
          <ItemList>
            <DragContainer
              onDrop={dropResult => handleItemDrop(get(groupTask, 'id'), dropResult.removedIndex, dropResult.addedIndex, dropResult.payload)}
              getChildPayload={index => get(tasks, `[${index}]`, {})}
              groupName="col"
              dragClass="view_KanbanItem___container-drag"
              dropClass="view_KanbanItem___container-drop"
              dragHandleSelector='[data-custom-drag-handle="item-handle"]'
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: 'view_KanbanItem___container-preview'
              }}
            >
              {tasks.map((task, index) => (
                  <Draggable
                    key={get(task, 'id')}
                  >
                    <KanbanItem 
                      task={task}
                      index={index}
                      key={index}
                      projectId={projectId}
                      handleOpenModal={handleOpenModal}
                    />
                  </Draggable>
                ))}
            </DragContainer>
          </ItemList>
        </ListScroll>
      </Container>
      <Menu
        id={`${get(groupTask, 'id', '')}-menu`}
        anchorEl={moreAnchor}
        open={Boolean(moreAnchor)}
        onClose={handleMoreClose}
        transformOrigin={{
          vertical: -30,
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('UPDATE_GROUPTASK', {
            curGroupTask: groupTask,
          }))}
          disabled={false}
        >
          {false && (
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />
          )}
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('STAGE_SETTING', {
            stageName: `Giai đoạn ${index + 1}`,
            groupTask,
          }))}
          disabled={false}
        >
          {false && (
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />
          )}
          Thiết lập giai đoạn
        </MenuItem>
        <MenuItem
          onClick={handleMoreClick(() => handleOpenModal('DELETE_GROUPTASK', {
            selectedGroupTask: groupTask,
          }))}
          disabled={false}
        >
          {false && (
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />
          )}
          Xóa
        </MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = state => ({
  status: statusSelector(state),
  priority: prioritySelector(state),
  memberFilter: memberSelector(state),
});

export default connect(mapStateToProps, null)(KanbanColumn);