import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiCalendarClock, mdiChevronLeft, mdiDotsVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingOverlay from 'components/LoadingOverlay';
import { hexToRGBA } from 'helpers/utils/hexToRGBA';
import { get } from "lodash";
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Routes } from "../constants/routes";
import "./styles.scss";


const getItemStyle = (isDragging, draggableStyle, defaultColor, isHoverOrActive = false) => ({
  background: isDragging ? "lightgreen" : hexToRGBA(defaultColor, isHoverOrActive ? 1 : 0.2),
  color: isHoverOrActive ? '#fff' : '#000000',
  ...draggableStyle
});

function CalendarAlarmLeftPartPresenter({
  personalRemindCategories, handleSortPersonalAlarm,
  handleOpenModal, handleDeleteCategory,
  handleEditCategory, havePermission, remindStatistic
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const search = useLocation().search;

  const [menuAnchor, setMenuAnchor] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [categoryID, setCategoryID] = React.useState(null);
  const [isHover, setIsHover] = React.useState({ id: null });

  function doOpenMenu(anchorEl, category) {
    setSelectedCategory(category);
    setMenuAnchor(anchorEl);
  }

  React.useEffect(() => {
    let searchParams = new URLSearchParams(search);
    setCategoryID(searchParams.get("category"));
  }, [search]);

  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('IDS_WP_ALARM_CALENDAR')}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(Routes.WEEKLY),
          tooltip: t("IDS_WP_BACK"),
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
                color={"#607D8B"}
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
                color={"#607D8B"}
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
                color={"#607D8B"}
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
                havePermission && (
                  <IconButton
                    onClick={evt => {
                      evt.preventDefault();
                      evt.stopPropagation();
                      handleOpenModal("PERSONAL_REMIND_CREATE");
                    }}
                  >
                    <abbr title={t('IDS_WP_CREATE_NEW')}><Icon path={mdiPlus} size={0.85} color={"rgba(0, 0, 0, 0.54)"} /></abbr>
                  </IconButton>
                )
              }
            </StyledListItem>
            <LoadingOverlay
              active={personalRemindCategories.loading}
              spinner
              fadeSpeed={100}
            >
              <DragDropContext onDragEnd={havePermission ? handleSortPersonalAlarm : () => null}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={"left_sub_menu"}
                    >
                      {personalRemindCategories.data.map((item, index) => {
                        if (item.id !== null) {
                          return (
                            <div className={`sub_menu_item ${categoryID === item.id ? 'sub_menu_item_active' : ''}`}>
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    onMouseEnter={() => setIsHover({ id: item.id })}
                                    onMouseLeave={() => setIsHover({ id: null })}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`sub_menu_item_inner 
                                      ${ new URLSearchParams(search).get("category") === item.id ? 'sub_menu_item_inner_active' : ''}
                                    `}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style,
                                      item.color,
                                      new URLSearchParams(search).get("category") === item.id || isHover.id === item.id
                                    )}
                                  >
                                    <a
                                      onClick={() => history.push(`${Routes.ALARM_PERSONAL}?category=${item.id}`)}
                                      className="personal_alarm_name">{item.name}
                                    </a>
                                    <div className="personal_alarm_count">{
                                      get(remindStatistic, `[${item.id}]`, 0)
                                    }</div>
                                    {
                                      <IconButton
                                        key={item.id}
                                        onClick={(evt) => doOpenMenu(evt.currentTarget, item)}
                                        className="personal_alarm_control"
                                      >
                                        {
                                          havePermission && (
                                            <abbr title={t('IDS_WP_MORE')}>
                                              {
                                                isHover.id === item.id && (
                                                  <Icon
                                                    key={item.id}
                                                    path={mdiDotsVertical}
                                                    size={0.8}
                                                    color={"#fff"}
                                                  />
                                                )
                                              }
                                            </abbr>
                                          )
                                        }
                                      </IconButton>

                                    }
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          )
                        }
                        else return <></>
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