import { get } from 'lodash';
import { DETAIL_STATUS, DETAIL_STATUS_FAIL, DETAIL_STATUS_SUCCESS } from '../../../constants/actions/project/setting/detailStatus';
import { UPDATE_STATUS_COPY_SUCCESS } from '../../../constants/actions/project/setting/updateStatusCopy';
import { UPDATE_STATUS_DATE_SUCCESS } from '../../../constants/actions/project/setting/updateStatusDate';
import { UPDATE_STATUS_VIEW_SUCCESS } from '../../../constants/actions/project/setting/updateStatusView';

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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_STATUS_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
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
    default:
      return state;
  }
}

export default reducer;