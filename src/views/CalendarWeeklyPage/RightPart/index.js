import React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarWeeklyRightPartPresenter from './presenter';

function CalendarWeeklyRightPart({
  year, handleYearChanged,
  scheduleOfWeek, calendar
}) {

  const { t } = useTranslation();
  const days = [
    t('views.calendar_page.modal.setting_weekly_calendar.sunday'),
    t('views.calendar_page.modal.setting_weekly_calendar.monday'),
    t('views.calendar_page.modal.setting_weekly_calendar.tuesday'),
    t('views.calendar_page.modal.setting_weekly_calendar.wednesday'),
    t('views.calendar_page.modal.setting_weekly_calendar.thursday'),
    t('views.calendar_page.modal.setting_weekly_calendar.friday'),
    t('views.calendar_page.modal.setting_weekly_calendar.saturday')
  ]

  return (
    <CalendarWeeklyRightPartPresenter
      canDelete={true}
      year={year} handleYearChanged={handleYearChanged}
      scheduleOfWeek={scheduleOfWeek}
      calendar={calendar}
      i18nDays={days}
    />
  );
}

export default CalendarWeeklyRightPart;