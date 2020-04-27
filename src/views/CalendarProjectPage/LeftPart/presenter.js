import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiCalendar, mdiChevronLeft, mdiDotsVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingOverlay from "components/LoadingOverlay";
import SearchInput from 'components/SearchInput';
import { get } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { LinkRoutes, Routes } from "../../CalendarPage/constants/routes";
import './style.scss';

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_WeeklyCalendarLeftPart_List___banner ${className}`}
    {...props}
  />;

function CalendarProjectLeftPartPresenter({
  groupSchedules, handleOpenModal,
  handleSearchPattern, searchPattern
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const [menuAnchor, setMenuAnchor] = React.useState();

  function doOpenMenu(anchorEl, calendar) {
    setMenuAnchor(anchorEl)
  }

  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('IDS_WP_PROJECT_CALENDAR')}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(Routes.PROJECT),
          tooltip: t("DMH.VIEW.PGP.LEFT.INFO.BACK"),
        }}
        rightAction={{
          iconPath: mdiPlus,
          onClick: evt => handleOpenModal('CREATE'),
          tooltip: t('views.calendar_page.left_part.create')
        }}
      >
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("IDS_WP_INPUT_SEARCH")}
            value={searchPattern}
            onChange={evt => handleSearchPattern(evt.currentTarget.value)}
          />
        </Banner>
        <LoadingOverlay
          active={groupSchedules.loading}
          spinner
          fadeSpeed={100}
        >
          <StyledList>
            {groupSchedules.data.map((item, index) => (
              <React.Fragment key={index}>
                <StyledListItem
                  to={`${LinkRoutes.PROJECT}/${get(item, "id", "")}`}
                  component={Link}
                  className={`${params.scheduleID == get(item, "id", "") ? "item-actived" : ""}`}
                >
                  <Icon
                    className="left-setting-icon"
                    path={mdiCalendar}
                    size={1.4}
                    color={item.color || "rgba(0, 0, 0, 0.54)"}
                  />
                  <ListItemText
                    primary={
                      <Primary
                        className={`title-setting-item ${
                          item.icon ? "" : "none-icon"
                          }`}
                      >
                        {get(item, "name", "")}
                      </Primary>
                    }
                  />
                  {
                    item.can_modify && (
                      <Icon
                        className="left-setting-icon"
                        path={mdiDotsVertical}
                        size={1.4}
                        color={item.color || "rgba(0, 0, 0, 0.54)"}
                        onClick={evt => doOpenMenu(evt.currentTarget, null)}
                      />
                    )
                  }
                </StyledListItem>
              </React.Fragment>
            ))}
          </StyledList>
        </LoadingOverlay>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={evt => setMenuAnchor(null)}
          transformOrigin={{
            vertical: -30,
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={evt => handleOpenModal("DELETE")}>{t("views.calendar_page.right_part.delete")}</MenuItem>
        </Menu>
      </LeftSideContainer>
    </React.Fragment>
  )
}

export default CalendarProjectLeftPartPresenter;