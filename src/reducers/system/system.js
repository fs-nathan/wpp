import * as actionTypes from '../../constants/actions/system/system';

export const initialState = {
  typeDrawer: '',
  anchorDrawer: 'right',
  visibleNoticeModal: false,
  isDocumentDetail: false,
  documentFile: null,
  breadCrumbs: [],
  profile: {},
  notification: [],
  toast: { type: null, message: '' },
  numberNotificationNotView: 0,
  numberMessageNotView: 0,
  groupActive: {},
  exportPdfDrawerVisible: false,
  ganttConfig: {
    state: false,
    type: ''
  },
  visibleSubtaskDrawer: false,
  detailSubTaskDrawer: {
    id: '',
    name: ''
  },
  visibleOfferDetail: {
    visible: false,
    offer_id: null
  }
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DRAWER:
      return {
        ...state,
        typeDrawer: action.payload.type,
        anchorDrawer: action.payload.anchor
      };
    case actionTypes.CHANGE_NOTICE_MODAL:
      return { ...state, visibleNoticeModal: action.payload.visible, visibleNoticeReason: action.payload.data };
    case actionTypes.GROUP_ACTIVE:
      localStorage.setItem(actionTypes.COLOR_ACTIVE, action.payload.color);
      return { ...state, groupActive: action.payload };
    case actionTypes.CHANGE_DOCUMENT_DETAIL:
      return {
        ...state,
        isDocumentDetail: action.payload.isOpen,
        documentFile: action.payload.item
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
      return { ...state, ganttConfig: action.payload, visibleSubtaskDrawer: false, exportPdfDrawerVisible: false };
    case actionTypes.CHANGE_VISIBLE_EXPORT_PDF_DRAWER:
      return {
        ...state, visibleSubtaskDrawer: false, exportPdfDrawerVisible: action.payload, ganttConfig: {
          ...state.ganttConfig,
          state: false
        }
      };
    case actionTypes.CHANGE_VISIBLE_SUBTASK_DRAWER:
      return {
        ...state, visibleSubtaskDrawer: action.payload, exportPdfDrawerVisible: false, ganttConfig: {
          ...state.ganttConfig,
          state: false
        }
      };
    case actionTypes.CHANGE_DETAIL_SUBTASK_DRAWER:
      return { ...state, detailSubTaskDrawer: action.payload };
    case actionTypes.CHANGE_VISIBLE_OFFER_DETAIL_MODAL:
      return { ...state, visibleOfferDetail: action.payload }
    default:
      return state;
  }
};

export default system;
