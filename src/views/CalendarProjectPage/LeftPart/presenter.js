import { Box, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiCalendar, mdiChevronLeft, mdiDotsVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import SearchInput from 'components/SearchInput';
import { Routes } from 'constants/routes';
import { get } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import UpdateProjectCalendar from 'views/CalendarPage/views/Modals/UpdateProjectCalendar';
import './style.scss';

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_CaledarProjectPageLeftPart_List___banner ${className}`}
    {...props}
  />;

function CalendarProjectLeftPartPresenter({
  groupSchedules, handleOpenModal, handleUpdateGroupSchedule,
  handleSearchPattern, searchPattern, handleDeleteGroup, havePermission
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const [menuAnchor, setMenuAnchor] = React.useState();
  const [onHover, setOnHover] = React.useState({ id: null });
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  function doOpenMenu(anchorEl, item) {
    setMenuAnchor(anchorEl);
    setSelectedItem(item);
  }

  return (
    <>
      <React.Fragment>
        <LeftSideContainer
          title={t('IDS_WP_PROJECT_CALENDAR')}
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push(`${Routes.CALENDAR}/project`),
            tooltip: t("DMH.VIEW.PGP.LEFT.INFO.BACK"),
          }}
          rightAction={havePermission ? {
            iconPath: mdiPlus,
            onClick: evt => handleOpenModal('CREATE'),
            tooltip: t('views.calendar_page.left_part.create')
          } : null}
        >
          <Banner>
            <SearchInput
              fullWidth
              placeholder={t("IDS_WP_INPUT_SEARCH")}
              value={searchPattern}
              onChange={evt => handleSearchPattern(evt.currentTarget.value)}
            />
          </Banner>
          <StyledList>
            {groupSchedules.data.map((item, index) => (
              <Box key={index}>
                <StyledListItem
                  to={Routes.CALENDAR_PROJECT.replace(":scheduleID", get(item, "id", ""))}
                  component={Link}
                  className={`${params.scheduleID == get(item, "id", "") ? "item-actived" : ""}`}
                  onMouseEnter={() => setOnHover({ id: item.id })}
                  onMouseLeave={() => setOnHover({ id: null })}
                >
                  <Icon
                    className="view_CaledarProjectPageLeftPart_List_iconLeft"
                    path={mdiCalendar}
                    size={1}
                    color={"#607D8B"}
                  />
                  <ListItemText
                    primary={
                      <Primary
                        className={`custom-title-setting-item ${
                          item.icon ? "" : "none-icon"
                          }`}
                      >
                        {get(item, "name", "")}
                      </Primary>
                    }
                  />
                  {
                    <div
                      onClick={evt => doOpenMenu(evt.currentTarget, item)}
                    >
                      <abbr title={t('IDS_WP_MORE')}>
                        {
                          onHover.id === item.id && (
                            <Icon
                              path={mdiDotsVertical}
                              size={1}
                              color={item.color || "rgba(0, 0, 0, 0.54)"}
                            />
                          )
                        }
                      </abbr>
                    </div>
                  }
                </StyledListItem>
              </Box>
            ))}
          </StyledList>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={evt => setMenuAnchor(null)}
            transformOrigin={{
              vertical: -10,
              horizontal: 'right'
            }}
          >
            {
              havePermission && (
                <>
                  <MenuItem
                    onClick={evt => {
                      setOpenEditModal(true);
                      setMenuAnchor(null);
                    }}
                  >
                    {t("views.calendar_page.right_part.edit")}
                  </MenuItem>
                  {
                    get(selectedItem, "can_delete", false) && (
                      <MenuItem
                        onClick={evt => {
                          setMenuAnchor(null);
                          handleDeleteGroup(params.scheduleID);
                        }}
                      >
                        {t("views.calendar_page.right_part.delete")}
                      </MenuItem>
                    )
                  }
                </>
              )
            }
          </Menu>
        </LeftSideContainer>
      </React.Fragment>
      <UpdateProjectCalendar
        open={openEditModal}
        setOpen={setOpenEditModal}
        schedule={groupSchedules.data.find(item => item.id === params.scheduleID)}
        onConfirm={(name, descrtiption) => handleUpdateGroupSchedule(params.scheduleID, name, descrtiption)}
      />
    </>
  )
}

export default CalendarProjectLeftPartPresenter;