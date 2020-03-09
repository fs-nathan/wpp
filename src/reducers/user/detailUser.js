import {
  DETAIL_USER,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_FAIL,
} from '../../constants/actions/user/detailUser';
import { UPDATE_USER_SUCCESS } from '../../constants/actions/user/updateUser';
import { UPLOAD_DOCUMENTS_USER_SUCCESS } from '../../constants/actions/user/uploadDocumentsUser';
import { get } from 'lodash';

export const initialState = {
  data: {  
    user: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_USER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_USER_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_USER_SUCCESS: {
      const newUser = {
        ...state.data.user,
        room_id: get(action.options, 'roomId'),
        position_id: get(action.options, 'positionId'),
        level_id: get(action.options, 'levelId'),
        major_id: get(action.options, 'majorId'),
        description: get(action.options, 'description'),
      };
      return {
        ...state,
        data: {
          ...state.data,
          user: newUser,
        }
      }
    }
    case UPLOAD_DOCUMENTS_USER_SUCCESS: {
      const newUser = {
        ...state.data.user,
        documents: get(action.data, 'documents'),
      };
      return {
        ...state,
        data: {
          ...state.data,
          user: newUser,
        }
      }
    }
    default:
      return state;
  }
}

export default reducer;