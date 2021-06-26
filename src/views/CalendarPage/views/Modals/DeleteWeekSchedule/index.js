import React from 'react';
import AlertModal from "components/AlertModal";
import {deleteWeekSchedule} from 'actions/calendar/weeklyCalendar/listWeeksInYear'
import { useTranslation } from 'react-i18next';

function DeleteWeekSchedule({
  scheduleDeleteSelected, setScheduleDeleteSelected, doReload
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  async function doDeleteWeekSchedule() {
    setLoading(true)
    try {
      const res = await deleteWeekSchedule({
        week_schedule_id: scheduleDeleteSelected.id
      })
      doReload()
      setLoading(false)
      setScheduleDeleteSelected(false)
    } catch (e){
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <AlertModal
      open={true}
      setOpen={(value) => setScheduleDeleteSelected(value)}
      content={t('IDS_WP_ALERT_CONTENT')}
      onConfirm={() => doDeleteWeekSchedule()}
      actionLoading={loading}
      manualClose={true}
      onCancle={() => setScheduleDeleteSelected(false)}
    />
  );
};


export default DeleteWeekSchedule