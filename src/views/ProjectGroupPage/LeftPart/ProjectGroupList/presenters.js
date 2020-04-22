import { ListItemText } from '@material-ui/core';
import { mdiDragVertical, mdiPlus } from '@mdi/js';
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
  groups, route, canModify,
  searchPatern, setSearchPatern,
  handleSortProjectGroup, handleOpenModal,
}) {

  const { t } = useTranslation();

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
      <LeftSideContainer
        title={t("DMH.VIEW.PGP.LEFT.LIST.TITLE")}
        rightAction={canModify ? {
          iconPath: mdiPlus,
          onClick: () => handleOpenModal('CREATE'),
          tooltip: t("DMH.VIEW.PGP.LEFT.LIST.ADD"),
        } : null}
        loading={{
          bool: groups.loading,
          component: () => <LoadingBox />,
        }}
      >
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("DMH.VIEW.PGP.LEFT.LIST.FIND")}
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
                  to={`${route}`}
                  component={Link}
                >
                  <div>
                    <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                  </div>
                  <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                  <ListItemText
                    primary={
                      <StyledPrimary>{t("DMH.VIEW.PGP.LEFT.LIST.ALL")}</StyledPrimary>
                    }
                    secondary={
                      <Secondary>{t("DMH.VIEW.PGP.LEFT.LIST.NUM_MEM", {
                        projectGroups: groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'number_project', 0), 0) + groups.defaultNumberProject
                      })}</Secondary>
                    }
                  />
                </StyledListItem>
                {groups.groups.map((projectGroup, index) => (
                  <CustomListItem canDrag={canModify} key={index} projectGroup={projectGroup} index={index} route={route} />
                ))}
                {provided.placeholder}
              </StyledList>
            )}
          </Droppable>
        </DragDropContext>
      </LeftSideContainer>
    </>
  )
}

export default ProjectList;
