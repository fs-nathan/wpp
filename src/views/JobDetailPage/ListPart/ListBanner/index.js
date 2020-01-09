import React from 'react';
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



function ListBanner() {
  
  const value = React.useContext(WrapperContext)
  const [selected, setSelected] = React.useState(0)

  const handleChangeFilterType = (typeIdx) => {
    value.filterTaskByType(typeIdx)
    setSelected(typeIdx) 
  }

  let data = []
  if( value && value.staticTask && value.staticTask.static) {
    data = value.staticTask.static
  }
  // const staticTask = [
  //   'Tất cả' + ' (' + `${data.task_of_me}` + ')',
  //   `${data.task_waiting}`,
  //   `${data.task_doing}`,
  //   `${data.task_complete}`,
  //   `${data.task_stop}`,
  //   `${data.task_expired}`,
  // ]
  const jobTypes = [
    'Tất cả' + ' (' + `${data.task_of_me}` + ')',
    'Đang chờ' + ' (' + `${data.task_waiting}` + ')',   // Waiting
    'Đang làm' + ' (' + `${data.task_doing}` + ')',   // Doing
    'Hoàn thành' + ' (' + `${data.task_complete}` + ')', // Complete
    'Quá hạn' + ' (' + `${data.task_expired}` + ')',    // Expired
    'Tạm dừng' + ' (' + `${data.task_stop}` + ')',   // Stop
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
