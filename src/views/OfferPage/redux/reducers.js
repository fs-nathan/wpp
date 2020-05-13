import { ADD_MEMBER_HANDLE_SUCCESS, ADD_MEMBER_MONITOR_SUCCESS, CREATE_GROUP_OFFER, CREATE_GROUP_OFFER_ERROR, CREATE_GROUP_OFFER_SUCCESS, DELETE_DOCUMENT_OFFER_ERROR, DELETE_DOCUMENT_OFFER_SUCCESS, DELETE_GROUP_OFFER, DELETE_GROUP_OFFER_ERROR, DELETE_GROUP_OFFER_SUCCESS, DELETE_MEMBER_HANDLE_SUCCESS, DELETE_MEMBER_MONITOR_SUCCESS, DETAIL_OFFER, ENQUEUE_SNACKBAR, HANDLE_OFFER_OFFERPAGE_SUCCESS, LOAD_DETAIL_OFFER_SUCCESS, LOAD_OFFER_BY_DEPARTMENT_ID_SUCCESS, LOAD_OFFER_BY_GROUP_ID_SUCCESS, LOAD_OFFER_BY_PROJECT_ID_SUCCESS, LOAD_SUMMARY_BY_GROUP_SUCCESS, LOAD_SUMMARY_BY_PROJECT_SUCCESS, LOAD_SUMMARY_OVERVIEW_SUCCESS, LOAD_TASK_RECENTLY_SUCCESS, NOTIFICATIONS, OFFER_BY_DEPARTMENT, OFFER_BY_GROUP, OFFER_BY_PROJECT, REMOVE_SNACKBAR, SUMMARY_BY_GROUP, SUMMARY_OVERVIEW, SUMMARY_PROJECT, TASK_OFFER_BY_DEPARTMENT, TASK_OVERVIEW_RECENT, TASK_RECENTLY, UPDATE_GROUP_OFFER_OFFERPAGE_ERROR, UPDATE_GROUP_OFFER_OFFERPAGE_SUCCESS, UPLOAD_DOCUMENT_OFFER_SUCCESS } from "./types";

export const initialState = {
  [TASK_OVERVIEW_RECENT]: {
    state: false,
    summary: { waiting: 5, doing: 1, complete: 0, expired: 6, stop: 1 },
    updated: 0,
    tasks: []
  },
  [TASK_RECENTLY]: {  /// Các task route recently
    offers: [],
    state: false,
    statistic_status: {
      accepted: 0,
      accepted_rate: 0,
      approving: 0,
      approving_rate: 0,
      rejected: 0,
      rejected_rate: 0,
      waiting: 0,
      waiting_rate: 0
    },
    error: null
  },
  [SUMMARY_BY_GROUP]: { // List cột trái route bygroup
    offers_group: [],
    state: false,
  }
  ,
  [TASK_OFFER_BY_DEPARTMENT]: { /// List cột trái route department
    offers_room: [],
    state: false,
    offers: []
  },
  // Tất cả offer các tab đề xuất theo nhóm, dự án, bộ phận nằm ở state này
  [OFFER_BY_GROUP]: { // Danh mục task trong bảng table route order by group
    state: false,
    offers: [],
    statistic_status: {
      accepted: 0,
      accepted_rate: 0,
      approving: 0,
      approving_rate: 0,
      rejected: 0,
      rejected_rate: 0,
      waiting: 0,
      waiting_rate: 0
    }
  },
  [OFFER_BY_DEPARTMENT]: { // Danh mục task trong bảng table route department
    state: false,
    offers: [],
    statistic_status: {
      accepted: 0,
      accepted_rate: 0,
      approving: 0,
      approving_rate: 0,
      rejected: 0,
      rejected_rate: 0,
      waiting: 0,
      waiting_rate: 0
    }
  },
  [SUMMARY_OVERVIEW]: {   /// Biểu đồ bảng overview
    state: false,
    my_offers: [

    ],
    status_offers: [],
    priority_offers: [],
    group_offers: [],
  },
  [DETAIL_OFFER]: {
    offer: {
      members_monitor: [],
      members_can_approve: [],
      documents: []
    }
  },
  [SUMMARY_PROJECT]: {
    projects: []
  },
  [NOTIFICATIONS]: [],
  [OFFER_BY_PROJECT]: {
    state: false,
    offers: [],
    statistic_status: {
      accepted: 0,
      accepted_rate: 0,
      approving: 0,
      approving_rate: 0,
      rejected: 0,
      rejected_rate: 0,
      waiting: 0,
      waiting_rate: 0
    }
  },
};
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASK_RECENTLY_SUCCESS:
      return { ...state, [TASK_RECENTLY]: { ...action.payload } };
    case LOAD_SUMMARY_BY_GROUP_SUCCESS:
      return { ...state, [SUMMARY_BY_GROUP]: { ...action.payload } };
    case CREATE_GROUP_OFFER_SUCCESS:
      return { ...state, [SUMMARY_BY_GROUP]: { offers_group: [...state[SUMMARY_BY_GROUP].offers_group, { ...action.payload.offer_group, offer_waiting: 0 }] } };
    case CREATE_GROUP_OFFER_ERROR:
      return { ...state, [CREATE_GROUP_OFFER]: { error: true, message: action.payload } };
    case LOAD_OFFER_BY_GROUP_ID_SUCCESS:
      return { ...state, [OFFER_BY_GROUP]: { ...action.payload } };
    case TASK_OFFER_BY_DEPARTMENT:
      return { ...state, [TASK_OFFER_BY_DEPARTMENT]: { ...action.payload } }
    case LOAD_OFFER_BY_DEPARTMENT_ID_SUCCESS:
      return { ...state, [OFFER_BY_DEPARTMENT]: { ...action.payload } }
    case LOAD_SUMMARY_OVERVIEW_SUCCESS:
      return { ...state, [SUMMARY_OVERVIEW]: { ...action.payload } }
    case DELETE_GROUP_OFFER_SUCCESS:
      return { ...state, [SUMMARY_BY_GROUP]: { offers_group: [...state[SUMMARY_BY_GROUP].offers_group.filter(x => x.id !== action.payload)] } }
    case DELETE_GROUP_OFFER_ERROR:
      return { ...state, [DELETE_GROUP_OFFER]: { error: true, message: action.payload } }
    case UPDATE_GROUP_OFFER_OFFERPAGE_SUCCESS:
      const newArr = state[SUMMARY_BY_GROUP].offers_group
      newArr.forEach(current => {
        if (current.id === action.payload.offer_group.id) {
          current.name = action.payload.offer_group.name
        }
      })
      return { ...state, [SUMMARY_BY_GROUP]: { offers_group: newArr } }
    case UPDATE_GROUP_OFFER_OFFERPAGE_ERROR:
      return { ...state }
    case LOAD_DETAIL_OFFER_SUCCESS:
      return { ...state, [DETAIL_OFFER]: { ...action.payload } }
    case UPLOAD_DOCUMENT_OFFER_SUCCESS:
      return { ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, documents: [...state[DETAIL_OFFER].offer.documents, ...action.payload.documents] } } }
    case LOAD_SUMMARY_BY_PROJECT_SUCCESS:
      return { ...state, [SUMMARY_PROJECT]: { ...action.payload } }
    case DELETE_DOCUMENT_OFFER_SUCCESS:
      return { ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, documents: [...state[DETAIL_OFFER].offer.documents.filter(document => document.id !== action.payload.file_id)] } } }
    case DELETE_DOCUMENT_OFFER_ERROR:
      return { ...state, }
    case LOAD_OFFER_BY_PROJECT_ID_SUCCESS:
      return { ...state, [OFFER_BY_PROJECT]: { ...action.payload } }
    case HANDLE_OFFER_OFFERPAGE_SUCCESS:
      return { ...state }
    case ADD_MEMBER_HANDLE_SUCCESS:
      return {
        ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, members_can_approve: [...state[DETAIL_OFFER].offer.members_can_approve, ...action.payload.members] } }
      }
    case DELETE_MEMBER_HANDLE_SUCCESS:
      return {
        ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, members_can_approve: [...state[DETAIL_OFFER].offer.members_can_approve.filter(x => x.id !== action.payload)] } }
      }
    case ADD_MEMBER_MONITOR_SUCCESS:
      return {
        ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, members_monitor: [...state[DETAIL_OFFER].offer.members_monitor, ...action.payload.members] } }
      }
    case DELETE_MEMBER_MONITOR_SUCCESS:
      return {
        ...state, [DETAIL_OFFER]: { offer: { ...state[DETAIL_OFFER].offer, members_monitor: [...state[DETAIL_OFFER].offer.members_monitor.filter(x => x.id !== action.payload)] } }
      }
    case ENQUEUE_SNACKBAR:
      return { ...state, [NOTIFICATIONS]: [...state[NOTIFICATIONS], { key: new Date().getTime() * Math.random(), ...action.payload }] }
    case REMOVE_SNACKBAR:
      return { ...state, [NOTIFICATIONS]: [...state[NOTIFICATIONS].filter(x => x.key !== action.key)] }
    default:
      return state;
  }
}

export default taskReducer;
