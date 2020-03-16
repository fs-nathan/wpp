import React from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import { mdiPlus, mdiChevronLeft, mdiDragVertical } from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import { find, get, filter } from 'lodash';
import SearchInput from '../../../../components/SearchInput';
import './style.scss';
 
const Banner = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_GroupTaskSlide___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) => 
  <Primary 
    className={`view_Project_GroupTaskSlide___primary ${className}`}
    {...props}
  />;

function GroupTaskSlide({ 
  handleSubSlide, 
  searchPatern, setSearchPatern,
  groupTasks, 
  handleSortGroupTask, handleDeleteGroupTask, 
  handleOpenModal
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curGroupTask, setCurGroupTask] = React.useState(null);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleSortGroupTask(draggableId, destination.index);
  }
  
  return (
    <>
      {groupTasks.error !== null && (<ErrorBox />)}
      {groupTasks.error === null && (
        <LeftSideContainer
          title='Nhóm công việc'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => handleSubSlide(0),
            tooltip: 'Quay lại',
          }}
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => handleOpenModal('CREATE'),
            tooltip: 'Thêm nhóm công việc',
          }}
          loading={{
            bool: groupTasks.loading,
            component: () => <LoadingBox />
          }}
        >
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm nhóm công việc'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'task-group-list'}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem
                    to={`#`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <ListItemText 
                      primary={
                        <StyledPrimary>Tất cả</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {groupTasks.groupTasks.reduce((sum, taskGroup) => sum += get(taskGroup, 'number_task', 0), 0)} việc
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                  {filter(groupTasks.groupTasks, taskGroup => get(taskGroup, 'id') !== 'default').map((taskGroup, index) => (
                    <CustomListItem 
                      key={get(taskGroup, 'id')} 
                      taskGroup={taskGroup} 
                      index={index} 
                      setAnchorEl={setAnchorEl}
                      setCurGroupTask={setCurGroupTask}
                    />  
                  ))}
                  {provided.placeholder}
                  <StyledListItem
                    component={Link}
                    to={`#`}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <ListItemText 
                      primary={
                        <StyledPrimary>Chưa phân loại</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {get(
                            find(
                              groupTasks.groupTasks, 
                              { id: 'default' }
                            ),
                            'number_task',
                            0)} việc
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={evt => setAnchorEl(null)}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={evt => {
              setAnchorEl(null)
              handleOpenModal('UPDATE', {
                curGroupTask,
              });
            }}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={evt => {
              setAnchorEl(null);
              handleOpenModal('ALERT', {
                content: "Bạn chắc chắn muốn xóa nhóm công việc?",
                onConfirm: () => handleDeleteGroupTask(curGroupTask)
              });
            }}>Xóa</MenuItem>
          </Menu>
        </LeftSideContainer>
      )}
    </>
  )
}

export default GroupTaskSlide;
