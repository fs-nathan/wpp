import { ListItemText } from '@material-ui/core';
import { mdiDrag, mdiDragVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import { Routes } from '../../../../constants/routes';
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
  rooms, searchPatern,
  handleSearchPatern, handleDragEnd,
  handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('DMH.VIEW.DP.LEFT.LIST.TITLE')}
        leftAction={{
          iconPath: mdiDrag,
          onClick: null,
        }}
        rightAction={{
          iconPath: mdiPlus,
          onClick: () =>
            handleOpenModal('CREATE')
          ,
          tooltip: t('DMH.VIEW.DP.LEFT.LIST.ADD'),
        }}
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
                  to={`${Routes.DEPARTMENTS}`}
                  component={Link}
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
                {rooms.rooms.filter(room => get(room, 'id') !== 'default').map((room, index) => (
                  <CustomListItem key={get(room, 'id')} room={room} index={index} />
                ))}
                {provided.placeholder}
                <StyledListItem
                  component={Link}
                  to={`${Routes.DEPARTMENTS}/default`}
                >
                  <div>
                    <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                  </div>
                  <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                  <ListItemText
                    primary={
                      <StyledPrimary>{t('DMH.VIEW.DP.LEFT.LIST.DEFAULT')}</StyledPrimary>
                    }
                    secondary={
                      <Secondary>
                        {t('DMH.VIEW.DP.LEFT.LIST.NUM_MEM', { members: rooms.rooms.filter(room => get(room, 'id') === 'default').reduce((sum, room) => sum += get(room, 'number_member'), 0) })}
                      </Secondary>
                    }
                  />
                </StyledListItem>
              </StyledList>
            )}
          </Droppable>
        </DragDropContext>
      </LeftSideContainer>
    </React.Fragment>
  )
};

export default DepartmentList;
