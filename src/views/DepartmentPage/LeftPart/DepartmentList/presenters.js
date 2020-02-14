import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { ListItemText } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import { mdiPlus, mdiDrag, mdiDragVertical } from '@mdi/js';
import CustomListItem from './CustomListItem';
import { get } from 'lodash';
import './style.scss';

const Banner = ({ className = '', ...props }) => 
  <div 
    className={`view_Department_List___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) => 
  <Primary 
    className={`view_Department_List___primary ${className}`}
    {...props}
  />;

function DepartmentList({ 
  rooms, searchPatern, 
  handleSearchPatern, handleDragEnd, 
  handleOpenModal,
}) {

  const location = useLocation(); 

  return (
    <React.Fragment>
      {rooms.error !== null && <ErrorBox />}
      {rooms.error === null && (
        <LeftSideContainer
          title='Danh sách bộ phận'
          leftAction={{
            iconPath: mdiDrag,
            onClick: null,
          }}
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => 
              handleOpenModal('CREATE')
            ,
            tooltip: 'Thêm bộ phận',
          }}
          loading={{
            bool: rooms.loading,
            component: () => <LoadingBox />,
          }}
        >
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm bộ phận'
              value={searchPatern}
              onChange={handleSearchPatern}
            />  
          </Banner>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={'department-list'}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem
                    to={`${location.pathname}`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Tất cả</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {rooms.rooms.reduce((sum, room) => sum += get(room, 'number_member'), 0)} thành viên
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                  {rooms.rooms.filter(room => get(room, 'id') !== 'default').map((room, index) => (
                    <CustomListItem key={get(room, 'id')} room={room} index={index} />  
                  ))}
                  {provided.placeholder}
                  <StyledListItem
                    component={Link}
                    to={`${location.pathname}/default`}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Mặc định</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>
                          {rooms.rooms.filter(room => get(room, 'id') === 'default').reduce((sum, room) => sum += get(room, 'number_member'), 0)} thành viên
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
};

export default DepartmentList;
