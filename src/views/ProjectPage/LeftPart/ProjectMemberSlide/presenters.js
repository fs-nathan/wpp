import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiDragVertical, mdiPlus, mdiAccount } from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomAvatar from '../../../../components/CustomAvatar';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { ListItemText } from '@material-ui/core';
import { get } from 'lodash';
import SearchInput from '../../../../components/SearchInput';
import { Scrollbars } from 'react-custom-scrollbars';
import './style.scss';

const Container = ({ className = '', ...props }) => 
  <div
    className={`view_Project_ProjectMemberSlide___container ${className}`}
    {...props}
  />

const Banner = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_ProjectMemberSlide___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) => 
  <Primary 
    className={`view_Project_ProjectMemberSlide___primary ${className}`}
    {...props}
  />;

const Wrapper = ({ className = '', ...rest }) => 
  <Scrollbars 
    className={`view_Project_ProjectMemberSlide___wrapper ${className}`} 
    {...rest} 
  />;

function ProjectMemberSlide({ 
  handleSubSlide, 
  members, 
  searchPatern, setSearchPatern,
  handleOpenModal,
}) {

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
  }

  return (
    <>
      {members.error !== null && (<ErrorBox />)}
      {members.error === null && (
        <LeftSideContainer
          title='Thành viên dự án'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => handleSubSlide(0),
            tooltip: 'Quay lại',
          }}
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => setOpen(true),
            tooltip: 'Thêm thành viên dự án',
          }}
          loading={{
            bool: members.loading,
            component: () => <LoadingBox />
          }}
        >
          <Container>
            <Banner>
              <SearchInput 
                fullWidth 
                placeholder='Tìm thành viên'
                value={searchPatern}
                onChange={evt => setSearchPatern(evt.target.value)}
              />  
            </Banner>
            <Wrapper
              autoHide
              autoHideTimeout={500}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'member-list'}>
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
                        <CustomAvatar style={{ width: 40, height: 40, }} alt='avatar' />
                        <ListItemText 
                          primary={
                            <StyledPrimary>Tất cả</StyledPrimary>  
                          }
                          secondary={
                            <Secondary>
                              {members.members.reduce((sum, member) => sum += get(member, 'tasks', []).length, 0)} việc
                            </Secondary>
                          }
                        />
                      </StyledListItem>
                      {members.members.map((member, index) => (
                        <CustomListItem key={get(member, 'id')} member={member} index={index} />  
                      ))}
                      {provided.placeholder}
                    </StyledList>
                  )}
                </Droppable>
              </DragDropContext>
            </Wrapper>
            <Button onClick={evt => handleOpenModal('MEMBER_SETTING')}>
              <Icon path={mdiAccount} size={1} />
              <span>Cài đặt thành viên</span>
            </Button>
          </Container>
        </LeftSideContainer>
      )}
    </>
  )
}

export default ProjectMemberSlide;
