import { ListSubheader } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../../components/ColorTypo';
const StyledSubHeader = styled(ListSubheader)`
  padding: 0;
  display: flex;
  align-items: center;  
`;

function ListBodySubHeader({ subPrimary, subSecondary }) {
  return (
    <StyledSubHeader disableSticky>
      <ColorTypo variant='h6' bold style={{ color: '#828282', paddingLeft: '15px', fontSize: '14px' }}>{subPrimary}</ColorTypo>
      <ColorTypo variant='caption' style={{ fontSize: '12px', fontWeight: 400, color: '#828282', marginLeft: '5px' }}>{subSecondary}</ColorTypo>
    </StyledSubHeader>
  )
}

export default ListBodySubHeader;
