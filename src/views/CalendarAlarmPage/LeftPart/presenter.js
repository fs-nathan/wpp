import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiCalendarClock, mdiChevronLeft, mdiDotsVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingOverlay from 'components/LoadingOverlay';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Routes } from "../constants/routes";
import "./styles.scss";


const getItemStyle = (isDragging, draggableStyle, defaultColor) => ({
  background: isDragging ? "lightgreen" : defaultColor,
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#f6f6f6' : 'none',
});

function CalendarAlarmLeftPartPresenter({
  personalRemindCategories, handleSortPersonalAlarm,
  handleOpenModal, handleDeleteCategory, handleEditCategory
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();

  const [menuAnchor, setMenuAnchor] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();

  function doOpenMenu(anchorEl, category) {
    setSelectedCategory(category);
    setMenuAnchor(anchorEl);
  }

  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('IDS_WP_ALARM_CALENDAR')}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(Routes.WEEKLY),
          tooltip: t("DMH.VIEW.PGP.LEFT.INFO.BACK"),
        }}
      >
        <StyledList>
          <React.Fragment key={"recently_alarm"}>
            <StyledListItem
              to={Routes.ALARM_RECENTLY}
              component={Link}
              className={params.category === "recently" ? "item-actived" : ""}
            >
              <Icon
                className="left-setting-icon"
                path={mdiCalendarClock}
                size={1.4}
                color={"rgba(0, 0, 0, 0.54)"}
              />
              <ListItemText
                primary={
                  <Primary
                    className={"title-setting-item"}
                  >
                    {t('views.calendar_page.left_part.recently')}
                  </Primary>
                }
              />
            </StyledListItem>
          </React.Fragment>
          <React.Fragment key={"project_alarm"}>
            <StyledListItem
              to={Routes.ALARM_PROJECT}
              component={Link}
              className={params.category === "project" ? "item-actived" : ""}
            >
              <Icon
                className="left-setting-icon"
                path={mdiCalendarClock}
                size={1.4}
                color={"rgba(0, 0, 0, 0.54)"}
              />
              <ListItemText
                primary={
                  <Primary
                    className={"title-setting-item"}
                  >
                    {t('views.calendar_page.left_part.project_alarm')}
                  </Primary>
                }
              />
            </StyledListItem>
          </React.Fragment>
          <React.Fragment key={"my_alarm"}>
            <StyledListItem
              to={Routes.ALARM_PERSONAL}
              component={Link}
              className={params.category === "personal" ? "item-actived" : ""}
            >
              <Icon
                className="left-setting-icon"
                path={mdiCalendarClock}
                size={1.4}
                color={"rgba(0, 0, 0, 0.54)"}
              />
              <ListItemText
                primary={
                  <Primary
                    className={"title-setting-item"}
                  >
                    {t('views.calendar_page.left_part.my_alarm')}
                  </Primary>
                }
              />
              {
                params.category === "personal" && (
                  <IconButton
                    onClick={() => handleOpenModal("PERSONAL_REMIND_CREATE")}
                  >
                    <Icon
                      className="right-setting-icon"
                      path={mdiPlus}
                      size={0.8}
                      color={"rgba(0, 0, 0, 0.54)"}
                    />
                  </IconButton>
                )
              }
            </StyledListItem>
            <LoadingOverlay
              active={personalRemindCategories.loading}
              spinner
              fadeSpeed={100}
            >
              <DragDropContext onDragEnd={handleSortPersonalAlarm}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      className={"left_sub_menu"}
                    >
                      {personalRemindCategories.data.map((item, index) => {
                        if (item.id !== null) {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="sub_menu_item"
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                    item.color
                                  )}
                                >
                                  <a
                                    onClick={() => history.push(`${Routes.ALARM_PERSONAL}?category=${item.id}`)}
                                    className="personal_alarm_name">{item.name}
                                  </a>
                                  <div className="personal_alarm_count">2</div>
                                  <IconButton
                                    key={item.id}
                                    onClick={({ target }) => doOpenMenu(target, item)}
                                  >
                                    <Icon
                                      key={item.id}
                                      className="right-setting-icon"
                                      path={mdiDotsVertical}
                                      size={1}
                                      color={"rgba(0, 0, 0, 0.54)"
                                      }
                                    />
                                  </IconButton>
                                </div>
                              )}
                            </Draggable>
                          )
                        }

                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </LoadingOverlay>
          </React.Fragment>
        </StyledList>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={evt => setMenuAnchor(null)}
          transformOrigin={{
            vertical: -30,
            horizontal: 'left'
          }}
        >
          <MenuItem
            onClick={() => {
              handleEditCategory(selectedCategory);
              setMenuAnchor(null);
            }}
          >
            {t("views.calendar_page.right_part.edit")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteCategory(selectedCategory);
              setMenuAnchor(null);
            }}
          >
            {t("views.calendar_page.right_part.delete")}
          </MenuItem>
        </Menu>
      </LeftSideContainer>
    </React.Fragment>
  )
}

export default CalendarAlarmLeftPartPresenter;