import { filter, get } from 'lodash';
import React from 'react';
import CalendarWeeklyLeftPartPresenter from './presenter';
import './style.scss';

function CalendarWeeklyLeftPart({
  calendars, doOpenModal, permissions
}) {

  const [searchPattern, setSearchPattern] = React.useState('');
  const [filteredCalendars, setFilterdCalenders] = React.useState(calendars);

  React.useEffect(() => {
    let filtered = filter(calendars.data, calendar => get(calendar, 'name', '').toLowerCase().includes(searchPattern.toLowerCase()));
    setFilterdCalenders({
      ...calendars,
      data: filtered
    });
  }, [searchPattern, calendars])

  return (
    <CalendarWeeklyLeftPartPresenter
      havePermission={permissions['manage_week_schedule'] ?? false}
      calendars={filteredCalendars}
      handleOpenModal={doOpenModal}
      handleSearchPattern={value => setSearchPattern(value)}
      searchPattern={searchPattern}
    />
  )
}


export default CalendarWeeklyLeftPart;