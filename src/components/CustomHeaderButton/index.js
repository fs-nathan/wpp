import React from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button } from '@material-ui/core';
import Icon from '@mdi/react';

const StyledButton = styled(Button)`
  && {
    padding: 0 4px;
    border-radius: 0;
    color: rgba(0, 0, 0, 0.54);
  }
  &&:not(:last-child) {
    border-right: none;
  }
  &&:hover {
    background-color: #fff;
    & path {
      fill: #05b50c !important;
    }
    color: #05b50c;
  }
  &.Mui-disabled {
    opacity: 0.5;
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

const CustomHeaderButton = props => {
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        {props.listAction.map((el, index) => {
          if (el.isShow) {
            return (
              <StyledButton
                disableRipple
                disableTouchRipple
                disabled={el.disabled}
                onClick={el.action}
                key={index}
              >
                <div>
                  <Icon path={el.icon} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                </div>
                <span>{el.text}</span>
              </StyledButton>
            );
          }
          return null;
        })}
      </ButtonGroup>
    </React.Fragment>
  );
};

export default CustomHeaderButton;
