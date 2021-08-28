import {
  appendChat,
  appendViewedChat,
  getDataPinOnTaskChat,
  getViewedChatSuccess,
  updateChatState,
} from "actions/chat/chat";
import {
  getListTaskDetail,
  getTaskDetailTabPartSuccess,
  updateProjectChat,
} from "actions/taskDetail/taskDetailActions";
import {
  JOIN_CHAT_EVENT,
  JOIN_PROJECT_EVENT,
} from "constants/actions/chat/chat";
import { differenceInDays } from "date-fns";
import SwitchAccount from "favicon/SwitchAccount";
import useNotificationFavicon from "favicon/useNotificationFavicon";
import { CHAT_TYPE, findTask } from "helpers/jobDetail/arrayHelper";
import findIndex from "lodash/findIndex";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import { postModule } from "views/HomePage/redux/post";
import useWebpush from "webpush/useWebpush";
import {
  actioGetSettingDate,
  actionFetchGroupDetail,
  actionFetchListColor,
} from "../actions/setting/setting";
import {
  actionChangeNumMessageNotView,
  actionChangeNumNotificationNotView,
  actionToast,
  getNumberMessageNotViewer,
  getNumberNotificationNotViewer,
  setNumberDiscustonNotView,
} from "../actions/system/system";
import { loadDetailOffer } from "views/OfferPage/redux/actions";
import { avatar_default_120 } from "../assets";
import DocumentDetail from "../components/DocumentDetail/DocumentDetail";
import DrawerComponent from "../components/Drawer/Drawer";
import GroupModal from "../components/NoticeModal/GroupModal";
import NoticeModal from "../components/NoticeModal/NoticeModal";
import SnackbarComponent from "../components/Snackbars";
import configURL from "../constants/apiConstant";
import { MESS_NUMBER, NOTI_NUMBER, TOKEN } from "../constants/constants";
import { Routes } from "../constants/routes";
import routes from "../routes";
import LeftBar from "../views/LeftBar";
import TopBar from "../views/TopBar";
import { get } from "lodash";
import DetailOfferModal from "../views/OfferPage/views/DetailOffer/DetailOfferModal";
import ViewDetailRemind from "../views/CalendarPage/views/Modals/ViewDetailRemind";
import { getRemindDetail } from "../actions/calendar/alarmCalendar/getRemindDetail";
import {
  GET_REMIND_DETAIL_FAIL,
  CustomEventListener,
  CustomEventDispose,
} from "constants/events";
import { setNumberMessageNotView } from "actions/chat/threadChat";
import * as images from "../assets";

const Container = styled.div`
  --color-primary: ${(props) => props.color};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 55px 1fr;
  grid-template-columns: 140px minmax(0, 1fr);
  overflow-y: hidden;

  grid-template-areas:
    "logo top"
    "left main";
  &.view-full-page {
    display: initial;
  }
  .lefbar-collapse {
    width: 70px;
    transition: all 0.4s ease;
    min-height: 100vh;
    z-index: 1000;
  }
  .lefbar {
    width: 140px;
    transition: all 0.4s ease;
    min-height: 100vh;
    z-index: 1000;
  }

  &.menu-collapse {
    grid-template-columns: 70px minmax(0, 1fr);
  }
`;

const LogoBox = styled.div`
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: baseline;
  background: #e5e5e5;
  height: 70px;
  & > img {
    height: 90%;
  }
`;

const ContentBox = styled.div`
  grid-area: main;
  overflow: hidden;
  /* position: fixed;
  top: 55px;
  left: 70px;
  height: calc(100% - 55px);
  width: calc(100% - 70px); */
`;

const Image = styled.img`
  height: 40px !important;
  width: 40px;
  border: 1px solid #ffffff8a;
  border-radius: 50%;
  padding: 3px;
`;

function getTaskByChat(data, taskDetails) {
  const {
    total_subtask,
    total_subtask_complete,
    total_offer,
    total_remind,
    total_location,
    total_file,
    total_link,
    total_img,
    total_command,
  } = taskDetails;
  switch (data.type) {
    case CHAT_TYPE.CANCEL_PIN_TASK:
      return { ...taskDetails, is_ghim: false };
    case CHAT_TYPE.CANCEL_STOP_TASK:
      return { ...taskDetails, state_code: 1 };
    case CHAT_TYPE.COMPLETE_SUBTASK:
      return {
        ...taskDetails,
        total_subtask_complete: total_subtask_complete + 1,
      };
    case CHAT_TYPE.CREATE_COMMAND_DECIDED:
      return { ...taskDetails, total_command: total_command + 1 };
    case CHAT_TYPE.CREATE_NEW_SUB_TASK:
      return { ...taskDetails, total_subtask: total_subtask + 1 };
    case CHAT_TYPE.CREATE_OFFER:
      return { ...taskDetails, total_offer: total_offer + 1 };
    case CHAT_TYPE.CREATE_REMIND:
    case CHAT_TYPE.CREATE_REMIND_WITH_DURATION:
      return { ...taskDetails, total_remind: total_remind + 1 };
    case CHAT_TYPE.DELETE_COMMAND_DECIDED:
      return { ...taskDetails, total_command: total_command - 1 };
    case CHAT_TYPE.DELETE_OFFER:
      return { ...taskDetails, total_offer: total_offer - 1 };
    case CHAT_TYPE.DELETE_REMIND:
      return { ...taskDetails, total_remind: total_remind - 1 };
    case CHAT_TYPE.DELETE_SHARE_LOCATION:
      return { ...taskDetails, total_location: total_location - 1 };
    case CHAT_TYPE.DELETE_SUB_TASK:
      return { ...taskDetails, total_subtask: total_subtask - 1 };
    case CHAT_TYPE.EDIT_PRIORITY:
      return { ...taskDetails, priority_code: data.priority };
    case CHAT_TYPE.PIN_TASK:
      return { ...taskDetails, is_ghim: true };
    case CHAT_TYPE.SHARE_FILE:
    case CHAT_TYPE.FILE:
    case CHAT_TYPE.CHAT_FILE_FROM_GOOGLE_DRIVER:
    case CHAT_TYPE.CHAT_FORWARD_FILE:
      return { ...taskDetails, total_file: total_file + data.files.length };
    case CHAT_TYPE.SHARE_LOCATION:
      return { ...taskDetails, total_location: total_location + 1 };
    case CHAT_TYPE.STOP_TASK:
      return { ...taskDetails, state_code: 4 };
    case CHAT_TYPE.UPDATE_TASK_NAME:
      return {
        ...taskDetails,
        name: data.new_task_name,
        description: data.new_description,
      };
    case CHAT_TYPE.UPDATE_TYPE_ASSIGN_TASK:
      return { ...taskDetails, assign_code: data.type_assign_code };
    case CHAT_TYPE.TEXT:
      return { ...taskDetails, total_link: total_link + data.urls.length };
    case CHAT_TYPE.IMAGE:
      return { ...taskDetails, total_img: total_img + data.images.length };
    case CHAT_TYPE.UPDATE_COMPLETE:
      return { ...taskDetails, complete: data.complete };
    case CHAT_TYPE.UPDATE_DURATION: {
      const { start, end } = data.time_changes;
      if (start && end)
        return {
          ...taskDetails,
          duration_value: differenceInDays(
            new Date(end.new),
            new Date(start.new)
          ),
        };
      return null;
    }

    default:
      return null;
  }
}

let socket;
function MainLayout({
  location,
  colors,
  history,
  toast,
  actionToast,
  actionFetchGroupDetail,
  groupDetail,
  isDocumentDetail,
  appendChat,
  getTaskDetailTabPartSuccess,
  getDataPinOnTaskChat,
  updateChatState,
  appendViewedChat,
  updateProjectChat,
  taskDetails = {},
  profile = {},
  language = "vi",
  listDataNotRoom,
  listTaskDetail,
  projectId,
  getListTaskDetail,
  actionFetchListColor,
  actioGetSettingDate,
  actionChangeNumNotificationNotView,
  actionChangeNumMessageNotView,
  setNumberDiscustonNotView,
  visibleOfferDetailModal,
  loadDetailOffer,
  detailOffer,
  visibleRemindDetail,
  detailRemind,
  getRemindDetail,
  setNumberMessageNotView,
  t,
}) {
  const [visibleGroupModal, setVisibleGroupModal] = useState(false);
  const [openOfferDetail, setOpenOfferDetail] = useState(false);
  const [openRemindDetail, setOpenRemindDetail] = useState(false);
  const [collapse, setCollapse] = useState(true);
  function handleReactEmotion(data) {
    updateChatState(data.id, { data_emotion: data.emotions });
  }

  function handleDeleteChat(data) {
    updateChatState(data.id, { type: CHAT_TYPE.TEXT, is_deleted: true });
  }

  function handleViewChat(data) {
    console.log("handleViewChat", data);
    const { user_name, user_avatar, user_id } = data;
    // getViewedChatSuccess(data)
    if (user_id !== profile.id) {
      appendViewedChat({
        id: user_id,
        name: user_name,
        avatar: user_avatar,
      });
    }
  }

  useEffect(() => {
    // if (localStorage.getItem(TOKEN) && !isViewFullPage(location.pathname)) {
    //   actionFetchGroupDetail(true);
    //   actionFetchListColor();
    //   actioGetSettingDate();
    // }
    if (
      localStorage.getItem(TOKEN) &&
      profile &&
      profile.id &&
      !isViewFullPage(location.pathname)
    ) {
      actionFetchGroupDetail(true);
      actionFetchListColor();
      actioGetSettingDate();
      handleFetchNoti();
      const uri =
        `${configURL.SOCKET_URL}?token=` + localStorage.getItem(TOKEN);
      socket = io(uri, {});
      socket.on("WP_NEW_NOTIFICATION", (res) => handleNewNoti());
      socket.on("WP_PERMISSION_UPDATE", (res) => window.location.reload());
      socket.on("WP_CHANGE_GROUP_ACTIVE", (res) => window.location.reload());
      socket.on("WP_NEW_NOTIFICATION_MESSAGE_TASK", (res) =>
        handleNewMessage(res)
      );
      socket.on("WP_NEW_CHAT_EXPRESS_EMOTION_CHAT", handleReactEmotion);
      socket.on("WP_DELETE_CHAT_IN_TASK", handleDeleteChat);
      socket.on("WP_VIEW_CHAT_IN_TASK", handleViewChat);

      socket.on("WP_NEW_COMMENT_POST", postModule.actions.updatePostListItem);
      socket.on("WP_NEW_LIKE_LOVE_POST", postModule.actions.updatePostListItem);

      function joinChat({ detail }) {
        socket.emit("WP_JOIN_TASK", {
          task_id: detail,
        });
      }

      function joinProject({ detail }) {
        socket.emit("WP_JOIN_PROJECT", {
          project_id: detail,
        });
      }

      window.addEventListener(JOIN_CHAT_EVENT, joinChat);
      window.addEventListener(JOIN_PROJECT_EVENT, joinProject);
      return () => {
        window.removeEventListener(JOIN_CHAT_EVENT, joinChat);
        window.removeEventListener(JOIN_PROJECT_EVENT, joinProject);
        socket.close();
      };
    }
    // eslint-disable-next-line
  }, [profile && profile.id]);

  useEffect(() => {
    if (!socket || !profile.id || !taskDetails) return;
    function handleChatInProject(data) {
      console.log("handleChatInProject", data);
      const { user_create_id, task_id, content = {} } = data;
      const task =
        findTask(listTaskDetail, task_id) ||
        findIndex(listDataNotRoom, ({ id }) => id === task_id) !== -1;
      if (!task || data.type === CHAT_TYPE.UPDATE_GROUP_TASK) {
        getListTaskDetail(data.project_id);
      } else {
        if (data.type === CHAT_TYPE.UPDATE_TASK_NAME) {
          data.new_name = data.new_task_name;
        }
        // if (task_id !== taskDetails.id) {
        data.new_chat = user_create_id === profile.id ? 0 : 1;
        // }
        data.content = content[language];
        data.updated_time = t("LABEL_JUST_NOW");
        data.updatedAt = Date.now();
        updateProjectChat(data);
      }
    }

    socket.on("WP_NEW_CHAT_CREATED_IN_PROJECT", handleChatInProject);
    return () => {
      socket.off("WP_NEW_CHAT_CREATED_IN_PROJECT", handleChatInProject);
    };
    // eslint-disable-next-line
  }, [
    profile.id,
    language,
    taskDetails,
    listTaskDetail,
    listDataNotRoom,
    projectId,
  ]);

  useEffect(() => {
    if (!socket || !taskDetails) return;
    // console.log("listen chat");
    const handleNewChat = (data) => {
      console.log("handleNewChat", data, taskDetails.uuid);
      if (!data.uuid || (taskDetails && taskDetails.uuid !== data.uuid)) {
        const isHideSendStatus =
          data.user_create_avatar && data.user_create_avatar !== profile.avatar;
        appendChat({ data_chat: data }, undefined, isHideSendStatus);
      }
      const task = getTaskByChat(data, taskDetails);
      if (task) {
        getTaskDetailTabPartSuccess({ task });
      }
      // if (data.type === CHAT_TYPE.UPDATE_COMPLETE) {
      //   updateProjectChat({ complete: data.complete, task_id: taskDetails.id });
      // }
    };

    function pinOnTaskChat(data) {
      // console.log("pinOnTaskChat", data, taskDetails.id);
      if (data.task_id === taskDetails.id) {
        getDataPinOnTaskChat(data.task_id);
      }
    }
    socket.on("WP_NEW_CHAT_CREATED_IN_TASK", handleNewChat);
    socket.on("PIN_DATA_ON_CHAT", pinOnTaskChat);
    return () => {
      // console.log("close socket chat");
      socket.off("WP_NEW_CHAT_CREATED_IN_TASK", handleNewChat);
      socket.off("PIN_DATA_ON_CHAT", pinOnTaskChat);
    };
    // eslint-disable-next-line
  }, [taskDetails]);

  useEffect(() => {
    if (get(visibleOfferDetailModal, "visible", false)) {
      loadDetailOffer({ id: visibleOfferDetailModal.offer_id });
      setOpenOfferDetail(true);
    }
  }, [visibleOfferDetailModal]);

  useEffect(() => {
    if (get(visibleRemindDetail, "visible", false)) {
      getRemindDetail({ remind_id: visibleRemindDetail.remind_id });
      setOpenRemindDetail(true);
      const forceCloseModal = () => {
        setOpenRemindDetail(false);
      };
      CustomEventListener(GET_REMIND_DETAIL_FAIL, forceCloseModal);
      return () => {
        CustomEventDispose(GET_REMIND_DETAIL_FAIL, forceCloseModal);
      };
    }
  }, [visibleRemindDetail]);

  const handleFetchNoti = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      actionChangeNumNotificationNotView(data.number_notification);
      const res = await getNumberMessageNotViewer();
      actionChangeNumMessageNotView(res.data.number_chat);
    } catch (error) {}
  };
  const handleNewNoti = () => {
    actionChangeNumNotificationNotView(
      parseInt(localStorage.getItem(NOTI_NUMBER)) + 1
    );
  };
  const handleNewMessage = (res) => {
    console.log("xxx", res);
    if (res.belong_to_section === 1) {
      setNumberDiscustonNotView({ discustion_change: 1 });
    } else {
      setNumberMessageNotView({
        type: "Plus",
        message: 1,
      });
    }
  };

  const isViewFullPage = (route) => {
    return (
      route === Routes.REGISTER ||
      route === Routes.LOGIN ||
      route === Routes.CONFIRM_REGISTRATION ||
      route === Routes.FORGOT_PASSWORD ||
      route === Routes.RESET_PASSWORD
    );
  };

  function configRoute(routes) {
    if (routes.length === 0) return;
    const result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      );
    });
    return <Switch>{result}</Switch>;
  }

  if (!localStorage.getItem(TOKEN) && !isViewFullPage(location.pathname)) {
    history.push(Routes.LOGIN);
  }

  const bgColor = colors.find((item) => item.selected === true);
  useWebpush();
  useNotificationFavicon();
  useEffect(() => {
    document.body.style.setProperty("--color-primary", bgColor.color);
    // style={{ "--color-primary":  }}
  }, [bgColor]);
  return (
    <>
      <Container
        className={
          isViewFullPage(location.pathname)
            ? "view-full-page"
            : collapse
            ? "menu-collapse"
            : location.pathname
        }>
        {!isViewFullPage(location.pathname) && (
          <React.Fragment>
            <SwitchAccount />
            <LeftBar
              setVisibleGroupModal={setVisibleGroupModal}
              logo={groupDetail.logo}
            />

            <TopBar />
            <DrawerComponent />
            <NoticeModal />
            {toast.type && (
              <SnackbarComponent
                open={true}
                handleClose={() => actionToast(null, "")}
                vertical='bottom'
                horizontal='right'
                variant={toast.type}
                message={toast.message}
              />
            )}
            {isDocumentDetail && <DocumentDetail />}
            {visibleGroupModal && (
              <GroupModal
                visibleGroupModal={visibleGroupModal}
                onClose={() => setVisibleGroupModal(false)}
              />
            )}
          </React.Fragment>
        )}
        <ContentBox>{configRoute(routes)}</ContentBox>
      </Container>
      <DetailOfferModal
        open={openOfferDetail}
        setOpen={setOpenOfferDetail}
        loading={false}
        {...detailOffer}
      />
      <ViewDetailRemind
        open={openRemindDetail}
        setOpen={setOpenRemindDetail}
        remind={detailRemind.remind}
        groupRemind={{
          name: get(detailRemind.remind, "category_name", ""),
          color: get(detailRemind.remind, "category_color", "#000"),
        }}
        remindType={"PERSONAL"}
      />
    </>
  );
}

function MainLayoutWrapper({ ...rest }) {
  const { t, i18n } = useTranslation();
  return <MainLayout key={i18n.language} {...rest} t={t} />;
}

export default connect(
  (state) => ({
    projectId: state.taskDetail.commonTaskDetail.activeProjectId,
    listDataNotRoom: state.taskDetail.listDetailTask.listDataNotRoom,
    listTaskDetail: state.taskDetail.listDetailTask.listTaskDetail,
    taskDetails: state.taskDetail.detailTask.taskDetails,
    profile: state.system.profile,
    language: state.system.profile.language,
    colors: state.setting.colors,
    groupDetail: state.setting.groupDetail,
    isDocumentDetail: state.system.isDocumentDetail,
    numberNotificationNotView: state.system.numberNotificationNotView,
    toast: state.system.toast,
    visibleOfferDetailModal: state.system.visibleOfferDetail,
    visibleRemindDetail: state.system.visibleRemindDetail,
    detailOffer: state.offerPage["DETAIL_OFFER"].offer ?? [],
    detailRemind: state.calendar.remindDetail,
  }),
  {
    getListTaskDetail,
    updateProjectChat,
    appendChat,
    getTaskDetailTabPartSuccess,
    getDataPinOnTaskChat,
    updateChatState,
    appendViewedChat,
    getViewedChatSuccess,
    actionFetchGroupDetail,
    actionToast,
    actionFetchListColor,
    actioGetSettingDate,
    actionChangeNumNotificationNotView,
    actionChangeNumMessageNotView,
    loadDetailOffer,
    getRemindDetail,
    setNumberMessageNotView,
    setNumberDiscustonNotView,
  }
)(withRouter(MainLayoutWrapper));
