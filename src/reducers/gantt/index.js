import * as actionTypes from "../../constants/actions/gantt";

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
  scheduleDetailGantt: {},
  projectInfo: {
    id: "",
    name: "",
  },
  scrollGanttFlag: false,
  indexColumn: [0, 1, 2, 3, 4],
  visible: {
    table: {
      name: true,
      start_time: true,
      end_time: true,
      duration_actual: true,
      complete: true,
    },
    gantt: {
      total: true,
      group: true,
      task: true,
      duration: true,
      date: true,
      name: true,
      numberDuration: true,
      numberComplete: true,
      fromNowLayer: true,
    },
    label: {
      prior: true,
      status: true,
      member: true,
    },
  },
  previewContent: [
    "Nội dung 1",
    "Nội dung 2",
    "Nội dung 3",
    "Nội dung 4",
    "Nội dung 5",
    "Nội dung 6",
  ],
  renderFullDay: false,
  filterExportPdf: {
    start: null,
    end: null,
  },
  girdType: "DAY",
  girdAttribute: {
    DAY: {
      formatString: "DD/MM/YYYY",
      unit: "days",
      unitText: "Ngày",
      parentUnit: "months",
      addUnit: 6,
      getWidthParent: (moment, first) =>
        first
          ? (moment.daysInMonth() - moment.format("DD") + 1) * 48
          : moment.daysInMonth() * 48,
      getTextParent: (moment) => moment.format("MM/YYYY"),
      getTimeCompare: (moment) => moment.format("M"),
      formatChild: "DD",
    },
    MONTH: {
      formatString: "DD/MM/YYYY HH:mm",
      unit: "months",
      unitText: "Tháng",
      parentUnit: "years",
      addUnit: 6,
      getWidthParent: (moment, first) =>
        first ? (12 - moment.format("MM") + 1) * 48 : 12 * 48,
      getTextParent: (moment) => moment.format("YYYY"),
      getTimeCompare: (moment) => moment.format("YYYY"),
      formatChild: "MM",
    },
    HOUR: {
      formatString: "DD/MM/YYYY HH:mm",
      unit: "hours",
      unitText: "Giờ",
      addUnit: 6,
      parentUnit: "days",
      getWidthParent: (moment, first) =>
        first ? (23 - moment.format("HH") + 1) * 48 : 23 * 48,
      getTextParent: (moment) => moment.format("DD/MM/YYYY"),
      getTimeCompare: (moment) => moment.format("DD/MM/YYYY"),
      formatChild: "HH",
    },
    WEEK: {
      formatString: "DD/MM/YYYY HH:mm",
      unit: "weeks",
      unitText: "Tuần",
      addUnit: 6,
      parentUnit: "years",
      getWidthParent: (moment, first) =>
        first ? (52 - moment.format("W") + 1) * 48 : 52 * 48,
      getTextParent: (moment) => moment.format("YYYY"),
      getTimeCompare: (moment) => moment.format("W"),
      formatChild: "W",
    },
    QUARTER: {
      formatString: "DD/MM/YYYY HH:mm",
      unit: "quarters",
      unitText: "Quý",
      addUnit: 30,
      parentUnit: "years",
      getWidthParent: (moment, first) =>
        first ? (4 - moment.format("Q") + 1) * 48 : 4 * 48,
      getTextParent: (moment) => moment.format("YYYY"),
      getTimeCompare: (moment) => moment.format("YYYY"),
      formatChild: "Q",
    },
  },
  girdInstance: {
    formatString: "DD/MM/YYYY HH:mm",
    unit: "days",
    unitText: "Ngày",
    addUnit: 6,
    parentUnit: "months",
    getWidthParent: (moment, first) =>
      first
        ? (moment.daysInMonth() - moment.format("DD") + 1) * 48
        : moment.daysInMonth() * 48,
    getTextParent: (moment) => moment.format("MM/YYYY"),
    getTimeCompare: (moment) => moment.format("M"),
    formatChild: "DD",
  },
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
      return {
        ...state,
        timelineColor: {
          ...state.timelineColor,
          [action.payload.type]: action.payload.color,
          ...action.payload.dataObject,
        },
      };
    case actionTypes.CHANGE_COLUMN_INDEX:
      return { ...state, indexColumn: action.payload };
    case actionTypes.CHANGE_VISIBLE:
      return {
        ...state,
        visible: {
          ...state.visible,
          [action.payload.section]: {
            ...state.visible[action.payload.section],
            [action.payload.type]: action.payload.visible,
          },
          ...action.payload.dataObject,
        },
      };
    case actionTypes.CHANGE_CONTENT_PREVIEW_PDF:
      return { ...state, previewContent: action.payload };
    case actionTypes.CHANGE_RENDER_FULL_DAY:
      return { ...state, renderFullDay: action.payload };
    case actionTypes.CHANGE_FILTER_EXPORT_PDF:
      return { ...state, filterExportPdf: action.payload };
    case actionTypes.CHANGE_INSTANCE_GIRD:
      return {
        ...state,
        girdInstance: state.girdAttribute[action.payload],
        girdType: action.payload,
      };
    case actionTypes.CHANGE_PROJECT_INFO:
      return { ...state, projectInfo: action.payload };
    case actionTypes.CHANGE_SCHEDULE_DETAIL_GANTT:
      return { ...state, scheduleDetailGantt: action.payload };
    case actionTypes.SCROLL_GANTT:
      return { ...state, scrollGanttFlag: action.payload };
    default:
      return state;
  }
};

export default gantt;
