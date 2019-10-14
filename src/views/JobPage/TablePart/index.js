import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiPlus,
} from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import ColorButton from '../../../components/ColorButton';
import TableMain from './TableMain';

const Container = styled.div`
  grid-area: table;
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 20px;
  }
`;

function TablePart() {
  return (
    <Container>
      <Header>
        <ColorTypo color='green' uppercase>
          &#9733; Thiết kế nội thất thi công nhà
        </ColorTypo>
        <RightHeader>
          <HeaderButtonGroup />
          <ColorButton 
            size='small'
            variantColor='orange' 
            variant='contained'
            startIcon={
              <Icon path={mdiPlus} size={0.8} color={'#fff'} />
            }
          >
            Tạo công việc
          </ColorButton>
        </RightHeader> 
      </Header>
      <TableMain />
    </Container>
  )
}

export default TablePart;
