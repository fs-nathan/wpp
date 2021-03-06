import { cloneDeep } from 'lodash';
import { ADD_MEMBER_HANDLE_SUCCESS, ADD_MEMBER_MONITOR_SUCCESS, CREATE_GROUP_OFFER, CREATE_GROUP_OFFER_ERROR, CREATE_GROUP_OFFER_SUCCESS, CREATE_OFFER, CREATE_OFFER_SUCCESSFULLY, DELETE_DOCUMENT_OFFER_ERROR, DELETE_DOCUMENT_OFFER_SUCCESS, DELETE_GROUP_OFFER, DELETE_GROUP_OFFER_ERROR, DELETE_GROUP_OFFER_SUCCESS, DELETE_MEMBER_HANDLE_SUCCESS, DELETE_MEMBER_MONITOR_SUCCESS, DELETE_OFFER_SUCCESSFULLY, DETAIL_OFFER, ENQUEUE_SNACKBAR, HANDLE_OFFER_OFFERPAGE_SUCCESS, LIST_STATUS_HAVE_NEW_OFFER, LIST_STATUS_HAVE_NEW_OFFER_SUCCESS, LOAD_DETAIL_OFFER, LOAD_DETAIL_OFFER_SUCCESS, LOAD_OFFER_BY_DEPARTMENT_ID_SUCCESS, LOAD_OFFER_BY_GROUP_ID_SUCCESS, LOAD_OFFER_BY_PROJECT_ID_SUCCESS, LOAD_SUMMARY_BY_GROUP_SUCCESS, LOAD_SUMMARY_BY_PROJECT_SUCCESS, LOAD_SUMMARY_OVERVIEW_SUCCESS, LOAD_TASK_RECENTLY_SUCCESS, NOTIFICATIONS, OFFER_BY_DEPARTMENT, OFFER_BY_GROUP, OFFER_BY_PROJECT, OFFER_DETAIL_GET_COMMENT_LIST_SUCCESS, OFFER_DETAIL_POST_COMMENT_SUCCESS, OFFER_DETAIL_REMOVE_COMMENT_SUCCESS, OFFER_DETAIL_UPDATE_COMMENT_SUCCESS, OFFER_GET_MEMBER_TO_ADD, OFFER_GET_MEMBER_TO_ADD_SUCCESS, REMOVE_SNACKBAR, SUMMARY_BY_GROUP, SUMMARY_OVERVIEW, SUMMARY_PROJECT, TASK_OFFER_BY_DEPARTMENT, TASK_OVERVIEW_RECENT, TASK_RECENTLY, UPDATE_GROUP_OFFER_OFFERPAGE_ERROR, UPDATE_GROUP_OFFER_OFFERPAGE_SUCCESS, UPDATE_OFFER_APPROVAL_CONDITION_SUCCESS, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, UPLOAD_DOCUMENT_OFFER_SUCCESS } from './types';

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
    },
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
    },
    comments: [],
    loading: false,
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
  [CREATE_OFFER_SUCCESSFULLY]: {
    offer_group_id: null
  },
  [OFFER_GET_MEMBER_TO_ADD]: {
    members: []
  }
};
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASK_RECENTLY_SUCCESS:
      return { ...state, [TASK_RECENTLY]: { ...action.payload } };
    case LOAD_SUMMARY_BY_GROUP_SUCCESS:
      return { ...state, [SUMMARY_BY_GROUP]: { ...action.payload } };
    case CREATE_GROUP_OFFER_SUCCESS:
      return { ...state, [SUMMARY_BY_GROUP]: { offers_group: [{ ...action.payload.offer_group, offer_waiting: 0 }, ...state[SUMMARY_BY_GROUP].offers_group] } };
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
    case LOAD_DETAIL_OFFER:
      return {
        ...state,
        [DETAIL_OFFER]: {
          offer: {},
          comments: [],
          loading: true,
        },
      }
    case LOAD_DETAIL_OFFER_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...action.payload.offer,
          },
          loading: false,
        },
      }
    case UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            ...action.payload.data_offer,
          },
        }
      };
    case UPDATE_OFFER_APPROVAL_CONDITION_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            condition_accept: {
              ...action.payload.condition_accept,
            },
          },
        }
      };
    case OFFER_DETAIL_GET_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          comments: action.payload.comments,
        }
      };
    case OFFER_DETAIL_POST_COMMENT_SUCCESS: {
      const comments = cloneDeep(state[DETAIL_OFFER].comments);
      comments.unshift(action.payload.comment);

      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          comments,
        }
      };
    }
    case OFFER_DETAIL_UPDATE_COMMENT_SUCCESS: {
      const { id, content } = action.payload.comment;

      const comments = cloneDeep(state[DETAIL_OFFER].comments);
      const newCommentIdx = comments.findIndex(cmt => cmt.id === id);
      comments[newCommentIdx].content = content;

      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          comments,
        }
      };
    }
    case OFFER_DETAIL_REMOVE_COMMENT_SUCCESS: {
      const { id } = action.payload;

      const comments = cloneDeep(state[DETAIL_OFFER].comments);
      const commentToRemoveIdx = comments.findIndex(cmt => cmt.id === id);
      comments.splice(commentToRemoveIdx, 1);

      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          comments,
        }
      };
    }
    case CREATE_OFFER: {
      return {
        ...state,
        [CREATE_OFFER_SUCCESSFULLY]: {
          offer_group_id: null
        }
      }
    }
    case CREATE_OFFER_SUCCESSFULLY: {
      const { data } = action.payload;
      return {
        ...state,
        [CREATE_OFFER_SUCCESSFULLY]: {
          offer_group_id: data.get("offer_group_id")
        }
      };
    }
    case DELETE_OFFER_SUCCESSFULLY:
      const { deletedState, offerId } = action.payload;
      if (deletedState === true) {
        const { offers: recentOffers } = state[TASK_RECENTLY];
        const { offers: taskOffersByDepartment } = state[TASK_OFFER_BY_DEPARTMENT];
        const { offers: offersByGroup } = state[OFFER_BY_GROUP];
        const { offers: offersByDepartment } = state[OFFER_BY_DEPARTMENT];
        const { offers: offersByProject } = state[OFFER_BY_PROJECT];

        return {
          ...state,
          [TASK_RECENTLY]: {
            ...state[TASK_RECENTLY],
            offers: recentOffers.filter(offer => offer.id !== offerId)
          },
          [TASK_OFFER_BY_DEPARTMENT]: {
            ...state[TASK_OFFER_BY_DEPARTMENT],
            offers: taskOffersByDepartment.filter(offer => offer.id !== offerId)
          },
          [OFFER_BY_GROUP]: {
            ...state[OFFER_BY_GROUP],
            offers: offersByGroup.filter(offer => offer.id !== offerId)
          },
          [OFFER_BY_DEPARTMENT]: {
            ...state[OFFER_BY_DEPARTMENT],
            offers: offersByDepartment.filter(offer => offer.id !== offerId)
          },
          [OFFER_BY_PROJECT]: {
            ...state[OFFER_BY_PROJECT],
            offers: offersByProject.filter(offer => offer.id !== offerId)
          },
        }
      }
      break;
    case LIST_STATUS_HAVE_NEW_OFFER_SUCCESS: {
      return { ...state, [LIST_STATUS_HAVE_NEW_OFFER]: { haveNewOffers: action.payload.have_new_offer } }
    }
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
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            members_can_approve: [...state[DETAIL_OFFER].offer.members_can_approve, ...action.payload.members]
          }
        }
      }
    case DELETE_MEMBER_HANDLE_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            members_can_approve:
              [...state[DETAIL_OFFER].offer.members_can_approve.filter(x => x.id !== action.payload)]
          }
        }
      }
    case ADD_MEMBER_MONITOR_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            members_monitor: [...state[DETAIL_OFFER].offer.members_monitor, ...action.payload.members]
          }
        }
      }
    case DELETE_MEMBER_MONITOR_SUCCESS:
      return {
        ...state,
        [DETAIL_OFFER]: {
          ...state[DETAIL_OFFER],
          offer: {
            ...state[DETAIL_OFFER].offer,
            members_monitor: [...state[DETAIL_OFFER].offer.members_monitor.filter(x => x.id !== action.payload)]
          }
        }
      }
    case OFFER_GET_MEMBER_TO_ADD_SUCCESS:
      return {
        ...state,
        [OFFER_GET_MEMBER_TO_ADD]: {
          members: action.payload.users
        }
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
