import { useTranslation } from 'react-i18next';
import { mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'classnames';
import React from 'react';

export const TYPE_STATUS = 'Trạng thái: ';
export const TYPE_PRIORITY = 'Ưu tiên: ';
const statusLabel = ["Đang chờ", "Đang làm", "Hoàn thành"];
const priorityLabel = ["Cao", "Trung bình", "Thấp"];

const typeDescription = [
  'Hãy cập nhập tiến độ hoàn thành để thay đổi trạng thái công việc',
  'Mức độ ưu tiên phản ánh tầm quan trọng và tính chất khẩn cấp công việc',
  'Admin đã tạm dừng công việc, vào cài đặt công việc để thay đổi trạng thái'
]

function getStatusLabel(value, type) {
  if (TYPE_STATUS === type) {
    return ['wait', 'doing', 'completed'][value]
  }
  return ['high', 'avg', 'low'][value]
}

const StatusLabel = ({ value, icon, type }) => {
  const { t } = useTranslation();
  const label = (type === TYPE_STATUS) ? statusLabel[value] : priorityLabel[value];
  const labelButton = (type === TYPE_STATUS) ? statusLabel[value] : `Ưu tiên ${priorityLabel[value].toLocaleLowerCase()}`;
  const description = (type === TYPE_STATUS) ? typeDescription[0] : typeDescription[1];

  return (
    <span className={clsx("statusLabel--button", `statusLabel--button__${getStatusLabel(value, type)}`)}>
      <div className={clsx("statusLabel--popup", `statusLabel__${getStatusLabel(value, type)}`)}>
        <Icon path={icon || mdiCheckCircle} size={1}
          className="statusLabel--icon" />
        <span>{type}</span>
        <span className={clsx("statusLabel--label", `statusLabel--label__${getStatusLabel(value, type)}`)}>
          {label}
        </span>
        <div className="statusLabel--description">{description}</div>
        {(type === TYPE_STATUS) && <div>
          <div className="statusLabel--guide">0% = <span className="statusLabel--label__wait">{t('LABEL_CHAT_TASK_DANG_CHO')}</span></div>
          <div className="statusLabel--guide">0% &lt; <span className="statusLabel--label__doing">{t('LABEL_CHAT_TASK_DANG_LAM')}</span> &lt; 99%</div>
          <div className="statusLabel--guide">100% = <span className="statusLabel--label__completed">{t('LABEL_CHAT_TASK_HOAN_THANH')}</span></div>
        </div>}
      </div>
      {labelButton}
    </span>
  )
}

export default StatusLabel