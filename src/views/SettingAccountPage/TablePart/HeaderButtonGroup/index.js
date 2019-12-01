import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { Routes } from '../../../../constants/routes';

const StyledButton = styled(Button)`
  && {
    padding: 0 4px;
    border-radius: 0;
    color: rgba(0, 0, 0, 0.54);
  }
  &&:hover {
    background-color: transparent;
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

const HeaderButtonGroup = props => {
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        <StyledButton
          disableRipple
          disableTouchRipple
          onClick={() => props.history.push(Routes.SETTING_ACCOUNT_NOTIFI)}
        >
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
        </StyledButton>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default withRouter(HeaderButtonGroup);
