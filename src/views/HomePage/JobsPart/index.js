import React from 'react';
import styled from 'styled-components';
import Icon from "@mdi/react";
import { mdiApps, mdiWhiteBalanceSunny, mdiAlertOutline, mdiTimerSand } from "@mdi/js";
import { Button, ButtonGroup } from '@material-ui/core';
import JobList from './JobsList';

const Container = styled.div`
  grid-area: jobs;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledButton = styled(({ variantColor, ...rest }) => <Button {...rest} />)`
  && {
    padding: 4px;
    border-radius: 0;
  }
  &&:not(:last-child) {
    border-right: none;
  }
  && > span:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    & > div {
      background-color: ${props => props.variantColor ? props.variantColor : 'rgba(0, 0, 0, .4)'};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      border-radius: 100%;
    }
    & > span {
      margin-top: 5px;
      text-transform: none;
      font-size: 12px;
      color: #007bff;
    }
  }
`;

function JobsPart() {
  return (
    <Container>
      <Header>
        <ButtonGroup
          variant="text"
          fullWidth
        >
          <StyledButton disableRipple variantColor='#06f9a7'>
            <div>
              <Icon path={mdiApps} size={1} color="#fff" />
            </div>
            <span>Tất cả</span>
          </StyledButton>
          <StyledButton disableRipple variantColor='orange'>
            <div>
              <Icon path={mdiWhiteBalanceSunny} size={1} color="#fff" />
            </div>
            <span>Đến hạn</span>
          </StyledButton>
          <StyledButton disableRipple variantColor='red'>
            <div>
              <Icon path={mdiAlertOutline} size={1} color="#fff" />
            </div>
            <span>Quá hạn</span>
          </StyledButton>
          <StyledButton disableRipple variantColor='#a5a0a0'>
            <div>
              <Icon path={mdiTimerSand} size={1} color="#fff" />
            </div>
            <span>Đang chờ</span>
          </StyledButton>
        </ButtonGroup>
      </Header>
      <JobList />
    </Container>
  )
}

export default JobsPart;
