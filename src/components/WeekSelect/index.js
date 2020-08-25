import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { listWeeksInYear } from "actions/calendar/weeklyCalendar/listWeeksInYear";
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

  return (
    <Select
      className={clsx('weekSelect', className)}
      value={value}
      onChange={onChange}
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
          <MenuItem key={`week${index}`} value={index + 1}>
            {t('IDS_WP_WEEK')} {index + 1} ({week.start} - {week.end})
          </MenuItem>
        ))
      }
    </Select >
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListWeeksInYear: ({ year }, quite) => dispatch(listWeeksInYear({ year }, quite))
  };
};

const mapStateToProps = state => {
  return {
    weeks: state.calendar.listWeeksInYear.data.weeks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelect);
