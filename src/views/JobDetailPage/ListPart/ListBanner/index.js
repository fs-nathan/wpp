import React, { useEffect } from 'react';
// import styled from 'styled-components';
import ColorChip from '../../../../components/ColorChip';
import { WrapperContext } from '../../index'

// const Container = styled.div`
//   padding: 10px 15px;
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
  
//   & > * {
//     margin-right: 10px;
//     margin-bottom: 5px;
//     padding: 0 5px;
//     & > span {
//       font-size: 12px;
//     }
//   }
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
// `;
//  const DEFAULT_VALUE = {
//     task_me: 0,
//     task_waiting: 0,   // Waiting
//     task_doing: 0,   // Doing
//     task_complete: 0, // Complete
//     task_expired: 0,    // Expired
//     task_stop: 0,   // Stop
//  }


function ListBanner() {
  
  const value = React.useContext(WrapperContext)
  const [selected, setSelected] = React.useState(0)
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const handleChangeFilterType = (typeIdx) => {
    value.filterTaskByType(typeIdx)
    setSelected(typeIdx) 
  }

  let data = []
  if( value && value.staticTask && value.staticTask.static) {
    data = value.staticTask.static
  }
  // useEffect(() => {
  //   if( !data ) {
  //     // const {
  //     //   task_of_me, task_waiting, task_doing, task_complete, task_expired, task_stop
  //     // } = data
  //     // setStaticTask({
  //     //   task_me: data.task_of_me ,
  //     //   task_waiting: data.task_waiting,
  //     //   task_doing:  data.task_doing ,
  //     //   task_complete: data.task_complete ,
  //     //   task_expired: data.task_expired,
  //     //   task_stop: data.task_stop
  //     // })
      const taskStatic = {
        task_me: data.task_of_me ,
        task_waiting: data.task_waiting,
        task_doing:  data.task_doing ,
        task_complete: data.task_complete ,
        task_expired: data.task_expired,
        task_stop: data.task_stop
      }
    // }
  // }, [data])
  const jobTypes = [
    'Tất cả' + ' (' + (taskStatic.task_me ? taskStatic.task_me : 0) + ')',
    'Đang chờ' + ' (' + (taskStatic.task_waiting ? taskStatic.task_waiting : 0) + ')',   // Waiting
    'Đang làm' + ' (' + (taskStatic.task_doing ? taskStatic.task_doing : 0) + ')',   // Doing
    'Hoàn thành' + ' (' + (taskStatic.task_complete ? taskStatic.task_complete : 0) + ')', // Complete
    'Quá hạn' + ' (' + (taskStatic.task_expired ? taskStatic.task_expired : 0) + ')',    // Expired
    'Tạm dừng' + ' (' + (taskStatic.task_stop ? taskStatic.task_stop : 0) + ')',   // Stop
  ]
  return (
    <div className="container-list-banner">
      {jobTypes.map((jobType, index) => (
        <ColorChip 
          key={index} 
          label={jobType} 
          onClick={() => handleChangeFilterType(index)}
          color={selected === index ? 'light-blue' : 'white'}
          size='small'
        />
      ))} 
    </div>
  );
}

export default ListBanner;
