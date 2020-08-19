import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function YearSelect({ className, value, onChange, numberOfYears }) {
  const year = (new Date("01-01-2020")).getFullYear();
  let diffYear = moment().diff('2020-01-01', 'years');
  const years = Array.from(new Array(diffYear + numberOfYears), (val, index) => index + year);
  const { t } = useTranslation();

  return (
    <Select
      className={clsx('yearSelect', className)}
      value={value}
      onChange={onChange}
      variant="outlined"
      MenuProps={{
        className: "yearSelect--paper",
        MenuListProps: {
          component: Scrollbars,
        },
        variant: 'menu'
      }}
    >
      {
        years.map((year, index) => (
          <MenuItem key={`year${index}`} value={year}>{t('IDS_WP_YEAR')} {year}</MenuItem>
        ))
      }
    </Select >
  )
}


export default YearSelect;