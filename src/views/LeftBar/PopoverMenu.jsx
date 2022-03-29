import React from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import "./PopoverMenu.scss";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { DRAWER_TYPE, REFRESH_TOKEN, TOKEN } from "constants/constants";
import {
  TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW,
} from 'views/OfferPage/contants/localStorage';
import {
  LOCAL_PERSONAL_REMINDS_STORAGE,
  LOCAL_PROJECT_REMINDS_STORAGE,
} from "views/CalendarPage/constants/attrs";
import SearchModal from "../../components/SearchModal/SearchModal";
import Badge from "@material-ui/core/Badge";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Routes } from 'constants/routes';

import {
  actionVisibleDrawerMessage,
  openNoticeModal,
} from "../../actions/system/system";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "center",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 180,
    marginLeft: "6.5vh",
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

function PopoverMenu(props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (props?.isSearchModal) {
      openSearchModal();
    }
    if (props?.drawer_type) {
      openDrawer(props);
    }
  };
  const onLogout = () => {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW);
          localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW);
          localStorage.removeItem(TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW);
          localStorage.removeItem(LOCAL_PERSONAL_REMINDS_STORAGE);
          localStorage.removeItem(LOCAL_PROJECT_REMINDS_STORAGE);
          localStorage.removeItem(LOCAL_PERSONAL_REMINDS_STORAGE);
          localStorage.removeItem(LOCAL_PROJECT_REMINDS_STORAGE);
          history.push(Routes.LOGIN)
  }
  const onCloseDrawer = () => {
    props.actionVisibleDrawerMessage({ type: "", anchor: "right" });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [visibleSearchModal, setVisibleSearch] = React.useState(false);
  const [marginLeftModal, setMarginLeftModal] = React.useState(280);
  const [marginTopModal, setMarginTopModal] = React.useState(10);

  const openSearchModal = () => {
    // Handle position of search modal
    const searchInputWrapperElm = document.getElementById("searchInputWrapper");
    const topNavElm = document.getElementById("topNavId");

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

  const openDrawer = (item) => {
    if (item?.drawer_type) {
      handleClose();
      props.actionVisibleDrawerMessage({
        type: item?.drawer_type,
        anchor: "left",
      });
      return;
      // props.handleClose
    } else {
      return;
    }
  };

  return (
    <div>
      {visibleSearchModal && (
        <SearchModal
          open={visibleSearchModal}
          setOpen={(val) => setVisibleSearch(val || false)}
          marginLeft={marginLeftModal}
          marginTop={marginTopModal}
        />
      )}
      <div
        variant={props.name}
        className={`menu-item ${props.isSelected ? "actived" : ""}`}
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // to={bottomList.url_redirect}
      >
        {!props?.component ? (
          <>
            <div className="menu-icon">
              {!props.need_bell ? (
                <>{props.icon && <img src={props.icon.default} />}</>
              ) : (
                <>
                  {props.numberNotificationNotView +
                    props.numberMessageNotView >
                  0 ? (
                    <Badge
                      badgeContent={"N"}
                      color="error"
                      className={`bag-cus ${
                        props.numberNotificationNotView ? "none-view" : ""
                      }`}
                    >
                      <IconButton className="cursor-pointer top-icon">
                        <>{props.icon && <img src={props.icon.default} />}</>
                      </IconButton>
                    </Badge>
                  ) : (
                    <>{props.icon && <img src={props.icon.default} />}</>
                  )}
                </>
              )}
            </div>
            <p>{t(props.name)}</p>
          </>
        ) : (
          <>
            <div className="menu-icon ">
              {/* {props.icon && <img src={props.icon.default} />} */}
              <span className="menu-icon-profile">
                {props?.profile?.name
                  ? props?.profile?.name.substring(0, 1)
                  : null}
              </span>
            </div>
            <p>{props?.profile?.name}</p>
          </>
        )}
      </div>

      {props.child_menu?.length > 0 ? (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {props.child_menu.map((childItem, index) => {
            return (
              <MenuItem
                key={`${index}${childItem.name}`}
                disableRipple
                onClick={() => openDrawer(childItem)}
                className={`${
                  childItem.backgroundApply ? "background-apply" : ""
                }`}
              >
                {childItem.url_redirect ? (
                  <div
                    className="menu-sub-item"
                    onClick={() => {
                      if (childItem.isLogout) {
                        onLogout()
                        return
                      }
                        history.push(childItem.url_redirect);
                    }}
                  >
                    <div className="menu-icon-popover">
                      <span className="icon">
                        {childItem?.icon && (
                          <childItem.icon
                            style={{
                              width: "25px",
                              height: "25px",
                              fill: `${
                                !childItem.backgroundApply
                                  ? "#6d6e6f"
                                  : "#ffffff"
                              }`,
                            }}
                          />
                        )}
                      </span>
                      {childItem.name}
                    </div>
                  </div>
                ) : (
                  <div className="menu-sub-item">
                    <div className="menu-icon-popover">
                      <span className="icon">
                        {childItem?.icon && (
                          <childItem.icon
                            style={{
                              width: "25px",
                              height: "25px",
                              fill: `${
                                !childItem.backgroundApply
                                  ? "#6d6e6f"
                                  : "#ffffff"
                              }`,
                            }}
                          />
                        )}
                      </span>
                      {childItem.name}
                    </div>
                    {props[`${childItem.bell_id}`] ? (
                      <div className="badge-menu-item">
                        {props[
                          `${childItem.bell_id}
                      `
                        ] > 100
                          ? "99+"
                          : props[`${childItem.bell_id}`]}
                      </div>
                    ) : null}
                  </div>
                )}
              </MenuItem>
            );
          })}
        </StyledMenu>
      ) : null}
    </div>
  );
}

export default connect(
  (state) => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    groupActive: state.system.groupActive,
    profile: state.system.profile,
    sidebar: state.system.sidebar,
    numberNotificationNotView: state.system.numberNotificationNotView,
    numberMessageNotView: state.system.numberMessageNotView,
  }),
  { actionVisibleDrawerMessage, openNoticeModal }
)(withRouter(PopoverMenu));
