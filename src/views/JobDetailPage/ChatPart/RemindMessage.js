import { useTranslation } from 'react-i18next';
import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiAlarm } from '@mdi/js'

const FAKE_DATA = {
  month: 9, date: 17, 
  content: "Tiến độ thực tế chậm so với kế hoạch 20%",
  time: "Lúc 09:25 ngày 17/09/2019 - Nhắc 1 lần"
}

export default function RemindMessage(props) {
  const { t } = useTranslation();
  const { month, date, content, time } = FAKE_DATA
  return (
      <div className="wrap-common-row">
          <div className="wrap-project-remind-message">
              <Typography component='div'>
                  <span>{t('LABEL_CHAT_TASK_NHAC_HEN')}</span>
              </Typography>
              <Typography component='div'>
                  <Typography component='div'>{`Tháng ${month}`}</Typography>
                  <Typography component='div'>{date}</Typography>
                  <Typography component='div'>{content}</Typography>
                  <Typography component='div'>{time}</Typography>
              </Typography>
              <Button>
                  <Typography component='div'>
                      <Typography component='div'>
                          <Icon path={mdiAlarm} size={1.3} color={'#05bdfa'} />
                          <Typography component='span'>{t('LABEL_CHAT_TASK_XEM_CHI_TIET')}</Typography>
                      </Typography>
                  </Typography>
              </Button>
          </div>
      </div>
  )
}