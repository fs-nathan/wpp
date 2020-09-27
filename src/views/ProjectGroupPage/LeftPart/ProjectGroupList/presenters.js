import {ListItemText} from '@material-ui/core';
import {mdiDragVertical, mdiPlus} from '@mdi/js';
import Icon from '@mdi/react';
import {get} from 'lodash';
import React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import {Primary, StyledList, StyledListItem} from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
import './style.scss';
import * as images from "../../../../assets";

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

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.focus();
  }, []);

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
                  innerRef={ref}
                >
                  <div style={{marginLeft: "-10px"}}>
                    <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                  </div>
                  <CustomAvatar style={{marginRight: "10px"}} alt='avatar' />
                  <ListItemText
                    primary={
                      <StyledPrimary>{t("DMH.VIEW.PGP.LEFT.LIST.ALL")}</StyledPrimary>
                    }
                    secondary={
                      <div className={"view_ProjectGroup_List_statistic"}>
                        <div className={"view_ProjectGroup_List_statistic_item"}>
                          <img src={images.check_64} alt="" width={15} height={15}/>
                          <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.work_topic', 0), 0)}</span>
                        </div>
                        <div className={"view_ProjectGroup_List_statistic_item"}>
                          <img src={images.speed_64} alt="" width={15} height={15}/>
                          <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.project', 0), 0)}</span>
                        </div>
                        <div className={"view_ProjectGroup_List_statistic_item"}>
                          <img src={images.workfollow_64} alt="" width={15} height={15}/>
                          <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.process', 0), 0)}</span>
                        </div>
                      </div>
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
