import clsx from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

export const TYPE_STATUS = 'Trạng thái: ';
export const TYPE_PRIORITY = 'Ưu tiên: ';
export const statusLabel = [
  'LABEL_CHAT_TASK_DANG_CHO',
  'LABEL_CHAT_TASK_DANG_LAM',
  'LABEL_CHAT_TASK_HOAN_THANH',
  'LABEL_CHAT_TASK_DA_QUA_HAN',
  'LABEL_CHAT_TASK_TAM_DUNG',
];
export const priorityLabel = [
  'LABEL_CHAT_TASK_UU_TIEN_CAO',
  'LABEL_CHAT_TASK_UU_TIEN_TRUNG_BINH',
  'LABEL_CHAT_TASK_UU_TIEN_THAP'
];

export function getStatusLabel(value, type) {
  if (TYPE_STATUS === type) {
    return ['wait', 'doing', 'completed', 'expired', 'paused'][value]
  }
  return ['high', 'avg', 'low'][value]
}

const StatusLabel = ({ value, type, ...rest }, ref) => {
  const { t } = useTranslation();
  const labelButton = (type === TYPE_STATUS) ? statusLabel[value] : priorityLabel[value];

  return (
    <span
      {...rest}
      ref={ref}
      className={clsx("statusLabel--button", `statusLabel--button__${getStatusLabel(value, type)}`)}>
      {t(labelButton)}
    </span>
  )
}

export default React.forwardRef(StatusLabel)