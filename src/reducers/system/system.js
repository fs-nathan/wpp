import * as actionTypes from "../../constants/actions/system/system";
import {
  icon_home,
  icon_home_sl,
  icon_cloud,
  icon_cloud_sl,
  icon_messenger,
  icon_messenger_sl,
  icon_work,
  icon_work_sl,
  icon_star,
  icon_star_sl,
  icon_search,
  icon_search_sl,
  icon_noti,
  icon_noti_sl,
} from "constants/icon";
export const initialState = {
  typeDrawer: "",
  anchorDrawer: "right",
  optionsDrawer: {},
  visibleNoticeModal: false,
  isDocumentDetail: false,
  documentFile: null,
  breadCrumbs: [],
  profile: {},
  notification: [],
  toast: { type: null, message: "" },
  numberNotificationNotView: 0,
  numberMessageNotView: 0,
  groupActive: {},
  exportPdfDrawerVisible: false,
  ganttConfig: {
    state: false,
    type: "",
  },
  visibleSubtaskDrawer: false,
  detailSubTaskDrawer: {
    id: "",
    name: "",
  },
  visibleOfferDetail: {
    visible: false,
    offer_id: null,
  },
  visibleRemindDetail: {
    visible: false,
    remind_id: null,
  },
  sidebar: [
    {
      name: "Trang Chủ",
      path_search: "/home",
      path_search_more: false,
      url_icon: icon_home,
      url_icon_selected: icon_home_sl,
      url_redirect: "/home",
    },
    {
      name: "Làm việc",
      path_search: "/projects",
      path_search_more: ["/workplace"],
      url_icon: icon_work,
      url_icon_selected: icon_work_sl,
      url_redirect: "/workplace",
    },
    {
      name: "Lưu trữ",
      path_search: "/document",
      path_search_more: false,
      url_icon: icon_cloud,
      url_icon_selected: icon_cloud_sl,
      url_redirect: "/document/recent",
    },
    {
      name: "Tin nhắn",
      need_bell: true,
      path_search: "/chats",
      path_search_more: false,
      url_icon: icon_messenger,
      url_icon_selected: icon_messenger_sl,
      url_redirect: "/chats",
    },
    {
      name: "Đánh dấu",
      need_bell: true,
      isBottom: true,
      // path_search: "/chats",
      path_search_more: false,
      url_icon: icon_star,
      url_icon_selected: icon_star_sl,
      // url_redirect: "/chats",
    },
    {
      name: "Tìm kiếm",
      need_bell: true,
      isBottom: true,
      // path_search: "/chats",
      path_search_more: false,
      url_icon: icon_search,
      url_icon_selected: icon_search_sl,
      url_redirect: "/chats",
    },
    {
      name: "Thông báo",
      need_bell: true,
      isBottom: true,
      // path_search: "/chats",
      path_search_more: false,
      url_icon: icon_noti,
      url_icon_selected: icon_noti_sl,
      // url_redirect: "/chats",
      child_menu: [
        {
          name: "Thảo luận",
          need_bell: true,
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
        {
          name: "Thông báo nhóm",
          need_bell: true,
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
        {
          name: "Thông báo hệ thống",
          need_bell: true,
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
      ],
    },
    {
      name: "Thông tin cá nhân",
      need_bell: true,
      isBottom: true,
      component: true,
      path_search_more: false,
      url_icon: icon_noti,
      url_icon_selected: icon_noti_sl,
      child_menu: [
        {
          name: "Tài khoản",
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
        {
          name: "Ngôn Ngữ",
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
        {
          name: "Đăng xuất",
          need_bell: true,
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
        {
          name: "Nầng cấp tài khoản",
          need_bell: true,
          path_search: "/chats",
          path_search_more: false,
          url_icon: icon_noti,
          url_icon_selected: icon_messenger_sl,
          url_redirect: "/chats",
        },
      ],
    },
  ],
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DRAWER:
      return {
        ...state,
        typeDrawer: action.payload.type,
        anchorDrawer: action.payload.anchor,
        optionsDrawer: action.payload.options,
      };
    case actionTypes.CHANGE_NOTICE_MODAL:
      return {
        ...state,
        visibleNoticeModal: action.payload.visible,
        visibleNoticeReason: action.payload.data,
      };
    case actionTypes.GROUP_ACTIVE:
      localStorage.setItem(actionTypes.COLOR_ACTIVE, action.payload.color);
      return { ...state, groupActive: action.payload };
    case actionTypes.CHANGE_DOCUMENT_DETAIL:
      return {
        ...state,
        isDocumentDetail: action.payload.isOpen,
        documentFile: action.payload.item,
      };
    case actionTypes.CHANGE_DOCUMENT_BREAD_CRUMBS:
      return { ...state, breadCrumbs: action.payload };
    case actionTypes.GET_PROFILE:
      return { ...state, profile: action.payload };
    case actionTypes.GET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case actionTypes.ACTION_TOAST:
      return { ...state, toast: action.payload };
    case actionTypes.CHANGE_NUM_NOTIFICATION_NOT_VIEW:
      return { ...state, numberNotificationNotView: action.payload };
    case actionTypes.CHANGE_NUM_MESSAGE_NOT_VIEW:
      return { ...state, numberMessageNotView: action.payload };
    case actionTypes.CHANGE_VISIBLE_COMMON_CONFIG:
      return {
        ...state,
        ganttConfig: action.payload,
        visibleSubtaskDrawer: false,
        exportPdfDrawerVisible: false,
      };
    case actionTypes.CHANGE_VISIBLE_EXPORT_PDF_DRAWER:
      return {
        ...state,
        visibleSubtaskDrawer: false,
        exportPdfDrawerVisible: action.payload,
        ganttConfig: {
          ...state.ganttConfig,
          state: false,
        },
      };
    case actionTypes.CHANGE_VISIBLE_SUBTASK_DRAWER:
      return {
        ...state,
        visibleSubtaskDrawer: action.payload,
        exportPdfDrawerVisible: false,
        ganttConfig: {
          ...state.ganttConfig,
          state: false,
        },
      };
    case actionTypes.CHANGE_DETAIL_SUBTASK_DRAWER:
      return { ...state, detailSubTaskDrawer: action.payload };
    case actionTypes.CHANGE_VISIBLE_OFFER_DETAIL_MODAL:
      return { ...state, visibleOfferDetail: action.payload };
    case actionTypes.CHANGE_VISIBLE_REMIND_DETAIL_MODAL:
      return { ...state, visibleRemindDetail: action.payload };
    case actionTypes.SET_NUMBER_DISCUSTION_NOT_VIEW:
      const numberDiscustonNotView =
        state.numberMessageNotView + action.payload.discustion_change;
      return {
        ...state,
        numberMessageNotView:
          numberDiscustonNotView > 0 ? numberDiscustonNotView : 0,
      };
    default:
      return state;
  }
};

export default system;
