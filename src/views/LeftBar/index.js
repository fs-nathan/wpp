import React , {useState} from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import {Button} from '@material-ui/core';
import {
  actionVisibleDrawerMessage,
  openNoticeModal,
} from "../../actions/system/system";
import { Routes } from "../../constants/routes";
import { isEmpty } from "../../helpers/utils/isEmpty";
import { useSelector, useDispatch } from 'react-redux';
import { IconNext, IconBack } from "components/IconSvg/Verify_check";

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
  collapse, 
  setCollapse
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
    <div className={`left-bar-container ${collapse && 'collapse'}`} style={{ background: bgColor.color }}>
      {!isEmpty(menuList) &&
        menuList.map((el, idx) => {
          return (
            <Link
              to={isFree ? "#" : el.url_redirect}
              key={idx}
              title={collapse ? t(el.name) : ""}
              className={`menu-item ${el.isSelected ? "actived" : ""}`}
              onClick={() => {
                if (isFree) {
                  openNoticeModal("ACCOUNT_FREE");
                }
                onCloseDrawer();
              }}
            >
              <div className={collapse ? 'item-collapse' : 'item-not-collapse'}>
                <span style={{width: '35px'}} className={collapse ? 'LeftNavIconZoom' : 'iconDefault'}>{ReactHtmlParser(el.svg_icon)}</span>
              {/* <img src={el.icon} alt="" className={`LeftNavIcon ${collapse && 'LeftNavIconZoom'}` } /> */}
              <span className={`titleTab ${collapse ?'label-collapse': 'label-not-collapse' }`}>{t(el.name)}</span>
              </div>
              {
                el.need_bell && <BellMessage />
              }
            </Link>
          );
        })}
        <div style={{ background: bgColor.color }} className={`btn-collapse ${collapse ?'btn_expand': 'btn_narrow'}`} onClick={()=>setCollapse(!collapse)}> <span>{collapse ? <IconNext />: <IconBack />}</span> </div>
      {itemManage && (
        <Link
          to={itemManage.url_redirect}
          onClick={onCloseDrawer}
          className={`menu-item menu-item-last ${
            itemManage.isSelected ? "actived" : ""
          }`}
          title={itemManage.name}
        >
          <div className={collapse ? 'item-collapse' : 'item-not-collapse'}>
          <span style={{width: '35px'}} className={collapse ? 'LeftNavIconZoom' : ""}>{ReactHtmlParser(itemManage.svg_icon)}</span>
          {!collapse && <span className="titleTab">{t(itemManage.name)}</span>}
          </div>
          {/* <img src={itemManage.icon} alt="" className="LeftNavIcon" /> */}
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
