import { mdiChevronLeft } from '@mdi/js';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
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
  rooms, departmentRoute, memberRoute,
  handleSortUser,
}) {

  const [searchPattern, setSearchPattern] = React.useState('');
  const { t } = useTranslation();

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
    history.push(`${memberRoute}/${userId}`);
  }

  return (
    <>
      <LeftSideContainer
        title={t('DMH.VIEW.MP.LEFT.UL.TITLE')}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(departmentRoute),
          tooltip: t('DMH.VIEW.MP.LEFT.UL.BACK'),
        }}
        loading={{
          bool: rooms.loading,
          component: () => <LoadingBox />
        }}
      >
        <Banner>
          <SearchInput
            value={searchPattern}
            onChange={evt => setSearchPattern(evt.target.value)}
            fullWidth style={{background: "#fff"}}
            placeholder={t('DMH.VIEW.MP.LEFT.UL.SEARCH')}
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
                        {get(room, 'name', '') === 'default' ? t('DMH.VIEW.MP.LEFT.UL.DEFAULT') : get(room, 'name', '')}
                      </RoomNameSpan>
                    </StyledListItem>
                    {users.filter(user => get(user, 'name').toLowerCase().includes(searchPattern.toLowerCase())).map((user, index) =>
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
    </>
  )
}

export default UserList;
