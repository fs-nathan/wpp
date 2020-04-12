import { ListItemText } from '@material-ui/core';
import { mdiCalendarClock, mdiCalendarMonth, mdiCalendarText } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import './style.scss';

function CalendarTypesPresenter({
  route
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const listCalendarTypes = [
    {
      title: t('IDS_WP_WEEKLY_CALENDAR'),
      url: `${route}/weekly`,
      icon: mdiCalendarMonth,
    },
    {
      title: t('IDS_WP_PROJECT_CALENDAR'),
      url: `${route}/project`,
      icon: mdiCalendarText,
    },
    {
      title: t('IDS_WP_ALARM_CALENDAR'),
      url: `${route}/alarm`,
      icon: mdiCalendarClock,
      sub: t('IDS_WP_ALARM_CALENDAR_SUB_TITLE')
    },
  ];
  return (
    <React.Fragment>
      <LeftSideContainer
        title={t('views.calendar_page.left_part.title')}
        leftAction={null}
        rightAction={null}
        loading={{
          bool: false,
          component: () => <LoadingBox />,
        }}
      >
        <StyledList>
          {listCalendarTypes.map((item, index) => (
            <React.Fragment key={index}>
              <StyledListItem
                to={item.url || ""}
                component={Link}
                onClick={() => {
                  if (item.action) item.action();
                }}
                className={`${"/calendar/weekly" === item.url ? "item-actived" : ""}`}
              >
                {item.icon && (
                  <Icon
                    className="left-setting-icon"
                    path={item.icon}
                    size={1.4}
                    color={item.color || "rgba(0, 0, 0, 0.54)"}
                  />
                )}
                <ListItemText
                  primary={
                    <Primary
                      className={`title-setting-item ${
                        item.icon ? "" : "none-icon"
                        }`}
                    >
                      {item.title}
                    </Primary>
                  }
                  secondary={item.sub && <Secondary className="calendar_type_secondary">{item.sub}</Secondary>}
                />
              </StyledListItem>
            </React.Fragment>
          ))}
        </StyledList>
      </LeftSideContainer>
    </React.Fragment>
  )
};

export default CalendarTypesPresenter;