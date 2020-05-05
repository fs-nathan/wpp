import { useTranslation } from 'react-i18next';
import React from 'react';
import Icon from '@mdi/react';
import {
  mdiCheckCircle,
  mdiClockAlert
} from '@mdi/js';

const ModalStatus = (status) => {
  const { t } = useTranslation();

  let value = '', color, icon
  switch (status.values) {
    case "Đang làm":
      value = "Đang làm";
      break;
    case "Đang chờ":
      value = "Đang chờ";
      break;
    case "Hoàn thành":
      value = "Hoàn thành";
      break;
    case "Ưu tiên cao":
      value = "Ưu tiên cao";
      break;
    case "Ưu tiên trung bình":
      value = "Ưu tiên trung bình";
      break;
    case "Ưu tiên thấp":
      value = "Ưu tiên thấp";
      break;
    case "Đang tạm dừng":
      value = "Đang tạm dừng";
      color = '#dc3545';
      icon = mdiClockAlert;
      break;
    default:
      value = "Đang tải"
  }
  return (
    <React.Fragment>
      <div className="styled-context-status">
        <div>
          <Icon path={icon ? icon : mdiCheckCircle} size={1} color={icon ? '#dc3545' : '#03b000'} />
          <p>{t('LABEL_CHAT_TASK_TRANG_THAI')}</p>
          <p style={{ color: color }}>{value}</p>
        </div>
        <p>
          {(value === "Đang làm" || value === "Đang chờ" || value === "Hoàn thành")
            ?
            'Hãy cập nhập tiến độ hoàn thành để thay đổi trạng thái công việc'
            :
            (value === "Ưu tiên cao" || value === "Ưu tiên trung bình" || value === "Ưu tiên thấp")
              ?
              'Mức độ ưu tiên phản ánh tính chất khẩn cấp công việc'
              :
              'Admin đã tạm dừng công việc, vào cài đặt công việc để thay đổi trạng thái'
          }
        </p>
      </div>
    </React.Fragment>
  )
}

export default ModalStatus