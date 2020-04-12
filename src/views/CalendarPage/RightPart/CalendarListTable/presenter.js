import { mdiCalendar } from '@mdi/js';
import CustomTable from 'components/CustomTable';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as images from '../../../../assets';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import CustomAvatar from '../../../../components/CustomAvatar';
import { TimeRangePopover, useFilters, useTimes } from '../../../../components/CustomPopover';
import LoadingBox from '../../../../components/LoadingBox';
import { Container, DateBox, LinkSpan } from '../../../../components/TableComponents';
import './style.scss';

function CalendarListTablePresenter({
  expand, handleExpand, route,
  calendarList,
  timeType, handleTimeType,
  handleOpenModal,
  handleTimeRange,
  bgColor,
  canCreate,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const filters = useFilters();
  const times = useTimes();

  const [timeAnchor, setTimeAnchor] = React.useState();
  const [menuAnchor, setMenuAnchor] = React.useState();
  if (calendarList == null) {
    return (
      <Container>
        <React.Fragment>
          <CustomTable
            options={{
              title: t('IDS_WP_WEEKLY_CALENDAR'),
              subTitle: '',
              subActions: [
                {
                  label: times[timeType].title,
                  iconPath: mdiCalendar,
                  onClick: evt => setTimeAnchor(evt.currentTarget)
                }
              ],
              mainAction: canCreate ? {
                label: t("views.calendar_page.right_part.add"),
                onClick: evt => handleOpenModal('CREATE'),
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
            }}
          />
          <div className="no_Data_container">
            <img
              src={images.no_data}
              alt="no-data"
              width="50%"
              height="50%"
            />
            <span style={{ color: `${bgColor.color}` }} className="title">{t('views.calendar_page.right_part.no_data')}</span>
            <span className="description">{t('views.calendar_page.right_part.no_data_description')}</span>
          </div>
          <TimeRangePopover
            bgColor={bgColor}
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType}
            handleTimeRange={(timeType, startDate, endDate) => {
              handleTimeType(timeType)
              handleTimeRange(startDate, endDate)
            }}
          />
        </React.Fragment>
      </Container>
    );
  } else {
    return (
      <Container>
        <React.Fragment>
          <CustomTable
            options={{
              title: t('IDS_WP_WEEKLY_CALENDAR'),
              subTitle: '',
              subActions: [
                {
                  label: times[timeType].title,
                  iconPath: mdiCalendar,
                  onClick: evt => setTimeAnchor(evt.currentTarget)
                }
              ],
              mainAction: canCreate ? {
                label: t("views.calendar_page.right_part.add"),
                onClick: evt => handleOpenModal('CREATE'),
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
                bool: true,
              },
              loading: {
                bool: false,
                component: () => <LoadingBox />
              },
              row: {
                id: 'id',
              }
            }}
            columns={[
              {
                label: t("views.calendar_page.right_part.label.name"),
                field: (row) => <LinkSpan>{get(row, 'name', '')}</LinkSpan>,
                align: 'center',
                width: '20%',
              },
              {
                label: t("views.calendar_page.right_part.label.time"),
                field: row => (
                  <DateBox>
                    {get(row, 'duration') ? (
                      <>
                        <span>{t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", { date: get(row, 'duration') })}</span>
                        <small>
                          {get(row, 'date_start')} - {get(row, 'date_end')}
                        </small>
                      </>
                    ) : null}
                  </DateBox>
                ),
                align: 'center',
                width: '20%',
              },
              {
                label: () => t("views.calendar_page.right_part.label.created_by"),
                field: row => (
                  <CustomAvatar
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    src={get(row, 'icon')}
                    alt="project group icon"
                  />
                ),
                align: 'center',
                width: '20%',
              },
              {
                label: t("views.calendar_page.right_part.label.created_at"),
                field: row => (
                  <DateBox>
                    {get(row, 'duration') ? (
                      <>
                        <span>{t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", { date: get(row, 'duration') })}</span>
                        <small>
                          {get(row, 'date_start')} - {get(row, 'date_end')}
                        </small>
                      </>
                    ) : null}
                  </DateBox>
                ),
                align: 'center',
                width: '20%',
              },
              {
                label: t("views.calendar_page.right_part.label.alarm"),
                field: row => (
                  <AvatarCircleList
                    users={get(row, 'members', []).map(member => ({
                      name: get(member, 'name'),
                      avatar: get(member, 'avatar')
                    }))}
                    display={3}
                  />
                ),
                align: 'center',
                width: '20%',
              },
            ]}
            data={calendarList}
          />
          <TimeRangePopover
            bgColor={bgColor}
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType}
            handleTimeRange={(timeType, startDate, endDate) => {
              handleTimeType(timeType)
              handleTimeRange(startDate, endDate)
            }}
          />
        </React.Fragment>
      </Container>
    );
  }
}

export default CalendarListTablePresenter;