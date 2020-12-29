import {
  TASK_ASSIGN,
  TASK_DUE,
  TASK_OVERVIEW_RECENT,
  TASK_OVERVIEW_STATISTIC,
  TASK_ROLE
} from "./types";


export const initialState = {
  [TASK_OVERVIEW_STATISTIC]: {
    state: false,
    updated: 0,
    static: {
      task_of_me: 0,
      task_waiting: 0,
      task_doing: 0,
      task_complete: 0,
      task_stop: 0,
      task_will_expire: 0,
      task_expired: 0,
      task_hight_priority: 0,
      task_medium_priority: 0,
      task_low_priority: 0,
      task_me_assign: 0,
      task_assign_to_me: 0,
      task_me_offer: 0,
      roles: []
    }
  },
  [TASK_OVERVIEW_RECENT]: {
    state: false,
    summary: { waiting: 5, doing: 1, complete: 0, expired: 6, stop: 1 },
    updated: 0,
    tasks: []
  }
};
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TASK_OVERVIEW_STATISTIC:
    case TASK_OVERVIEW_RECENT:
    case TASK_DUE:
    case TASK_ASSIGN:
    case TASK_ROLE:
      return {
        ...state,
        [action.type]: { ...action.payload, updated: Date.now() }
      };
    default:
      return state;
  }
}

export default taskReducer;
