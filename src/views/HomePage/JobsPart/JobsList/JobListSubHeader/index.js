import React from 'react';
import styled from 'styled-components';
import { ListSubheader } from '@material-ui/core';

const StyledListSubHeader = styled(ListSubheader)`
  display: flex;
  align-items: center;
  & > span {
    flex-grow: 1;
    border: 1px solid rgba(0, 0, 0, .1);
    margin-left: 0.5rem;
  }
`;

function JobListSubHeader({ subHeader }) {
  return (
    <StyledListSubHeader disableSticky>
      <div>
        {subHeader}
      </div>
      <span />
    </StyledListSubHeader>
  )
}

export default JobListSubHeader;
