import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { mdiCalendar, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import CustomAvatar from 'components/CustomAvatar';
import { YearPopover } from 'components/CustomPopover';
import CustomTable from 'components/CustomTable';
import LoadingBox from 'components/LoadingBox';
import { Container, DateBox, LinkSpan, SettingContainer } from 'components/TableComponents';
import { Routes } from 'constants/routes';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';


const SettingButton = ({
  handleOpenDropdown,
  row
}) => {

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={evt => handleOpenDropdown(evt.currentTarget, row)}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};

function WeeklyCalendarPresenter({
  expand, handleExpand, canCreate,
  calendars, handleOpenModal, handleSortType,
  bgColor, handleYearChanged, year, doDeleteSchedule
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const [yearAnchor, setYearAnchor] = React.useState();
  const [selectedSchedule, setSelectedSchedule] = React.useState();
  const [menuAnchor, setMenuAnchor] = React.useState();

  const handleOpenDropdown = (anchorEl, schedule) => {
    setSelectedSchedule(schedule);
    setMenuAnchor(anchorEl);
  }

  const handleEditSchedule = () => {
    handleOpenModal("UPDATE_WEEKLY_SCHEDULE", {schedule: selectedSchedule})
  }

  const handleDeleteSchedule = () => {
    doDeleteSchedule(selectedSchedule)
  }


  return (
    <Container>
      <React.Fragment>
        <CustomTable
          options={{
            title: t('IDS_WP_WEEKLY_CALENDAR'),
            subTitle: '',
            subActions: [
              {
                label: `${t('IDS_WP_YEAR')} ${year}`,
                iconPath: mdiCalendar,
                onClick: evt => setYearAnchor(evt.currentTarget)
              }
            ],
            mainAction: canCreate ? {
              label: t("views.calendar_page.right_part.add"),
              onClick: evt => handleOpenModal('CREATE_WEEKLY_SCHEDULE'),
            } : null,
            expand: {
              bool: expand,
              toggleExpand: () => handleExpand(!expand)
            },
            moreMenu: [
              {
                label: t("views.calendar_page.right_part.setting"),
                onClick: evt => handleOpenModal('SETTING')
              },
            ],
            grouped: {
              bool: false
            },
            draggable: {
              bool: false,
            },
            loading: {
              bool: calendars.loading,
              component: () => <LoadingBox />
            },
            row: {
              id: 'name',
            },
            noData: {
              bool: calendars.data.length === 0 && !calendars.loading,
              title: t('views.calendar_page.right_part.no_data'),
              subtitle: t('views.calendar_page.right_part.no_data_description')
            }
          }}
          columns={
            calendars.data.length !== 0 ?
              [
                {
                  label: t("Tuần"),
                  field: (row) => (
                    <>
                      <span>{t('IDS_WP_WEEK')} {get(row, 'week')} / {get(row, 'year')}</span>
                      {
                        moment().isoWeek() === get(row, 'week') && (
                          <span style={{color: "red", float: "left", width: "100%"}}>({t('IDS_WP_PRESENT')})</span>
                        )
                      }
                    </>
                  ),
                  align: 'left',
                  width: '15%',
                  sort: evt => handleSortType('week')
                },
                {
                  label: t("views.calendar_page.right_part.label.name"),
                  field: (row) => <LinkSpan
                    onClick={evt => history.push(Routes.CALENDAR_WEEKLY.replace(":year/:schedule_id/:from", `${get(row, 'year', '')}/${get(row, 'id', '')}`))}
                  >
                    <span className="views_weeklyCalendar_calendarName">{get(row, 'name', '')}</span>
                  </LinkSpan>,
                  align: 'left',
                  width: '20%',
                  sort: evt => handleSortType('name')
                },
                {
                  label: t("Mô tả"),
                  field: (row) => (
                    <>
                      {get(row, 'description')}
                    </>
                  ),
                  align: 'left',
                  width: '15%',
                  sort: evt => handleSortType('name')
                },
                {
                  label: t("views.calendar_page.right_part.label.time"),
                  field: row => (
                    <DateBox>
                      <>
                        <small>
                          {get(row, 'start')} - {get(row, 'end')}
                        </small>
                      </>
                    </DateBox>
                  ),
                  align: 'left',
                  width: '15%',
                  sort: evt => handleSortType('week')
                },
                {
                  label: () => t("views.calendar_page.right_part.label.created_by"),
                  field: row => (
                    <Typography component={'div'} className="row_inline">
                      <CustomAvatar
                        style={{
                          width: 25,
                          height: 25,
                        }}
                        src={get(row, 'user_create_avatar')}
                        alt="project group icon"
                      />
                      <span>{get(row, 'user_create_name')}</span>
                    </Typography>
                  ),
                  align: 'left',
                  width: '15%',
                  sort: evt => handleSortType('user_create.name')
                },
                {
                  label: t("views.calendar_page.right_part.label.created_at"),
                  field: row => <span>{get(row, 'date_create', '')}</span>,
                  align: 'left',
                  width: '10%',
                  sort: evt => handleSortType('date_create')
                },
                {
                  label: "",
                  field: row => {
                    if (row.can_modify) {
                      return <SettingButton handleOpenDropdown={handleOpenDropdown} row={row} />
                    }
                    return null
                  },
                  align: 'left',
                  width: '1%',
                }
              ] : []
          }
          data={calendars.data}
        />
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
          <MenuItem
            onClick={() => {
              handleEditSchedule(selectedSchedule);
              setMenuAnchor(null);
            }}
          >
            {t("views.calendar_page.right_part.edit")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteSchedule(selectedSchedule);
              setMenuAnchor(null);
            }}
          >{t("views.calendar_page.right_part.delete")}</MenuItem>
        </Menu>
        <YearPopover
          anchorEl={yearAnchor}
          setAnchorEl={setYearAnchor}
          value={year}
          onChange={({ target }) => handleYearChanged(target.value)}
        />
      </React.Fragment>
    </Container>
  );
}

export default WeeklyCalendarPresenter;