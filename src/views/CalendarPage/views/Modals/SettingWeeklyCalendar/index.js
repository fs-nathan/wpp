import { FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
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


function SettingWeeklyCalendar({
  open, setOpen, onConfirm, permission
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [day, setDay] = React.useState(1);
  const handleChange = (event) => {
    setDay(event.target.value);
  };
  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.setting_weekly_calendar.title")}
        open={open}
        setOpen={setOpen}
        onConfirm={() => onConfirm(day)}
        height='mini'
        maxWidth='sm'
        confirmRender={permission ? () => <>{t('IDS_WP_DONE')}</> : () => <></>}
      >
        <Container>
          <p>{t('views.calendar_page.modal.setting_weekly_calendar.day_begining')}</p>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={day}
              onChange={handleChange}
              className="views_settingWeeklyCalendar_selector"
            >
              <MenuItem value={1}>{t('views.calendar_page.modal.setting_weekly_calendar.monday')}</MenuItem>
              <MenuItem value={0}>{t('views.calendar_page.modal.setting_weekly_calendar.sunday')}</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </CustomModal>
    </>
  )
}

export default SettingWeeklyCalendar;