import { 
  KANBAN_SETTING_SET_VISIBLE_HEADER,
  KANBAN_SETTING_SET_PRIORITY_FILTER,
  KANBAN_SETTING_SET_STATUS_FILTER,
  KANBAN_SETTING_SET_MEMBER_FILTER,
  KANBAN_SETTING_SET_MEMBER_SEARCH,
  KANBAN_SETTING_SET_TASK_SEARCH,
} from 'constants/actions/kanban/setting';

export const initialState = {
  setting: {
    visible: true,
    statusFilter: [0, 1, 2, 3, 4],
    priorityFilter: [0, 1, 2],
    memberFilter: [],
    memberSearchStr: '',
    taskSearchStr: '',
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_SETTING_SET_VISIBLE_HEADER:
      return {
        ...state,
        setting: {
          ...state.setting,
          visible: action.options.visible,
        },
      };
    case KANBAN_SETTING_SET_STATUS_FILTER:
      return {
        ...state,
        setting: {
          ...state.setting,
          statusFilter: action.options.statusFilter,
        },
      };
    case KANBAN_SETTING_SET_PRIORITY_FILTER:
      return {
        ...state,
        setting: {
          ...state.setting,
          priorityFilter: action.options.priorityFilter,
        },
      };
    case KANBAN_SETTING_SET_MEMBER_FILTER:
      return {
        ...state,
        setting: {
          ...state.setting,
          memberFilter: action.options.memberFilter,
        },
      };
    case KANBAN_SETTING_SET_MEMBER_SEARCH:
      return {
        ...state,
        setting: {
          ...state.setting,
          memberSearchStr: action.options.searchStr,
        },
      };
    case KANBAN_SETTING_SET_TASK_SEARCH: 
    return {
      ...state,
      setting: {
        ...state.setting,
        taskSearchStr: action.options.searchStr,
      },
    };
    default:
      return state;
  }
}

export default reducer;