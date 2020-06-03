import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  actionVisibleDrawerMessage,
  openNoticeModal
} from '../../actions/system/system';
import { Routes } from '../../constants/routes';
// import { useTranslation } from 'react-i18next';
// import * as icons from '../../assets';
import './LeftBar.scss';
import { isEmpty } from '../../helpers/utils/isEmpty';

const isDocument = type => {
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
  openNoticeModal
}) => {
  // const { t } = useTranslation();
  const pathname = history.location.pathname;
  const { group_active } = profile;
  const bgColor = colors.find(item => item.selected === true);
  const onCloseDrawer = () => {
    actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
  };
  let menuList = [];
  let itemManage = false;
  if (!isEmpty(group_active) && !isEmpty(group_active.modules)) {
    group_active.modules.forEach((el, idx) => {
      const isActived = pathname.indexOf(el.path_search) == 0 ? true : false
      if (el.is_manage_group) {
        itemManage = {
          ...el,
          isSelected: isActived,
          icon: isActived ? el.url_icon_selected : el.url_icon
        }
      } else {
        menuList.push({
          ...el,
          isSelected: isActived,
          icon: isActived ? el.url_icon_selected : el.url_icon
        });
      }
    });
  }
  const isFree = groupActive.type === 'Free';
  return (
    <div className="left-bar-container" style={{ background: bgColor.color }}>
      {!isEmpty(menuList) &&
        menuList.map((el, idx) => {
          return (
            <Link
              to={isFree ? null : el.url_redirect}
              key={idx}
              className={`menu-item ${el.isSelected ? 'actived' : ''}`}
              onClick={() => {
                if (isFree) {
                  openNoticeModal();
                }
                onCloseDrawer();
              }}
            >
              <img src={el.icon} alt="" className="LeftNavIcon" />
              <span className="titleTab">{el.name}</span>
            </Link>
          );
        })}
      {itemManage && (
        <Link
          to={itemManage.url_redirect}
          onClick={onCloseDrawer}
          className={`menu-item menu-item-last ${itemManage.isSelected ? 'actived' : ''}`}
          title={itemManage.name}
        >
          <img
            src={itemManage.icon}
            alt=""
            className="LeftNavIcon"
          />
        </Link>
      )}
    </div>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    groupActive: state.system.groupActive,
    profile: state.system.profile
  }),
  { actionVisibleDrawerMessage, openNoticeModal }
)(withRouter(LeftBar));
