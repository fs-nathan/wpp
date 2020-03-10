import React from 'react';
import styled from 'styled-components';
import {
  Avatar,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';

import RemindModal from '../RemindModal';
import { useSelector } from 'react-redux';
import MemberMenuLists from './MemberMenuLists';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';

const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const UserAvatar = styled(Avatar)`
width: 25px;
height: 25px;
`

const selector = [
  {
    value: 0,
    label: 'Nhắc hẹn theo thời gian',
  },
  {
    value: 1,
    label: 'Nhắc hẹn theo tiến độ thực tế',
  }
];

const badges = [
  {
    value: 0,
    label: 'Nhắc 1 lần',
  },
  {
    value: 1,
    label: 'Theo ngày',
  },
  {
    value: 2,
    label: 'Theo tuần',
  },
  {
    value: 3,
    label: 'Theo tháng',
  },
]

const RemindList = (props) => {
  const remind = useSelector(state => state.taskDetail.taskRemind.remind);
  const [isRemind] = React.useState(true)
  const [open, _setOpen] = React.useState(false);
  const [elemState, _setElem] = React.useState(null)

  // const [data] = React.useState(__data);

  // Toogle popup array contains status of each popup
  const handleClickOpen = (item) => {
    _setOpen(true)
    _setElem(item)
  };

  const handleClickClose = () => {
    _setOpen(false)
  };

  const getRemindTextByType = (typeId, date, time) => {
    return typeId ? selector[typeId].label : "Nhắc hẹn vào ngày " + date + " lúc " + time
  }
  const getRemindProgressByType = (typeId, duration, typeRemind) => {

    return (
      ((typeId === 0) ? (
        (typeRemind ?
          <Badge color='orangelight' size='small' badge label={badges[typeRemind].label} />
          :
          <Badge color='orangelight' size='small' badge label={"Nhắc 1 lần"} />
        )
      )
        :
        (typeId === 1) ?
          (duration.map((item, key) => (
            <Badge key={key} color='orangelight' size='small' badge label={"Đạt " + item + "%"} />
          )))
          // : (typeId === 3) ? (
          //   (duration.map((item, key) => (
          //     <Badge key={key} color='orangelight' size='small' badge label={"Trên " + item + "%"} />
          //   )))
          // )
          :
          null
      )
    )
  }
  return remind.length ? (
    <ul className="styled-list">
      {remind.map((item, idx) => {
        return (
          <li className="styled-list-item" key={idx} {...props}>
            <div className="content-list-item">
              <div className="styled-title-box-rt">
                <UserAvatar src={item.user_create_avatar} alt='avatar' />
                <ColorTypo variant='body1'>
                  {getRemindTextByType(item.type, item.date_remind, item.time_remind)}
                </ColorTypo>
                {/* {item.duration && item.duration.map((item, key) => (
                  <Badge key={key} color='orangelight' size='small' badge label={item + ""} />))
                } */}
                {getRemindProgressByType(item.type, item.duration, item.type_remind)}
              </div>

              <MemberMenuLists idx={idx} handleClickOpen={() => handleClickOpen(item)} item={item} {...props} />

            </div>
            <div className="styled-content-box-rt">
              {item.content}
            </div>

          </li>
        );
      })}
      <RemindModal isOpen={open} handleClickClose={() => handleClickClose()} data={elemState} isRemind={isRemind} />
    </ul>
  ) : (
      <NoDataPlaceHolder
        src="/images/no-aler.png"
        title="Chưa có nhắc hẹn được khởi tạo Click + để tạo mới nhắc hẹn">
      </NoDataPlaceHolder>
    );
}

export default RemindList