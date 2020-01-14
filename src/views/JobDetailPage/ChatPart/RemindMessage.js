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
  const { month, date, content, time } = FAKE_DATA
  return (
      <div className="wrap-common-row">
          <div className="wrap-project-remind-message">
              <Typography component='div'>
                  <span>Nhắc hẹn</span>
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
                          <Typography component='span'>Xem chi tiết</Typography>
                      </Typography>
                  </Typography>
              </Button>
          </div>
      </div>
  )
}