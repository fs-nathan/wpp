import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Chip from '../../components/ColorChip';
import SearchInput from '../../components/SearchInput';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiHelpCircleOutline } from '@mdi/js';
import { IconButton, Avatar } from '@material-ui/core';
import avatar from '../../assets/avatar.jpg';
import * as icons from '../../assets';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { DRAWER_TYPE } from '../../constants/constants';
import SearchModal from '../../components/SearchModal/SearchModal';
import './TopBar.scss';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(800px, 3fr);
  grid-template-areas: 'list table';
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const LeftPart = styled.div`
  display: flex;
  padding: 0 1rem;
`;

const InfoBox = styled.div`
  overflow: hidden;
  cursor: pointer;
  & > div {
    display: flex;
    align-items: center;
    & > *:first-child {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
  padding-right: 1rem;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const AccBox = styled.div`
  margin-left: 20px;
  min-width: 200px;
  justify-content: flex-end;
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
  const handleAccount = () => {
    props.actionVisibleDrawerMessage({
      type: DRAWER_TYPE.GROUP_ACCOUNT,
      anchor: 'top'
    });
  };
  return (
    <Container id="topNavId">
      <LeftPart>
        <InfoBox onClick={handleAccount}>
          <div>
            <div>HungThanhXD</div>
            <Chip badge color="orange" label="Pro" />
          </div>
          <div>
            <GreenText>huuthanhxd@gmail.com</GreenText>
            <Icon path={mdiMenuDown} size={1} color="rgba(0, 0, 0, 0.54)" />
          </div>
        </InfoBox>
      </LeftPart>
      <RightPart>
        <span id="searchInputWrapper">
          <StyledSearchInput
            onClick={openSearchModal}
            placeholder="Tìm nhanh công việc"
          />
          {visibleSearchModal && (
            <SearchModal
              open={visibleSearchModal}
              setOpen={val => setVisibleSearch(val || false)}
              marginLeft={marginLeftModal}
              marginTop={marginTopModal}
            />
          )}
        </span>
        <IconButton
          className="cursor-pointer support-icon"
          onClick={() =>
            props.actionVisibleDrawerMessage({
              type: DRAWER_TYPE.SUPPORT,
              anchor: 'right'
            })
          }
        >
          <Icon
            path={mdiHelpCircleOutline}
            size={0.8}
            color="rgba(0, 0, 0, 0.54)"
            className="normal-icon"
          />
          <Icon
            path={mdiHelpCircleOutline}
            size={0.8}
            color="#444"
            className="active-icon"
          />
          &nbsp;Trợ giúp
        </IconButton>
        <IconButton
          className="cursor-pointer top-icon"
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
          className="cursor-pointer top-icon"
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
          &nbsp;
          <img
            onClick={() =>
              props.actionVisibleDrawerMessage({
                type: DRAWER_TYPE.SETTING,
                anchor: 'right'
              })
            }
            src={icons.ic_menu_more}
            alt=""
            className="topnav-icon"
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
