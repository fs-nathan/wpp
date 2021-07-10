import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { mdiBellOutline, mdiCalendar, mdiPencilBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import * as images from 'assets';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import { YearPopover } from 'components/CustomPopover';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingOverlay from 'components/LoadingOverlay';
import { get } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import linkify from "linkifyjs/html";
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
  year, handleYearChanged, i18nDays, doOpenModal,
  bgColor, scheduleOfWeek, calendar, handleDeleteAllSchedule,
  havePermission, handleEditWeekSchedule, handleDeleteWeekSchedule
}) {

  const { t } = useTranslation();
  const params = useParams();
  const [yearAnchor, setYearAnchor] = React.useState();

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
              onClick: evt => doOpenModal("EDIT")
            }
          ],
          moreMenu: calendar && calendar.can_modify ? [
            {
              label: t("views.calendar_page.right_part.edit"),
              onClick: evt => handleEditWeekSchedule()
            },
            {
              label: t("views.calendar_page.right_part.delete"),
              onClick: evt => handleDeleteWeekSchedule()
            }
          ] : null,
        },
        bgColor
      }}>
        <CustomTableLayout
          className={"view_WeeklyCalendar_rightContainer_TableLayout"}
          children={
            <LoadingOverlay
              active={scheduleOfWeek.loading}
              spinner
              fadeSpeed={100}
            >
              {
                (calendar === undefined || scheduleOfWeek.data.length === 0) && !scheduleOfWeek.loading && (
                  <>
                    <div className="view_WeeklyCalendar_rightContainer_No_Data_Container">
                      <img
                        src={images.no_data}
                        alt="no-data"
                        width="400px"
                      />
                      <span style={{ color: `${bgColor.color}` }} className="title">{t('views.calendar_page.right_part.no_data')}</span>
                      <span className="description">{t('views.calendar_page.right_part.no_data_description_alarm')}</span>
                    </div>
                  </>
                )
              }
              {
                (calendar !== undefined && scheduleOfWeek.data.length !== 0) && (
                  <>
                    <div className="view_WeeklyCalendar_rightContainer">
                      <CalendarDetailHeader>
                        {get(calendar, "name", "")}
                        <Typography component={'span'}>
                          {t('IDS_WP_WEEK')} {get(calendar, "week", "")} ( {get(calendar, "start", "")} - {get(calendar, "end", "")})
                        </Typography>
                      </CalendarDetailHeader>
                      <TableContainer className="view_WeeklyCalendar_rightContainer__TableContainer">
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell><Icon path={''} size={0.85} color="rgba(0, 0, 0, 0.7)" /></TableCell>
                              <TableCell></TableCell>
                              <TableCell>{t('views.calendar_page.modal.create_weekly_calendar.label.title')}</TableCell>
                              <TableCell>{t('views.calendar_page.modal.create_weekly_calendar.content')}</TableCell>
                              <TableCell>{t('views.calendar_page.modal.create_weekly_calendar.receiver')}</TableCell>
                              <TableCell>{t('views.calendar_page.right_part.label.created_by')}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              scheduleOfWeek.data.map((item, index) => {
                                if (item.schedules.length !== 0) {
                                  return (
                                    <React.Fragment key={index}>
                                      <TableRow>
                                        <TableCell colSpan={6} className="view_WeeklyCalendar_rightContainer__TableHeaderGroup">
                                          <Typography component={'div'} className="header">
                                            <div className="header_time">
                                              <span>{i18nDays[new Date(item.schedules[0].time_original).getDay()]}</span>
                                              <span>({item.date})</span>
                                            </div>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                      {
                                        item.schedules.map((schedule) => {
                                          return (
                                            <TableRow hover key={schedule.id}>
                                              <TableCell className="schedule_item_remind">
                                                {
                                                  schedule.is_remind && (
                                                    <Tooltip title={schedule.title_remind_before} placement="right">
                                                      <Icon path={mdiBellOutline} size={0.85} color="rgba(0, 0, 0, 0.7)" />
                                                    </Tooltip>
                                                  )
                                                }
                                                {
                                                  !schedule.is_remind && (
                                                    <Icon path={''} size={0.85} color="rgba(0, 0, 0, 0.7)" />
                                                  )
                                                }
                                              </TableCell>
                                              <TableCell className="schedule_item_time">{schedule.time}</TableCell>
                                              <TableCell className="schedule_item_title">{schedule.title}</TableCell>
                                              <TableCell className="schedule_item_content">
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: linkify(schedule.content.replace(/\n/g, "<br>")),
                                                }}
                                              ></div>
                                                {
                                                  schedule.place && schedule.place !== "" && (
                                                    <div className="are-place">
                                                      <PlaceIcon />
                                                      <span>{schedule.place}</span>
                                                    </div>
                                                  )
                                                }
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  schedule.assign_to_all && (
                                                    <div className="assign_to_all">{t('views.calendar_page.modal.create_weekly_calendar.all')}</div>
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
                                              </TableCell>
                                              <TableCell>
                                                <Box className="schedule_item_created_by">
                                                  <CustomAvatar
                                                    style={{ width: 20, height: 20 }}
                                                    src={schedule.user_create_avatar} alt='avatar'
                                                  />
                                                  <span>{schedule.user_create_name}</span>
                                                </Box>
                                              </TableCell>
                                            </TableRow>
                                          )
                                        })
                                      }
                                    </React.Fragment>
                                  );
                                }
                              })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </>
                )
              }
            </LoadingOverlay>
          } />
      </CustomTableProvider>
      <YearPopover
        anchorEl={yearAnchor}
        setAnchorEl={setYearAnchor}
        value={year}
        onChange={({ target }) => handleYearChanged(target.value)}
      />
    </React.Fragment>
  )
}

export default CalendarWeeklyRightPartPresenter;