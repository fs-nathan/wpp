import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import './SettingGroupRight.scss';

const TimeAndLanguage = props => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = e => {
    i18n.changeLanguage(e.target.value);
  };
  const handleChangeDate = e => {
    console.log('date type', e.target.value);
  };
  return (
    <div className="payment-container">
      <div className="payment-left notification-content">
        <p className="top-header">{t('IDS_WP_SETTING_DATE_FORMAT')}</p>
        <p className="text-payment-header">
          Lựa chọn kiểu hiển thị ngày tháng trên phần mềm
        </p>
        <FormControl component="fieldset" className="radio-container">
          <RadioGroup
            aria-label="date"
            name="date"
            defaultValue="DD/MM/YYYY"
            onChange={handleChangeDate}
          >
            <FormControlLabel
              value="DD/MM/YYYY"
              control={<Radio />}
              label="DD/MM/YYYY"
            />
            <FormControlLabel
              value="MM/DD/YYYY"
              control={<Radio />}
              label="MM/DD/YYYY"
            />
            <FormControlLabel
              value="DD-MM-YYYY"
              control={<Radio />}
              label="DD-MM-YYYY"
            />
            <FormControlLabel
              value="MM-DD-YYYY"
              control={<Radio />}
              label="MM-DD-YYYY"
            />
          </RadioGroup>
        </FormControl>

        <p className="top-header">Ngôn ngữ phần mềm</p>
        <p className="text-payment-header">
          Lựa chọn ngôn ngữ hiển thị cho phần mềm
        </p>
        <FormControl component="fieldset" className="radio-container">
          <RadioGroup
            aria-label="language"
            name="language"
            defaultValue="vi"
            onChange={handleChangeLanguage}
          >
            <FormControlLabel
              value="vi"
              control={<Radio />}
              label={t('IDS_WP_VIETNAMESE')}
            />
            <FormControlLabel
              value="en"
              control={<Radio />}
              label={t('IDS_WP_ENGLISH')}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    // state
  }),
  {}
)(TimeAndLanguage);
