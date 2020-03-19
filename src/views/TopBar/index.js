import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
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
import {
  getProfileService,
  actionGetProfile,
  actionChangeNumNotificationNotView,
  actionChangeNumMessageNotView,
  getNumberNotificationNotViewer,
  getNumberMessageNotViewer,
  actionActiveGroup,
  openNoticeModal
} from '../../actions/system/system';
import { isEmpty } from '../../helpers/utils/isEmpty';

const TopBar = props => {
  const { t, i18n } = useTranslation();
  const [visibleSearchModal, setVisibleSearch] = useState(false);
  const [marginLeftModal, setMarginLeftModal] = useState(280);
  const [marginTopModal, setMarginTopModal] = useState(10);

  const handleFetchProfile = async isNotice => {
    try {
      const { data } = await getProfileService();
      if (data.data) {
        props.actionGetProfile(data.data);
        i18n.changeLanguage((data.data && data.data.language) || 'vi');
        props.actionActiveGroup(data.data.group_active);
        if (
          data.data.group_active &&
          data.data.group_active.type === 'Free' &&
          !isNotice
        ) {
          props.openNoticeModal();
        }
      }
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchNumNotificationNotView();
    handleFetchNumMessageNotView();
    handleFetchProfile(); // eslint-disable-next-line
  }, []);
  const handleFetchNumNotificationNotView = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      props.actionChangeNumNotificationNotView(data.number_notification);
    } catch (err) {}
  };
  const handleFetchNumMessageNotView = async () => {
    try {
      const { data } = await getNumberMessageNotViewer();
      props.getNumberMessageNotViewer(data.number_chat);
    } catch (err) {}
  };
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
    if (props.typeDrawer === '') {
      props.actionVisibleDrawerMessage({
        type: DRAWER_TYPE.GROUP_ACCOUNT,
        anchor: 'top'
      });
      handleFetchProfile(true);
    } else {
      props.actionVisibleDrawerMessage({
        type: '',
        anchor: props.anchorDrawer
      });
    }
  };
  const isFree =
    !isEmpty(props.groupActive) &&
    (props.groupActive.type === 'Free' ||
      props.groupActive.type_group === 'Free');
  return (
    <div id="topNavId" className="top-bar-container">
      <div className="left-part">
        {!isEmpty(props.groupActive) && (
          <div className="info-box" onClick={handleAccount}>
            <div>
              <div className="text-group-top-bar">
                {t('IDS_WP_GROUP')}: {props.groupActive.name}
              </div>
              <Chip
                badge
                color="orange"
                label={props.groupActive.type || props.groupActive.type_group}
                className={`style-status ${isFree ? 'free-status' : ''}`}
              />
            </div>
            {props.groupActive.code && (
              <div>
                <div className="green-text">ID: {props.groupActive.code}</div>
                <Icon path={mdiMenuDown} size={1} color="rgba(0, 0, 0, 0.54)" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="right-part">
        <span id="searchInputWrapper">
          <SearchInput
            className="search-input"
            onClick={openSearchModal}
            readOnly
            placeholder={t('IDS_WP_FIND_JOB')}
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
          &nbsp;{t('IDS_WP_SUPPORT')}
        </IconButton>

        <Badge
          badgeContent={
            props.numberMessageNotView > 100
              ? '99+'
              : props.numberMessageNotView
          }
          color="error"
          className={`bag-cus ${props.numberMessageNotView ? 'none-view' : ''}`}
        >
          <IconButton
            className="cursor-pointer top-icon"
            title={t('IDS_WP_MESSAGE')}
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
        </Badge>
        <Badge
          badgeContent={
            props.numberNotificationNotView > 100
              ? '99+'
              : props.numberNotificationNotView
          }
          color="error"
          className={`bag-cus ${
            props.numberNotificationNotView ? 'none-view' : ''
          }`}
        >
          <IconButton
            className="cursor-pointer top-icon"
            title={t('IDS_WP_NOTICE')}
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
        </Badge>

        <div className="acc-box">
          <Avatar
            style={{ height: 25, width: 25 }}
            src={props.profile.avatar || avatar}
            alt="Avatar"
          />
          <p className="text-name-acc">{props.profile.name || ''}</p>
          &nbsp;
          <img
            title={t('IDS_WP_ACCOUNT')}
            onClick={() =>
              props.actionVisibleDrawerMessage({
                type: DRAWER_TYPE.SETTING,
                anchor: 'right'
              })
            }
            src={icons.ic_menu_more}
            alt=""
            className="topnav-icon drawer-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    profile: state.system.profile,
    groupActive: state.system.groupActive,
    numberNotificationNotView: state.system.numberNotificationNotView,
    numberMessageNotView: state.system.numberMessageNotView
  }),
  {
    actionVisibleDrawerMessage,
    actionGetProfile,
    actionChangeNumNotificationNotView,
    actionChangeNumMessageNotView,
    actionActiveGroup,
    openNoticeModal
  }
)(TopBar);
