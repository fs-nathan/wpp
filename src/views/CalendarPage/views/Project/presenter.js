import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import CustomTable from 'components/CustomTable';
import { Routes } from 'constants/routes';
import { get, remove, slice } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as images from '../../../../assets';
import CustomAvatar from '../../../../components/CustomAvatar';
import LoadingBox from '../../../../components/LoadingBox';
import { Container, LinkSpan, SettingContainer } from '../../../../components/TableComponents';
import './style.scss';

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
        <abbr title={'More'}>
          <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
        </abbr>
      </IconButton>
    </SettingContainer>
  );
};

function ProjectCalendarPresenter({
  expand, handleExpand, groupSchedules,
  handleOpenModal, handleSortType, handleSortCalendar,
  bgColor, havePermission, handleEditSchedule, handleDeleteSchedule
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const [menuAnchor, setMenuAnchor] = React.useState();
  const [selectedSchedule, setSelectedSchedule] = React.useState();

  function doOpenMenu(anchorEl, schedule) {
    setSelectedSchedule(schedule);
    setMenuAnchor(anchorEl);
  }


  if (groupSchedules.data.length === 0 && !groupSchedules.loading) {
    return (
      <Container>
        <React.Fragment>
          <CustomTable
            options={{
              title: t('IDS_WP_PROJECT_CALENDAR'),
              mainAction: havePermission ? {
                label: t("views.calendar_page.right_part.add"),
                onClick: evt => handleOpenModal('CREATE'),
              } : null,
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand)
              },
              grouped: {
                bool: false
              },
              draggable: {
                bool: false,
              },
            }}
            columns={[]}
            data={[]}
          />
          <div className="no_Data_container">
            <img
              src={images.no_data}
              alt="no-data"
              width="400px"
            />
            <span style={{ color: `${bgColor.color}` }} className="title">{t('views.calendar_page.right_part.no_data')}</span>
            <span className="description">{t('views.calendar_page.right_part.no_data_description')}</span>
          </div>
        </React.Fragment>
      </Container>
    );
  } else {
    return (
      <Container>
        <React.Fragment>
          <CustomTable
            options={{
              title: t('IDS_WP_PROJECT_CALENDAR'),
              mainAction: havePermission ? {
                label: t("views.calendar_page.right_part.add"),
                onClick: evt => handleOpenModal('CREATE'),
              } : null,
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand)
              },
              grouped: {
                bool: false
              },
              draggable: {
                bool: true,
                onDragEnd: result => {
                  const { source, destination, draggableId } = result;
                  if (!destination) return;
                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  )
                    return;
                  let sortData = groupSchedules.data;
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
                field: (row) => <LinkSpan
                  onClick={evt => history.push(`${Routes.CALENDAR_PROJECT.replace(":scheduleID", get(row, 'id', ''))}`)}
                >{get(row, 'name', '')}</LinkSpan>,
                align: 'left',
                width: '20%',
                sort: evt => handleSortType('name')
              },
              {
                label: t("views.calendar_page.right_part.label.description"),
                field: row => (
                  <span>{get(row, 'description')}</span>
                ),
                align: 'left',
                width: '20%',
                sort: evt => handleSortType('description')
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
                      alt="user_create_avatar"
                    />
                    <span>{get(row, 'user_create_name')}</span>
                  </Typography>
                ),
                align: 'left',
                width: '20%',
                sort: evt => handleSortType('user_create_name')
              },
              {
                label: t("views.calendar_page.right_part.label.created_at"),
                field: row => <span>{get(row, 'created_at', '')}</span>,
                align: 'left',
                width: '20%',
                sort: evt => handleSortType('created_at')
              },
              {
                label: t("views.calendar_page.right_part.label.applied_project"),
                field: row => (
                  <div className="view_table_project_calendar_applied">{get(row, 'number_project')} {t('views.calendar_page.right_part.label.projects')}</div>
                ),
                align: 'left',
                width: '20%',
                sort: evt => handleSortType('number_project')
              },
              {
                label: '',
                field: row => (
                  <SettingContainer onClick={evt => evt.stopPropagation()}>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={evt => doOpenMenu(evt.currentTarget, row)}
                      size="small"
                    >
                      <abbr title={t('IDS_WP_MORE')}>
                        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
                      </abbr>
                    </IconButton>
                  </SettingContainer>
                ),
                align: 'center',
                width: '5%',
              }
            ]}
            data={groupSchedules.data}
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
            {
              havePermission && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleEditSchedule(selectedSchedule);
                      setMenuAnchor(null);
                    }
                    }
                  >
                    {t("views.calendar_page.right_part.edit")}
                  </MenuItem>
                  {
                    get(selectedSchedule, "can_delete", false) && (
                      <MenuItem
                        onClick={() => {
                          handleDeleteSchedule(selectedSchedule);
                          setMenuAnchor(null);
                        }}
                      >{t("views.calendar_page.right_part.delete")}</MenuItem>
                    )
                  }
                </>
              )
            }
          </Menu>
        </React.Fragment>
      </Container>
    );
  }
}

export default ProjectCalendarPresenter;