import { DETAIL_STATUS, DETAIL_STATUS_FAIL, DETAIL_STATUS_RESET, DETAIL_STATUS_SUCCESS } from '../../../constants/actions/project/setting/detailStatus';

export const initialState = {
  data: {
    status: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_STATUS:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_STATUS_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_STATUS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case DETAIL_STATUS_RESET:
      return initialState;
    /*
    case UPDATE_STATUS_DATE_SUCCESS: {
      const newStatus = {
        ...state.data.status,
        date: get(action.options, 'status')
      }
      return {
        ...state,
        data: {
          ...state.data,
          status: newStatus,
        }
      };
    }
    case UPDATE_STATUS_COPY_SUCCESS: {
      const newStatus = {
        ...state.data.status,
        copy: get(action.options, 'status')
      }
      return {
        ...state,
        data: {
          ...state.data,
          status: newStatus,
        }
      };
    }
    case UPDATE_STATUS_VIEW_SUCCESS: {
      const newStatus = {
        ...state.data.status,
        view: get(action.options, 'status')
      }
      return {
        ...state,
        data: {
          ...state.data,
          status: newStatus,
        }
      };
    }
    */
    default:
      return state;
  }
}

export default reducer;