import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  actionVisibleDrawerMessage,
  openNoticeModal,
} from "../../actions/system/system";
import { Routes } from "../../constants/routes";
import { isEmpty } from "../../helpers/utils/isEmpty";
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import * as icons from '../../assets';
import "./LeftBar.scss";
import { getNumberMessageNotView } from "actions/chat/threadChat";

const BellMessage = () => {
  const numberChatNotView = useSelector((state) => state.threadChat.numberChatNotView);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getNumberMessageNotView())
  }, []);
  return numberChatNotView > 0 ? (
    <div className="bell-message">
      {numberChatNotView}
    </div>
  ) : null
}

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
}) => {
  const { t } = useTranslation();
  const pathname = history.location.pathname;
  const { group_active } = profile;
  const bgColor = colors.find((item) => item.selected === true);
  const onCloseDrawer = () => {
    actionVisibleDrawerMessage({ type: "", anchor: anchorDrawer });
  };
  let menuList = [];
  let itemManage = false;
  if (!isEmpty(group_active) && !isEmpty(group_active.modules)) {
    group_active.modules.forEach((el, idx) => {
      let isActived = false;
      if (pathname.indexOf(el.path_search) == 0) {
        isActived = true;
      } else if (el.path_search_more && el.path_search_more.includes(pathname)) {
        isActived = true;
      }
      if (el.is_manage_group) {
        itemManage = {
          ...el,
          isSelected: isActived,
          icon: isActived ? el.url_icon_selected : el.url_icon,
        };
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
    <div className="left-bar-container" style={{ background: bgColor.color }}>
      {!isEmpty(menuList) &&
        menuList.map((el, idx) => {
          return (
            <Link
              to={isFree ? "#" : el.url_redirect}
              key={idx}
              className={`menu-item ${el.isSelected ? "actived" : ""}`}
              onClick={() => {
                if (isFree) {
                  openNoticeModal("ACCOUNT_FREE");
                }
                onCloseDrawer();
              }}
            >
              <img src={el.icon} alt="" className="LeftNavIcon" />
              <span className="titleTab">{t(el.name)}</span>
              {
                el.need_bell && <BellMessage />
              }
            </Link>
          );
        })}
      {itemManage && (
        <Link
          to={itemManage.url_redirect}
          onClick={onCloseDrawer}
          className={`menu-item menu-item-last ${
            itemManage.isSelected ? "actived" : ""
          }`}
          title={itemManage.name}
        >
          <img src={itemManage.icon} alt="" className="LeftNavIcon" />
        </Link>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    groupActive: state.system.groupActive,
    profile: state.system.profile,
  }),
  { actionVisibleDrawerMessage, openNoticeModal }
)(withRouter(LeftBar));
