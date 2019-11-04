import React from 'react';
import styled from 'styled-components';
import Chip from '../../components/ColorChip';
import SearchInput from '../../components/SearchInput';
import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiMessageTextOutline,
  mdiBellOutline,
} from "@mdi/js";
import { IconButton, Avatar } from '@material-ui/core';
import avatar from '../../assets/avatar.jpg';

const Container = styled.div`
  padding: 0 1rem;
  grid-area: top;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > *:last-child {
    margin-left: auto;
  }
  z-index: 999;
`;

const LeftPart = styled.div`
  display: flex;
  & > div:first-child {
    margin-right: 20px;
  }
`;

const InfoBox = styled.div`
  & > div {
    display: flex;
    align-items: center;
    & > *:first-child {
      margin-right: 0.75rem;
    }
  }
`;

const GreenText = styled.div`
  color: #31b586;
`;

const StyledSearchInput = styled(SearchInput)`
  width: 300px;
`;

const RightPart = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const AccBox = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 5px;
  }
`;

function TopBar() {
  return (
    <Container>
      <LeftPart>
        <InfoBox>
          <div>
            <div>HungThanhXD</div>
            <Chip badge color='orange' label="Pro" />
          </div>
          <div>
            <GreenText>huuthanhxd@gmail.com</GreenText>
            <Icon path={mdiChevronDown} size={1} />
          </div>
        </InfoBox>
        <StyledSearchInput placeholder="Tìm nhanh công việc"/>
      </LeftPart>
      <RightPart>
        <IconButton>
          <Icon path={mdiMessageTextOutline} size={1} />
        </IconButton>
        <IconButton>
          <Icon path={mdiBellOutline} size={1} />
        </IconButton>
        <AccBox>
          <Avatar style={{ height: 30, width: 30 }} src={avatar} alt='Avatar' />
          <p>Nguyễn Hữu Thành</p>
          <Icon path={mdiChevronDown} size={1} />
        </AccBox>
      </RightPart>
    </Container>
  )
}

export default TopBar;
