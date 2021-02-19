import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function TabHeader(props) {
  const { t } = useTranslation();

  return (
    <div className="container-dt-tabheader title-conversation-info-message">
      <span>{t("CONVERSATION_INFORMATION")}</span>
    </div>
  );
}

export default TabHeader;
