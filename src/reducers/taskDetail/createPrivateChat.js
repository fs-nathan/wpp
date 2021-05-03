import * as types from '../../constants/actions/taskDetail/taskDetailConst';

const initialState = {
  data: {},
  loading: false,
  error: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.THREAD_CHAT_CREATE_PRIVATE:
      return {
        ...state,
        loading: true
      }
    case types.THREAD_CHAT_CREATE_PRIVATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      }
    case types.THREAD_CHAT_CREATE_PRIVATE_RESET:
      return {
        ...state,
        loading: false,
        data: {}
      }
    default:
      return state
  }
}