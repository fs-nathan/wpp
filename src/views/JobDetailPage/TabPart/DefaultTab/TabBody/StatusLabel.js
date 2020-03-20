import React from 'react';
import clsx from 'classnames';
import Icon from '@mdi/react';
import {
  mdiCheckCircle,
} from '@mdi/js';
import Tooltip from '@material-ui/core/Tooltip';

export const TYPE_STATUS = 'Trạng thái: ';
export const TYPE_PRIORITY = 'Ưu tiên: ';
const statusLabel = ["Đang chờ", "Đang làm", "Hoàn thành"];
const priorityLabel = ["Cao", "Trung bình", "Thấp"];

const typeDescription = [
  'Hãy cập nhập tiến độ hoàn thành để thay đổi trạng thái công việc',
  'Mức độ ưu tiên phản ánh tính chất khẩn cấp công việc',
  'Admin đã tạm dừng công việc, vào cài đặt công việc để thay đổi trạng thái'
]

function getStatusLabel(value, type) {
  if (TYPE_STATUS === type) {
    return ['wait', 'doing', 'completed'][value]
  }
  return ['high', 'avg', 'low'][value]
}

const StatusLabel = ({ value, icon, type }) => {
  const label = (type === TYPE_STATUS) ? statusLabel[value] : priorityLabel[value];
  const labelButton = (type === TYPE_STATUS) ? statusLabel[value] : `Ưu tiên ${priorityLabel[value].toLocaleLowerCase()}`;
  const description = (type === TYPE_STATUS) ? typeDescription[0] : typeDescription[1];

  return (
    <Tooltip title={(
      <div className={clsx("statusLabel", `statusLabel__${getStatusLabel(value, type)}`)}>
        <Icon path={icon || mdiCheckCircle} size={1}
          className="statusLabel--icon" />
        <span>{type}</span>
        <span className={clsx("statusLabel--label", `statusLabel--label__${getStatusLabel(value, type)}`)}>
          {label}
        </span>
        <p className="statusLabel--description">{description}</p>
      </div>
    )}
    placement="top-start"
    >
      <span className={clsx("statusLabel--button", `statusLabel--button__${getStatusLabel(value, type)}`)}>
        {labelButton}
      </span>
    </Tooltip>
  )
}

export default StatusLabel