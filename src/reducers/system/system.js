import * as actionTypes from '../../constants/actions/system/system';

export const initialState = {
  typeDrawer: '',
  anchorDrawer: 'right',
  visibleNoticeModal: true,
  isDocumentDetail: false,
  documentFile: null,
  breadCrumbs: [],
  profile: {},
  notification: []
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
      return { ...state, visibleNoticeModal: action.payload };
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
    default:
      return state;
  }
};

export default system;
