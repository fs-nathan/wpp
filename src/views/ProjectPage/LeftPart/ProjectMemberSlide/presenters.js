import { Button, ListItemText } from '@material-ui/core';
import { mdiAccountCog, mdiChevronLeft, mdiDragVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
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
      <LeftSideContainer
        title='Thành viên dự án'
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => handleSubSlide(0),
          tooltip: 'Quay lại',
        }}
        rightAction={{
          iconPath: mdiPlus,
          onClick: () => handleOpenModal('MEMBER_SETTING'),
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
                        <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                      </div>
                      <CustomAvatar style={{ width: 40, height: 40, }} alt='avatar' />
                      <ListItemText
                        primary={
                          <StyledPrimary>Tất cả</StyledPrimary>
                        }
                        secondary={
                          <Secondary>
                            {get(members, 'totalTask', 0)} việc
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
            <Icon path={mdiAccountCog} size={1} />
            <span>Quản lý thành viên</span>
          </Button>
        </Container>
      </LeftSideContainer>
    </>
  )
}

export default ProjectMemberSlide;
