import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useLocation, Link, withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {
  actionChangeNumNotificationNotView,
  actionVisibleDrawerMessage,
  getNumberMessageNotViewer,
  getNumberNotificationNotViewer,
  getProfileService,
  openNoticeModal,
  actionActiveGroup,
} from "../../actions/system/system";
import { Routes } from "../../constants/routes";
import { isEmpty } from "../../helpers/utils/isEmpty";
import { useSelector, useDispatch } from "react-redux";
// import { useTranslation } from 'react-i18next';
// import * as icons from '../../assets';
import AddUserModal from "views/DepartmentPage/Modals/AddUserModal";
import ModalCreateAccount from "components/CustomTable/Modal/create-account";
import ModalOptionCreateAccount from "components/CustomTable/Modal/optionCreateAccount";
import CreateAccountModal from "views/DepartmentPage/Modals/CreateAccount";
import ModalResultCreateAccount from "components/CustomTable/Modal/result-create-account";
import ModalContinueCreateAccount from "components/CustomTable/Modal/continue-create-account";
import ModalUplaodExcel from "components/CustomTable/Modal/uploadExcel";

import "./LeftBar.scss";
import { getNumberMessageNotView } from "actions/chat/threadChat";
import PopoverMenu from "./PopoverMenu";
import { TOKEN } from "constants/constants";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UpdateIcon from "@mui/icons-material/Update";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import backgroundmenu from "assets/home_baner_right1.png";
import GroupAccountModal from "components/GroupAccountModal/GroupAccountModal";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
      // padding: "8px 0 !important",
    },
    ".MuiListItem-button": {
      "&:hover": {
        background: "#f2f5fa",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

const child_menu_top = [
  {
    name: "Đổi nhóm hoạt động",
    need_bell: true,
    bell_id: "numberNotificationNotView",
    path_search_more: false,
    path_search: "/setting-group/info",
    url_redirect: "/setting-group/info",
    isSettingGroup: true,
    icon: UpdateIcon,
  },
  {
    name: "Thành viên nhóm",
    bell_id: "numberMessageNotView",
    need_bell: true,
    icon: GroupOutlinedIcon,
    path_search_more: false,
    path_search: "/users",
    url_redirect: "/users",
  },
  {
    name: "Cài đặt nhóm",
    need_bell: true,
    icon: SettingsOutlinedIcon,
    path_search: "/setting-group/info",
    path_search_more: false,
    url_redirect: "/setting-group/info",
  },
  {
    name: `Mời đồng nghiệp ${"<br/>"}tham gia nhóm`,
    need_bell: true,
    path_search: "/setting-group/create-order",
    path_search_more: false,
    background: backgroundmenu,
    url_redirect: "/setting-group/create-order",
    isBackground: true,
    isCreateModal: true,
  },
];

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
  detailProfile,
  sidebar,
  numberMessageNotView,
  ...props
}) => {
  const { t, i18n } = useTranslation();
  const pathname = history.location.pathname;
  // const { group_active } = profile;
  const bgColor = colors.find((item) => item.selected === true);
  const [numberMessageNotViewState, setNumberMessageNotView] =
    React.useState(numberMessageNotView);
  const [profileState, setProfile] = React.useState(profile);
  const [detailProfileState, setDetailProfile] = React.useState(groupActive);
  React.useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile]);
  React.useEffect(() => {
    setNumberMessageNotView(numberMessageNotView);
  }, [numberMessageNotView]);
  React.useEffect(() => {
    // console.log(detailProfile);
    // console.log(detailProfileState);
    setDetailProfile(groupActive);
  }, [groupActive]);

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
  const handleFetchProfile = async (isNotice) => {
    try {
      const { data } = await getProfileService();
      if (data.data) {
        props.actionGetProfile(data.data);
        i18n.changeLanguage((data.data && data.data.language) || "vi");
        props.actionActiveGroup(data.data.group_active);
        if (
          data.data.group_active &&
          data.data.group_active.type === "Free" &&
          !isNotice
        ) {
          openNoticeModal("ACCOUNT_FREE");
        }
      }
    } catch (err) {}
  };
  React.useEffect(() => {
    const hasToken = localStorage.getItem(TOKEN);
    if (hasToken && (!profile || !profile.id)) {
      handleFetchNumNotificationNotView();
      handleFetchNumMessageNotView();
      handleFetchProfile();
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
  const findurlDirect = (item) => {
    const findServer = profile?.group_active?.modules?.find(
      (group) => group.name === item.name
    );
    let urlDirect = "";
    if (findServer) {
      urlDirect = findServer.url_redirect;
    } else {
      urlDirect = item.url_redirect;
    }
    return urlDirect;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickMenu = (childItem) => {
    if (childItem.isSettingGroup) {
      setVisibleGroupAccountModal(true);
      handleClose();
      return;
    }
    if (childItem.isCreateModal) {
      setOpenAddUserModal(true);
      handleClose();
      return;
    }
    history.push(childItem.url_redirect);
  };
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname !== currentRoute) {
      setAnchorEl(null);
      setRoute(location.pathname);
    }
  }, [location.pathname]);

  const [currentRoute, setRoute] = React.useState(location.pathname);
  console.log(numberMessageNotViewState);
  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAddUSerModal, setOpenAddUserModal] = React.useState(false);
  const [openContinueCreateAccount, setOpenContinueCreateAccount] =
    React.useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] =
    React.useState(false);
  const [result, setResult] = React.useState(null);
  const [openResultCreateAccount, setOpenResultCreateAccount] =
    React.useState(false);
  const [fileExcel, setFileExcel] = React.useState("");
  const [openUploadExcel, setOpenUploadExcel] = React.useState(false);
  const handlesetFileExcel = (file) => {
    setFileExcel(file);
  };
  const [visibleGroupAccountModal, setVisibleGroupAccountModal] =
    useState(false);
  return (
    <>
      {visibleGroupAccountModal && (
        <GroupAccountModal
          open={visibleGroupAccountModal}
          setOpen={(val) => setVisibleGroupAccountModal(val || false)}
          props
        />
      )}
      <CreateAccountModal
        open={openCreateAccountModal}
        setOpen={setOpenCreateAccountModal}
      />
      <ModalCreateAccount
        setOpenAddMember={setOpenAddUserModal}
        openAddMember={openAddUSerModal}
        setOpen={setOpen}
        setOpenCreateAccount={setOpenCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
      <AddUserModal setOpen={setOpen} open={open} />
      <ModalOptionCreateAccount
        openCreateAccount={openCreateAccount}
        setOpenCreateAccount={setOpenCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
      <ModalContinueCreateAccount
        fileExcel={fileExcel}
        setResult={setResult}
        setOpenResultCreateAccount={setOpenResultCreateAccount}
        openContinueCreateAccount={openContinueCreateAccount}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
        setOpenUploadExcel={setOpenUploadExcel}
      />
      <ModalResultCreateAccount
        result={result}
        openResultCreateAccount={openResultCreateAccount}
        setOpenResultCreateAccount={setOpenResultCreateAccount}
      />
      <ModalUplaodExcel
        handlesetFileExcel={handlesetFileExcel}
        openUploadExcel={openUploadExcel}
        setOpenUploadExcel={setOpenUploadExcel}
        setOpenContinueCreateAccount={setOpenContinueCreateAccount}
      />
      <div
        className={`left-bar-container`}
        style={{
          background: bgColor.color,
        }}
      >
        <div>
          <div
            className="logo menu-item menu-top-avatar-item"
            // onClick={() => setVisibleGroupModal(true)}
            onClick={handleClick}
            variant="logo-avatar"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="menu-icon">{logo && <img src={logo} />}</div>
            <div className="logo-name">
              <p className="title">{detailProfileState.name}</p>
              <p className="id">
                ID: {detailProfileState.code} <ArrowRightIcon />
              </p>
            </div>
          </div>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={openAnchor}
            onClose={handleClose}
          >
            {child_menu_top.map((childItem, index) => {
              return (
                <MenuItem
                  key={`${index}${childItem.name}`}
                  disableRipple
                  onClick={() => onClickMenu(childItem)}
                  className={`${
                    childItem.isBackground ? "background-boolean" : ""
                  }`}
                >
                  <div className="menu-icon-avatar--popover">
                    <span className="icon">
                      {childItem?.icon && (
                        <childItem.icon
                          style={{
                            width: "25px",
                            height: "25px",
                            fill: "#6d6e6f",
                          }}
                        />
                      )}
                      {/* {childItem.isBackground && (
                      <img src={childItem.isBackground} />
                    )} */}
                    </span>
                    {childItem.isBackground ? (
                      <span
                        className="background-apply-text"
                        style={{ padding: 0, margin: 0 }}
                        dangerouslySetInnerHTML={{ __html: childItem.name }}
                      >
                        {/* {childItem.name} */}
                      </span>
                    ) : (
                      childItem.name
                    )}
                  </div>
                </MenuItem>
              );
            })}
          </StyledMenu>
          {menuList.map((item, index) => {
            return item.need_bell ? (
              <Link
                key={index}
                className={`menu-item ${item.isSelected ? "actived" : ""}`}
                to={item.url_redirect}
              >
                <Badge
                  badgeContent={numberMessageNotViewState > 0 ? "" : null}
                  color="error"
                  className={`menu-badge-leftbar ${
                    numberMessageNotViewState <= 0 ? "none-view" : ""
                  }`}
                >
                  <div className="menu-icon menu-icon-navbar">
                    {item.icon && <img src={item.icon.default} />}
                  </div>
                </Badge>
                <p>{t(item.name)}</p>
              </Link>
            ) : item.isCheckServer ? (
              <Link
                key={index}
                className={`menu-item ${item.isSelected ? "actived" : ""}`}
                to={findurlDirect(item)}
              >
                <div className="menu-icon menu-icon-navbar">
                  {item.icon && <img src={item.icon.default} />}
                </div>
                <p>{t(item.name)}</p>
              </Link>
            ) : (
              <Link
                key={index}
                className={`menu-item ${item.isSelected ? "actived" : ""}`}
                to={item.url_redirect}
              >
                <div className="menu-icon menu-icon-navbar">
                  {item.icon && <img src={item.icon.default} />}
                </div>
                <p>{t(item.name)}</p>
              </Link>
            );
          })}
        </div>

        <div>
          {bottomList.map((item, index) => {
            return <PopoverMenu key={index} {...item} profile={profileState} />;
          })}
        </div>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer,
    groupActive: state.system.groupActive,
    profile: state.system.profile,
    sidebar: state.system.sidebar,
    detailProfile: state.setting.groupDetail,
    newMessage: state.taskDetail.listDetailTask.newMessage,
    numberMessageNotView: state.system.numberMessageNotView,
  }),
  { actionVisibleDrawerMessage, openNoticeModal, actionActiveGroup }
)(withRouter(LeftBar));
