import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiUpload,
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
          &#9733; Gần đây
        </ColorTypo>
        <RightHeader>
          <HeaderButtonGroup />
          <ColorButton 
            size='small'
            variantColor='orange' 
            variant='contained'
            startIcon={
              <Icon path={mdiUpload} size={0.8} color={'#fff'} />
            }
          >
            Tải lên
          </ColorButton>
        </RightHeader> 
      </Header>
      <TableMain />
    </Container>
  )
}

export default TablePart;
