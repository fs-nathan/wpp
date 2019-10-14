import React from 'react';
import styled from 'styled-components';
import { ListSubheader } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';

const StyledSubHeader = styled(ListSubheader)`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ListBodySubHeader({ subPrimary, subSecondary }) {
  return (
    <StyledSubHeader disableSticky>
      <ColorTypo variant='h6' bold>{subPrimary}</ColorTypo>
      <ColorTypo variant='caption'>{subSecondary}</ColorTypo>
    </StyledSubHeader>
  )
}

export default ListBodySubHeader;
