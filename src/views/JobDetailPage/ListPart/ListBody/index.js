import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import ListBodySubHeader from './ListBodySubHeader';
import ListBodyItem from './ListBodyItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { WrapperContext } from '../../index'
const StyledList = styled(List)`

    & > li {
      &:not(:last-child) {
        margin-bottom: 10px;
    }
  }
  &:last-child {
    padding: 10px 0 130px 0;
  }
`;
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;


// const detailProject = [
//   { progress: 36, title: 'Phân tích ứng dụng ...', description: 'Đã thêm thành viên', status: 'Quá hạn', notification: 2, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
//   { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' }

// ]

function ListBody() {
  const value = React.useContext(WrapperContext)
  // console.log('hello', value.listTaskDetail )
  let data = []
  let dataPending = []
  let dataDoing = []
  let dataDone = []
  let dataExpired = []
  let dataStop = []
  let listTaskDetail = value.listTaskDetail
  if (listTaskDetail) {
    data = listTaskDetail.tasks
    // console.log('value', value.listTaskDetail)
  }
  const LIST_PROJECT_STATUS = {
    PENDING: 0,
    DOING: 1,
    DONE: 2,
    EXPIRED: 3,
    STOP: 4
  }
   console.log("data....",data);
   
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
        {data.map((item, key) => {
          return (
            <StyledList key={key} >
              <ListBodySubHeader subPrimary={item.name} subSecondary={'(' + item.tasks.length + ' việc)'} />
              {item.tasks.map((detail, idx) => <ListBodyItem key={idx} {...detail} />)}
            </StyledList>
          )
        })}
     

    </Body>

  )
}

export default ListBody;
