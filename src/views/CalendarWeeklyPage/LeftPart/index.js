import { filter, get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import UpdateWeeklyCalendar from 'views/CalendarPage/views/Modals/UpdateWeeklyCalendar';
import CreateWeeklyCalendar from '../../CalendarPage/views/Modals/CreateWeeklyCalendar';
import CalendarWeeklyLeftPartPresenter from './presenter';
import './style.scss';

function CalendarWeeklyLeftPart({
  calendars, handleOnCloseModal, scheduleOfWeek
}) {
  const { t } = useTranslation();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [searchPattern, setSearchPattern] = React.useState('');
  const [filteredCalendars, setFilterdCalenders] = React.useState(calendars);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCreate(true);
        return;
      }
      case 'UPDATE': {
        setOpenUpdate(true);
        return;
      }
      default: return;
    }
  }

  React.useEffect(() => {
    let filtered = filter(calendars.data, calendar => get(calendar, 'name', '').toLowerCase().includes(searchPattern.toLowerCase()));
    setFilterdCalenders({
      ...calendars,
      data: filtered
    });
  }, [searchPattern, calendars])

  return (
    <>
      <CalendarWeeklyLeftPartPresenter
        calendars={filteredCalendars}
        handleOpenModal={doOpenModal}
        handleSearchPattern={value => setSearchPattern(value)}
        searchPattern={searchPattern}
      />
      <CreateWeeklyCalendar
        open={openCreate}
        setOpen={setOpenCreate}
        handleOnClose={handleOnCloseModal}
      />
      <UpdateWeeklyCalendar
        open={openUpdate}
        setOpen={setOpenUpdate}
        handleOnClose={handleOnCloseModal}
        scheduleOfWeek={scheduleOfWeek}
      />
    </>
  )
}


export default CalendarWeeklyLeftPart;