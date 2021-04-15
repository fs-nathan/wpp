import Icon from "@mdi/react";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  LOCAL_PERSONAL_REMINDS_STORAGE,
  LOCAL_PROJECT_REMINDS_STORAGE,
} from "views/CalendarPage/constants/attrs";
import { actionVisibleDrawerMessage } from "../../actions/system/system";
import { DRAWER_TYPE, REFRESH_TOKEN, TOKEN } from "../../constants/constants";
import { Routes } from "../../constants/routes";
import {
  TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW,
} from "../../views/OfferPage/contants/localStorage";
import "./Drawer.scss";
import { withRouter } from 'react-router-dom';

const FooterListDrawer = (props) => {
  const closeDrawer = (url) => {
    if (url === Routes.LOGIN) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW);
      localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW);
      localStorage.removeItem(LOCAL_PERSONAL_REMINDS_STORAGE);
      localStorage.removeItem(LOCAL_PROJECT_REMINDS_STORAGE);
      localStorage.removeItem(LOCAL_PERSONAL_REMINDS_STORAGE);
      localStorage.removeItem(LOCAL_PROJECT_REMINDS_STORAGE);
      window.location.href = Routes.LOGIN;
    } else {
      if (props.openInNewTab) {
        window.open(url, '_blank');
      } else {
        props.history.push({
          pathname: url
        });
      }
    }
    props.actionVisibleDrawerMessage({
      type: "",
      anchor: props.anchorDrawer,
    });
  };

  const { actionList, typeDrawer } = props;
  return (
    <div className="footer-list-drawer">
      {actionList.map((el, index) => (
        <div className={`button-item ${el.classname}`} key={index}>
          <div
            className={`text-btn ${
                typeDrawer === DRAWER_TYPE.SUPPORT ? "support-text" : ""
            }`}
            onClick={() => closeDrawer(el.url)}
          >
            {el.icon && <Icon path={el.icon} size={1} color="#5a5a5a" />}
            <span className="name-text">{el.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(
  (state) => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
  }),
  {
    actionVisibleDrawerMessage,
  }
)(withRouter(FooterListDrawer));
