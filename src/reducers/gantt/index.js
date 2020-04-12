import * as actionTypes from '../../constants/actions/gantt';

export const initialState = {
  showHeader: true,
  showFullChart: false,
  rowHover: -1
};

const gantt = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GANTT_SHOW_FULL_CHART:
      return { ...state, showFullChart: action.payload };
    case actionTypes.GANTT_SHOW_HEADER:
      return { ...state, showHeader: action.payload };
    case actionTypes.CHANGE_ROW_HOVER:
      return { ...state, rowHover: action.payload };
    default:
      return state;
  }
};

export default gantt;
