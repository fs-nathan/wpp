import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiChevronLeft, mdiDragVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, Secondary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingBox from 'components/LoadingBox';
import SearchInput from 'components/SearchInput';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomListItem from './CustomListItem';
import './style.scss';
import {WORKPLACE_TYPES} from "../../../../constants/constants";

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_Project_GroupTaskSlide___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_Project_GroupTaskSlide___primary ${className}`}
    {...props}
  />;

function GroupTaskSlide({
  handleSubSlide,
  searchPatern, setSearchPatern,
  groupTasks, permissions = false,
  handleSortGroupTask, handleDeleteGroupTask,
  handleOpenModal, project
}) {

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curGroupTask, setCurGroupTask] = React.useState(null);
  const [title, setTitle] = React.useState("");

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleSortGroupTask(draggableId, destination.index);
  }

  React.useEffect(() => {
    switch (get(project, 'project.work_type')) {
      case WORKPLACE_TYPES.JOB:
      case WORKPLACE_TYPES.PROJECT:
        setTitle(t("DMH.VIEW.PP.LEFT.GT.TITLE"));
        break;
      case WORKPLACE_TYPES.PROCESS:
        setTitle(t("IDS_WP_PHASE"));
        break;
      default:
        break;
    }
  }, [project]);

  return (
    <>
      <LeftSideContainer
        title={title}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => handleSubSlide(0),
          tooltip: t("DMH.VIEW.PP.LEFT.GT.BACK"),
        }}
        rightAction={permissions ? {
          iconPath: mdiPlus,
          onClick: () => handleOpenModal('CREATE'),
          tooltip: t("DMH.VIEW.PP.LEFT.GT.ADD"),
        } : null}
        loading={{
          bool: groupTasks.loading,
          component: () => <LoadingBox />
        }}
      >
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("DMH.VIEW.PP.LEFT.GT.SEARCH")}
            value={searchPatern}
            onChange={evt => setSearchPatern(evt.target.value)}
          />
        </Banner>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'task-group-list'}>
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
                  <ListItemText
                    primary={
                      <StyledPrimary>{t("DMH.VIEW.PP.LEFT.GT.ALL_LABLE")}</StyledPrimary>
                    }
                    secondary={
                      <Secondary>
                        {t("DMH.VIEW.PP.LEFT.GT.NUM_TASK", { number_task: groupTasks.groupTasks.reduce((sum, taskGroup) => sum += get(taskGroup, 'number_task', 0), 0) })}
                      </Secondary>
                    }
                  />
                </StyledListItem>
                {groupTasks.groupTasks.map((taskGroup, index) => (
                  <CustomListItem
                    key={get(taskGroup, 'id')}
                    taskGroup={taskGroup}
                    index={index}
                    setAnchorEl={setAnchorEl}
                    setCurGroupTask={setCurGroupTask}
                  />
                ))}
                {provided.placeholder}
              </StyledList>
            )}
          </Droppable>
        </DragDropContext>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={evt => setAnchorEl(null)}
          transformOrigin={{
            vertical: -30,
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={evt => {
            setAnchorEl(null)
            handleOpenModal('UPDATE', {
              curGroupTask,
            });
          }}>{t("DMH.VIEW.PP.LEFT.GT.EDIT")}</MenuItem>
          <MenuItem onClick={evt => {
            setAnchorEl(null);
            handleOpenModal('ALERT', {
              selectedGroupTask: curGroupTask,
            });
          }}>{t("DMH.VIEW.PP.LEFT.GT.DEL")}</MenuItem>
        </Menu>
      </LeftSideContainer>
    </>
  )
}

export default GroupTaskSlide;
