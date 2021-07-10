import { TextField, Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
import {createWeekSchedule, updateWeekSchedule} from 'actions/calendar/weeklyCalendar/listWeeksInYear'
import { Scrollbars } from 'react-custom-scrollbars';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SelectWeek from "./SelectWeek"

const Container = ({ className = '', ...props }) =>
  <div
    className="view_CreateProjectCalendar_Modal_container"
    {...props}
  />;

function CreateWeeklySchedule({
  open, setOpen, reloadList, schedule
}) {
  const inputData = schedule ? {
    week: {
      full_label: schedule.full_label,
      week: schedule.week,
      year: schedule.year
    },
    name: schedule.name,
    description: schedule.description
  } : {
    week: null,
    name: "",
    description: ""
  }

  const { t } = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  const [scheduleName, setScheduleName] = React.useState(inputData.name);
  const [week, setWeek] = React.useState(inputData.week);
  const [scheduleDescription, setScheduleDescription] = React.useState(inputData.description);
  const [listWeek, setListWeek] = React.useState([]);
  const [openSelectWeek, setOpenSelectWeek] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function doCreateWeekSchedule() {
    setLoading(true)
    try {
      if (!schedule) {
        const res = await createWeekSchedule({
          name: scheduleName,
          description: scheduleDescription,
          week: week.week,
          year: week.year
        })
        reloadList(week.year, res.data.week_schedule.id)
      } else {
        const res = await updateWeekSchedule({
          week_schedule_id: schedule.id,
          name: scheduleName,
          description: scheduleDescription,
          week: week.week,
          year: week.year
        })
        reloadList(week.year)
      }
      setLoading(false)
      setOpen(false)
    } catch (e){
      console.log(e)
      setLoading(false)
    }
  }


  return (
    <>
      <CustomModal
        title={t("LABEL_CREATE_WEEK_SCHEDULE")}
        open={open}
        setOpen={setOpen}
        canConfirm={scheduleName.trim() !== '' && week !== null}
        onConfirm={() => doCreateWeekSchedule()}
        height='mini'
        maxWidth='sm'
        actionLoading={loading}
        className="modal-create-week-schedule"
        manualClose={true}
        onCancle={() => setOpen(false)}
      >
        <Container>
          <abbr title={t('LABEL_CHOOSE_WEEK')} className="view_CreateProjectCalendar_label">
            <Typography component={'span'}> {t('LABEL_CHOOSE_WEEK')} </Typography>
            <span>*</span>
          </abbr>
          <div className="area-choose-week">
            <TextField
              placeholder={t('LABEL_CHOOSE_WEEK')}
              variant="outlined"
              value={week ? week.full_label : ""}
              size="small"
              onClick={() => setOpenSelectWeek(true)}
              inputProps={{
                readOnly: true
              }}
            />
            <ArrowDropDownIcon className="icon-arrow" />
          </div>
          <abbr title={t('LABEL_NNAME_SCHEDULE')} className="view_CreateProjectCalendar_label">
            <Typography component={'span'}> {t('LABEL_NNAME_SCHEDULE')} </Typography>
            <span>*</span>
          </abbr>
          <TextField
            id="calendar-name"
            variant="outlined"
            size="small"
            value={scheduleName}
            onChange={({ target }) => setScheduleName(target.value)}
          />
          <abbr title={t('LABEL_DESCRIPTION_SCHEDULE')} className="view_CreateProjectCalendar_label">
            <Typography component={'span'}> {t('LABEL_DESCRIPTION_SCHEDULE')} </Typography>
            <span>*</span>
          </abbr>
          <TextField
            id="calendar-descrtiption"
            value={scheduleDescription}
            size="small"
            variant="outlined"
            className="input_text"
            multiline
            rows={7}
            fullWidth
            onChange={({ target }) => setScheduleDescription(target.value)}
          />
        </Container>
      </CustomModal>
      {
        openSelectWeek &&
        <SelectWeek
          isOpen={openSelectWeek}
          setOpen={(value) => setOpenSelectWeek(value)}
          selectedOption={(week) => {
            setWeek(week)
          }}
          weekSelected={week}
        />
      }
    </>
  )
}

export default CreateWeeklySchedule;