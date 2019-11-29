import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Chip from '../../components/ColorChip';
import SearchInput from '../../components/SearchInput';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiHelpCircleOutline,
  mdiSettingsOutline
} from '@mdi/js';
import { IconButton, Avatar } from '@material-ui/core';
import avatar from '../../assets/avatar.jpg';
import * as icons from '../../assets';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { DRAWER_TYPE } from '../../constants/constants';
import SearchModal from '../../components/SearchModal/SearchModal';
import './TopBar.scss';

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

const TopBar = props => {
  const [visibleSearchModal, setVisibleSearch] = useState(false);
  const [marginLeftModal, setMarginLeftModal] = useState(280);
  const [marginTopModal, setMarginTopModal] = useState(10);

  const openSearchModal = () => {
    // Handle position of search modal
    const searchInputWrapperElm = document.getElementById('searchInputWrapper');
    const topNavElm = document.getElementById('topNavId');

    if (searchInputWrapperElm) {
      // marginLeft, marginTop of TopNav element
      const mlTopNav = window.getComputedStyle(topNavElm).marginLeft || 0;
      const mtTopNav = window.getComputedStyle(topNavElm).marginTop || 0;
      const posLeft = searchInputWrapperElm.offsetLeft + parseInt(mlTopNav);
      const posTop = searchInputWrapperElm.offsetTop + parseInt(mtTopNav);
      setMarginLeftModal(posLeft);
      setMarginTopModal(posTop);
    }
    setVisibleSearch(true);
  };
  return (
    <Container id="topNavId">
      <LeftPart>
        <InfoBox>
          <div>
            <div>HungThanhXD</div>
            <Chip badge color="orange" label="Pro" />
          </div>
          <div>
            <GreenText>huuthanhxd@gmail.com</GreenText>
            <Icon path={mdiChevronDown} size={1} />
          </div>
        </InfoBox>
        <span id="searchInputWrapper">
          <StyledSearchInput
            onClick={openSearchModal}
            placeholder="Tìm nhanh công việc"
          />
        </span>
        {visibleSearchModal && (
          <SearchModal
            open={visibleSearchModal}
            setOpen={val => setVisibleSearch(val || false)}
            marginLeft={marginLeftModal}
            marginTop={marginTopModal}
          />
        )}
      </LeftPart>
      <RightPart>
        <IconButton
          className="cursor-pointer"
          onClick={() =>
            props.actionVisibleDrawerMessage({
              type: DRAWER_TYPE.SUPPORT,
              anchor: 'right'
            })
          }
        >
          <Icon path={mdiHelpCircleOutline} size={1} />
          &nbsp;Trợ giúp
        </IconButton>
        <IconButton
          className="cursor-pointer"
          onClick={() =>
            props.actionVisibleDrawerMessage({
              type: DRAWER_TYPE.MESSAGE,
              anchor: 'right'
            })
          }
        >
          <img
            src={
              props.typeDrawer === DRAWER_TYPE.MESSAGE
                ? icons.ic_message_select
                : icons.ic_message
            }
            alt=""
            className="topnav-icon message-icon"
          />
        </IconButton>
        <IconButton
          className="cursor-pointer"
          onClick={() =>
            props.actionVisibleDrawerMessage({
              type: DRAWER_TYPE.NOTIFICATION,
              anchor: 'right'
            })
          }
        >
          <img
            src={
              props.typeDrawer === DRAWER_TYPE.NOTIFICATION
                ? icons.ic_noti_select
                : icons.ic_noti
            }
            alt=""
            className="topnav-icon"
          />
        </IconButton>
        <AccBox>
          <Avatar style={{ height: 30, width: 30 }} src={avatar} alt="Avatar" />
          <p>Nguyễn Hữu Thành</p>
          <Icon
            className="cursor-pointer"
            path={mdiSettingsOutline}
            size={1}
            onClick={() =>
              props.actionVisibleDrawerMessage({
                type: DRAWER_TYPE.SETTING,
                anchor: 'right'
              })
            }
          />
        </AccBox>
      </RightPart>
    </Container>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer
  }),
  { actionVisibleDrawerMessage }
)(TopBar);
