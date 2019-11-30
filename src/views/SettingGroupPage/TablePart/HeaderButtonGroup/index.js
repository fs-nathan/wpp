import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiMagnify, mdiCart, mdiClose } from '@mdi/js';
import { Routes } from '../../../../constants/routes';
import { SETTING_GROUP } from '../../../../constants/constants';

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
  && > span:last-child {
    display: none;
  }
`;

const HeaderButtonGroup = props => {
  const isActived = value => props.match.params.type === value;
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        {isActived(SETTING_GROUP.ORDER) && (
          <StyledButton disableRipple>
            <div>
              <Icon path={mdiMagnify} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>Tìm kiếm</span>
          </StyledButton>
        )}
        {(isActived(SETTING_GROUP.ORDER) ||
          isActived(SETTING_GROUP.CREATE_ORDER) ||
          isActived(SETTING_GROUP.PAYMENT)) && (
          <StyledButton
            disableRipple
            onClick={() => props.history.push(Routes.SETTING_GROUP_ORDER)}
          >
            <div>
              <Icon path={mdiCart} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>Đơn hàng</span>
          </StyledButton>
        )}

        {isActived(SETTING_GROUP.ORDER_DETAIL) && (
          <StyledButton
            disableRipple
            onClick={() => props.history.push(Routes.SETTING_GROUP_ORDER)}
          >
            <div>
              <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>Đóng</span>
          </StyledButton>
        )}
      </ButtonGroup>
    </React.Fragment>
  );
};

export default withRouter(HeaderButtonGroup);
