import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
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
    background-color: ${props => props.isExpired ? taskColors[2] : taskColors[3]};
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

export function ColumnHeader({ groupTask, index, dragProvided, iconButtons = null }) {
  return (
    <Title>
      <Indicator>
        <div {...dragProvided.dragHandleProps}>
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
          <Code title='Công việc quá hạn'>
            <span style={{
              color: taskColors[2],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_expired', 0)}`}</span>
          </Code>
          <Code title='Công việc hoàn thành'>
            <span style={{
              color: taskColors[3],
            }}>&#11044;</span>
            <span>{`${get(groupTask, 'task_complete', 0)}`}</span>
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
  groupTask, index, handleOpenModal, placeholderProps,
  status, priority, memberFilter,
}) { 

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
      <Draggable 
        draggableId={get(groupTask, 'id', '')} 
        key={get(groupTask, 'id', '')}
        index={index}
      >
        {(dragProvided, dragSnapshot) => (
          <Container
            innerRef={dragProvided.innerRef}
            isDragging={dragSnapshot.isDragging}
            {...dragProvided.draggableProps}
          >
            <ColumnHeader 
              groupTask={groupTask}
              index={index}
              dragProvided={dragProvided}
              iconButtons={{
                moreClick: handleMoreOpen,
                plusClick: () => null,
              }}
            />
            <ListScroll
              autoHide
              autoHideTimeout={500}
            >
              <Droppable
                droppableId={`d-${get(groupTask, 'id', '')}`}
                type='ITEM'
              >
                {(dropProvided, dropSnapshot) => (
                  <ItemList
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    {...dropProvided.droppableProps}
                    innerRef={dropProvided.innerRef}
                  >
                    {get(groupTask, 'tasks', [])
                      .filter(task => includes(status, get(task, 'status_code', -1)))
                      .filter(task => includes(priority, get(task, 'priority_code', -1)))
                      .filter(task => get(task, 'members', [])
                        .map(member => get(member, 'id', ''))
                        .reduce((result, member) => result || includes(memberFilter, member), false)
                      )
                      .map((task, index) => (
                        <KanbanItem 
                          task={task}
                          index={index}
                          key={index}
                        />
                      ))}
                    {dropProvided.placeholder}
                    {get(placeholderProps, 'type', '') === 'ITEM' && dropSnapshot.isDraggingOver && (
                      <div
                        className="view_KanbanBoard___dragdrop-placeholder"
                        style={{
                          top: placeholderProps.clientY,
                          left: placeholderProps.clientX,
                          height: placeholderProps.clientHeight,
                          width: placeholderProps.clientWidth,
                        }}
                      />
                    )}
                  </ItemList>
                )}
              </Droppable>
            </ListScroll>
          </Container>
        )}
      </Draggable>
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
          onClick={handleMoreClick(() => null)}
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
          onClick={handleMoreClick(() => null)}
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