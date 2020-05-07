import { ListItemText } from '@material-ui/core';
import { mdiDrag, mdiDragVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
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
  rooms, searchPatern, route, viewPermissions,
  handleSearchPatern, handleDragEnd,
  handleOpenModal,
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const ref = React.useRef();

  function doLink(roomId) {
    history.push(`${route}/room/${roomId}`);
  }

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('DMH.VIEW.DP.LEFT.LIST.TITLE')}
        leftAction={{
          iconPath: mdiDrag,
          onClick: null,
        }}
        rightAction={get(viewPermissions.permissions, 'can_modify', false) ? {
          iconPath: mdiPlus,
          onClick: () =>
            handleOpenModal('CREATE')
          ,
          tooltip: t('DMH.VIEW.DP.LEFT.LIST.ADD'),
        } : null}
        loading={{
          bool: rooms.loading,
          component: () => <LoadingBox />,
        }}
      >
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t('DMH.VIEW.DP.LEFT.LIST.FIND')}
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
                  to={`${route}`}
                  component={Link}
                  innerRef={ref}
                >
                  <div>
                    <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                  </div>
                  <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                  <ListItemText
                    primary={
                      <StyledPrimary>{t('DMH.VIEW.DP.LEFT.LIST.ALL')}</StyledPrimary>
                    }
                    secondary={
                      <Secondary>
                        {t('DMH.VIEW.DP.LEFT.LIST.NUM_MEM', { members: rooms.rooms.reduce((sum, room) => sum += get(room, 'number_member'), 0) })}
                      </Secondary>
                    }
                  />
                </StyledListItem>
                {rooms.rooms.map((room, index) => (
                  <CustomListItem canDrag={get(viewPermissions.permissions, 'can_modify', false)} key={get(room, 'id')} room={room} index={index} handleLink={doLink} />
                ))}
                {provided.placeholder}
              </StyledList>
            )}
          </Droppable>
        </DragDropContext>
      </LeftSideContainer>
    </React.Fragment>
  )
};

export default DepartmentList;
