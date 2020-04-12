import { FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../../components/CustomModal';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Setting_Modal_container ${className}`}
    {...props}
  />;

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(0.5),
  },
}));


function SettingWeeklyCalendar({ open, setOpen, }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [day, setDay] = React.useState('');
  const handleChange = (event) => {
    setDay(event.target.value);
  };
  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.setting_weekly_calendar.title")}
        open={open}
        setOpen={setOpen}
        height='mini'
        maxWidth='sm'
      >
        <Container>
          <p>{t('views.calendar_page.modal.setting_weekly_calendar.day_begining')}</p>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={day ?? 1}
              onChange={handleChange}
              className="MuiOutlinedInput-input"
            >
              <MenuItem value={1} selected>{t('views.calendar_page.modal.setting_weekly_calendar.monday')}</MenuItem>
              <MenuItem value={2}>{t('views.calendar_page.modal.setting_weekly_calendar.tuesday')}</MenuItem>
              <MenuItem value={3}>{t('views.calendar_page.modal.setting_weekly_calendar.wednesday')}</MenuItem>
              <MenuItem value={4}>{t('views.calendar_page.modal.setting_weekly_calendar.thursday')}</MenuItem>
              <MenuItem value={5}>{t('views.calendar_page.modal.setting_weekly_calendar.friday')}</MenuItem>
              <MenuItem value={6}>{t('views.calendar_page.modal.setting_weekly_calendar.saturday')}</MenuItem>
              <MenuItem value={7}>{t('views.calendar_page.modal.setting_weekly_calendar.sunday')}</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </CustomModal>
    </>
  )
}

export default SettingWeeklyCalendar;