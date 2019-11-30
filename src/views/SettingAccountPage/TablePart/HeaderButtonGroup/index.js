import React from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiMagnify, mdiDownload, mdiTrashCan } from '@mdi/js';

const StyledButton = styled(Button)`
  && {
    padding: 0 4px;
    border-radius: 0;
    color: rgba(0, 0, 0, 0.54);
  }
  &&:not(:last-child) {
    border-right: none;
  }
  && > span:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > span {
      margin-top: 5px;
      font-size: 11px;
    }
  }
`;

function HeaderButtonGroup() {
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiDownload} size={1} color={'rgba(0, 0, 0, 0.54)'} />
          </div>
          <span>Tải xuống</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiTrashCan} size={1} color={'rgba(0, 0, 0, 0.54)'} />
          </div>
          <span>Xóa</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiMagnify} size={1} color={'rgba(0, 0, 0, 0.54)'} />
          </div>
          <span>Tìm kiếm</span>
        </StyledButton>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default HeaderButtonGroup;
