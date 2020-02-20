import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderInit = () => {
  const { t } = useTranslation();
  return (
    <div className="oder-init-container">
      <div>
        <span className="title-oder-init">{t('IDS_WP_CREATE_ORDER_DES')}</span>
      </div>
      <div className="step-content">
        <div className="step-oder-init">
          <span className="text-step">{t('IDS_WP_CREATE_ORDER_STEP_1')}</span>
        </div>
        <div className="step-oder-init">
          <span className="text-step">{t('IDS_WP_CREATE_ORDER_STEP_2')}</span>
        </div>
        <div className="step-oder-init">
          <span className="text-step">{t('IDS_WP_CREATE_ORDER_STEP_3')}</span>
        </div>
      </div>
      <div className="fotter-oder-init">
        <span>
          <div
            dangerouslySetInnerHTML={{
              __html: t('IDS_WP_CREATE_ORDER_SUPPORT')
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default OrderInit;
