import React from 'react';
import styled from 'styled-components';
import ColorChip from '../../../../components/ColorChip';
import { WrapperContext } from '../../index'

const Container = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  & > * {
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 0 5px;
    & > span {
      font-size: 12px;
    }
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const jobTypes = [
  'Tất cả',
  'Đang chờ',   // Waiting
  'Đang làm',   // Doing
  'Hoàn thành', // Complete
  'Quá hạn',    // Expired
  'Tạm dừng',   // Stop
]

function ListBanner() {
  
  const value = React.useContext(WrapperContext)
  const [selected, setSelected] = React.useState(0)


  const handleChangeFilterType = (typeIdx) => {
    value.filterTaskByType(typeIdx)
    setSelected(typeIdx) 
  }

  return (
    <Container>
      {jobTypes.map((jobType, index) => (
        <ColorChip 
          key={index} 
          label={jobType} 
          onClick={() => handleChangeFilterType(index)}
          color={selected === index ? 'light-blue' : 'white'}
          size='small'
        />
      ))} 
    </Container>
  );
}

export default ListBanner;
