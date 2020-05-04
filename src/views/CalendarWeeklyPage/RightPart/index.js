import React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarWeeklyRightPartPresenter from './presenter';

function CalendarWeeklyRightPart({
  year, handleYearChanged, bgColor, doOpenModal,
  scheduleOfWeek, calendar, handleDeleteAllSchedule, permissions
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
      havePermission={permissions['manage_week_schedule'] ?? false}
      year={year} handleYearChanged={handleYearChanged}
      scheduleOfWeek={scheduleOfWeek}
      calendar={calendar}
      i18nDays={days}
      handleDeleteAllSchedule={handleDeleteAllSchedule}
      bgColor={bgColor}
      doOpenModal={doOpenModal}
    />
  );
}

export default CalendarWeeklyRightPart;