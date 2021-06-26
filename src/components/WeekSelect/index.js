import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import clsx from 'clsx';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import './styles.scss';

function WeekSelect({
  className, value, onChange, weeks,
  year, doListWeeksInYear
}) {

  const { t } = useTranslation();

  React.useEffect(() => {
    doListWeeksInYear({ year }, false);
  }, [doListWeeksInYear, year]);

  const handleChange = ({target}) => {
    const scheduleSelected = weeks.find(e => e.id === target.value)
    onChange(scheduleSelected ? scheduleSelected : {})
  }

  return (
    <Select
      className={clsx('weekSelect', className)}
      value={value}
      onChange={handleChange}
      variant="outlined"
      MenuProps={{
        className: "weekSelect--paper",
        MenuListProps: {
          component: Scrollbars,
        },
        variant: 'menu'
      }}
    >
      {
        weeks.map((week, index) => (
          <MenuItem key={`week${index}`} value={week.id} className="weekSelect-item">
            <b className="weekSelect-item-name">{week.name}</b>
            <p className="weekSelect-item-time">
              {t('IDS_WP_WEEK')} {index + 1} ({week.start} - {week.end})
            </p>
          </MenuItem>
        ))
      }
    </Select >
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListWeeksInYear: ({ year }, quite) => dispatch(listSchedule({ year }, quite))
  };
};

const mapStateToProps = state => {
  return {
    weeks: state.calendar.listSchedule.data.calendars,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelect);
