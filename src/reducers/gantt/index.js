import * as actionTypes from '../../constants/actions/gantt';

export const initialState = {
  showHeader: true,
  showFullChart: false,
  rowHover: -1,
  timelineColor: {
    total: "#e38100",
    group: "#e30f00",
    task: "#3ce305",
    duration: "#ab209d",
  },
  indexColumn: [0,1,2,3,4],
  visible: {
    table: {
      name: true,
      start_date: true,
      end_date: true,
      time: true,
      process: true,
    },
    gantt: {
      total: true,
      group: true,
      task: true,
      duration: true,
      date: true,
      name: true,
    }
  }
};

const gantt = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GANTT_SHOW_FULL_CHART:
      return { ...state, showFullChart: action.payload };
    case actionTypes.GANTT_SHOW_HEADER:
      return { ...state, showHeader: action.payload };
    case actionTypes.CHANGE_ROW_HOVER:
      return { ...state, rowHover: action.payload };
    case actionTypes.CHANGE_TIMELINE_COLOR:
      return { ...state, timelineColor: {
        ...state.timelineColor,
        [action.payload.type] : action.payload.color
      } };
    case actionTypes.CHANGE_COLUMN_INDEX:
      return { ...state, indexColumn: action.payload };
    case actionTypes.CHANGE_VISIBLE:
      return { ...state, visible: {
        ...state.visible,
        [action.payload.section]: {
          ...state.visible[action.payload.section],
          [action.payload.type]: action.payload.visible
        }
      } };
    default:
      return state;
  }
};

export default gantt;
