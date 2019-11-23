import React from 'react';
import styled from 'styled-components';
import CustomModal from '../../../../components/CustomModal';
import LeftPart from './LeftPart';
import RightPart from './RightPart';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

function TableSettings({ open, setOpen }) {

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Cài đặt bảng'
        onCancle={() => setOpen(0)}  
      >
        <Container>
          <LeftPart />
          <RightPart />
        </Container>
      </CustomModal>
    </React.Fragment>
  )
}

export default TableSettings;
