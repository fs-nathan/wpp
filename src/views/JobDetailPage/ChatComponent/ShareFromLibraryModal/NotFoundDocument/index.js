import { useTranslation } from 'react-i18next';
import React from 'react';

function NotFoundDocument({ searchKey }) {
  const { t } = useTranslation();
  return <div className="ShareFromLibraryModal--notFound">{t('LABEL_CHAT_TASK_KHONG_TIM_THAY')}<b>{searchKey}</b>{t('LABEL_CHAT_TASK_TRONG_DANH_SACH_TAI')}<div>{t('LABEL_CHAT_TASK_DE_XUAT')}</div>
    <ul>
      <li>{t('LABEL_CHAT_TASK_KIEM_TRA_LAI_CHINH')}</li>
      <li>{t('LABEL_CHAT_TASK_HAY_THU_NHUNG_TU_KHOA_KHAC')}</li>
      <li>{t('LABEL_CHAT_TASK_HAY_BOT_TU_KHOA')}</li>
    </ul>
  </div>
}

export default NotFoundDocument