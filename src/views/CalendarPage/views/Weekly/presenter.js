import { IconButton, Typography } from '@material-ui/core';
import { mdiCalendar, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import * as images from 'assets';
import CustomAvatar from 'components/CustomAvatar';
import { YearPopover } from 'components/CustomPopover';
import CustomTable from 'components/CustomTable';
import LoadingBox from 'components/LoadingBox';
import { Container, DateBox, LinkSpan, SettingContainer } from 'components/TableComponents';
import { Routes } from 'constants/routes';
import { get, remove, slice } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';


const SettingButton = ({
  handleOpenMenu
}) => {

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={evt => handleOpenMenu(evt.currentTarget)}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};

function WeeklyCalendarPresenter({
  expand, handleExpand,
  calendars, handleSortCalendar,
  handleOpenModal, handleSortType,
  bgColor, handleYearChanged, year
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const [yearAnchor, setYearAnchor] = React.useState();

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
            mainAction: {
              label: t("views.calendar_page.right_part.add"),
              onClick: evt => handleOpenModal('CREATE'),
            },
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
              bool: calendars.data !== undefined && calendars.data.length !== 0,
              onDragEnd: result => {
                const { source, destination, draggableId } = result;
                if (!destination) return;
                if (
                  destination.droppableId === source.droppableId &&
                  destination.index === source.index
                )
                  return;
                let sortData = calendars.data;
                const indexes = sortData.map(data => get(data, 'sort_index'));
                let removed = remove(sortData, { id: draggableId });
                sortData = [
                  ...slice(sortData, 0, destination.index),
                  ...removed,
                  ...slice(sortData, destination.index)
                ].map((data, index) => ({
                  ...data,
                  sort_index: indexes[index],
                }));
                handleSortCalendar(sortData);
              }
            },
            loading: {
              bool: calendars.loading,
              component: () => <LoadingBox />
            },
            row: {
              id: 'name',
            }
          }}
          columns={
            calendars.data.length !== 0 ?
              [
                {
                  label: t("views.calendar_page.right_part.label.name"),
                  field: (row) => <LinkSpan
                    onClick={evt => history.push(`${Routes.CALENDAR_WEEKLY.replace(":week/:year", `${get(row, 'week', '')}/${get(row, 'year', '')}`)}`)}
                  >
                    {get(row, 'name', '')}
                  </LinkSpan>,
                  align: 'left',
                  width: '30%',
                  sort: evt => handleSortType('name')
                },
                {
                  label: t("views.calendar_page.right_part.label.time"),
                  field: row => (
                    <DateBox>
                      <>
                        <span>{t('IDS_WP_WEEK')} {get(row, 'week')} / {get(row, 'year')}</span>
                        <small>
                          {t('IDS_WP_FROM')} : {get(row, 'start')} - {get(row, 'end')}
                        </small>
                      </>
                    </DateBox>
                  ),
                  align: 'left',
                  width: '25%',
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
                  width: '20%',
                  sort: evt => handleSortType('user_create.name')
                },
                {
                  label: t("views.calendar_page.right_part.label.created_at"),
                  field: row => <span>{get(row, 'date_create', '')}</span>,
                  align: 'left',
                  width: '25%',
                  sort: evt => handleSortType('date_create')
                }
              ] : []
          }
          data={calendars.data}
        />
        {
          (calendars.data.length === 0 && !calendars.loading) && (
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
          )
        }
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