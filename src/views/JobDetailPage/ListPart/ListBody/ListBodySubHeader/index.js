import { ListSubheader } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import ColorTypo from '../../../../../components/ColorTypo';
const StyledSubHeader = styled(ListSubheader)`
  padding: 0;
  display: flex;
  align-items: center;  
`;

function ListBodySubHeader({ subPrimary, subSecondary }) {
  const groupActiveColor = useSelector(currentColorSelector)

  return (
    <StyledSubHeader disableSticky>
      <ColorTypo variant='h6' bold style={{ color: groupActiveColor, paddingLeft: '15px', fontSize: '14px' }}>{subPrimary}</ColorTypo>
      <ColorTypo variant='caption' style={{ fontSize: '12px', fontWeight: 400, color: groupActiveColor, marginLeft: '5px' }}>{subSecondary}</ColorTypo>
    </StyledSubHeader>
  )
}

export default ListBodySubHeader;
