import { mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

export const TYPE_PRIORITY = 'Ưu tiên: ';

const priorityLabel = [
  'LABEL_CHAT_TASK_CAO_LABEL',
  'LABEL_CHAT_TASK_TRUNG_BINH_LABEL',
  'LABEL_CHAT_TASK_THAP_LABEL',
];

function getModalPriority(value) {
  return ['high', 'avg', 'low'][value]
}

const ModalPriority = ({ value, icon, type }) => {
  const { t } = useTranslation();

  return (
    <span className={clsx("ModalPriority", `ModalPriority__${getModalPriority(value, type)}`)}>
      <div className={clsx(`statusLabel__${getModalPriority(value, type)}`)}>
        <Icon path={icon || mdiCheckCircle} size={1}
          className="statusLabel--icon" />
        <span>{t('LABEL_CHAT_TASK_UU_TIEN_LABEL')}</span>
        <span className={clsx("statusLabe--label", `statusLabel--label__${getModalPriority(value, type)}`)}>
          {t(priorityLabel[value])}
        </span>
        <div className="statusLabel--description">
          {t('LABEL_CHAT_TASK_MUC_DO_UU_TIEN')}
        </div>
      </div>
    </span>
  )
}

export default ModalPriority;