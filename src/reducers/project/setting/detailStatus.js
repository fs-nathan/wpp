import {
  DETAIL_STATUS,
  DETAIL_STATUS_SUCCESS,
  DETAIL_STATUS_FAIL,
} from '../../../constants/actions/project/setting/detailStatus';
import {
  UPDATE_STATUS_COPY_SUCCESS
} from '../../../constants/actions/project/setting/updateStatusCopy';
import {
  UPDATE_STATUS_DATE_SUCCESS
} from '../../../constants/actions/project/setting/updateStatusDate';
import { get } from 'lodash';

export const initialState = {
  data: {
    status: null,
  },
  error: null,
  loading: false,
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
      };
    case DETAIL_STATUS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_STATUS_DATE_SUCCESS: {
      const newStatus = {
        ...state.data.status,
        date_status: get(action.options, 'status')
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
        can_copy: get(action.options, 'status')
      }
      return {
        ...state,
        data: {
          ...state.data,
          status: newStatus,
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;