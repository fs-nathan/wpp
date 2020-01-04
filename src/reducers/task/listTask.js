import {
  LIST_TASK,
  LIST_TASK_SUCCESS,
  LIST_TASK_FAIL,
} from '../../constants/actions/task/listTask';
//import { get, findIndex, remove } from 'lodash';

export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  //let tasks = [];
  //let index = -1;
  switch (action.type) {
    case LIST_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_TASK_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;