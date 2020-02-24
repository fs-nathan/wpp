import React from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import { mdiChevronLeft } from '@mdi/js';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import { get } from 'lodash';
import './style.scss';

const Banner = ({ className = '', ...props }) =>
  <div 
    className={`view_Member_UserList___banner ${className}`}
    {...props}
  />;

const CustomStyledList = ({ className = '', ...props }) =>
  <StyledList 
    className={`view_Member_UserList___list ${className}`}
    {...props}
  />;

const RoomNameSpan = ({ className = '', ...props }) =>
  <span 
    className={`view_Member_UserList___room-name ${className}`}
    {...props}
  />;

function UserList({ 
  rooms, 
  handleSortUser, 
}) {
  
  const [searchPatern, setSearchPatern] = React.useState('');

  const history = useHistory();

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleSortUser(draggableId, destination.droppableId, destination.index);
  }

  function doLink(userId) {
    history.push(`/members/${userId}`);
  }

  return (
    <>
      {rooms.error !== null && <ErrorBox />}
      {rooms.error === null && (
        <LeftSideContainer
          title='Danh sách thành viên'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/departments'),
            tooltip: 'Quay lại',
          }}
          loading={{
            bool: rooms.loading,
            component: () => <LoadingBox />
          }}
        >
          <Banner>
            <SearchInput 
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
              fullWidth 
              placeholder='Tìm thành viên'  
            />  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            {rooms.rooms.map((room, index) => {
              const users = get(room, 'users', []);
              return (
                <Droppable key={index} droppableId={get(room, 'id')}>
                  {provided => (
                    <CustomStyledList
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <StyledListItem>
                        <RoomNameSpan>
                          {get(room, 'name', '') === 'default' ? 'Mặc định' : get(room, 'name', '')}
                        </RoomNameSpan>
                      </StyledListItem>
                      {users.filter(user => get(user, 'name').toLowerCase().includes(searchPatern.toLowerCase())).map((user, index) => 
                        <CustomListItem key={index} user={user} index={index} handleLink={doLink} />
                      )}
                      {provided.placeholder}
                    </CustomStyledList>
                  )}
                </Droppable>
              );
            })}
          </DragDropContext>
        </LeftSideContainer>
      )}
    </>
  )
}

export default UserList;
