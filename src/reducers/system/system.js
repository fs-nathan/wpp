import * as actionTypes from '../../constants/actions/system/system';

export const initialState = {
  typeDrawer: '',
  anchorDrawer: 'right',
  visibleNoticeModal: true
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
    default:
      return state;
  }
};

export default system;