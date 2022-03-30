import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {
  actionChangeNumNotificationNotView,
  actionVisibleDrawerMessage,
  getNumberMessageNotViewer,
  getNumberNotificationNotViewer,
  openNoticeModal,
} from "../../actions/system/system";
import { Routes } from "../../constants/routes";
import { isEmpty } from "../../helpers/utils/isEmpty";
import { useSelector, useDispatch } from "react-redux";
// import { useTranslation } from 'react-i18next';
// import * as icons from '../../assets';
import "./LeftBar.scss";
import { getNumberMessageNotView } from "actions/chat/threadChat";
import PopoverMenu from "./PopoverMenu";
import { TOKEN } from "constants/constants";

const BellMessage = () => {
  const numberChatNotView = useSelector(
    (state) => state.threadChat.numberChatNotView
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getNumberMessageNotView());
  }, []);
  return numberChatNotView > 0 ? (
    <div className="bell-message">{numberChatNotView}</div>
  ) : null;
};

const isDocument = (type) => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
    case Routes.DOCUMENT_PROJECT:
    case Routes.DOCUMENT_SHARE:
    case Routes.DOCUMENT_SHARE_ME:
    case Routes.DOCUMENT_ME:
    case Routes.DOCUMENT_GOOGLE_DRIVE:
    case Routes.DOCUMENT_TRASH:
      return true;
    default:
      return false;
  }
};

const LeftBar = ({
  colors,
  history,
  anchorDrawer,
  groupActive,
  profile,
  actionVisibleDrawerMessage,
  openNoticeModal,
  setVisibleGroupModal,
  logo,
  sidebar,
  ...props
}) => {
  const { t } = useTranslation();
  const pathname = history.location.pathname;
  // const { group_active } = profile;
  const bgColor = colors.find((item) => item.selected === true);

  const handleFetchNumNotificationNotView = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      actionChangeNumNotificationNotView(data.number_notification);
    } catch (err) {}
  };
  const handleFetchNumMessageNotView = async () => {
    try {
      const { data } = await getNumberMessageNotViewer();
      props.getNumberMessageNotViewer(data.number_chat);
    } catch (err) {}
  };
  React.useEffect(() => {
    const hasToken = localStorage.getItem(TOKEN);
    if (hasToken && (!profile || !profile.id)) {
      handleFetchNumNotificationNotView();
      handleFetchNumMessageNotView();
    }
  }, []);

  let menuList = [];
  let bottomList = [];
  if (!isEmpty(sidebar)) {
    sidebar.forEach((el, idx) => {
      let isActived = false;
      if (pathname.indexOf(el.path_search) == 0) {
        isActived = true;
      } else if (
        el.path_search_more &&
        el.path_search_more.includes(pathname)
      ) {
        isActived = true;
      }
      if (el.isBottom) {
        bottomList.push({
          ...el,
          isSelected: isActived,
          icon: isActived ? el.url_icon_selected : el.url_icon,
        });
      } else {
        menuList.push({
          ...el,
          isSelected: isActived,
          icon: isActived ? el.url_icon_selected : el.url_icon,
        });
      }
    });
  }
  const isFree = groupActive.type === "Free";
  return (
    <div
      className={`left-bar-container`}
      style={{
        background: bgColor.color,
      }}
    >
      <div>
        <div className="logo" onClick={() => setVisibleGroupModal(true)}>
          {logo && <img src={logo} />}
        </div>
        {menuList.map((item, index) => {
          return item.need_bell ? (
            <Link
              key={index}
              className={`menu-item ${item.isSelected ? "actived" : ""}`}
              to={item.url_redirect}
            >
              <Badge
                badgeContent={props.newMessage > 0 ? "" : null}
                color="error"
                className={`menu-badge-leftbar ${
                  props.newMessage <= 0 ? "none-view" : ""
                }`}
              >
                <div className="menu-icon">
                  {item.icon && <img src={item.icon.default} />}
                </div>
              </Badge>
              <p>{t(item.name)}</p>
            </Link>
          ) : (
            <Link
              key={index}
              className={`menu-item ${item.isSelected ? "actived" : ""}`}
              to={item.url_redirect}
            >
              <div className="menu-icon">
                {item.icon && <img src={item.icon.default} />}
              </div>
              <p>{t(item.name)}</p>
            </Link>
          );
        })}
      </div>

      <div>
        {bottomList.map((item, index) => {
          return <PopoverMenu key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    groupActive: state.system.groupActive,
    profile: state.system.profile,
    sidebar: state.system.sidebar,
    newMessage: state.taskDetail.listDetailTask.newMessage,
  }),
  { actionVisibleDrawerMessage, openNoticeModal }
)(withRouter(LeftBar));
