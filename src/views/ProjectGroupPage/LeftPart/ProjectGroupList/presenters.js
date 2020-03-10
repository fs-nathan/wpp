import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { get } from 'lodash';
import { mdiPlus } from '@mdi/js';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from '@material-ui/core';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomAvatar from '../../../../components/CustomAvatar';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import './style.scss';

const Banner = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_List___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) => 
  <Primary 
    className={`view_ProjectGroup_List___primary ${className}`}
    {...props}
  />;

function ProjectList({ 
  groups, 
  searchPatern, setSearchPatern,
  handleSortProjectGroup, handleOpenModal,
}) {

  const location = useLocation();

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if ( 
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleSortProjectGroup(draggableId, destination.index);
  }

  return (
    <>
      {groups.error !== null && <ErrorBox />}
      {groups.error === null && (
        <LeftSideContainer
          title='Nhóm dự án'
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => handleOpenModal('CREATE'),
            tooltip: 'Thêm nhóm dự án',
          }}
          loading={{
            bool: groups.loading,
            component: () => <LoadingBox />,
          }}
        >
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm nhóm dự án'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='project-group-list'>
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
                        <Secondary>{
                          groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'number_project', 0), 0) + 
                          groups.defaultNumberProject
                        } dự án</Secondary>
                      }
                    />
                  </StyledListItem>
                  {groups.groups.map((projectGroup, index) => (
                    <CustomListItem key={index} projectGroup={projectGroup} index={index} />
                  ))}
                  {provided.placeholder}
                  <StyledListItem
                    to={`${location.pathname}/default`}
                    component={Link}
                  >
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText 
                      primary={
                        <StyledPrimary>Chưa phân loại</StyledPrimary>  
                      }
                      secondary={
                        <Secondary>{groups.defaultNumberProject} dự án</Secondary>
                      }
                    />
                  </StyledListItem>
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        </LeftSideContainer>
      )}
    </>
  )
}

export default ProjectList;
