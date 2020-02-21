import React from 'react';
import { useTranslation } from 'react-i18next';
import './SettingGroupRight.scss';
import noti_setting from '../../../../assets/noti_setting.png';

const Notification = () => {
  const { t } = useTranslation();
  return (
    <div className="payment-container">
      <div className="payment-left notification-content">
        <p className="top-header">{t('IDS_WP_SETTING_NOTI')}</p>
        <p className="text-payment-header">{t('IDS_WP_ON_OFF_NOTI')}</p>
        <img src={noti_setting} alt="" />
        <p className="text-payment-header boild-text">
          {t('IDS_WP_ON_OFF_NOTI_DES')}
        </p>
        <p className="text-payment-header">{t('IDS_WP_ON_OFF_NOTI_STEP_1')}</p>
        <p className="text-payment-header">{t('IDS_WP_ON_OFF_NOTI_STEP_2')}</p>
        <p className="text-payment-header">
          {t('IDS_WP_ON_OFF_NOTI_STEP_2_DES')}
        </p>
      </div>
    </div>
  );
};

export default Notification;
