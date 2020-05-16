import { mdiCheckCircle, mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
      color = '#607d8b';
      icon = mdiTimerOff;
      break;
    default:
      value = "Đang tải"
  }
  return (
    <React.Fragment>
      <div className="styled-context-status">
        <div>
          <Icon path={icon ? icon : mdiCheckCircle} size={1} color={icon ? '#feb201' : '#03b000'} />
          <p>{t('LABEL_CHAT_TASK_TRANG_THAI')}</p>
          <p style={{ color: color }}>{status.values}</p>
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
              t('LABEL_CHAT_TASK_CONG_VIEC_DANG_TAM')
          }
        </p>
      </div>
    </React.Fragment>
  )
}

export default ModalStatus