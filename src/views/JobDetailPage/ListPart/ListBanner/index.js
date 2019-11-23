import React from 'react';
import styled from 'styled-components';
import ColorChip from '../../../../components/ColorChip';

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
  'Đang chờ',
  'Đang làm',
  'Hoàn thành',
  'Quá hạn',
  'Tạm dừng',
];

function ListBanner() {
  
  const [selected, setSelected] = React.useState(0);

  return (
    <Container>
      {jobTypes.map((jobType, index) => (
        <ColorChip 
          key={index} 
          label={jobType} 
          onClick={() => setSelected(index)}
          color={selected === index ? 'light-blue' : 'white'}
          size='small'
        />
      ))} 
    </Container>
  );
}

export default ListBanner;
