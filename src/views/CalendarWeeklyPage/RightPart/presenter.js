import { Box, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { mdiBellOutline, mdiCalendar, mdiPencilBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import { YearPopover } from 'components/CustomPopover';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingOverlay from 'components/LoadingOverlay';
import { ScrollbarsContainer } from "components/TableComponents";
import { get } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UpdateWeeklyCalendar from 'views/CalendarPage/views/Modals/UpdateWeeklyCalendar';
import './style.scss';

const CalendarDetailHeader = ({ className = '', ...props }) =>
  <p
    className={`view_WeeklyCalendar_rightContainer__header ${className}`}
    {...props}
  />

const CalendarItemContainer = ({ className = "", ...rest }) => (
  <div className={`view_WeeklyCalendar_rightContainer__itemContainer ${className}`} {...rest} />
);

function CalendarWeeklyRightPartPresenter({
  year, handleYearChanged, i18nDays,
  bgColor, scheduleOfWeek, calendar
}) {

  const { t } = useTranslation();
  const params = useParams();
  const [yearAnchor, setYearAnchor] = React.useState();
  const [openUpdate, setOpenUpdate] = React.useState(false);

  function handleOnCloseModal() {

  }

  return (
    <React.Fragment>
      <CustomTableProvider value={{
        options: {
          title: t('views.calendar_page.right_part.weekly_detail'),
          subActions: [
            {
              label: `${t('IDS_WP_YEAR')} ${year}`,
              iconPath: mdiCalendar,
              onClick: evt => setYearAnchor(evt.currentTarget)
            },
            {
              label: t('views.calendar_page.right_part.edit2'),
              iconPath: mdiPencilBoxOutline,
              onClick: evt => setOpenUpdate(true)
            }
          ],
          mainAction: {
            label: t('views.calendar_page.right_part.delete_calendar'),
            onClick: () => null
          }
        },
        bgColor
      }}>
        <CustomTableLayout children={
          <ScrollbarsContainer
            autoHide
            autoHideTimeout={500}
          >
            <LoadingOverlay
              active={scheduleOfWeek.loading}
              spinner
              fadeSpeed={100}
            >
              <div className="view_WeeklyCalendar_rightContainer">
                {
                  calendar !== undefined && (
                    <CalendarDetailHeader>
                      {t("views.calendar_page.modal.create_weekly_calendar.title_right")}
                      <Typography component={'span'}>
                        {t('IDS_WP_WEEK')} {params.week} ( {get(calendar, "start", "")} - {get(calendar, "end", "")})
                    </Typography>
                    </CalendarDetailHeader>
                  )
                }
                {
                  scheduleOfWeek.data.map((item, index) => {
                    if (item.schedules.length !== 0) {
                      return (
                        <CalendarItemContainer>
                          <Typography component={'div'} className="header">
                            <div className="header_time">
                              <span>{i18nDays[new Date(item.schedules[0].time_original).getDay()]}</span>
                              <span>({item.date})</span>
                            </div>
                            <div className="header_title">{t('views.calendar_page.modal.create_weekly_calendar.label.title')}</div>
                            <div className="header_content">{t('views.calendar_page.modal.create_weekly_calendar.content')}</div>
                            <div className="header_members_joined">{t('views.calendar_page.modal.create_weekly_calendar.receiver')}</div>
                            <div className="header_created_by">{t('views.calendar_page.right_part.label.created_by')}</div>
                          </Typography>
                          <List component={'div'} key={`views_CalendarWeeklyPage_rightPart_list_${index}`}>
                            {
                              item.schedules.map((schedule) => {
                                return (
                                  <ListItem key={`views_CalendarWeeklyPage_rightPart_list_item_${schedule.id}`}>
                                    <ListItemIcon>
                                      {
                                        schedule.is_remind && <Icon path={mdiBellOutline} size={0.7} color="rgba(0, 0, 0, 0.7)" />
                                      }
                                    </ListItemIcon>
                                    <ListItemText className="schedule_item_time">
                                      <span>{schedule.time}</span>
                                    </ListItemText>
                                    <ListItemText className="schedule_item_title">
                                      <span>{schedule.title}</span>
                                    </ListItemText>
                                    <ListItemText className="schedule_item_content">
                                      <span>{schedule.content}</span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                      {
                                        schedule.assign_to_all && (
                                          <div className="assign_to_all">Tất cả</div>
                                        )
                                      }
                                      {
                                        !schedule.assign_to_all && (
                                          <AvatarCircleList
                                            users={schedule.members_assign.map((member) => ({
                                              name: get(member, 'name'),
                                              avatar: get(member, 'avatar')
                                            }))}
                                            display={3}
                                          />
                                        )
                                      }
                                      <Box className="schedule_item_created_by">
                                        <CustomAvatar
                                          style={{ width: 20, height: 20 }}
                                          src={schedule.user_create_avatar} alt='avatar'
                                        />
                                        <span>{schedule.user_create_name}</span>
                                      </Box>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                )
                              })
                            }
                          </List>
                        </CalendarItemContainer>
                      );
                    }
                  })
                }
              </div>
            </LoadingOverlay>
          </ScrollbarsContainer>
        } />
      </CustomTableProvider>
      <YearPopover
        anchorEl={yearAnchor}
        setAnchorEl={setYearAnchor}
        value={year}
        onChange={({ target }) => handleYearChanged(target.value)}
      />
      <UpdateWeeklyCalendar
        open={openUpdate}
        setOpen={setOpenUpdate}
        handleOnClose={handleOnCloseModal}
        scheduleOfWeek={scheduleOfWeek}
      />
    </React.Fragment>
  )
}

export default CalendarWeeklyRightPartPresenter;