import { MEMBER_PROJECT, MEMBER_PROJECT_FAIL, MEMBER_PROJECT_RESET, MEMBER_PROJECT_SUCCESS } from '../../constants/actions/project/memberProject';

export const initialState = {
  data: {
    membersAdded: [],
    membersFree: [],
    totalTask: 0,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case MEMBER_PROJECT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case MEMBER_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case MEMBER_PROJECT_RESET:
      return initialState;
    /*
    case ADD_MEMBER_PROJECT_SUCCESS:
      membersAdded = [...state.data.membersAdded];
      membersFree = [...state.data.membersFree].map(room => {
        const users = get(room, 'users', []);
        const removed = remove(users, { id: get(action.options, 'memberId') });
        removed.forEach(user => {
          membersAdded.push({
            ...user,
            group_permission_code: 0,
            group_permission_name: "rmp_admin",
            join_task_status_code: 0,
            roles: [],
          });
        });
        return {
          ...room,
          users,
        }
      });
      return {
        ...state,
        data: {
          ...state.data,
          membersAdded,
          membersFree,
        }
      };
    case REMOVE_MEMBER_PROJECT_SUCCESS:
      membersAdded = [...state.data.membersAdded];
      const removed = remove(membersAdded, { id: get(action.options, 'memberId') });
      membersFree = [...state.data.membersFree].map(room => {
        let users = get(room, 'users', []);
        removed.forEach(user => {
          if (get(room, '_id') === get(user, 'room')) {
            users.push(user);
          }
        });
        return {
          ...room,
          users,
        }
      });
      return {
        ...state,
        data: {
          ...state.data,
          membersAdded,
          membersFree,
        }
      };
    case UPDATE_STATE_JOIN_TASK_SUCCESS:
      membersAdded = [...state.data.membersAdded].map(user => {
        let newUser = user;
        if (get(user, 'id') === get(action.options, 'memberId')) {
          newUser = {
            ...newUser,
            join_task_status_code: get(action.options, 'state', 0),
          };
        }
        return newUser;
      });
      return {
        ...state,
        data: {
          ...state.data,
          membersAdded,
        }
      };
    */
    default:
      return state;
  }
}

export default reducer;