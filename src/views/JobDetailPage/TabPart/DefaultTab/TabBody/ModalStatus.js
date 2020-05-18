import { mdiCheckCircle, mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusLabel, statusLabel, TYPE_STATUS } from './StatusLabel';
import './styles.scss';

function getColor(value) {
  switch (value) {
    case 0:
      return 'rgb(255, 152, 0)';
    case 1:
      return 'rgb(3, 169, 244)';
    case 2:
      return 'rgb(3, 195, 11)';
    case 4:
      return '#feb201';

    default:
      return '#03b000';
  }
}

const ModalStatus = ({ value }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="ModalStatus">
        <div>
          <Icon
            path={(value === 4) ? mdiTimerOff : mdiCheckCircle}
            size={1}
            className="statusLabel--icon"
            color={getColor(value)} />
          <span>{t('LABEL_CHAT_TASK_TRANG_THAI')}</span>
          &nbsp;
          <span className={`statusLabel--label__${getStatusLabel(value, TYPE_STATUS)}`}>
            {t(statusLabel[value])}</span>
        </div>
        <div className="statusLabel--description">
          {(value !== 4) ?
            t('LABEL_CHAT_TASK_HAY_CAP_NHAP_TIEN')
            :
            t('LABEL_CHAT_TASK_CONG_VIEC_DANG_TAM')
          }
        </div>
        {(value !== 4) && <div>
          <div className="statusLabel--guide">0% = <span className="statusLabel--label__wait">{t('LABEL_CHAT_TASK_DANG_CHO')}</span></div>
          <div className="statusLabel--guide">0% &lt; <span className="statusLabel--label__doing">{t('LABEL_CHAT_TASK_DANG_LAM')}</span> &lt; 99%</div>
          <div className="statusLabel--guide">100% = <span className="statusLabel--label__completed">{t('LABEL_CHAT_TASK_HOAN_THANH')}</span></div>
        </div>}
      </div>
    </React.Fragment>
  )
}

export default ModalStatus