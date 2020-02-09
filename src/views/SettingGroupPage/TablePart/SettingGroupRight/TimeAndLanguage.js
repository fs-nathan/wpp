import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { WP_LANGUAGE } from '../../../../constants/constants';
import LoadingContent from '../../../../components/LoadingContent';
import {
  actionToast,
  actionSettingFormatDate
} from '../../../../actions/system/system';
import { actioGetSettingDate } from '../../../../actions/setting/setting';
import './SettingGroupRight.scss';

const TimeAndLanguage = props => {
  const { t, i18n } = useTranslation();
  const [defaultDate, setDefaultDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formatDate = props.settingDate.find(item => item.selected === true);
    setDefaultDate(formatDate.date_format || 'DD/MM/YYYY');
    // eslint-disable-next-line
  }, [props.settingDate]);
  
  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };

  const handleChangeLanguage = e => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem(WP_LANGUAGE, e.target.value || 'vi');
    handleToast('success', t('IDS_WP_UPDATE_SUCCESS'));
  };
  const handleChangeDate = async e => {
    let value = e.target.value || '';
    try {
      setLoading(true);
      await actionSettingFormatDate(value);
      handleToast('success', t('IDS_WP_UPDATE_SUCCESS'));
      setLoading(false);
      setDefaultDate(value);
      props.actioGetSettingDate();
    } catch (error) {
      setLoading(false);
      handleToast('error', t('IDS_WP_ERROR_CHANGE_FORMAT_DATE'));
      setTimeout(() => props.actionToast(null, ''), 3000);
    }
  };
  return (
    <div className="payment-container">
      <LoadingContent loading={loading}>
        <div className="payment-left notification-content">
          <p className="top-header">{t('IDS_WP_SETTING_DATE_FORMAT')}</p>
          <p className="text-payment-header">
            {t('IDS_WP_SELECT_FORMAT_DATE_TITLE')}
          </p>
          <FormControl component="fieldset" className="radio-container">
            <RadioGroup
              aria-label="date"
              name="date"
              value={defaultDate}
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
              <FormControlLabel
                value="YYYY-MM-DD"
                control={<Radio />}
                label="YYYY-MM-DD"
              />
            </RadioGroup>
          </FormControl>

          <p className="top-header">{t('IDS_WP_LANGUAGE_APP_TITLE')}</p>
          <p className="text-payment-header">
            {t('IDS_WP_SELECT_LANGUAGE_APP_DES')}
          </p>
          <FormControl component="fieldset" className="radio-container">
            <RadioGroup
              aria-label="language"
              name="language"
              defaultValue={localStorage.getItem(WP_LANGUAGE) || 'vi'}
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
      </LoadingContent>
    </div>
  );
};

export default connect(
  state => ({
    settingDate: state.setting.settingDate
  }),
  { actionToast, actioGetSettingDate }
)(TimeAndLanguage);
