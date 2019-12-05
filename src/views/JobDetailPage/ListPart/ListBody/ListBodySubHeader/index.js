import React from 'react';
import styled from 'styled-components';
import { ListSubheader } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
// import { WrapperContext } from '../../../index'
const StyledSubHeader = styled(ListSubheader)`
  padding: 0;
  display: flex;
  align-items: center;  
  margin-top: 10px;
`;

function ListBodySubHeader({ subPrimary, subSecondary }) {
  return (
    <StyledSubHeader disableSticky>
      <ColorTypo variant='h6' bold style={{color: '#828282', paddingLeft: '15px', fontSize: '14px' }}>{subPrimary}</ColorTypo>
      <ColorTypo variant='caption' style={{ fontSize: '12px' , fontWeight: 400, color: '#828282', marginLeft: '10px' }}>{subSecondary}</ColorTypo>
    </StyledSubHeader>
  )
}

export default ListBodySubHeader;
