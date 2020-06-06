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
import "./Drawer.scss";

const FooterListDrawer = (props) => {
  const closeDrawer = (url) => {
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
          {el.url === Routes.LOGIN ? (
            <div
              onClick={() => {
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                localStorage.removeItem(LOCAL_PERSONAL_REMINDS_STORAGE);
                localStorage.removeItem(LOCAL_PROJECT_REMINDS_STORAGE);
                localStorage.clear();
                window.location.reload();
              }}
              className={`text-btn ${
                typeDrawer === DRAWER_TYPE.SUPPORT ? "support-text" : ""
              }`}
            >
              {el.icon && <Icon path={el.icon} size={1} color="#5a5a5a" />}
              <span className="name-text">{el.name}</span>
            </div>
          ) : (
            <Link
              to={el.url}
              onClick={() => closeDrawer(el.url)}
              className={`text-btn ${
                typeDrawer === DRAWER_TYPE.SUPPORT ? "support-text" : ""
              }`}
            >
              {el.icon && <Icon path={el.icon} size={1} color="#5a5a5a" />}
              <span className="name-text">{el.name}</span>
            </Link>
          )}
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
)(FooterListDrawer);
